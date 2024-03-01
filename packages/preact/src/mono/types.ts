import type { JSX } from "preact";

import type { EndFnProps, AsFnProps, VariantsOf, KlassFn, ConditionSchema, ReklassFn } from "@klass/core";

import { FinalVariantsSchema, WithClassesValueProps, DefaultPropsConfig, KlassedBase, ReklassedBase } from "./../types";
import type { SignalishRecord, SupportedComponentProps, SupportedElementType } from "./../types/preact";

export type KlassedConfig<ET extends SupportedElementType> = DefaultPropsConfig<SupportedComponentProps<ET>> & EndFnProps;
export type ReklassedConfig<ET extends SupportedElementType> = KlassedConfig<ET> & AsFnProps;

export type MonoKlassedComponent<ET extends SupportedElementType, VS extends FinalVariantsSchema> = {
  (props: WithClassesValueProps<SupportedComponentProps<ET> & SignalishRecord<VariantsOf<KlassFn<VS>>>>): JSX.Element;
} & KlassedBase<VS>;

export type MonoReklassedComponent<ET extends SupportedElementType, CS extends ConditionSchema, VS extends FinalVariantsSchema> = {
  (props: WithClassesValueProps<SupportedComponentProps<ET> & SignalishRecord<VariantsOf<ReklassFn<CS, VS>>>>): JSX.Element;
} & ReklassedBase<CS, VS>;
