import type { ComponentPropsWithRef, ComponentPropsWithoutRef, ElementType, ReactElement, ReactNode } from "react";

import type { ClassValue, RestrictedVariantsKey, StrictVariantsSchema, KlassFn, VariantsOf, ConditionSchema, ReklassFn } from "@klass/core";

type PolymorphicComponentProp<ET extends ElementType, Props = {}> = (Props & { as?: ET } & { children?: ReactNode }) & Omit<ComponentPropsWithoutRef<ET>, "as" | keyof Props>;

type PolymorphicRef<ET extends ElementType> = ComponentPropsWithRef<ET>["ref"];

type PolymorphicComponentPropWithRef<ET extends ElementType, Props = {}> = PolymorphicComponentProp<ET, Props> & {
  ref?: PolymorphicRef<ET>;
};

type FinalRestrictedVariantsKey = RestrictedVariantsKey | "className";
type FinalVariantsSchema = StrictVariantsSchema<FinalRestrictedVariantsKey>;

type ClassesNormalProps = Partial<Record<FinalRestrictedVariantsKey, string>>;
type ClassesValueProps = Partial<Record<FinalRestrictedVariantsKey, ClassValue>>;
type WithClassesValueProps<P extends {}> = Omit<P, keyof ClassesValueProps> & ClassesValueProps;

type BaseComponent = {
  displayName?: string;
};

type KlassedComponent<ET extends ElementType, VS extends FinalVariantsSchema> = {
  <C extends ElementType = ET>(props: PolymorphicComponentPropWithRef<C, WithClassesValueProps<VariantsOf<KlassFn<VS>>>>): ReactElement | null;
} & BaseComponent & {
    /**
     * klass function
     */
    klass: KlassFn<VS>;
  };

type ReklassedComponent<ET extends ElementType, CS extends ConditionSchema, VS extends FinalVariantsSchema> = {
  <C extends ElementType = ET>(props: PolymorphicComponentPropWithRef<C, WithClassesValueProps<VariantsOf<ReklassFn<CS, VS>>>>): ReactElement | null;
} & BaseComponent & {
    /**
     * reklass function
     */
    reklass: ReklassFn<CS, VS>;
  };

export type { PolymorphicComponentProp, PolymorphicRef, PolymorphicComponentPropWithRef };
export type { ClassesNormalProps, ClassesValueProps, WithClassesValueProps };
export type { FinalRestrictedVariantsKey, FinalVariantsSchema };
export type { KlassedComponent, ReklassedComponent };
