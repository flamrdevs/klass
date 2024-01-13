import { clsx } from "clsx";
import type { ClassValue } from "clsx";

import type {
  TransformKey,
  ItFn,
  AsCondition,
  AsConditionFn,
  VariantsSchema,
  RestrictedVariantsKey,
  StrictVariantsSchema,
  VariantsOf,
  VariantOptions,
  VariantFn,
  VariantGroup,
  CompoundVariant,
  KlassOptions,
  KlassFn,
  ConditionSchema,
  RevariantOptions,
  RevariantFn,
  RevariantGroup,
  ReklassOptions,
  ReklassFn,
} from "./types.ts";

const getPropKey = <T extends VariantsSchema[string]>(value?: TransformKey<keyof T>, defaultValue?: TransformKey<keyof T>) => `${value ?? defaultValue}`;
const defaultItFn: ItFn = (value) => value;
const defaultAsCondition: AsCondition = "prefix",
  defaultAsPrefixFn: AsConditionFn = (condition, value) => `${condition}${value}`,
  defaultAsSuffixFn: AsConditionFn = (condition, value) => `${value}${condition}`;

const resolveVariant = <T extends { [type: string]: ClassValue }>(variant: T) => {
  const result = {} as { [key in keyof T]: string };
  let key: keyof T;
  for (key in variant) result[key] = clsx(variant[key]);
  return result;
};

const variant = <T extends VariantsSchema[string]>(options: VariantOptions<T>): VariantFn<T> => {
  const resolvedVariant = resolveVariant(options.variant);

  const fn: Omit<VariantFn<T>, "o"> = (props?: TransformKey<keyof T>) => {
    let key: string | TransformKey<keyof T>;
    return `${(key = getPropKey<T>(props, options.defaultVariant))}` in options.variant ? resolvedVariant[key] : undefined;
  };

  (fn as VariantFn<T>).o = options;

  return fn as VariantFn<T>;
};

const pickVariantCompoundVariantsMapFn = <T extends StrictVariantsSchema>({ class: _class, ...variant }: CompoundVariant<T>) => variant;
const keyofVariantCompoundVariantsMapFn = <T extends StrictVariantsSchema>(variant: Omit<CompoundVariant<T>, "class">) => Object.keys(variant);
const resolveClassCompoundVariantsMapFn = <T extends StrictVariantsSchema>({ class: _class }: CompoundVariant<T>) => clsx(_class);

const klass = <T extends StrictVariantsSchema>(options: KlassOptions<T>, config: { it?: ItFn } = {}): KlassFn<T> => {
  const { it = defaultItFn } = config;

  const resolvedBase = clsx(options.base);
  const keyofVariants: (keyof T)[] = [];
  const variantGroup = Object.entries(options.variants).reduce((obj, [key, value]: [keyof T, StrictVariantsSchema[string]]) => {
    keyofVariants.push(key);
    obj[key] = variant<T[keyof T]>({ variant: value as any, defaultVariant: options.defaultVariants?.[key] as any });
    return obj;
  }, {} as VariantGroup<T>);
  const compoundVariants = options.compoundVariants ?? [];
  const hasCompoundVariants = compoundVariants.length > 0;
  const pickVariantCompoundVariants = compoundVariants.map(pickVariantCompoundVariantsMapFn);
  const keyofVariantCompoundVariants = pickVariantCompoundVariants.map(keyofVariantCompoundVariantsMapFn);
  const resolvedClassCompoundVariants = compoundVariants.map(resolveClassCompoundVariantsMapFn);

  const fn: Omit<KlassFn<T>, "o" | "v" | "vk"> = (props?: { [K in keyof T]?: TransformKey<keyof T[K]> }, classes?: ClassValue) => {
    let result: string = "",
      i: number,
      temp: string | undefined;

    for (i = 0; i < keyofVariants.length; i++) {
      if ((temp = variantGroup[keyofVariants[i]](props?.[keyofVariants[i]]))) {
        result && (result += " ");
        result += temp;
      }
    }

    if (hasCompoundVariants) {
      for (i = 0; i < pickVariantCompoundVariants.length; i++) {
        let v = pickVariantCompoundVariants[i],
          val: (typeof v)[keyof typeof v];
        if (
          keyofVariantCompoundVariants[i].every((key) => typeof (val = v[key as keyof typeof v]) !== "undefined" && (props?.[key] ?? options.defaultVariants?.[key]) === val) &&
          (temp = resolvedClassCompoundVariants[i])
        ) {
          result && (result += " ");
          result += temp;
        }
      }
    }

    return it(clsx(resolvedBase, result, classes));
  };

  (fn as KlassFn<T>).o = options;
  (fn as KlassFn<T>).v = variantGroup;
  (fn as KlassFn<T>).vk = keyofVariants;

  return fn as KlassFn<T>;
};

