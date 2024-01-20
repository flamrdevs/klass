import type { ClassValue, StrictVariantsSchema, KlassFn, VariantsOf, ConditionSchema, ReklassFn } from "@klass/core";

import type { ElementType, Classes, BaseComponent } from "./vue.ts";
import type { PolymorphicComponentProp } from "./polymorphic.ts";

type FinalRestrictedVariantsKey = Classes;
type FinalVariantsSchema = StrictVariantsSchema<FinalRestrictedVariantsKey>;

type ClassesValueProps = Partial<Record<Classes, ClassValue>>;
type WithClassesValueProps<P extends {}> = Omit<P, keyof ClassesValueProps> & ClassesValueProps;

type KlassedComponent<ET extends ElementType, VS extends FinalVariantsSchema> = {
  <C extends ElementType = ET>(props: PolymorphicComponentProp<C, WithClassesValueProps<VariantsOf<KlassFn<VS>>>>): any;
} & BaseComponent & {
    klass: KlassFn<VS>;
  };

type ReklassedComponent<ET extends ElementType, CS extends ConditionSchema, VS extends FinalVariantsSchema> = {
  <C extends ElementType = ET>(props: PolymorphicComponentProp<C, WithClassesValueProps<VariantsOf<ReklassFn<CS, VS>>>>): any;
} & BaseComponent & {
    reklass: ReklassFn<CS, VS>;
  };

export type { ClassesValueProps, WithClassesValueProps };
export type { FinalRestrictedVariantsKey, FinalVariantsSchema };
export type { KlassedComponent, ReklassedComponent };
