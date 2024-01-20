import type { JSX } from "preact";

import type { ClassValue, StrictVariantsSchema, KlassFn, VariantsOf, ConditionSchema, ReklassFn } from "@klass/core";

import type { Signalish, SignalishRecord, ElementType, Classes, BaseComponent } from "./preact.ts";
import type { PolymorphicComponentProp } from "./polymorphic.ts";

type FinalRestrictedVariantsKey = Classes;
type FinalVariantsSchema = StrictVariantsSchema<FinalRestrictedVariantsKey>;

type ClassesValueProps = Partial<Record<Classes, Signalish<ClassValue>>>;
type WithClassesValueProps<P extends {}> = Omit<P, keyof ClassesValueProps> & ClassesValueProps;

type KlassedComponent<ET extends ElementType, VS extends FinalVariantsSchema> = {
  <C extends ElementType = ET>(props: PolymorphicComponentProp<C, WithClassesValueProps<SignalishRecord<VariantsOf<KlassFn<VS>>>>>): JSX.Element | null;
} & BaseComponent & {
    klass: KlassFn<VS>;
  };

type ReklassedComponent<ET extends ElementType, CS extends ConditionSchema, VS extends FinalVariantsSchema> = {
  <C extends ElementType = ET>(props: PolymorphicComponentProp<C, WithClassesValueProps<SignalishRecord<VariantsOf<ReklassFn<CS, VS>>>>>): JSX.Element | null;
} & BaseComponent & {
    reklass: ReklassFn<CS, VS>;
  };

export type { ClassesValueProps, WithClassesValueProps };
export type { FinalRestrictedVariantsKey, FinalVariantsSchema };
export type { KlassedComponent, ReklassedComponent };
