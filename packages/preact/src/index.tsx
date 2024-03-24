import { klass, reklass, compose } from "@klass/core";
import type {
  TransformKey,
  EndFn,
  AsFn,
  EndFnProps,
  AsFnProps,
  VariantsSchema,
  StrictVariantsSchema,
  VariantsOf,
  RequiredVariantsFrom,
  BaseFn,
  VariantFn,
  VariantGroup,
  CompoundVariant,
  KlassOptions,
  KlassFn,
  Klass,
  ConditionSchema,
  RevariantFn,
  RevariantGroup,
  ReklassOptions,
  ReklassFn,
  Reklass,
  UnionToIntersection,
  Fx,
  Fxs,
  FxFrom,
  ComposeFn,
  Compose,
} from "@klass/core";

import { createKlassed, createReklassed, createComposed } from "./create";

const klassed = /* @__PURE__ */ createKlassed(klass);

const reklassed = /* @__PURE__ */ createReklassed(reklass);

const composed = /* @__PURE__ */ createComposed(compose);

export type {
  TransformKey,
  EndFn,
  AsFn,
  EndFnProps,
  AsFnProps,
  VariantsSchema,
  StrictVariantsSchema,
  VariantsOf,
  RequiredVariantsFrom,
  BaseFn,
  VariantFn,
  VariantGroup,
  CompoundVariant,
  KlassOptions,
  KlassFn,
  Klass,
  ConditionSchema,
  RevariantFn,
  RevariantGroup,
  ReklassOptions,
  ReklassFn,
  Reklass,
  UnionToIntersection,
  Fx,
  Fxs,
  FxFrom,
  ComposeFn,
  Compose,
};
export type { ClassesValueProps, WithClassesValueProps, KlassedComponent, ReklassedComponent, ComposedComponent } from "./types";
export { klassed, reklassed, composed };
