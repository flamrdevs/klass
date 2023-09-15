import type { ComponentPropsWithRef, ComponentPropsWithoutRef, ElementType, PropsWithChildren, ReactElement } from "react";

import type { ClassValue, RestrictedVariantsKey, StrictVariantsSchema, KlassFn, VariantsOf, ConditionSchema, ReklassFn } from "@klass/core";

type AsProp<ET extends ElementType> = { as?: ET };

type PropsToOmit<ET extends ElementType, P> = keyof (AsProp<ET> & P);

type PolymorphicComponentProp<ET extends ElementType, Props = {}> = PropsWithChildren<Props & AsProp<ET>> & Omit<ComponentPropsWithoutRef<ET>, PropsToOmit<ET, Props>>;

type PolymorphicRef<ET extends ElementType> = ComponentPropsWithRef<ET>["ref"];

type PolymorphicComponentPropWithRef<ET extends ElementType, Props = {}> = PolymorphicComponentProp<ET, Props> & {
  ref?: PolymorphicRef<ET>;
};

type ClassesNormalProps = { className?: string };
type ClassesValueProps = { className?: ClassValue };
type WithClassesValueProps<P extends {}> = Omit<P, keyof ClassesValueProps> & ClassesValueProps;

type ReactClassesPropsKey = RestrictedVariantsKey | "className";

type ReactVariantsSchema = StrictVariantsSchema<ReactClassesPropsKey>;

type KlassedComponent<ET extends ElementType, VS extends ReactVariantsSchema> = {
  <C extends ElementType = ET>(props: PolymorphicComponentPropWithRef<C, WithClassesValueProps<VariantsOf<KlassFn<VS>>>>): ReactElement | null;
} & {
  /**
   * klass function
   */
  klass: KlassFn<VS>;
};

type ReklassedComponent<ET extends ElementType, CS extends ConditionSchema, VS extends ReactVariantsSchema> = {
  <C extends ElementType = ET>(props: PolymorphicComponentPropWithRef<C, WithClassesValueProps<VariantsOf<ReklassFn<CS, VS>>>>): ReactElement | null;
} & {
  /**
   * reklass function
   */
  reklass: ReklassFn<CS, VS>;
};

export type { PolymorphicComponentProp, PolymorphicRef, PolymorphicComponentPropWithRef };
export type { ClassesNormalProps, ClassesValueProps, WithClassesValueProps };
export type { ReactClassesPropsKey, ReactVariantsSchema };
export type { KlassedComponent, ReklassedComponent };
