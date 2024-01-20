import { jsx } from "@builder.io/qwik";

import { klass, reklass } from "@klass/core";
import type { KlassOptions, KlassFn, VariantsOf, ConditionSchema, ReklassOptions, ReklassFn, EndFn, AsFn } from "@klass/core";

import type { WithClassesValueProps, FinalRestrictedVariantsKey, FinalVariantsSchema, KlassedComponent, ReklassedComponent } from "./types/index.ts";
import type { ElementType, ClassesProps } from "./types/qwik.ts";
import type { PolymorphicComponentProp } from "./types/polymorphic.ts";

import { maybeSignal } from "./utils.ts";

const getVariantKeys__filterFn = <VS extends FinalVariantsSchema>(el: keyof VS) => el !== "class",
  getVariantKeys = <VS extends FinalVariantsSchema>(keys: (keyof VS)[]) => keys.filter(getVariantKeys__filterFn) as unknown as (keyof Exclude<VS, FinalRestrictedVariantsKey>)[];

const splitRestProps = <P extends { [key: PropertyKey]: any }, K extends PropertyKey>(props: P, keys: K[]) => {
  let o: /** omited */ Record<string, any> = {},
    p: /** picked */ Record<string, any> = {},
    key: string;
  for (key in props) (keys.includes(key as K) ? p : o)[key] = maybeSignal(props[key]);
  return { o, p } as const;
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
    keys = getVariantKeys<VS>(klassFn.vk);

  const Component = (<C extends ElementType = ET>({
    as: As = element as unknown as C,
    class: _class = defaultClass,
    ...rest
  }: PolymorphicComponentProp<C, WithClassesValueProps<VariantsOf<KlassFn<VS>>>>) => {
    const splitted = splitRestProps(rest, keys);

    return jsx(As, { ...defaultProps, ...(splitted.o as any), class: klassFn(splitted.p, maybeSignal(_class)) });
  }) as KlassedComponent<ET, VS>;

  Component.klass = klassFn;

  return Component;
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
    keys = getVariantKeys<VS>(reklassFn.rvk);

  const Component = (<C extends ElementType = ET>({
    as: As = element as unknown as C,
    class: _class = defaultClass,
    ...rest
  }: PolymorphicComponentProp<C, WithClassesValueProps<VariantsOf<ReklassFn<CS, VS>>>>) => {
    const splitted = splitRestProps(rest, keys);

    return jsx(As, { ...defaultProps, ...(splitted.o as any), class: reklassFn(splitted.p, maybeSignal(_class)) });
  }) as ReklassedComponent<ET, CS, VS>;

  Component.reklass = reklassFn;

  return Component;
}

export { klassed, reklassed };