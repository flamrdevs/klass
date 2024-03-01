import type { EndFnProps, AsFnProps, VariantsSchema, KlassOptions, ConditionSchema, ReklassOptions } from "./types";
import { klass as _klass, reklass as _reklass } from "./";

type Config = AsFnProps & EndFnProps;

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
