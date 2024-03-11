import type { JSX } from "react";

import type { ClassValue, EndFnProps, AsFnProps, StrictVariantsSchema, KlassOptions, KlassFn, VariantsOf, ConditionSchema, ReklassOptions, ReklassFn } from "@klass/core";

import type { SupportedElementType, Classes, BaseComponent } from "./react";
import type { PolymorphicComponentProps } from "./polymorphic";

export type FinalRestrictedVariantsKey = Classes;
export type FinalVariantsSchema = StrictVariantsSchema<FinalRestrictedVariantsKey>;

export type ClassesValueProps = Partial<Record<Classes, ClassValue>>;
export type WithClassesValueProps<P extends {}> = Omit<P, keyof ClassesValueProps> & ClassesValueProps;

export type KlassedOptions<VS extends FinalVariantsSchema> = KlassOptions<VS> | KlassFn<VS>;
export type ReklassedOptions<CS extends ConditionSchema, VS extends FinalVariantsSchema> = ReklassOptions<CS, VS> | ReklassFn<CS, VS>;

export type DefaultPropsConfig<DP = Record<any, any>> = { dp?: DP };
export type ForwardPropsConfig<T = any> = { fp?: T[] };
export type KlassedConfig<ET extends SupportedElementType, VS extends FinalVariantsSchema> = DefaultPropsConfig<PolymorphicComponentProps<ET, {}>> & ForwardPropsConfig<keyof VS> & EndFnProps;
export type ReklassedConfig<ET extends SupportedElementType, VS extends FinalVariantsSchema> = KlassedConfig<ET, VS> & AsFnProps;

export type KlassedBase<VS extends FinalVariantsSchema> = BaseComponent & {
  fx: KlassFn<VS>;
};

export type ReklassedBase<CS extends ConditionSchema, VS extends FinalVariantsSchema> = BaseComponent & {
  fx: ReklassFn<CS, VS>;
};

export type KlassedComponent<ET extends SupportedElementType, VS extends FinalVariantsSchema> = {
  <C extends SupportedElementType = ET>(props: PolymorphicComponentProps<C, WithClassesValueProps<VariantsOf<KlassFn<VS>>>>): JSX.Element;
} & KlassedBase<VS>;

export type ReklassedComponent<ET extends SupportedElementType, CS extends ConditionSchema, VS extends FinalVariantsSchema> = {
  <C extends SupportedElementType = ET>(props: PolymorphicComponentProps<C, WithClassesValueProps<VariantsOf<ReklassFn<CS, VS>>>>): JSX.Element;
} & ReklassedBase<CS, VS>;
