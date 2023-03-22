import React from "react";
import type { ElementType } from "react";

import { klass, reklass } from "@klass/core";
import type { VariantsSchema, KlassOptions, KlassFn, VariantsOf, ConditionSchema, ReklassOptions, ReklassFn, ItFn } from "@klass/core";

import type {
  PolymorphicRef,
  PolymorphicComponentPropWithRef,
  ClassesNormalProps,
  WithClassesValueProps,
  KlassedComponent,
  ReklassedComponent,
} from "./types";

const getVariantKeys__filterFn = (el: string) => el !== "className",
  getVariantKeys = <VS extends VariantsSchema<"class" | "className">>(variants: VS) =>
    Object.keys(variants).filter(getVariantKeys__filterFn) as unknown as (keyof Exclude<VS, "className">)[],
  splitRestProps = <P extends { [key: PropertyKey]: any }, K extends PropertyKey>(props: P, keys: K[]) => {
    let omited: Record<string, any> = {},
      picked: Record<string, any> = {};

    Object.entries(props).forEach(([key, value]) => ((keys.includes(key as K) ? picked : omited)[key] = value));

    return { omited, picked };
  };

function klassed<ET extends ElementType, VS extends VariantsSchema<"class" | "className">>(
  element: ET,
  options: KlassOptions<VS>,
  setup: {
    defaultProps?: PolymorphicComponentPropWithRef<ET, {}>;
    it?: ItFn;
  } = {}
): KlassedComponent<ET, VS> {
  const { defaultProps: { className: _className, ...defaultProps } = {} as ClassesNormalProps, it } = setup,
    klassFn = klass<VS>(options, { it }),
    keys = getVariantKeys<VS>(options.variants);

  const Component = <C extends ElementType = ET>(
      props: PolymorphicComponentPropWithRef<C, WithClassesValueProps<VariantsOf<KlassFn<VS>>>>,
      ref?: PolymorphicRef<C>
    ) => {
      const { as: As = element, className, ...rest } = props,
        { omited, picked } = splitRestProps(rest, keys);

      return (
        <As
          {...({
            ...defaultProps,
            ...omited,
            className: klassFn(picked, className ?? _className),
          } as any)}
          ref={ref}
        />
      );
    },
    ComponentWithRef: Omit<KlassedComponent<ET, VS>, "klass"> = React.forwardRef<any, any>(Component);

  (ComponentWithRef as KlassedComponent<ET, VS>).klass = klassFn;

  return ComponentWithRef as KlassedComponent<ET, VS>;
}

function reklassed<ET extends ElementType, CS extends ConditionSchema, VS extends VariantsSchema<"class" | "className">>(
  element: ET,
  options: ReklassOptions<CS, VS>,
  setup: {
    defaultProps?: PolymorphicComponentPropWithRef<ET, {}>;
    it?: ItFn;
  } = {}
): ReklassedComponent<ET, CS, VS> {
  const { defaultProps: { className: _className, ...defaultProps } = {} as ClassesNormalProps, it } = setup,
    reklassFn = reklass<CS, VS>(options, { it }),
    keys = getVariantKeys<VS>(options.variants);

  const Component = <C extends ElementType = ET>(
      props: PolymorphicComponentPropWithRef<C, WithClassesValueProps<VariantsOf<ReklassFn<CS, VS>>>>,
      ref?: PolymorphicRef<C>
    ) => {
      const { as: As = element, className, ...rest } = props,
        { omited, picked } = splitRestProps(rest, keys);

      return (
        <As
          {...({
            ...defaultProps,
            ...omited,
            className: reklassFn(picked, className ?? _className),
          } as any)}
          ref={ref}
        />
      );
    },
    ComponentWithRef: Omit<ReklassedComponent<ET, CS, VS>, "reklass"> = React.forwardRef<any, any>(Component);

  (ComponentWithRef as ReklassedComponent<ET, CS, VS>).reklass = reklassFn;

  return ComponentWithRef as ReklassedComponent<ET, CS, VS>;
}

export { klassed, reklassed };
export * from "./HOCs";
