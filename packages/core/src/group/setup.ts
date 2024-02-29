import type { Config } from "./../setup";
import group from "./";
import type { StrictGroupVariantsSchema, GroupOptions } from "./";

const setup =
  (config: Config) =>
  <B extends string, T extends StrictGroupVariantsSchema<B>>(options: GroupOptions<B, T>) =>
    group<B, T>(options, config);

export type { Config };
export default setup;
