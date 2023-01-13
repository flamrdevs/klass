import { clsx } from "clsx";
import type { ClassValue } from "clsx";

export type { ClassValue };
export { clsx };

type GetKey<T extends PropertyKey> = T extends "true" | "false" ? boolean : Exclude<T, symbol>;

type VariantsSchema = {
  [variant: string]: {
    [type: string]: ClassValue;
  };
};

type VariantOptions<T extends VariantsSchema[string]> = {
  variant: T;
  defaultVariant?: GetKey<keyof T>;
};

type VariantFn<T extends VariantsSchema[string]> = {
  (value?: GetKey<keyof T>): string | undefined;
} & {
  options: VariantOptions<T>;
};

type VariantGroup<T extends VariantsSchema> = {
  [K in keyof T]: VariantFn<T[K]>;
};

type CompoundVariant<T extends VariantsSchema> = {
  variant: { [K in keyof T]?: GetKey<keyof T[K]> };
  classes?: ClassValue;
};

type KlassOptions<T extends VariantsSchema> = {
  base?: ClassValue;
  variants: T;
  defaultVariants?: { [K in keyof T]?: GetKey<keyof T[K]> };
  compoundVariants?: CompoundVariant<T>[];
};

type KlassFn<T extends VariantsSchema> = {
  (props?: { [K in keyof T]?: GetKey<keyof T[K]> }, classes?: ClassValue): string;
} & {
  options: KlassOptions<T>;
  variant: VariantGroup<T>;
};

type VariantsOf<T extends (...args: any[]) => any> = Exclude<Parameters<T>[0], undefined>;

const is = {
  string: (value?: unknown): value is string => typeof value === "string",
  number: (value?: unknown): value is number => typeof value === "number",
  boolean: (value?: unknown): value is boolean => typeof value === "boolean",
};

function isTypeofPropertyKey(value: unknown): value is string | number {
  return is.string(value) || is.number(value);
}

function transformKey<T extends VariantsSchema[string]>(value?: GetKey<keyof T>): string | GetKey<keyof T> {
  return String(value);
}

function getKey<T extends VariantsSchema[string]>(value?: GetKey<keyof T>, defaultValue?: GetKey<keyof T>) {
  return String(typeof value === "undefined" ? defaultValue : value);
}

function variant<T extends VariantsSchema[string]>(options: VariantOptions<T>): VariantFn<T> {
  const { variant, defaultVariant } = options;

  function inVariant(value: unknown) {
    return isTypeofPropertyKey(value) && value in variant;
  }

  let key: string | GetKey<keyof T>;
  const fn: Omit<VariantFn<T>, "options"> = (props?: GetKey<keyof T>) => {
    return inVariant((key = getKey<T>(props, defaultVariant))) ? clsx(variant[key]) : undefined;
  };

  (fn as VariantFn<T>).options = options;

  return fn as VariantFn<T>;
}

function klass<T extends VariantsSchema>(options: KlassOptions<T>): KlassFn<T> {
  const { base, variants, defaultVariants, compoundVariants } = options;

  const variantGroup = Object.entries(variants).reduce((obj, [key, value]) => {
    obj[key as keyof typeof obj] = variant<T[keyof T]>({
      variant: value as any,
      defaultVariant: defaultVariants?.[key] as any,
    });
    return obj;
  }, {} as VariantGroup<T>);

  const stringifiedBase = clsx(base);
  const keyofVariants = Object.keys(variants) as (keyof T)[];

  const fn: Omit<KlassFn<T>, "options" | "variant"> = (props?: { [K in keyof T]?: GetKey<keyof T[K]> }, classes?: ClassValue) => {
    return clsx(
      stringifiedBase,
      keyofVariants.map((key) => variantGroup[key](props?.[key])),
      compoundVariants?.map(({ variant, classes }) => {
        return Object.keys(variant).every((vkey) => {
          if (typeof variant[vkey] === "undefined") return false;
          if (typeof props?.[vkey] !== "undefined") return props?.[vkey] === variant[vkey];
          return defaultVariants?.[vkey] === variant[vkey];
        })
          ? classes
          : undefined;
      }),
      classes
    );
  };

  (fn as KlassFn<T>).options = options;
  (fn as KlassFn<T>).variant = variantGroup;

  return fn as KlassFn<T>;
}

export type { VariantsSchema, VariantOptions, VariantFn, KlassOptions, KlassFn, VariantsOf };
export { variant, klass };

type ConditionSchema = {
  [type: string]: string;
};

type RevariantOptions<C extends ConditionSchema, T extends VariantsSchema[string]> = {
  conditions: C;
  defaultCondition: keyof C;
  variant: T;
};

type RevariantFn<C extends ConditionSchema, T extends VariantsSchema[string]> = {
  (value?: GetKey<keyof T> | { [condition in keyof C]?: GetKey<keyof T> }): string | undefined;
} & {
  options: RevariantOptions<C, T>;
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
      [K in keyof T]?: GetKey<keyof T[K]> | { [condition in keyof C]?: GetKey<keyof T[K]> };
    },
    classes?: ClassValue
  ): string;
} & {
  options: ReklassOptions<C, T>;
  revariant: RevariantGroup<C, T>;
};

function revariant<C extends ConditionSchema, T extends VariantsSchema[string]>(options: RevariantOptions<C, T>) {
  const { conditions, defaultCondition, variant } = options;

  const keyofConditions = Object.keys(conditions) as (keyof C)[];

  function inVariant(value: unknown) {
    return isTypeofPropertyKey(value) && value in variant;
  }

  let key: string | GetKey<keyof T>;
  const fn: Omit<RevariantFn<C, T>, "options"> = (props?: GetKey<keyof T> | { [condition in keyof C]?: GetKey<keyof T> }) => {
    if (typeof props !== "object") {
      return inVariant((key = getKey<T>(props))) ? `${conditions[defaultCondition]}${clsx(variant[key])}` : undefined;
    }

    return clsx(
      keyofConditions.map(
        (condition) =>
          condition in props && inVariant((key = getKey<T>(props[condition]))) && `${conditions[condition]}${clsx(variant[key])}`
      )
    );
  };

  (fn as RevariantFn<C, T>).options = options;

  return fn as RevariantFn<C, T>;
}

function reklass<C extends ConditionSchema, T extends VariantsSchema>(options: ReklassOptions<C, T>) {
  const { conditions, defaultCondition, variants } = options;

  const revariantGroup = Object.entries(variants).reduce((obj, [key, value]) => {
    obj[key as keyof typeof obj] = revariant<C, T[keyof T]>({
      conditions,
      defaultCondition,
      variant: value as any,
    });
    return obj;
  }, {} as RevariantGroup<C, T>);

  const keyofVariants = Object.keys(variants) as (keyof T)[];

  const fn: Omit<ReklassFn<C, T>, "options" | "revariant"> = (
    props?: {
      [K in keyof T]?: GetKey<keyof T[K]> | { [condition in keyof C]?: GetKey<keyof T[K]> };
    },
    classes?: ClassValue
  ) => {
    return clsx(
      keyofVariants.map((key) => revariantGroup[key](props?.[key])),
      classes
    );
  };

  (fn as ReklassFn<C, T>).options = options;
  (fn as ReklassFn<C, T>).revariant = revariantGroup;

  return fn as ReklassFn<C, T>;
}

export type { ConditionSchema, RevariantOptions, RevariantFn, ReklassOptions, ReklassFn };
export { revariant, reklass };
