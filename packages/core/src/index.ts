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

  const compounds = options.compounds,
    hasCompounds = Array.isArray(compounds) ? compounds.length > 0 : false,
    pickVariantCompounds: { [K in keyof T]?: TransformKey<keyof T[K]> }[] = [],
    resolvedClassCompounds: string[] = [];

  if (hasCompounds) {
    for (const [variant, _class] of compounds!) {
      pickVariantCompounds.push(variant);
      resolvedClassCompounds.push(clsx(_class));
    }
  }

  const lengthKeyofVariants = keyofVariants.length,
    lengthPickVariantCompounds = pickVariantCompounds.length;

  const fn = ((props, classes) => {
    let result: string = "",
      i: number,
      temp: string | undefined,
      x: keyof T | (string & {});

    for (i = 0; i < lengthKeyofVariants; i++) if ((temp = variantGroup[(x = keyofVariants[i])](props?.[x]))) result && (result += " "), (result += temp);

    if (hasCompounds) {
      for (i = 0; i < lengthPickVariantCompounds; i++) {
        let v = pickVariantCompounds[i],
          match: boolean = true,
          val: (typeof v)[keyof typeof v];

        for (x in v) {
          if (typeof (val = v[x as keyof typeof v]) === "undefined" || (props?.[x] ?? defaults?.[x]) !== val) {
            match = false;
            break;
          }
        }
        if (match && (temp = resolvedClassCompounds[i])) result && (result += " "), (result += temp);
      }
    }

    return end(clsx(resolvedBase, result, classes));
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

  const [conditions, defaultCondition] = options.conditions;

  const keyofVariants: (keyof T)[] = [],
    revariantConfig = { as },
    revariantGroup = Object.entries(options.variants).reduce(
      (obj, [key, value]: [keyof T, VariantsSchema[string]]) => (
        keyofVariants.push(key), (obj[key as keyof typeof obj] = revariant<C, T[keyof T]>(conditions, defaultCondition, value as any, revariantConfig)), obj
      ),
      {} as RevariantGroup<C, T>
    );

  const fn = ((props, classes) => {
    let result = "",
      key: keyof T,
      temp: string | undefined;
    for (key of keyofVariants) if ((temp = revariantGroup[key](props?.[key]))) result && (result += " "), (result += temp);
    return end(clsx(result, classes));
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
