import type { JSX } from "preact";

import { klass, reklass } from "@klass/core";
import type { VariantsSchema, KlassOptions, KlassFn, VariantsOf, ConditionSchema, ReklassOptions, ReklassFn } from "@klass/core";

import type {
  ElementType,
  PolymorphicComponentProp,
  ClassesNormalProps,
  WithClassesValueProps,
  KlassedComponent,
  ReklassedComponent,
} from "./types";

const getVariantKeys__filterFn = (el: string) => el !== "class" && el !== "className",
  getVariantKeys = <VS extends VariantsSchema>(variants: VS) =>
    Object.keys(variants).filter(getVariantKeys__filterFn) as unknown as (keyof Exclude<VS, "class" | "className">)[],
  splitRestProps = <P extends { [key: PropertyKey]: any }, K extends PropertyKey>(props: P, keys: K[]) => {
    let omited: Record<string, any> = {},
      picked: Record<string, any> = {};

    Object.entries(props).forEach(([key, value]) => ((keys.includes(key as K) ? picked : omited)[key] = value));

    return { omited, picked };
  };

function klassed<ET extends ElementType, VS extends VariantsSchema>(
  element: ET,
  options: KlassOptions<VS>,
  setup?: {
    defaultProps?: PolymorphicComponentProp<ET, {}>;
  }
): KlassedComponent<ET, VS> {
  const klassFn = klass<VS>(options),
    keys = getVariantKeys<VS>(options.variants),
    { class: defaultClassProps, className: defaultClassNameProps, ...defaultProps } = (setup?.defaultProps || {}) as ClassesNormalProps;

  const Component = <C extends ElementType = ET>(props: PolymorphicComponentProp<C, WithClassesValueProps<VariantsOf<KlassFn<VS>>>>) => {
    const { as: As = element, class: _class, className, ...rest } = props,
      { omited, picked } = splitRestProps(rest, keys);

    return (
      <As
        {...({
          ...defaultProps,
          ...omited,
          class: klassFn(picked, _class ?? defaultClassProps ?? className ?? defaultClassNameProps),
        } as any)}
      />
    );
  };

  (Component as KlassedComponent<ET, VS>).klass = klassFn;

  return Component as KlassedComponent<ET, VS>;
}

function reklassed<ET extends ElementType, CS extends ConditionSchema, VS extends VariantsSchema>(
  element: ET,
  options: ReklassOptions<CS, VS>,
  setup?: {
    defaultProps?: PolymorphicComponentProp<ET, {}>;
  }
): ReklassedComponent<ET, CS, VS> {
  const reklassFn = reklass<CS, VS>(options),
    keys = getVariantKeys<VS>(options.variants),
    { class: defaultClassProps, className: defaultClassNameProps, ...defaultProps } = (setup?.defaultProps || {}) as ClassesNormalProps;

  const Component = <C extends ElementType = ET>(
    props: PolymorphicComponentProp<C, WithClassesValueProps<VariantsOf<ReklassFn<CS, VS>>>>
  ) => {
    const { as: As = element, class: _class, className, ...rest } = props,
      { omited, picked } = splitRestProps(rest, keys);

    return (
      <As
        {...({
          ...defaultProps,
          ...omited,
          class: reklassFn(picked, _class ?? defaultClassProps ?? className ?? defaultClassNameProps),
        } as any)}
      />
    );
  };

  (Component as ReklassedComponent<ET, CS, VS>).reklass = reklassFn;

  return Component as ReklassedComponent<ET, CS, VS>;
}

export { klassed, reklassed };
export * from "./HOCs";
