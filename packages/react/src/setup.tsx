import type { Config } from "@klass/core/setup";
import type { ConditionSchema } from "@klass/core";

import type { FinalVariantsSchema, KlassedOptions, ReklassedOptions, KlassedConfig, ReklassedConfig } from "./types";
import type { SupportedElementType } from "./types/react";

import { klassed as _klassed, reklassed as _reklassed } from "./";

const klassed =
  ({ end }: Config) =>
  <ET extends SupportedElementType, VS extends FinalVariantsSchema>(element: ET, options: KlassedOptions<VS>, config?: Pick<KlassedConfig<ET>, "dp">) =>
    _klassed<ET, VS>(element, options, { dp: config?.dp, end });

const reklassed =
  ({ as, end }: Config) =>
  <ET extends SupportedElementType, CS extends ConditionSchema, VS extends FinalVariantsSchema>(element: ET, options: ReklassedOptions<CS, VS>, config?: Pick<ReklassedConfig<ET>, "dp">) =>
    _reklassed<ET, CS, VS>(element, options, { dp: config?.dp, as, end });

const setup = (config: Config) => [klassed(config), reklassed(config)] as const;

export type { Config };
export { klassed, reklassed };
export default setup;
