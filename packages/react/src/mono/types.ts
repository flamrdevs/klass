import type { JSX } from "react";

import type { VariantsOf, KlassFn, ConditionSchema, ReklassFn, Fx, ComposeFn } from "@klass/core";

import { FinalVariantsSchema, WithClassesValueProps, DefaultPropsConfig, ForwardPropsConfig, Base } from "./../types";
import { OverrideProps } from "./../types/utils";
import type { SupportedComponentProps, SupportedElementType } from "./../types/react";

export type ComponentConfig<ET extends SupportedElementType, VS extends FinalVariantsSchema> = DefaultPropsConfig<SupportedComponentProps<ET>> & ForwardPropsConfig<keyof VS>;
export type ComposedComponentConfig<ET extends SupportedElementType, Fn extends Fx> = DefaultPropsConfig<SupportedComponentProps<ET>> & ForwardPropsConfig<Fn["k"][number]>;

export type MonoKlassedComponent<ET extends SupportedElementType, VS extends FinalVariantsSchema> = {
  (props: WithClassesValueProps<OverrideProps<SupportedComponentProps<ET>, VariantsOf<KlassFn<VS>>>>): JSX.Element;
} & Base<KlassFn<VS>>;

export type MonoReklassedComponent<ET extends SupportedElementType, CS extends ConditionSchema, VS extends FinalVariantsSchema> = {
  (props: WithClassesValueProps<OverrideProps<SupportedComponentProps<ET>, VariantsOf<ReklassFn<CS, VS>>>>): JSX.Element;
} & Base<ReklassFn<CS, VS>>;

export type MonoComposedComponent<ET extends SupportedElementType, Fn extends Fx> = {
  (props: WithClassesValueProps<OverrideProps<SupportedComponentProps<ET>, VariantsOf<ComposeFn<Fn>>>>): JSX.Element;
} & Base<ComposeFn<Fn>>;
