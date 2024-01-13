import React from "react";
import type { ElementType } from "react";

import { klass, reklass } from "@klass/core";
import type { KlassOptions, KlassFn, VariantsOf, ConditionSchema, ReklassOptions, ReklassFn, EndFn, AsFn } from "@klass/core";

import type { WithClassesValueProps, FinalRestrictedVariantsKey, FinalVariantsSchema, KlassedComponent, ReklassedComponent } from "./types/index.ts";
import type { ClassesProps } from "./types/react.ts";
import type { PolymorphicComponentPropWithRef, PolymorphicRef } from "./types/polymorphic.ts";

const getVariantKeys__filterFn = (el: string) => el !== "className",
  getVariantKeys = <VS extends FinalVariantsSchema>(variants: VS) => Object.keys(variants).filter(getVariantKeys__filterFn) as unknown as (keyof Exclude<VS, FinalRestrictedVariantsKey>)[],
  splitRestProps = <P extends { [key: PropertyKey]: any }, K extends PropertyKey>(props: P, keys: K[]) => {
    let omited: Record<string, any> = {},
      picked: Record<string, any> = {};

    let key: string;
    for (key in props) (keys.includes(key as K) ? picked : omited)[key] = props[key];

    return [omited, picked] as const;
  };

function klassed<ET extends ElementType, VS extends FinalVariantsSchema>(
  element: ET,
  options: KlassOptions<VS>,
  config: {
    dp?: PolymorphicComponentPropWithRef<ET, {}>;
    end?: EndFn;
  } = {}
): KlassedComponent<ET, VS> {
  const { dp: { className: defaultClassName, ...defaultProps } = {} as ClassesProps, end } = config,
    klassFn = klass<VS>(options, { end }),
    keys = getVariantKeys<VS>(options.variants);

  const Component = <C extends ElementType = ET>(
      { as: As = element as unknown as C, className = defaultClassName, ...rest }: PolymorphicComponentPropWithRef<C, WithClassesValueProps<VariantsOf<KlassFn<VS>>>>,
      ref?: PolymorphicRef<C>
    ) => {
      const [omited, picked] = splitRestProps(rest, keys);

      return <As {...defaultProps} {...(omited as any)} ref={ref} className={klassFn(picked, className)} />;
    },
    ComponentWithRef: Omit<KlassedComponent<ET, VS>, "klass"> = React.forwardRef<any, any>(Component);

  (ComponentWithRef as KlassedComponent<ET, VS>).klass = klassFn;

  return ComponentWithRef as KlassedComponent<ET, VS>;
}

function reklassed<ET extends ElementType, CS extends ConditionSchema, VS extends FinalVariantsSchema>(
  element: ET,
  options: ReklassOptions<CS, VS>,
  config: {
    dp?: PolymorphicComponentPropWithRef<ET, {}>;
    as?: AsFn;
    end?: EndFn;
  } = {}
): ReklassedComponent<ET, CS, VS> {
  const { dp: { className: defaultClassName, ...defaultProps } = {} as ClassesProps, as, end } = config,
    reklassFn = reklass<CS, VS>(options, { as, end }),
    keys = getVariantKeys<VS>(options.variants);

  const Component = <C extends ElementType = ET>(
      { as: As = element as unknown as C, className = defaultClassName, ...rest }: PolymorphicComponentPropWithRef<C, WithClassesValueProps<VariantsOf<ReklassFn<CS, VS>>>>,
      ref?: PolymorphicRef<C>
    ) => {
      const [omited, picked] = splitRestProps(rest, keys);

      return <As {...defaultProps} {...(omited as any)} ref={ref} className={reklassFn(picked, className)} />;
    },
    ComponentWithRef: Omit<ReklassedComponent<ET, CS, VS>, "reklass"> = React.forwardRef<any, any>(Component);

  (ComponentWithRef as ReklassedComponent<ET, CS, VS>).reklass = reklassFn;

  return ComponentWithRef as ReklassedComponent<ET, CS, VS>;
}

export { klassed, reklassed };
