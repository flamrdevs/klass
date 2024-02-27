import type { EndFn, AsFn, VariantsSchema, KlassOptions, ConditionSchema, ReklassOptions } from "./types.ts";
import { klass as _klass, reklass as _reklass } from "./index.ts";

type Config = {
  as?: AsFn;
  end?: EndFn;
};

const klass =
  (config: Config) =>
  <T extends VariantsSchema>(options: KlassOptions<T>) =>
    _klass<T>(options, config);

const reklass =
  (config: Config) =>
  <C extends ConditionSchema, T extends VariantsSchema>(options: ReklassOptions<C, T>) =>
    _reklass<C, T>(options, config);

const setup = (config: Config) => [klass(config), reklass(config)] as const;

export type { Config };
export { klass, reklass };
export default setup;
