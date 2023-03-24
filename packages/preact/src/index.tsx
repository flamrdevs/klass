import { klass, reklass } from "@klass/core";
import type { VariantsSchema, KlassOptions, KlassFn, VariantsOf, ConditionSchema, ReklassOptions, ReklassFn, ItFn, AsCondition } from "@klass/core";

import type { ElementType, PolymorphicComponentProp, ClassesNormalProps, WithClassesValueProps, KlassedComponent, ReklassedComponent } from "./types";

const getVariantKeys__filterFn = (el: string) => el !== "class" && el !== "className",
  getVariantKeys = <VS extends VariantsSchema<"class" | "className">>(variants: VS) =>
    Object.keys(variants).filter(getVariantKeys__filterFn) as unknown as (keyof Exclude<VS, "class" | "className">)[],
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
    defaultProps?: PolymorphicComponentProp<ET, {}>;
    it?: ItFn;
  } = {}
): KlassedComponent<ET, VS> {
  const { defaultProps: { class: __class, className: _className, ...defaultProps } = {} as ClassesNormalProps, it } = setup,
    klassFn = klass<VS>(options, { it }),
    keys = getVariantKeys<VS>(options.variants);

  const Component = <C extends ElementType = ET>(props: PolymorphicComponentProp<C, WithClassesValueProps<VariantsOf<KlassFn<VS>>>>) => {
    const { as: As = element, class: _class, className, ...rest } = props,
      { omited, picked } = splitRestProps(rest, keys);

    return (
      <As
        {...({
          ...defaultProps,
          ...omited,
          class: klassFn(picked, _class ?? __class ?? className ?? _className),
        } as any)}
      />
    );
  };

  (Component as KlassedComponent<ET, VS>).klass = klassFn;

  return Component as KlassedComponent<ET, VS>;
}

function reklassed<ET extends ElementType, CS extends ConditionSchema, VS extends VariantsSchema<"class" | "className">>(
  element: ET,
  options: ReklassOptions<CS, VS>,
  setup: {
    defaultProps?: PolymorphicComponentProp<ET, {}>;
    as?: AsCondition;
    it?: ItFn;
  } = {}
): ReklassedComponent<ET, CS, VS> {
  const { defaultProps: { class: __class, className: _className, ...defaultProps } = {} as ClassesNormalProps, as, it } = setup,
    reklassFn = reklass<CS, VS>(options, { as, it }),
    keys = getVariantKeys<VS>(options.variants);

  const Component = <C extends ElementType = ET>(props: PolymorphicComponentProp<C, WithClassesValueProps<VariantsOf<ReklassFn<CS, VS>>>>) => {
    const { as: As = element, class: _class, className, ...rest } = props,
      { omited, picked } = splitRestProps(rest, keys);

    return (
      <As
        {...({
          ...defaultProps,
          ...omited,
          class: reklassFn(picked, _class ?? __class ?? className ?? _className),
        } as any)}
      />
    );
  };

  (Component as ReklassedComponent<ET, CS, VS>).reklass = reklassFn;

  return Component as ReklassedComponent<ET, CS, VS>;
}

export { klassed, reklassed };
export * from "./HOCs";
