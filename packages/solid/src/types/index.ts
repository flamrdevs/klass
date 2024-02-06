import type { JSX } from "solid-js";

import type { ClassValue, StrictVariantsSchema, KlassFn, VariantsOf, ConditionSchema, ReklassFn } from "@klass/core";

import type { SupportedElementType, Classes } from "./solid.ts";
import type { PolymorphicComponentProps } from "./polymorphic.ts";

export type FinalRestrictedVariantsKey = Classes;
export type FinalVariantsSchema = StrictVariantsSchema<FinalRestrictedVariantsKey>;

export type ClassesValueProps = Partial<Record<Classes, ClassValue>>;
export type WithClassesValueProps<P extends {}> = Omit<P, keyof ClassesValueProps> & ClassesValueProps;

export type KlassedBase<VS extends FinalVariantsSchema> = {
  klass: KlassFn<VS>;
};

export type ReklassedBase<CS extends ConditionSchema, VS extends FinalVariantsSchema> = {
  reklass: ReklassFn<CS, VS>;
};

export type KlassedComponent<ET extends SupportedElementType, VS extends FinalVariantsSchema> = {
  <C extends SupportedElementType = ET>(props: PolymorphicComponentProps<C, WithClassesValueProps<VariantsOf<KlassFn<VS>>>>): JSX.Element;
} & KlassedBase<VS>;

export type ReklassedComponent<ET extends SupportedElementType, CS extends ConditionSchema, VS extends FinalVariantsSchema> = {
  <C extends SupportedElementType = ET>(props: PolymorphicComponentProps<C, WithClassesValueProps<VariantsOf<ReklassFn<CS, VS>>>>): JSX.Element;
} & ReklassedBase<CS, VS>;
