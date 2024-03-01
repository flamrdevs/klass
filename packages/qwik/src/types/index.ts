import type { JSX } from "@builder.io/qwik/jsx-runtime";

import type { ClassValue, EndFnProps, AsFnProps, StrictVariantsSchema, KlassOptions, KlassFn, VariantsOf, ConditionSchema, ReklassOptions, ReklassFn } from "@klass/core";

import type { Signalish, SignalishRecord, SupportedElementType, Classes } from "./qwik";
import type { PolymorphicComponentProps } from "./polymorphic";

export type FinalRestrictedVariantsKey = Classes;
export type FinalVariantsSchema = StrictVariantsSchema<FinalRestrictedVariantsKey>;

export type ClassesValueProps = Partial<Record<Classes, Signalish<ClassValue>>>;
export type WithClassesValueProps<P extends {}> = Omit<P, keyof ClassesValueProps> & ClassesValueProps;

export type KlassedOptions<VS extends FinalVariantsSchema> = KlassOptions<VS> | KlassFn<VS>;
export type ReklassedOptions<CS extends ConditionSchema, VS extends FinalVariantsSchema> = ReklassOptions<CS, VS> | ReklassFn<CS, VS>;

export type DefaultPropsConfig<DP = Record<any, any>> = { dp?: DP };
export type KlassedConfig<ET extends SupportedElementType> = DefaultPropsConfig<PolymorphicComponentProps<ET, {}>> & EndFnProps;
export type ReklassedConfig<ET extends SupportedElementType> = KlassedConfig<ET> & AsFnProps;

export type KlassedBase<VS extends FinalVariantsSchema> = {
  klass: KlassFn<VS>;
};

export type ReklassedBase<CS extends ConditionSchema, VS extends FinalVariantsSchema> = {
  reklass: ReklassFn<CS, VS>;
};

export type KlassedComponent<ET extends SupportedElementType, VS extends FinalVariantsSchema> = {
  <C extends SupportedElementType = ET>(props: PolymorphicComponentProps<C, WithClassesValueProps<SignalishRecord<VariantsOf<KlassFn<VS>>>>>): JSX.Element;
} & KlassedBase<VS>;

export type ReklassedComponent<ET extends SupportedElementType, CS extends ConditionSchema, VS extends FinalVariantsSchema> = {
  <C extends SupportedElementType = ET>(props: PolymorphicComponentProps<C, WithClassesValueProps<SignalishRecord<VariantsOf<ReklassFn<CS, VS>>>>>): JSX.Element;
} & ReklassedBase<CS, VS>;
