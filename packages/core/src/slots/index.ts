import type { ClassValue, TransformKey, VariantsOf } from "./../";

import group from "./../group";
import type { StrictGroupVariantsSchema, GroupOptions, GroupConfig, GroupResult } from "./../group";

type KlassOnlyFn<B extends string, T extends StrictGroupVariantsSchema<B>> = (props?: { [K in keyof T]?: TransformKey<keyof T[K]> }, classes?: ClassValue) => string;

type KlassedOnly<B extends string, T extends StrictGroupVariantsSchema<B>> = {
  [key in B]: KlassOnlyFn<B, T>;
};

type SlotsFn<B extends string, T extends StrictGroupVariantsSchema<B>> = {
  (props?: { [K in keyof T]?: TransformKey<keyof T[K]> }): KlassedOnly<B, T>;
} & {
  klass: GroupResult<B, T>;
};

const slots = <B extends string, T extends StrictGroupVariantsSchema<B>>(options: GroupOptions<B, T>, config?: GroupConfig): SlotsFn<B, T> => {
  const klasses = group(options, config);

  const fn = ((props = {}) => {
    const klassesonly = {} as KlassedOnly<B, T>;
    for (const base in klasses) klassesonly[base] = (_props = {}, classes) => klasses[base]({ ...props, ..._props }, classes);
    return klassesonly;
  }) as SlotsFn<B, T>;

  fn.klass = klasses;

  return fn;
};

type VariantsOfSlots<T> = T extends SlotsFn<infer X, StrictGroupVariantsSchema<infer X>> ? VariantsOf<T["klass"][X]> : never;

export type { SlotsFn, VariantsOfSlots };
export default slots;
