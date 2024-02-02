import type { ValidComponent } from "solid-js";

import type { Config } from "@klass/core/setup";
import type { KlassOptions, KlassFn, ConditionSchema, ReklassOptions, ReklassFn } from "@klass/core";

import type { FinalVariantsSchema } from "./types/index.ts";
import type { PolymorphicComponentProp } from "./types/polymorphic.ts";

import * as main from "./index.tsx";

const klassed =
  ({ end }: Config) =>
  <ET extends ValidComponent, VS extends FinalVariantsSchema>(
    element: ET,
    options: KlassOptions<VS> | KlassFn<VS>,
    config?: {
      dp?: PolymorphicComponentProp<ET, {}>;
    }
  ) =>
    main.klassed<ET, VS>(element, options, { dp: config?.dp, end });

const reklassed =
  ({ as, end }: Config) =>
  <ET extends ValidComponent, CS extends ConditionSchema, VS extends FinalVariantsSchema>(
    element: ET,
    options: ReklassOptions<CS, VS> | ReklassFn<CS, VS>,
    config?: {
      dp?: PolymorphicComponentProp<ET, {}>;
    }
  ) =>
    main.reklassed<ET, CS, VS>(element, options, { dp: config?.dp, as, end });

const setup = (config: Config) => [klassed(config), reklassed(config)] as [ReturnType<typeof klassed>, ReturnType<typeof reklassed>];

export type { Config };
export { klassed, reklassed };
export default setup;