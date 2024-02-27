import type { Config } from "@klass/core/setup";
import type { KlassOptions, KlassFn, ConditionSchema, ReklassOptions, ReklassFn } from "@klass/core";

import type { FinalVariantsSchema } from "./types/index.ts";
import type { SupportedComponentProps, SupportedElementType } from "./types/preact.ts";

import { klassed as _klassed, reklassed as _reklassed } from "./mono.tsx";

const klassed =
  ({ end }: Config) =>
  <ET extends SupportedElementType, VS extends FinalVariantsSchema>(
    element: ET,
    options: KlassOptions<VS> | KlassFn<VS>,
    config?: {
      dp?: SupportedComponentProps<ET>;
    }
  ) =>
    _klassed<ET, VS>(element, options, { dp: config?.dp, end });

const reklassed =
  ({ as, end }: Config) =>
  <ET extends SupportedElementType, CS extends ConditionSchema, VS extends FinalVariantsSchema>(
    element: ET,
    options: ReklassOptions<CS, VS> | ReklassFn<CS, VS>,
    config?: {
      dp?: SupportedComponentProps<ET>;
    }
  ) =>
    _reklassed<ET, CS, VS>(element, options, { dp: config?.dp, as, end });

const setup = (config: Config) => [klassed(config), reklassed(config)] as const;

export type { Config };
export { klassed, reklassed };
export default setup;