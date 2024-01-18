import type { Signal } from "@builder.io/qwik";
import type { JSX } from "@builder.io/qwik/jsx-runtime";

import type { ClassValue, RestrictedVariantsKey, StrictVariantsSchema, KlassFn, VariantsOf, ConditionSchema, ReklassFn } from "@klass/core";

import type { ElementType, Classes, BaseComponent } from "./qwik.ts";
import type { PolymorphicComponentProp } from "./polymorphic.ts";

type FinalRestrictedVariantsKey = RestrictedVariantsKey | Classes;
type FinalVariantsSchema = StrictVariantsSchema<FinalRestrictedVariantsKey>;

type ClassesValueProps = Partial<Record<Classes, ClassValue | Signal<ClassValue>>>;
type WithClassesValueProps<P extends {}> = Omit<P, keyof ClassesValueProps> & ClassesValueProps;

type KlassedComponent<ET extends ElementType, VS extends FinalVariantsSchema> = {
  <C extends ElementType = ET>(props: PolymorphicComponentProp<C, WithClassesValueProps<VariantsOf<KlassFn<VS>>>>): JSX.Element | null;
} & BaseComponent & {
    klass: KlassFn<VS>;
  };

type ReklassedComponent<ET extends ElementType, CS extends ConditionSchema, VS extends FinalVariantsSchema> = {
  <C extends ElementType = ET>(props: PolymorphicComponentProp<C, WithClassesValueProps<VariantsOf<ReklassFn<CS, VS>>>>): JSX.Element | null;
} & BaseComponent & {
    reklass: ReklassFn<CS, VS>;
  };

export type { ClassesValueProps, WithClassesValueProps };
export type { FinalRestrictedVariantsKey, FinalVariantsSchema };
export type { KlassedComponent, ReklassedComponent };
