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
  ComposeFn,
  Compose,
} from "@klass/core";

import { createKlassed, createReklassed, createComposed } from "./create";

const klassed = createKlassed(klass);

const reklassed = createReklassed(reklass);

const composed = createComposed(compose);

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
  ComposeFn,
  Compose,
};
export type { MonoKlassedComponent, MonoReklassedComponent, MonoComposedComponent } from "./types";
export { klassed, reklassed, composed };
