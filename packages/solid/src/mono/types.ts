import type { JSX } from "solid-js";

import type { EndFnProps, AsFnProps, VariantsOf, KlassFn, ConditionSchema, ReklassFn } from "@klass/core";

import { FinalVariantsSchema, WithClassesValueProps, DefaultPropsConfig, ForwardPropsConfig, Base } from "./../types";
import type { SupportedComponentProps, SupportedElementType } from "./../types/solid";

export type KlassedConfig<ET extends SupportedElementType, VS extends FinalVariantsSchema> = DefaultPropsConfig<SupportedComponentProps<ET>> & ForwardPropsConfig<keyof VS> & EndFnProps;
export type ReklassedConfig<ET extends SupportedElementType, VS extends FinalVariantsSchema> = KlassedConfig<ET, VS> & AsFnProps;

export type MonoKlassedComponent<ET extends SupportedElementType, VS extends FinalVariantsSchema> = {
  (props: WithClassesValueProps<SupportedComponentProps<ET> & VariantsOf<KlassFn<VS>>>): JSX.Element;
} & Base<KlassFn<VS>>;

export type MonoReklassedComponent<ET extends SupportedElementType, CS extends ConditionSchema, VS extends FinalVariantsSchema> = {
  (props: WithClassesValueProps<SupportedComponentProps<ET> & VariantsOf<ReklassFn<CS, VS>>>): JSX.Element;
} & Base<ReklassFn<CS, VS>>;
