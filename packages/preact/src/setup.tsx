import type { Config } from "@klass/core/setup";
import type { ConditionSchema } from "@klass/core";

import type { FinalVariantsSchema, KlassedOptions, ReklassedOptions, KlassedConfig, ReklassedConfig } from "./types";
import type { SupportedElementType } from "./types/preact";

import { klassed as _klassed, reklassed as _reklassed } from "./";

type Picked = "dp" | "fp";

const klassed =
  ({ end }: Config) =>
  <ET extends SupportedElementType, VS extends FinalVariantsSchema>(element: ET, options: KlassedOptions<VS>, config: Pick<KlassedConfig<ET, VS>, Picked> = {}) =>
    _klassed<ET, VS>(element, options, { ...config, end });

const reklassed =
  ({ as, end }: Config) =>
  <ET extends SupportedElementType, CS extends ConditionSchema, VS extends FinalVariantsSchema>(element: ET, options: ReklassedOptions<CS, VS>, config: Pick<ReklassedConfig<ET, VS>, Picked> = {}) =>
    _reklassed<ET, CS, VS>(element, options, { ...config, as, end });

const setup = (config: Config) => [klassed(config), reklassed(config)] as const;

export type { Config };
export { klassed, reklassed };
export default setup;
