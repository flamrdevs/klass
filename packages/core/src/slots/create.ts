import type { StrictGroupVariantsSchema, GroupOptions, Group } from "./../group";

import type { KlassedOnly, SlotsFn, Slots } from "./types";

const createSlots = /* @__PURE__ */ (group: Group): Slots => {
  return <B extends string, T extends StrictGroupVariantsSchema<B>>(options: GroupOptions<B, T>): SlotsFn<B, T> => {
    const klasses = group(options);

    const fn = ((props = {}) => {
      const klassesonly = {} as KlassedOnly<B, T>;
      for (const base in klasses) klassesonly[base] = (_props = {}, classes) => klasses[base]({ ...props, ..._props }, classes);
      return klassesonly;
    }) as SlotsFn<B, T>;

    fn.klass = klasses;

    return fn;
  };
};

export { createSlots };
