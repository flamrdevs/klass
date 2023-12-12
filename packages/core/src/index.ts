import { clsx } from "clsx";
import type { ClassValue } from "clsx";

type TransformKey<T extends PropertyKey> = T extends "true" ? true : T extends "false" ? false : Exclude<T, symbol>;

type VariantsSchema = {
  [variant: string]: {
    [type: string]: ClassValue;
  };
};

type RestrictedVariantsKey = "class";

type StrictVariantsSchema<E extends string = RestrictedVariantsKey> = VariantsSchema & { [variant in E]?: undefined };

type VariantOptions<T extends VariantsSchema[string]> = {
  variant: T;
  defaultVariant?: TransformKey<keyof T>;
};

type VariantFn<T extends VariantsSchema[string]> = {
  (value?: TransformKey<keyof T>): string | undefined;
} & {
  /**
   * options
   */
  o: VariantOptions<T>;
};

type VariantGroup<T extends VariantsSchema> = {
  [K in keyof T]: VariantFn<T[K]>;
};

type CompoundVariant<T extends VariantsSchema> = Omit<{ [K in keyof T]?: TransformKey<keyof T[K]> }, RestrictedVariantsKey> & { class: ClassValue };

type KlassOptions<T extends StrictVariantsSchema> = {
  base?: ClassValue;
  variants: T;
  defaultVariants?: { [K in keyof T]?: TransformKey<keyof T[K]> };
  compoundVariants?: CompoundVariant<T>[];
};

type KlassFn<T extends StrictVariantsSchema> = {
  (props?: { [K in keyof T]?: TransformKey<keyof T[K]> }, classes?: ClassValue): string;
} & {
  /**
   * options
   */
  o: KlassOptions<T>;
  /**
   * variant group
   */
  v: VariantGroup<T>;
  /**
   * variant keys
   */
  vk: (keyof T)[];
};

type ConditionSchema = {
  [type: string]: string;
};

type RevariantOptions<C extends ConditionSchema, T extends VariantsSchema[string]> = {
  conditions: C;
  defaultCondition: keyof C;
  variant: T;
};

type RevariantFn<C extends ConditionSchema, T extends VariantsSchema[string]> = {
  (value?: TransformKey<keyof T> | { [condition in keyof C]?: TransformKey<keyof T> }): string | undefined;
} & {
  /**
   * options
   */
  o: RevariantOptions<C, T>;
};

type RevariantGroup<C extends ConditionSchema, T extends VariantsSchema> = {
  [K in keyof T]: RevariantFn<C, T[K]>;
};

type ReklassOptions<C extends ConditionSchema, T extends VariantsSchema> = {
  conditions: C;
  defaultCondition: keyof C;
  variants: T;
};

type ReklassFn<C extends ConditionSchema, T extends VariantsSchema> = {
  (
    props?: {
      [K in keyof T]?: TransformKey<keyof T[K]> | { [condition in keyof C]?: TransformKey<keyof T[K]> };
    },
    classes?: ClassValue
  ): string;
} & {
  /**
   * options
   */
  o: ReklassOptions<C, T>;
  /**
   * revariant group
   */
  rv: RevariantGroup<C, T>;
  /**
   * revariant keys
   */
  rvk: (keyof T)[];
};

type VariantsOf<T extends (...args: any[]) => any> = Exclude<Parameters<T>[0], undefined>;

type ItFn = (value: string) => string;
type AsCondition = "prefix" | "suffix";
type AsConditionFn = (condition: string, value: string) => string;

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

/**
 *
 * @param options variant options
 * @returns variant function
 *
 * @see {@link https://klass.pages.dev/klass/core.html#variant | variant}
 */
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

/**
 *
 * @param options variants options
 * @param config additional config
 * @returns klass function
 *
 * @example
 * klass({
 *  base: "base",
 *  variants: {
 *    color: {
 *      neutral: "color-neutral",
 *      primary: "color-primary"
 *    },
 *    size: {
 *      sm: "size-sm",
 *      md: "size-md",
 *      lg: "size-lg"
 *    }
 *  },
 *  defaultVariants: {
 *    color: "primary",
 *    size: "md"
 *  },
 * });
 *
 * @see {@link https://klass.pages.dev/klass/core.html#klass | klass}
 */
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

/**
 *
 * @param options responsive variant options
 * @param config additional config
 * @returns revariant function
 *
 * @see {@link https://klass.pages.dev/klass/core.html#revariant | revariant}
 */
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

/**
 *
 * @param options responsive variants options
 * @param config additional config
 * @returns reklass function
 *
 * @example
 * reklass({
 *  conditions: {
 *    base: "",
 *    sm: "sm:",
 *    md: "md:",
 *    lg: "lg:",
 *    xl: "xl:",
 *    xxl: "2xl:"
 *  },
 *  defaultCondition: "base",
 *  variants: {
 *    m: {
 *      "0": "m-0",
 *      "1": "m-1",
 *      "2": "m-2",
 *      "3": "m-3",
 *      "4": "m-4"
 *    },
 *    p: {
 *      "0": "p-0",
 *      "1": "p-1",
 *      "2": "p-2",
 *      "3": "p-3",
 *      "4": "p-4"
 *    }
 *  }
 * });
 *
 * @see {@link https://klass.pages.dev/klass/core.html#reklass | reklass}
 */
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
