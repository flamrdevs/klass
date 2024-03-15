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

type BaseFn<T extends VariantsSchema, P, G> = {
  (props?: P, classes?: ClassValue): string;
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
  VariantGroup<T>
>;

type Klass = <T extends VariantsSchema>(options: KlassOptions<T>) => KlassFn<T>;

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
  RevariantGroup<C, T>
>;

type Reklass = <C extends ConditionSchema, T extends VariantsSchema>(options: ReklassOptions<C, T>) => ReklassFn<C, T>;

type VariantsOf<T extends (...args: any[]) => any> = Exclude<Parameters<T>[0], undefined>;
type RequiredVariantsFrom<T extends { [key: string]: unknown }, K extends keyof T> = Omit<T, K> & { [k in K]-?: T[k] };

type EndFn = (className: string) => string;
type AsFn = (condition: string, className: string) => string;

type EndFnProps = { end?: EndFn };
type AsFnProps = { as?: AsFn };

type UnionToIntersection<U> = (U extends unknown ? (dU: U) => void : never) extends (mI: infer I) => void ? I & U : never;

type Fx = {
  (props?: Record<string, unknown>): string;
  k: string[];
};

type ComposeFn<Fn extends Fx> = {
  (props?: UnionToIntersection<VariantsOf<Fn>>, classes?: ClassValue): string;
  k: Fx["k"][number][];
};

type Compose = <T extends Fx[]>(...fx: [...T]) => ComposeFn<T[number]>;

export type {
  TransformKey,
  EndFn,
  AsFn,
  EndFnProps,
  AsFnProps,
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
  Klass,
  ConditionSchema,
  RevariantFn,
  RevariantGroup,
  ReklassOptions,
  ReklassFn,
  Reklass,
  UnionToIntersection,
  Fx,
  ComposeFn,
  Compose,
};
