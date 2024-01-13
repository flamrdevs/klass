import type { JSX, ValidComponent } from "solid-js";

import type { ClassValue, RestrictedVariantsKey, StrictVariantsSchema, KlassFn, VariantsOf, ConditionSchema, ReklassFn } from "@klass/core";

import type { Classes } from "./solid.ts";
import type { PolymorphicComponentProp } from "./polymorphic.ts";

type FinalRestrictedVariantsKey = RestrictedVariantsKey | Classes;
type FinalVariantsSchema = StrictVariantsSchema<FinalRestrictedVariantsKey>;

type ClassesValueProps = Partial<Record<Classes, ClassValue>>;
type WithClassesValueProps<P extends {}> = Omit<P, keyof ClassesValueProps> & ClassesValueProps;

type KlassedComponent<VC extends ValidComponent, VS extends FinalVariantsSchema> = {
  <C extends ValidComponent = VC>(props: PolymorphicComponentProp<C, WithClassesValueProps<VariantsOf<KlassFn<VS>>>>): JSX.Element | null;
} & {
  /**
   * klass function
   */
  klass: KlassFn<VS>;
};

type ReklassedComponent<VC extends ValidComponent, CS extends ConditionSchema, VS extends FinalVariantsSchema> = {
  <C extends ValidComponent = VC>(props: PolymorphicComponentProp<C, WithClassesValueProps<VariantsOf<ReklassFn<CS, VS>>>>): JSX.Element | null;
} & {
  /**
   * reklass function
   */
  reklass: ReklassFn<CS, VS>;
};

export type { ClassesValueProps, WithClassesValueProps };
export type { FinalRestrictedVariantsKey, FinalVariantsSchema };
export type { KlassedComponent, ReklassedComponent };
