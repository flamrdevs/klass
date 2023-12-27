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

type ItFn = (className: string) => string;
type AsCondition = "prefix" | "suffix";
type AsConditionFn = (condition: string, className: string) => string;

export type {
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
