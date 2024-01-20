import type { ElementType, ReactElement } from "react";

import type { ClassValue, StrictVariantsSchema, KlassFn, VariantsOf, ConditionSchema, ReklassFn } from "@klass/core";

import type { Classes, BaseComponent } from "./react.ts";
import type { PolymorphicComponentPropWithRef } from "./polymorphic.ts";

type FinalRestrictedVariantsKey = Classes;
type FinalVariantsSchema = StrictVariantsSchema<FinalRestrictedVariantsKey>;

type ClassesValueProps = Partial<Record<Classes, ClassValue>>;
type WithClassesValueProps<P extends {}> = Omit<P, keyof ClassesValueProps> & ClassesValueProps;

type KlassedComponent<ET extends ElementType, VS extends FinalVariantsSchema> = {
  <C extends ElementType = ET>(props: PolymorphicComponentPropWithRef<C, WithClassesValueProps<VariantsOf<KlassFn<VS>>>>): ReactElement | null;
} & BaseComponent & {
    klass: KlassFn<VS>;
  };

type ReklassedComponent<ET extends ElementType, CS extends ConditionSchema, VS extends FinalVariantsSchema> = {
  <C extends ElementType = ET>(props: PolymorphicComponentPropWithRef<C, WithClassesValueProps<VariantsOf<ReklassFn<CS, VS>>>>): ReactElement | null;
} & BaseComponent & {
    reklass: ReklassFn<CS, VS>;
  };

export type { ClassesValueProps, WithClassesValueProps };
export type { FinalRestrictedVariantsKey, FinalVariantsSchema };
export type { KlassedComponent, ReklassedComponent };
