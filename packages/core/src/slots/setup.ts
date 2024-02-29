import type { Config } from "./../setup";
import slots from "./";
import type { StrictGroupVariantsSchema, GroupOptions } from "./../group";

const setup =
  (config: Config) =>
  <B extends string, T extends StrictGroupVariantsSchema<B>>(options: GroupOptions<B, T>) =>
    slots<B, T>(options, config);

export type { Config };
export default setup;
