import { clsx } from "clsx";
import type { ClassValue } from "clsx";

import type {
  TransformKey,
  EndFn,
  AsFn,
  VariantsSchema,
  RestrictedVariantsKey,
  StrictVariantsSchema,
  VariantsOf,
  VariantFn,
  VariantGroup,
  CompoundVariant,
  KlassOptions,
  KlassFn,
  ConditionSchema,
  RevariantFn,
  RevariantGroup,
  ReklassOptions,
  ReklassFn,
} from "./types.ts";

import { defaultEndFn, defaultAsFn, normalizeVariant } from "./utils.ts";

const variant = <T extends VariantsSchema[string]>(variant: T, defaultVariant?: TransformKey<keyof T>): VariantFn<T> => {
  const normalizedVariant = normalizeVariant(variant);
  return ((props?: TransformKey<keyof T>) => normalizedVariant[props ?? (defaultVariant as keyof T)]) as VariantFn<T>;
};

const pickVariantCompoundVariantsMapFn = <T extends StrictVariantsSchema>({ class: _class, ...variant }: CompoundVariant<T>) => variant;
const keyofVariantCompoundVariantsMapFn = <T extends StrictVariantsSchema>(variant: Omit<CompoundVariant<T>, "class">) => Object.keys(variant);
const resolveClassCompoundVariantsMapFn = <T extends StrictVariantsSchema>({ class: _class }: CompoundVariant<T>) => clsx(_class);

const klass = <T extends StrictVariantsSchema>(options: KlassOptions<T>, config: { end?: EndFn } = {}): KlassFn<T> => {
  const { end = defaultEndFn } = config;

  const resolvedBase = clsx(options.base);
  const keyofVariants: (keyof T)[] = [];
  const variantGroup = Object.entries(options.variants).reduce(
    (obj, [key, value]: [keyof T, StrictVariantsSchema[string]]) => (keyofVariants.push(key), (obj[key] = variant<T[keyof T]>(value as any, options.defaultVariants?.[key] as any)), obj),
    {} as VariantGroup<T>
  );
  const hasCompoundVariants = options.compoundVariants && options.compoundVariants.length > 0;
  const pickVariantCompoundVariants = options.compoundVariants?.map(pickVariantCompoundVariantsMapFn);
  const keyofVariantCompoundVariants = pickVariantCompoundVariants?.map(keyofVariantCompoundVariantsMapFn);
  const resolvedClassCompoundVariants = options.compoundVariants?.map(resolveClassCompoundVariantsMapFn);

  const fn: Omit<KlassFn<T>, "o" | "v" | "vk"> = (props?: { [K in keyof T]?: TransformKey<keyof T[K]> }, classes?: ClassValue) => {
    let result: string = "",
      i: number,
      temp: string | undefined;

    for (i = 0; i < keyofVariants.length; i++) if ((temp = variantGroup[keyofVariants[i]](props?.[keyofVariants[i]]))) result && (result += " "), (result += temp);

    if (hasCompoundVariants) {
      for (i = 0; i < pickVariantCompoundVariants!.length; i++) {
        let v = pickVariantCompoundVariants![i],
          match: boolean = true,
          val: (typeof v)[keyof typeof v],
          key: string;

        for (key of keyofVariantCompoundVariants![i]) {
          if (typeof (val = v[key as keyof typeof v]) === "undefined" || (props?.[key] ?? options.defaultVariants?.[key]) !== val) {
            match = false;
            break;
          }
        }
        if (match && (temp = resolvedClassCompoundVariants![i])) result && (result += " "), (result += temp);
      }
    }

    return end(clsx(resolvedBase, result, classes));
  };

  (fn as KlassFn<T>).o = options;
  (fn as KlassFn<T>).v = variantGroup;
  (fn as KlassFn<T>).vk = keyofVariants;

  return fn as KlassFn<T>;
};

const revariant = <C extends ConditionSchema, T extends VariantsSchema[string]>(conditions: C, defaultCondition: keyof C, variant: T, config: { as?: AsFn } = {}) => {
  const { as = defaultAsFn } = config;

  const keyofConditions = Object.keys(conditions) as (keyof C)[];
  const normalizedVariant = normalizeVariant(variant);
  const defaultConditionValue = conditions[defaultCondition];

  return ((props?: TransformKey<keyof T> | { [condition in keyof C]?: TransformKey<keyof T> }) => {
    if (typeof props !== "object") {
      const className = normalizedVariant[props as string];
      return typeof className === "string" ? as(defaultConditionValue, className) : undefined;
    }

    let result: string = "",
      condition: keyof C,
      temp: string | false;

    for (condition of keyofConditions) {
      if ((temp = condition in props && as(conditions[condition], normalizedVariant[props[condition as keyof C] as keyof T]))) result && (result += " "), (result += temp);
    }

    return result;
  }) as RevariantFn<C, T>;
};

const reklass = <C extends ConditionSchema, T extends VariantsSchema>(options: ReklassOptions<C, T>, config: { as?: AsFn; end?: EndFn } = {}) => {
  const { as, end = defaultEndFn } = config;

  const keyofVariants: (keyof T)[] = [];
  const revariantConfig = { as };
  const revariantGroup = Object.entries(options.variants).reduce(
    (obj, [key, value]: [keyof T, VariantsSchema[string]]) => (
      keyofVariants.push(key), (obj[key as keyof typeof obj] = revariant<C, T[keyof T]>(options.conditions, options.defaultCondition, value as any, revariantConfig)), obj
    ),
    {} as RevariantGroup<C, T>
  );

  const fn: Omit<ReklassFn<C, T>, "o" | "rv" | "rvk"> = (
    props?: {
      [K in keyof T]?: TransformKey<keyof T[K]> | { [condition in keyof C]?: TransformKey<keyof T[K]> };
    },
    classes?: ClassValue
  ) => {
    let result = "",
      key: keyof T,
      temp: string | undefined;
    for (key of keyofVariants) if ((temp = revariantGroup[key](props?.[key]))) result && (result += " "), (result += temp);
    return end(clsx(result, classes));
  };

  (fn as ReklassFn<C, T>).o = options;
  (fn as ReklassFn<C, T>).rv = revariantGroup;
  (fn as ReklassFn<C, T>).rvk = keyofVariants;

  return fn as ReklassFn<C, T>;
};

export type {
  ClassValue,
  TransformKey,
  EndFn,
  AsFn,
  VariantsSchema,
  RestrictedVariantsKey,
  StrictVariantsSchema,
  VariantsOf,
  VariantFn,
  VariantGroup,
  CompoundVariant,
  KlassOptions,
  KlassFn,
  ConditionSchema,
  RevariantFn,
  RevariantGroup,
  ReklassOptions,
  ReklassFn,
};
export { variant, klass, revariant, reklass };
