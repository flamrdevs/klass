import type { ClassValue, EndFnProps, AsFnProps, StrictVariantsSchema, KlassOptions, KlassFn, VariantsOf, ConditionSchema, ReklassOptions, ReklassFn, Fx, ComposeFn } from "@klass/core";

import type { SupportedElementType, Classes, BaseComponent } from "./vue";
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
export type ComposedConfig<ET extends SupportedElementType, Fn extends Fx> = DefaultPropsConfig<PolymorphicComponentProps<ET, {}>> & ForwardPropsConfig<Fn["k"][number]>;

export type Base<F> = BaseComponent & { fx: F };

export type KlassedComponent<ET extends SupportedElementType, VS extends FinalVariantsSchema> = {
  <C extends SupportedElementType = ET>(props: PolymorphicComponentProps<C, WithClassesValueProps<VariantsOf<KlassFn<VS>>>>): any;
} & Base<KlassFn<VS>>;

export type ReklassedComponent<ET extends SupportedElementType, CS extends ConditionSchema, VS extends FinalVariantsSchema> = {
  <C extends SupportedElementType = ET>(props: PolymorphicComponentProps<C, WithClassesValueProps<VariantsOf<ReklassFn<CS, VS>>>>): any;
} & Base<ReklassFn<CS, VS>>;

export type ComposedComponent<ET extends SupportedElementType, Fn extends Fx> = {
  <C extends SupportedElementType = ET>(props: PolymorphicComponentProps<C, WithClassesValueProps<VariantsOf<ComposeFn<Fn>>>>): any;
} & Base<ComposeFn<Fn>>;
