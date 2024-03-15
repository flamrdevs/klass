import type { ClassValue, TransformKey, VariantsOf } from "./../";

import type { StrictGroupVariantsSchema, GroupOptions, GroupResult } from "./../group";

type KlassOnlyFn<B extends string, T extends StrictGroupVariantsSchema<B>> = (props?: { [K in keyof T]?: TransformKey<keyof T[K]> }, classes?: ClassValue) => string;

type KlassedOnly<B extends string, T extends StrictGroupVariantsSchema<B>> = {
  [key in B]: KlassOnlyFn<B, T>;
};

type SlotsFn<B extends string, T extends StrictGroupVariantsSchema<B>> = {
  (props?: { [K in keyof T]?: TransformKey<keyof T[K]> }): KlassedOnly<B, T>;
} & {
  klass: GroupResult<B, T>;
};

type Slots = <B extends string, T extends StrictGroupVariantsSchema<B>>(options: GroupOptions<B, T>) => SlotsFn<B, T>;

type VariantsOfSlots<T> = T extends SlotsFn<infer X, StrictGroupVariantsSchema<infer X>> ? VariantsOf<T["klass"][X]> : never;

export type { KlassOnlyFn, KlassedOnly, SlotsFn, Slots, VariantsOfSlots };
