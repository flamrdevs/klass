import type { ClassValue } from "clsx";

type TransformKey<T extends PropertyKey> = T extends "true" ? true : T extends "false" ? false : Exclude<T, symbol>;

type VariantsSchema = {
  [variant: string]: {
    [type: string]: ClassValue;
  };
};

type StrictVariantsSchema<E extends string> = VariantsSchema & { [variant in E]?: undefined };

type VariantFn<T extends VariantsSchema[string]> = (value?: TransformKey<keyof T>) => string | undefined;

type VariantGroup<T extends VariantsSchema> = {
  [K in keyof T]: VariantFn<T[K]>;
};

type CompoundVariant<T extends VariantsSchema> = [{ [K in keyof T]?: TransformKey<keyof T[K]> }, ClassValue];

type BaseFn<T extends VariantsSchema, P, O, G> = {
  (props?: P, classes?: ClassValue): string;
  o: O;
  g: G;
  k: (keyof T)[];
};

type KlassOptions<T extends VariantsSchema> = {
  base?: ClassValue;
  variants: T;
  defaults?: { [K in keyof T]?: TransformKey<keyof T[K]> };
  compounds?: CompoundVariant<T>[];
};

type KlassFn<T extends VariantsSchema> = BaseFn<
  T,
  {
    [K in keyof T]?: TransformKey<keyof T[K]>;
  },
  KlassOptions<T>,
  VariantGroup<T>
>;

type ConditionSchema = {
  [type: string]: string;
};

type RevariantFn<C extends ConditionSchema, T extends VariantsSchema[string]> = (value?: TransformKey<keyof T> | { [condition in keyof C]?: TransformKey<keyof T> }) => string | undefined;

type RevariantGroup<C extends ConditionSchema, T extends VariantsSchema> = {
  [K in keyof T]: RevariantFn<C, T[K]>;
};

type ReklassOptions<C extends ConditionSchema, T extends VariantsSchema> = {
  conditions: [C, keyof C];
  variants: T;
};

type ReklassFn<C extends ConditionSchema, T extends VariantsSchema> = BaseFn<
  T,
  {
    [K in keyof T]?:
      | TransformKey<keyof T[K]>
      | {
          [condition in keyof C]?: TransformKey<keyof T[K]>;
        };
  },
  ReklassOptions<C, T>,
  RevariantGroup<C, T>
>;

type VariantsOf<T extends (...args: any[]) => any> = Exclude<Parameters<T>[0], undefined>;
type RequiredVariantsFrom<T extends { [key: string]: unknown }, K extends keyof T> = Omit<T, K> & { [k in K]-?: T[k] };

type EndFn = (className: string) => string;
type AsFn = (condition: string, className: string) => string;

export type {
  TransformKey,
  EndFn,
  AsFn,
  VariantsSchema,
  StrictVariantsSchema,
  VariantsOf,
  RequiredVariantsFrom,
  BaseFn,
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
