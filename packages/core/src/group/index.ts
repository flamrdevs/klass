import { klass } from "./../";

import type { ClassValue, TransformKey, EndFn, KlassFn, VariantsOf } from "./../";

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

type GroupConfig = { end?: EndFn };

type GroupResult<B extends string, T extends StrictGroupVariantsSchema<B>> = {
  [key in B]: KlassFn<ToVariantsSchema<B, T>>;
};

const compoundsFilterFn = <T extends Readonly<[any, any]>>(value: T) => typeof value[1] !== "undefined";

const group = <B extends string, T extends StrictGroupVariantsSchema<B>>(options: GroupOptions<B, T>, config?: GroupConfig): GroupResult<B, T> => {
  const { base: _base, variants: _variants, defaults: _defaults, compounds: _compounds } = options;

  const klasses = {} as GroupResult<B, T>;

  const variantsTypesEntries: { v: keyof T; t: [string, { [key in B]?: ClassValue }][] }[] = [];
  for (const v in _variants) variantsTypesEntries.push({ v, t: Object.entries(_variants[v]) });

  for (const base in _base) {
    klasses[base] = klass<ToVariantsSchema<B, T>>(
      {
        base: _base[base],
        variants: variantsTypesEntries.reduce(
          (obj, { v, t }) => ((obj[v] = t.reduce((obj, [type, bases]) => ((obj[type] = bases[base]), obj), {} as { [type: string]: ClassValue })), obj),
          {} as { [variant in keyof T]: { [type: string]: ClassValue } }
        ) as any,
        defaults: _defaults,
        compounds: _compounds?.map(([variants, _class]) => [variants, _class?.[base]] as const).filter(compoundsFilterFn) as any,
      },
      config
    );
  }

  return klasses;
};

const simplify =
  <B extends string, T extends StrictGroupVariantsSchema<B>>(group: GroupResult<B, T>) =>
  (props?: { [K in keyof T]?: TransformKey<keyof T[K]> }) => {
    const result = {} as { [key in B]: string };
    for (const base in group) result[base] = group[base](props);
    return result;
  };

type VariantsOfGroup<T> = T extends GroupResult<infer X, StrictGroupVariantsSchema<infer X>> ? VariantsOf<T[X]> : never;

export type { StrictGroupVariantsSchema, ToVariantsSchema, GroupCompoundVariant, GroupOptions, GroupConfig, GroupResult, VariantsOfGroup };
export { simplify };
export default group;
