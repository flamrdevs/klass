import { clsx } from "clsx";
import type { ClassValue } from "clsx";

import type {
  TransformKey,
  EndFn,
  AsFn,
  VariantsSchema,
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

const klass = <T extends VariantsSchema>(options: KlassOptions<T>, config: { end?: EndFn } = {}): KlassFn<T> => {
  const { end = defaultEndFn } = config;

  const resolvedBase = clsx(options.base);

  const keyofVariants: (keyof T)[] = [],
    defaults = options.defaults,
    variantGroup = Object.entries(options.variants).reduce(
      (obj, [key, value]: [keyof T, VariantsSchema[string]]) => (keyofVariants.push(key), (obj[key] = variant<T[keyof T]>(value as any, defaults?.[key] as any)), obj),
      {} as VariantGroup<T>
    );

  const resolvedCompounds = options.compounds?.map(([v, c]) => ({ v, c: clsx(c) })),
    lengthResolvedCompounds = resolvedCompounds?.length;

  const fn = ((props, classes) => {
    let result: string = resolvedBase,
      temp: string | undefined,
      x: keyof T | (string & {});

    for (x of keyofVariants) if ((temp = variantGroup[x](props?.[x]))) result && (result += " "), (result += temp);

    if (lengthResolvedCompounds) {
      compounds: for (let rc of resolvedCompounds) {
        for (x in rc.v) if ((props?.[x] ?? defaults?.[x]) !== rc.v[x as keyof typeof rc.v]) continue compounds;
        if (rc.c) result && (result += " "), (result += rc.c);
      }
    }

    if (typeof classes !== "undefined" && (temp = clsx(classes))) result && (result += " "), (result += temp);

    return end(result);
  }) as KlassFn<T>;

  fn.o = options;
  fn.v = variantGroup;
  fn.vk = keyofVariants;

  return fn;
};

const revariant = <C extends ConditionSchema, T extends VariantsSchema[string]>(conditions: C, defaultCondition: keyof C, variant: T, config: { as?: AsFn } = {}) => {
  const { as = defaultAsFn } = config;

  const keyofConditions = Object.keys(conditions) as (keyof C)[];
  const normalizedVariant = normalizeVariant(variant);
  const defaultConditionValue = conditions[defaultCondition];

  return ((props?: TransformKey<keyof T> | { [condition in keyof C]?: TransformKey<keyof T> }) => {
    let temp: string | false;

    if (typeof props !== "object") return typeof (temp = normalizedVariant[props as string]) === "string" ? as(defaultConditionValue, temp) : undefined;

    let result: string = "",
      condition: keyof C;

    for (condition of keyofConditions)
      if ((temp = condition in props && as(conditions[condition], normalizedVariant[props[condition as keyof C] as keyof T]))) result && (result += " "), (result += temp);

    return result;
  }) as RevariantFn<C, T>;
};

const reklass = <C extends ConditionSchema, T extends VariantsSchema>(options: ReklassOptions<C, T>, config: { as?: AsFn; end?: EndFn } = {}) => {
  const { as, end = defaultEndFn } = config;

  const [conditions, defaultCondition] = options.conditions;

  const keyofVariants: (keyof T)[] = [],
    revariantConfig = { as },
    revariantGroup = Object.entries(options.variants).reduce(
      (obj, [key, value]: [keyof T, VariantsSchema[string]]) => (keyofVariants.push(key), (obj[key] = revariant<C, T[keyof T]>(conditions, defaultCondition, value as any, revariantConfig)), obj),
      {} as RevariantGroup<C, T>
    );

  const fn = ((props, classes) => {
    let result = "",
      key: keyof T,
      temp: string | undefined;

    for (key of keyofVariants) if ((temp = revariantGroup[key](props?.[key]))) result && (result += " "), (result += temp);

    if (typeof classes !== "undefined" && (temp = clsx(classes))) result && (result += " "), (result += temp);

    return end(result);
  }) as ReklassFn<C, T>;

  fn.o = options;
  fn.rv = revariantGroup;
  fn.rvk = keyofVariants;

  return fn;
};

export type {
  ClassValue,
  TransformKey,
  EndFn,
  AsFn,
  VariantsSchema,
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
