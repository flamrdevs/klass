import type { JSX } from "preact";

import type { ComposeFn, ConditionSchema, Fx, KlassFn, ReklassFn, VariantsOf } from "@klass/core";

import { Base, DefaultPropsConfig, FinalVariantsSchema, ForwardPropsConfig, WithClassesValueProps } from "./../types";
import type { SignalishRecord, SupportedComponentProps, SupportedElementType } from "./../types/preact";
import { OverrideProps } from "./../types/utils";

export type ComponentConfig<ET extends SupportedElementType, VS extends FinalVariantsSchema> = DefaultPropsConfig<SupportedComponentProps<ET>> & ForwardPropsConfig<keyof VS>;
export type ComposedComponentConfig<ET extends SupportedElementType, Fn extends Fx> = DefaultPropsConfig<SupportedComponentProps<ET>> & ForwardPropsConfig<Fn["k"][number]>;

export type MonoKlassedComponent<ET extends SupportedElementType, VS extends FinalVariantsSchema> = {
	(props: WithClassesValueProps<OverrideProps<SupportedComponentProps<ET>, SignalishRecord<VariantsOf<KlassFn<VS>>>>>): JSX.Element;
} & Base<KlassFn<VS>>;

export type MonoReklassedComponent<ET extends SupportedElementType, CS extends ConditionSchema, VS extends FinalVariantsSchema> = {
	(props: WithClassesValueProps<OverrideProps<SupportedComponentProps<ET>, SignalishRecord<VariantsOf<ReklassFn<CS, VS>>>>>): JSX.Element;
} & Base<ReklassFn<CS, VS>>;

export type MonoComposedComponent<ET extends SupportedElementType, Fn extends Fx> = {
	(props: WithClassesValueProps<OverrideProps<SupportedComponentProps<ET>, SignalishRecord<VariantsOf<ComposeFn<Fn>>>>>): JSX.Element;
} & Base<ComposeFn<Fn>>;
