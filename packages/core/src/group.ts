import { klass } from "./index.ts";
import type { ClassValue, TransformKey, EndFn, KlassFn, VariantsOf } from "./index.ts";

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
  }
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

const compoundsFilterFn = <T extends Readonly<[any, any]>>(value: T) => typeof value[1] !== "undefined";

const group = <B extends string, T extends StrictGroupVariantsSchema<B>>(options: GroupOptions<B, T>, config?: { end?: EndFn }): GroupResult<B, T> => {
  const keyofBase = Object.keys(options.base) as B[];

  const klasses = {} as {
    [key in B]: KlassFn<ToVariantsSchema<B, T>>;
  };

  const variantsEntries = Object.entries(options.variants);

  for (const base of keyofBase) {
    klasses[base] = klass<ToVariantsSchema<B, T>>(
      {
        base: options.base[base],
        variants: variantsEntries.reduce(
          (obj, [variant, types]) => ((obj[variant] = Object.entries(types).reduce((obj, [type, bases]) => ((obj[type] = bases[base]), obj), {} as { [type: string]: ClassValue })), obj),
          {} as { [variant: string]: { [type: string]: ClassValue } }
        ) as any,
        defaults: options.defaults,
        compounds: options.compounds?.map(([variants, _class]) => [variants, _class?.[base]] as const).filter(compoundsFilterFn) as any,
      },
      config
    );
  }

  return klasses;
};

type VariantsOfGroup<T> = T extends GroupResult<infer X, StrictGroupVariantsSchema<infer X>> ? VariantsOf<T[X]> : never;

export type { StrictGroupVariantsSchema, GroupCompoundVariant, GroupOptions, GroupResult, VariantsOfGroup };
export default group;
