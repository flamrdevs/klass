import React from "react";
import type { ElementType } from "react";

import { klass, reklass } from "@klass/core";
import type { KlassOptions, KlassFn, VariantsOf, ConditionSchema, ReklassOptions, ReklassFn, EndFn, AsFn } from "@klass/core";

import type { WithClassesValueProps, FinalRestrictedVariantsKey, FinalVariantsSchema, KlassedComponent, ReklassedComponent } from "./types/index.ts";
import type { ClassesProps } from "./types/react.ts";
import type { PolymorphicComponentPropWithRef, PolymorphicRef } from "./types/polymorphic.ts";

const getVariantKeys__filterFn = <VS extends FinalVariantsSchema>(el: keyof VS) => el !== "className",
  getVariantKeys = <VS extends FinalVariantsSchema>(keys: (keyof VS)[]) => keys.filter(getVariantKeys__filterFn) as unknown as (keyof Exclude<VS, FinalRestrictedVariantsKey>)[];

const splitRestProps = <P extends { [key: PropertyKey]: any }, K extends PropertyKey>(props: P, keys: K[]) => {
  let o: /** omited */ Record<string, any> = {},
    p: /** picked */ Record<string, any> = {},
    key: string;
  for (key in props) (keys.includes(key as K) ? p : o)[key] = props[key];
  return { o, p } as const;
};

function klassed<ET extends ElementType, VS extends FinalVariantsSchema>(
  element: ET,
  options: KlassOptions<VS> | KlassFn<VS>,
  config: {
    dp?: PolymorphicComponentPropWithRef<ET, {}>;
    end?: EndFn;
  } = {}
): KlassedComponent<ET, VS> {
  const { className: defaultClassName, ...defaultProps } = config.dp ?? ({} as ClassesProps),
    klassFn = typeof options === "function" ? options : klass<VS>(options, config),
    keys = getVariantKeys<VS>(klassFn.vk);

  const Component = React.forwardRef<any, any>(
    <C extends ElementType = ET>(
      { as: As = element as unknown as C, className = defaultClassName, ...rest }: PolymorphicComponentPropWithRef<C, WithClassesValueProps<VariantsOf<KlassFn<VS>>>>,
      ref?: PolymorphicRef<C>
    ) => {
      const splitted = splitRestProps(rest, keys);

      return <As {...defaultProps} {...(splitted.o as any)} ref={ref} className={klassFn(splitted.p, className)} />;
    }
  ) as unknown as KlassedComponent<ET, VS>;

  Component.klass = klassFn;

  return Component;
}

function reklassed<ET extends ElementType, CS extends ConditionSchema, VS extends FinalVariantsSchema>(
  element: ET,
  options: ReklassOptions<CS, VS> | ReklassFn<CS, VS>,
  config: {
    dp?: PolymorphicComponentPropWithRef<ET, {}>;
    as?: AsFn;
    end?: EndFn;
  } = {}
): ReklassedComponent<ET, CS, VS> {
  const { className: defaultClassName, ...defaultProps } = config.dp ?? ({} as ClassesProps),
    reklassFn = typeof options === "function" ? options : reklass<CS, VS>(options, config),
    keys = getVariantKeys<VS>(reklassFn.rvk);

  const Component = React.forwardRef<any, any>(
    <C extends ElementType = ET>(
      { as: As = element as unknown as C, className = defaultClassName, ...rest }: PolymorphicComponentPropWithRef<C, WithClassesValueProps<VariantsOf<ReklassFn<CS, VS>>>>,
      ref?: PolymorphicRef<C>
    ) => {
      const splitted = splitRestProps(rest, keys);

      return <As {...defaultProps} {...(splitted.o as any)} ref={ref} className={reklassFn(splitted.p, className)} />;
    }
  ) as unknown as ReklassedComponent<ET, CS, VS>;

  Component.reklass = reklassFn;

  return Component;
}

export { klassed, reklassed };
