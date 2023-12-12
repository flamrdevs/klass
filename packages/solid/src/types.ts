import type { ComponentProps, JSX, ValidComponent } from "solid-js";

import type { ClassValue, RestrictedVariantsKey, StrictVariantsSchema, KlassFn, VariantsOf, ConditionSchema, ReklassFn } from "@klass/core";

type PolymorphicComponentProp<VC extends ValidComponent, Props = {}> = (Props & { as?: VC } & { children?: JSX.Element }) &
  Omit<
    Omit<ComponentProps<VC>, "ref"> & { ref?: (VC extends keyof JSX.IntrinsicElements ? JSX.IntrinsicElements[VC] : ComponentProps<VC>) extends { ref?: infer Ref } ? Ref : unknown },
    "as" | keyof Props
  >;

type FinalRestrictedVariantsKey = RestrictedVariantsKey | "classList";
type FinalVariantsSchema = StrictVariantsSchema<FinalRestrictedVariantsKey>;

type ClassesNormalProps = { class?: string; classList?: { [key: string]: boolean | undefined } };
type ClassesValueProps = Partial<Record<FinalRestrictedVariantsKey, ClassValue>>;
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

export type { PolymorphicComponentProp };
export type { ClassesNormalProps, ClassesValueProps, WithClassesValueProps };
export type { FinalRestrictedVariantsKey, FinalVariantsSchema };
export type { KlassedComponent, ReklassedComponent };
