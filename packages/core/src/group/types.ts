import type { ClassValue, TransformKey, KlassFn, VariantsOf } from "./../";

type StrictGroupVariantsSchema<B extends string> = {
  [variant: string]: {
    [type: string]: { [key in B]?: ClassValue };
  };
};

type ToVariantsSchema<B extends string, T extends StrictGroupVariantsSchema<B>> = {
  [variant in keyof T]: {
    [type in keyof T[variant]]: ClassValue;
  };
};

type GroupCompoundVariant<B extends string, T extends StrictGroupVariantsSchema<B>> = [
  {
    [K in keyof ToVariantsSchema<B, T>]?: TransformKey<keyof ToVariantsSchema<B, T>[K]>;
  },
  {
    [key in B]?: ClassValue;
  },
];

type GroupOptions<B extends string, T extends StrictGroupVariantsSchema<B>> = {
  base: { [key in B]: ClassValue };
  variants: T;
  defaults?: { [K in keyof T]?: TransformKey<keyof T[K]> };
  compounds?: GroupCompoundVariant<B, T>[];
};

type GroupResult<B extends string, T extends StrictGroupVariantsSchema<B>> = {
  [key in B]: KlassFn<ToVariantsSchema<B, T>>;
};

type Group = <B extends string, T extends StrictGroupVariantsSchema<B>>(options: GroupOptions<B, T>) => GroupResult<B, T>;

type VariantsOfGroup<T> = T extends GroupResult<infer X, StrictGroupVariantsSchema<infer X>> ? VariantsOf<T[X]> : never;

export type { StrictGroupVariantsSchema, ToVariantsSchema, GroupCompoundVariant, GroupOptions, GroupResult, Group, VariantsOfGroup };
