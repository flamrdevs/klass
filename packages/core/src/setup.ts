import type { EndFn, AsFn, VariantsSchema, KlassOptions, ConditionSchema, ReklassOptions } from "./types.ts";
import * as main from "./index.ts";

type Config = {
  as?: AsFn;
  end?: EndFn;
};

const klass =
  (config: Config) =>
  <T extends VariantsSchema>(options: KlassOptions<T>) =>
    main.klass<T>(options, config);

const reklass =
  (config: Config) =>
  <C extends ConditionSchema, T extends VariantsSchema>(options: ReklassOptions<C, T>) =>
    main.reklass<C, T>(options, config);

const setup = (config: Config) => [klass(config), reklass(config)] as [ReturnType<typeof klass>, ReturnType<typeof reklass>];

export type { Config };
export { klass, reklass };
export default setup;
