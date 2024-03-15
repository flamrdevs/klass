import type { TransformKey } from "./../";

import { StrictGroupVariantsSchema, GroupResult } from "./types";

const simplify =
  <B extends string, T extends StrictGroupVariantsSchema<B>>(group: GroupResult<B, T>) =>
  (props?: { [K in keyof T]?: TransformKey<keyof T[K]> }) => {
    const result = {} as { [key in B]: string };
    for (const base in group) result[base] = group[base](props);
    return result;
  };

export { simplify };
