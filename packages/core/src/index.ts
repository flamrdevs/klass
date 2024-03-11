import { clsx } from "clsx";
import type { ClassValue } from "clsx";

import type {
  TransformKey,
  EndFn,
  AsFn,
  EndFnProps,
  AsFnProps,
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
} from "./types";

import { defaultEndFn, defaultAsFn, normalizeVariant } from "./utils";

const variant = <T extends VariantsSchema[string]>(variant: T, defaultVariant?: TransformKey<keyof T>): VariantFn<T> => {
  const normalizedVariant = normalizeVariant(variant);
  return ((props?: TransformKey<keyof T>) => normalizedVariant[props ?? (defaultVariant as keyof T)]) as VariantFn<T>;
};

const klass = <T extends VariantsSchema>(options: KlassOptions<T>, config: EndFnProps = {}): KlassFn<T> => {
  const { base, variants, defaults, compounds } = options,
    { end = defaultEndFn } = config;

  const resolvedBase = clsx(base);

  const keyofVariants: (keyof T)[] = [],
    variantGroup = {} as VariantGroup<T>;

  let variantsKey: keyof T;
  for (variantsKey in variants) keyofVariants.push(variantsKey), (variantGroup[variantsKey] = variant<T[keyof T]>(variants[variantsKey] as any, defaults?.[variantsKey] as any));

  let compoundsLength: boolean;
  const resolvedCompounds: {
    v: { [K in keyof T]?: TransformKey<keyof T[K]> | undefined };
    c: string;
  }[] = [];

  if ((compoundsLength = !!compounds?.length)) for (const [v, c] of compounds) resolvedCompounds.push({ v, c: clsx(c) });

  const fn = ((props, classes) => {
    let result: string = resolvedBase,
      temp: string | undefined,
      x: keyof T | (string & {});

    for (x of keyofVariants) if ((temp = variantGroup[x](props?.[x]))) result && (result += " "), (result += temp);

    if (compoundsLength) {
      compounds: for (let rc of resolvedCompounds) {
        for (x in rc.v) if ((props?.[x] ?? defaults?.[x]) !== rc.v[x as keyof typeof rc.v]) continue compounds;
        if (rc.c) result && (result += " "), (result += rc.c);
      }
    }

    if (typeof classes !== "undefined" && (temp = clsx(classes))) result && (result += " "), (result += temp);

    return end(result);
  }) as KlassFn<T>;

  fn.g = variantGroup;
  fn.k = keyofVariants;

  return fn;
};

const revariant = <C extends ConditionSchema, T extends VariantsSchema[string]>(conditions: C, defaultCondition: keyof C, variant: T, config: AsFnProps = {}) => {
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

const reklass = <C extends ConditionSchema, T extends VariantsSchema>(options: ReklassOptions<C, T>, config: AsFnProps & EndFnProps = {}) => {
  const {
      conditions: [conditions, defaultCondition],
      variants,
    } = options,
    { as, end = defaultEndFn } = config;

  const keyofVariants: (keyof T)[] = [],
    revariantConfig = { as },
    revariantGroup = {} as RevariantGroup<C, T>;

  let variantsKey: keyof T;
  for (variantsKey in variants) keyofVariants.push(variantsKey), (revariantGroup[variantsKey] = revariant<C, T[keyof T]>(conditions, defaultCondition, variants[variantsKey] as any, revariantConfig));

  const fn = ((props, classes) => {
    let result = "",
      key: keyof T,
      temp: string | undefined;

    for (key of keyofVariants) if ((temp = revariantGroup[key](props?.[key]))) result && (result += " "), (result += temp);

    if (typeof classes !== "undefined" && (temp = clsx(classes))) result && (result += " "), (result += temp);

    return end(result);
  }) as ReklassFn<C, T>;

  fn.g = revariantGroup;
  fn.k = keyofVariants;

  return fn;
};

export type {
  ClassValue,
  TransformKey,
  EndFn,
  AsFn,
  EndFnProps,
  AsFnProps,
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
export { clsx, variant, klass, revariant, reklass };
