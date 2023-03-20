import type { ComponentPropsWithRef, ComponentPropsWithoutRef, ElementType, PropsWithChildren, ReactElement } from "react";

import type { ClassValue, VariantsSchema, KlassFn, VariantsOf, ConditionSchema, ReklassFn } from "@klass/core";

type AsProp<ET extends ElementType> = { as?: ET };

type PropsToOmit<ET extends ElementType, P> = keyof (AsProp<ET> & P);

type PolymorphicComponentProp<ET extends ElementType, Props = {}> = PropsWithChildren<Props & AsProp<ET>> &
  Omit<ComponentPropsWithoutRef<ET>, PropsToOmit<ET, Props>>;

type PolymorphicRef<ET extends ElementType> = ComponentPropsWithRef<ET>["ref"];

type PolymorphicComponentPropWithRef<ET extends ElementType, Props = {}> = PolymorphicComponentProp<ET, Props> & {
  ref?: PolymorphicRef<ET>;
};

type ClassesNormalProps = { className?: string };
type ClassesValueProps = { className?: ClassValue };
type WithClassesValueProps<P extends {}> = Omit<P, keyof ClassesValueProps> & ClassesValueProps;

type KlassedComponent<ET extends ElementType, VS extends VariantsSchema> = {
  <C extends ElementType = ET>(
    props: PolymorphicComponentPropWithRef<C, WithClassesValueProps<VariantsOf<KlassFn<VS>>>>
  ): ReactElement | null;
} & {
  klass: KlassFn<VS>;
};

type ReklassedComponent<ET extends ElementType, CS extends ConditionSchema, VS extends VariantsSchema> = {
  <C extends ElementType = ET>(
    props: PolymorphicComponentPropWithRef<C, WithClassesValueProps<VariantsOf<ReklassFn<CS, VS>>>>
  ): ReactElement | null;
} & {
  reklass: ReklassFn<CS, VS>;
};

export { PolymorphicComponentProp, PolymorphicRef, PolymorphicComponentPropWithRef };
export { ClassesNormalProps, ClassesValueProps, WithClassesValueProps };
export { KlassedComponent, ReklassedComponent };
