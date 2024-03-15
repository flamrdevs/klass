import type { JSX } from "solid-js";

import type { ClassValue, StrictVariantsSchema, KlassOptions, KlassFn, VariantsOf, ConditionSchema, ReklassOptions, ReklassFn, Fx, ComposeFn } from "@klass/core";

import type { SupportedElementType, Classes } from "./solid";
import type { PolymorphicComponentProps } from "./polymorphic";

export type FinalRestrictedVariantsKey = Classes;
export type FinalVariantsSchema = StrictVariantsSchema<FinalRestrictedVariantsKey>;

export type ClassesValueProps = Partial<Record<Classes, ClassValue>>;
export type WithClassesValueProps<P extends {}> = Omit<P, keyof ClassesValueProps> & ClassesValueProps;

export type KlassedOptions<VS extends FinalVariantsSchema> = KlassOptions<VS> | KlassFn<VS>;
export type ReklassedOptions<CS extends ConditionSchema, VS extends FinalVariantsSchema> = ReklassOptions<CS, VS> | ReklassFn<CS, VS>;
export type ComposedOptions<Fn extends Fx> = Fn[] | ComposeFn<Fn>;

export type DefaultPropsConfig<DP = Record<any, any>> = { dp?: DP };
export type ForwardPropsConfig<T = any> = { fp?: T[] };
export type ComponentConfig<ET extends SupportedElementType, VS extends FinalVariantsSchema> = DefaultPropsConfig<PolymorphicComponentProps<ET, {}>> & ForwardPropsConfig<keyof VS>;
export type ComposedComponentConfig<ET extends SupportedElementType, Fn extends Fx> = DefaultPropsConfig<PolymorphicComponentProps<ET, {}>> & ForwardPropsConfig<Fn["k"][number]>;

export type Base<F> = { fx: F };

export type KlassedComponent<ET extends SupportedElementType, VS extends FinalVariantsSchema> = {
  <C extends SupportedElementType = ET>(props: PolymorphicComponentProps<C, WithClassesValueProps<VariantsOf<KlassFn<VS>>>>): JSX.Element;
} & Base<KlassFn<VS>>;

export type ReklassedComponent<ET extends SupportedElementType, CS extends ConditionSchema, VS extends FinalVariantsSchema> = {
  <C extends SupportedElementType = ET>(props: PolymorphicComponentProps<C, WithClassesValueProps<VariantsOf<ReklassFn<CS, VS>>>>): JSX.Element;
} & Base<ReklassFn<CS, VS>>;

export type ComposedComponent<ET extends SupportedElementType, Fn extends Fx> = {
  <C extends SupportedElementType = ET>(props: PolymorphicComponentProps<C, WithClassesValueProps<VariantsOf<ComposeFn<Fn>>>>): JSX.Element;
} & Base<ComposeFn<Fn>>;
