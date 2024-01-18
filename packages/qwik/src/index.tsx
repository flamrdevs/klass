import { jsx } from "@builder.io/qwik";

import { klass, reklass } from "@klass/core";
import type { KlassOptions, KlassFn, VariantsOf, ConditionSchema, ReklassOptions, ReklassFn, EndFn, AsFn } from "@klass/core";

import type { WithClassesValueProps, FinalRestrictedVariantsKey, FinalVariantsSchema, KlassedComponent, ReklassedComponent } from "./types/index.ts";
import type { ElementType, ClassesProps } from "./types/qwik.ts";
import type { PolymorphicComponentProp } from "./types/polymorphic.ts";

const getVariantKeys__filterFn = (el: string) => el !== "class",
  getVariantKeys = <VS extends FinalVariantsSchema>(variants: VS) => Object.keys(variants).filter(getVariantKeys__filterFn) as unknown as (keyof Exclude<VS, FinalRestrictedVariantsKey>)[],
  splitRestProps = <P extends { [key: PropertyKey]: any }, K extends PropertyKey>(props: P, keys: K[]) => {
    let omited: Record<string, any> = {},
      picked: Record<string, any> = {};

    let key: string;
    for (key in props) (keys.includes(key as K) ? picked : omited)[key] = props[key];

    return { o: omited, p: picked } as const;
  };

function klassed<ET extends ElementType, VS extends FinalVariantsSchema>(
  element: ET,
  options: KlassOptions<VS>,
  config: {
    dp?: PolymorphicComponentProp<ET, {}>;
    end?: EndFn;
  } = {}
): KlassedComponent<ET, VS> {
  const { dp: { class: defaultClass, ...defaultProps } = {} as ClassesProps, end } = config,
    klassFn = klass<VS>(options, { end }),
    keys = getVariantKeys<VS>(options.variants);

  const Component = <C extends ElementType = ET>({
    as: As = element as unknown as C,
    class: CLASS = defaultClass,
    ...rest
  }: PolymorphicComponentProp<C, WithClassesValueProps<VariantsOf<KlassFn<VS>>>>) => {
    const splitted = splitRestProps(rest, keys);

    return jsx(As, { ...defaultProps, ...(splitted.o as any), class: klassFn(splitted.p, CLASS) });
  };

  (Component as KlassedComponent<ET, VS>).klass = klassFn;

  return Component as KlassedComponent<ET, VS>;
}

function reklassed<ET extends ElementType, CS extends ConditionSchema, VS extends FinalVariantsSchema>(
  element: ET,
  options: ReklassOptions<CS, VS>,
  config: {
    dp?: PolymorphicComponentProp<ET, {}>;
    as?: AsFn;
    end?: EndFn;
  } = {}
): ReklassedComponent<ET, CS, VS> {
  const { dp: { class: defaultClass, ...defaultProps } = {} as ClassesProps, as, end } = config,
    reklassFn = reklass<CS, VS>(options, { as, end }),
    keys = getVariantKeys<VS>(options.variants);

  const Component = <C extends ElementType = ET>({
    as: As = element as unknown as C,
    class: CLASS = defaultClass,
    ...rest
  }: PolymorphicComponentProp<C, WithClassesValueProps<VariantsOf<ReklassFn<CS, VS>>>>) => {
    const splitted = splitRestProps(rest, keys);

    return jsx(As, { ...defaultProps, ...(splitted.o as any), class: reklassFn(splitted.p, CLASS) });
  };

  (Component as ReklassedComponent<ET, CS, VS>).reklass = reklassFn;

  return Component as ReklassedComponent<ET, CS, VS>;
}

export { klassed, reklassed };