const revariant = <C extends ConditionSchema, T extends VariantsSchema[string]>(options: RevariantOptions<C, T>, config: { as?: AsCondition } = {}) => {
  const { as = defaultAsCondition } = config;

  const keyofConditions = Object.keys(options.conditions) as (keyof C)[];
  const resolvedVariant = resolveVariant(options.variant);

  const asCondition = as === "suffix" ? defaultAsSuffixFn : defaultAsPrefixFn;

  const fn: Omit<RevariantFn<C, T>, "o"> = (props?: TransformKey<keyof T> | { [condition in keyof C]?: TransformKey<keyof T> }) => {
    let key: string | TransformKey<keyof T>;

    return typeof props !== "object"
      ? `${(key = getPropKey<T>(props))}` in options.variant
        ? asCondition(options.conditions[options.defaultCondition], resolvedVariant[key])
        : undefined
      : clsx(
          keyofConditions.map((condition) => condition in props && `${(key = getPropKey<T>(props[condition]))}` in options.variant && asCondition(options.conditions[condition], resolvedVariant[key]))
        );
  };

  (fn as RevariantFn<C, T>).o = options;

  return fn as RevariantFn<C, T>;
};

const reklass = <C extends ConditionSchema, T extends VariantsSchema>(options: ReklassOptions<C, T>, config: { as?: AsCondition; it?: ItFn } = {}) => {
  const { as, it = defaultItFn } = config;

  const keyofVariants: (keyof T)[] = [];
  const revariantGroup = Object.entries(options.variants).reduce((obj, [key, value]: [keyof T, VariantsSchema[string]]) => {
    keyofVariants.push(key);
    obj[key as keyof typeof obj] = revariant<C, T[keyof T]>({ conditions: options.conditions, defaultCondition: options.defaultCondition, variant: value as any }, { as });
    return obj;
  }, {} as RevariantGroup<C, T>);

  const fn: Omit<ReklassFn<C, T>, "o" | "rv" | "rvk"> = (
    props?: {
      [K in keyof T]?: TransformKey<keyof T[K]> | { [condition in keyof C]?: TransformKey<keyof T[K]> };
    },
    classes?: ClassValue
  ) => {
    return it(
      clsx(
        keyofVariants.map((key) => revariantGroup[key](props?.[key])),
        classes
      )
    );
  };

  (fn as ReklassFn<C, T>).o = options;
  (fn as ReklassFn<C, T>).rv = revariantGroup;
  (fn as ReklassFn<C, T>).rvk = keyofVariants;

  return fn as ReklassFn<C, T>;
};

export type {
  ClassValue,
  TransformKey,
  ItFn,
  AsCondition,
  AsConditionFn,
  VariantsSchema,
  RestrictedVariantsKey,
  StrictVariantsSchema,
  VariantsOf,
  VariantOptions,
  VariantFn,
  VariantGroup,
  CompoundVariant,
  KlassOptions,
  KlassFn,
  ConditionSchema,
  RevariantOptions,
  RevariantFn,
  RevariantGroup,
  ReklassOptions,
  ReklassFn,
};
export { variant, klass, revariant, reklass };
