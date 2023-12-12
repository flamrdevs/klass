import type { ComponentProps, ComponentChildren, ComponentType, JSX } from "preact";

import type { ClassValue, RestrictedVariantsKey, StrictVariantsSchema, KlassFn, VariantsOf, ConditionSchema, ReklassFn } from "@klass/core";

type ElementType<P = any> =
  | {
      [K in keyof JSX.IntrinsicElements]: P extends JSX.IntrinsicElements[K] ? K : never;
    }[keyof JSX.IntrinsicElements]
  | ComponentType<P>;

type PolymorphicComponentProp<ET extends ElementType, Props = {}> = (Props & { as?: ET } & {
  children?: ComponentChildren;
}) &
  Omit<
    Omit<ComponentProps<ET>, "ref"> & { ref?: (ET extends keyof JSX.IntrinsicElements ? JSX.IntrinsicElements[ET] : ComponentProps<ET>) extends { ref?: infer Ref } ? Ref : unknown },
    "as" | keyof Props
  >;

type FinalRestrictedVariantsKey = RestrictedVariantsKey | "className";
type FinalVariantsSchema = StrictVariantsSchema<FinalRestrictedVariantsKey>;

type ClassesNormalProps = Partial<Record<FinalRestrictedVariantsKey, string>>;
type ClassesValueProps = Partial<Record<FinalRestrictedVariantsKey, ClassValue>>;
type WithClassesValueProps<P extends {}> = Omit<P, keyof ClassesValueProps> & ClassesValueProps;

type BaseComponent = {
  displayName?: string;
};

type KlassedComponent<ET extends ElementType, VS extends FinalVariantsSchema> = {
  <C extends ElementType = ET>(props: PolymorphicComponentProp<C, WithClassesValueProps<VariantsOf<KlassFn<VS>>>>): JSX.Element | null;
} & BaseComponent & {
    /**
     * klass function
     */
    klass: KlassFn<VS>;
  };

type ReklassedComponent<ET extends ElementType, CS extends ConditionSchema, VS extends FinalVariantsSchema> = {
  <C extends ElementType = ET>(props: PolymorphicComponentProp<C, WithClassesValueProps<VariantsOf<ReklassFn<CS, VS>>>>): JSX.Element | null;
} & BaseComponent & {
    /**
     * reklass function
     */
    reklass: ReklassFn<CS, VS>;
  };

export type { ElementType };
export type { PolymorphicComponentProp };
export type { ClassesNormalProps, ClassesValueProps, WithClassesValueProps };
export type { FinalRestrictedVariantsKey, FinalVariantsSchema };
export type { KlassedComponent, ReklassedComponent };
