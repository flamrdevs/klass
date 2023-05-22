import type { ComponentProps, JSX, ParentProps, ValidComponent } from "solid-js";

import type { ClassValue, VariantsSchema, KlassFn, VariantsOf, ConditionSchema, ReklassFn } from "@klass/core";

type AsProp<VC extends ValidComponent> = { as?: VC };

type PropsToOmit<VC extends ValidComponent, P> = keyof (AsProp<VC> & P);

type RefValue<T extends any> = T extends { ref?: any } ? T["ref"] : unknown;

type ComponentPropsRef<VC extends ValidComponent> = VC extends keyof JSX.IntrinsicElements ? RefValue<JSX.IntrinsicElements[VC]> : RefValue<ComponentProps<VC>>;

type PolymorphicComponentProp<VC extends ValidComponent, Props = {}> = ParentProps<Props & AsProp<VC>> &
  Omit<Omit<ComponentProps<VC>, "ref"> & { ref?: ComponentPropsRef<VC> }, PropsToOmit<VC, Props>>;

type ClassesNormalProps = { class?: string; classList?: { [key: string]: boolean | undefined } };
type ClassesValueProps = { class?: ClassValue; classList?: ClassValue };
type WithClassesValueProps<P extends {}> = Omit<P, keyof ClassesValueProps> & ClassesValueProps;

type SolidClassesPropsKey = "class" | "classList";

type SolidVariantsSchema = VariantsSchema<SolidClassesPropsKey>;

type KlassedComponent<VC extends ValidComponent, VS extends VariantsSchema> = {
  <C extends ValidComponent = VC>(props: PolymorphicComponentProp<C, WithClassesValueProps<VariantsOf<KlassFn<VS>>>>): JSX.Element | null;
} & {
  klass: KlassFn<VS>;
};

type ReklassedComponent<VC extends ValidComponent, CS extends ConditionSchema, VS extends VariantsSchema> = {
  <C extends ValidComponent = VC>(props: PolymorphicComponentProp<C, WithClassesValueProps<VariantsOf<ReklassFn<CS, VS>>>>): JSX.Element | null;
} & {
  reklass: ReklassFn<CS, VS>;
};

export type { PolymorphicComponentProp };
export type { ClassesNormalProps, ClassesValueProps, WithClassesValueProps };
export type { SolidClassesPropsKey, SolidVariantsSchema };
export type { KlassedComponent, ReklassedComponent };
