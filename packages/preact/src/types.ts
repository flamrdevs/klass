import type { ComponentProps, ComponentChildren, ComponentType, JSX } from "preact";

import type { ClassValue, RestrictedVariantsKey, StrictVariantsSchema, KlassFn, VariantsOf, ConditionSchema, ReklassFn } from "@klass/core";

type ElementType<P = any> =
  | {
      [K in keyof JSX.IntrinsicElements]: P extends JSX.IntrinsicElements[K] ? K : never;
    }[keyof JSX.IntrinsicElements]
  | ComponentType<P>;

type PropsWithChildren<P = unknown> = P & {
  children?: ComponentChildren;
};

type AsProp<ET extends ElementType> = { as?: ET };

type PropsToOmit<ET extends ElementType, P> = keyof (AsProp<ET> & P);

type RefValue<T extends any> = T extends { ref?: any } ? T["ref"] : unknown;

type ComponentPropsRef<ET extends ElementType> = ET extends keyof JSX.IntrinsicElements ? RefValue<JSX.IntrinsicElements[ET]> : RefValue<ComponentProps<ET>>;

type PolymorphicComponentProp<ET extends ElementType, Props = {}> = PropsWithChildren<Props & AsProp<ET>> &
  Omit<Omit<ComponentProps<ET>, "ref"> & { ref?: ComponentPropsRef<ET> }, PropsToOmit<ET, Props>>;

type ClassesNormalProps = { class?: string; className?: string };
type ClassesValueProps = { class?: ClassValue; className?: ClassValue };
type WithClassesValueProps<P extends {}> = Omit<P, keyof ClassesValueProps> & ClassesValueProps;

type PreactClassesPropsKey = RestrictedVariantsKey | "className";

type PreactVariantsSchema = StrictVariantsSchema<PreactClassesPropsKey>;

type KlassedComponent<ET extends ElementType, VS extends PreactVariantsSchema> = {
  <C extends ElementType = ET>(props: PolymorphicComponentProp<C, WithClassesValueProps<VariantsOf<KlassFn<VS>>>>): JSX.Element | null;
} & {
  /**
   * klass function
   */
  klass: KlassFn<VS>;
};

type ReklassedComponent<ET extends ElementType, CS extends ConditionSchema, VS extends PreactVariantsSchema> = {
  <C extends ElementType = ET>(props: PolymorphicComponentProp<C, WithClassesValueProps<VariantsOf<ReklassFn<CS, VS>>>>): JSX.Element | null;
} & {
  /**
   * reklass function
   */
  reklass: ReklassFn<CS, VS>;
};

export type { ElementType, PropsWithChildren };
export type { PolymorphicComponentProp };
export type { ClassesNormalProps, ClassesValueProps, WithClassesValueProps };
export type { PreactClassesPropsKey, PreactVariantsSchema };
export type { KlassedComponent, ReklassedComponent };
