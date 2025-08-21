import type {
	AsFn,
	AsFnProps,
	BaseFn,
	Compose,
	ComposeFn,
	CompoundVariant,
	ConditionSchema,
	EndFn,
	EndFnProps,
	Fx,
	FxFrom,
	Fxs,
	Klass,
	KlassFn,
	KlassOptions,
	Reklass,
	ReklassFn,
	ReklassOptions,
	RequiredVariantsFrom,
	RevariantFn,
	RevariantGroup,
	StrictVariantsSchema,
	TransformKey,
	UnionToIntersection,
	VariantFn,
	VariantGroup,
	VariantsOf,
	VariantsSchema,
} from "@klass/core";
import { compose, klass, reklass } from "@klass/core";

import { createComposed, createKlassed, createReklassed } from "./create";

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

export type { ClassesValueProps, ComposedComponent, KlassedComponent, ReklassedComponent, WithClassesValueProps } from "./types";
export { klassed, reklassed, composed };
