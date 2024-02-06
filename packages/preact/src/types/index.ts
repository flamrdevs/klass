import type { JSX } from "preact";

import type { ClassValue, StrictVariantsSchema, KlassFn, VariantsOf, ConditionSchema, ReklassFn } from "@klass/core";

import type { SignalishRecord, SupportedElementType, Classes, BaseComponent } from "./preact.ts";
import type { PolymorphicComponentProps } from "./polymorphic.ts";

export type FinalRestrictedVariantsKey = Classes;
export type FinalVariantsSchema = StrictVariantsSchema<FinalRestrictedVariantsKey>;

export type ClassesValueProps = Partial<Record<Classes, JSX.Signalish<ClassValue>>>;
export type WithClassesValueProps<P extends {}> = Omit<P, keyof ClassesValueProps> & ClassesValueProps;

export type KlassedBase<VS extends FinalVariantsSchema> = BaseComponent & {
  klass: KlassFn<VS>;
};

export type ReklassedBase<CS extends ConditionSchema, VS extends FinalVariantsSchema> = BaseComponent & {
  reklass: ReklassFn<CS, VS>;
};

export type KlassedComponent<ET extends SupportedElementType, VS extends FinalVariantsSchema> = {
  <C extends SupportedElementType = ET>(props: PolymorphicComponentProps<C, WithClassesValueProps<SignalishRecord<VariantsOf<KlassFn<VS>>>>>): JSX.Element;
} & KlassedBase<VS>;

export type ReklassedComponent<ET extends SupportedElementType, CS extends ConditionSchema, VS extends FinalVariantsSchema> = {
  <C extends SupportedElementType = ET>(props: PolymorphicComponentProps<C, WithClassesValueProps<SignalishRecord<VariantsOf<ReklassFn<CS, VS>>>>>): JSX.Element;
} & ReklassedBase<CS, VS>;
