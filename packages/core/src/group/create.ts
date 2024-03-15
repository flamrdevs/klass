import type { ClassValue, Klass } from "./../";

import type { StrictGroupVariantsSchema, ToVariantsSchema, GroupOptions, GroupResult, Group } from "./types";

const compoundsFilterFn = <T extends Readonly<[any, any]>>(value: T) => typeof value[1] !== "undefined";

const createGroup = (klass: Klass): Group => {
  return <B extends string, T extends StrictGroupVariantsSchema<B>>(options: GroupOptions<B, T>): GroupResult<B, T> => {
    const { base: _base, variants: _variants, defaults: _defaults, compounds: _compounds } = options;

    const klasses = {} as GroupResult<B, T>;

    const variantsTypesEntries: { v: keyof T; t: [string, { [key in B]?: ClassValue }][] }[] = [];
    for (const v in _variants) variantsTypesEntries.push({ v, t: Object.entries(_variants[v]) });

    for (const base in _base) {
      klasses[base] = klass<ToVariantsSchema<B, T>>({
        base: _base[base],
        variants: variantsTypesEntries.reduce(
          (obj, { v, t }) => ((obj[v] = t.reduce((obj, [type, bases]) => ((obj[type] = bases[base]), obj), {} as { [type: string]: ClassValue })), obj),
          {} as { [variant in keyof T]: { [type: string]: ClassValue } }
        ) as any,
        defaults: _defaults,
        compounds: _compounds?.map(([variants, _class]) => [variants, _class?.[base]] as const).filter(compoundsFilterFn) as any,
      });
    }

    return klasses;
  };
};

export { createGroup };
