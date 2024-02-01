import { klass, reklass } from "@klass/core";
import type { KlassOptions, KlassFn, VariantsOf, ConditionSchema, ReklassOptions, ReklassFn, EndFn, AsFn } from "@klass/core";

import type { WithClassesValueProps, FinalRestrictedVariantsKey, FinalVariantsSchema, KlassedComponent, ReklassedComponent } from "./types/index.ts";
import type { ElementType, ClassesProps } from "./types/preact.ts";
import type { PolymorphicComponentProp } from "./types/polymorphic.ts";

import { maybeSignal } from "./utils.ts";

const getVariantKeys__filterFn = <VS extends FinalVariantsSchema>(el: keyof VS) => el !== "class" && el !== "className",
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
  options: KlassOptions<VS> | KlassFn<VS>,
  config: {
    dp?: PolymorphicComponentProp<ET, {}>;
    end?: EndFn;
  } = {}
): KlassedComponent<ET, VS> {
  const { class: defaultClass, className: defaultClassName, ...defaultProps } = config.dp ?? ({} as ClassesProps),
    klassFn = typeof options === "function" ? options : klass<VS>(options, config),
    keys = getVariantKeys<VS>(klassFn.vk);

  const Component = (<C extends ElementType = ET>({
    as: As = element as unknown as C,
    class: _class = defaultClass,
    className = defaultClassName,
    ...rest
  }: PolymorphicComponentProp<C, WithClassesValueProps<VariantsOf<KlassFn<VS>>>>) => {
    const splitted = splitRestProps(rest, keys);

    return <As {...defaultProps} {...(splitted.o as any)} class={klassFn(splitted.p, maybeSignal(_class ?? className))} />;
  }) as KlassedComponent<ET, VS>;

  Component.klass = klassFn;

  return Component;
}

function reklassed<ET extends ElementType, CS extends ConditionSchema, VS extends FinalVariantsSchema>(
  element: ET,
  options: ReklassOptions<CS, VS> | ReklassFn<CS, VS>,
  config: {
    dp?: PolymorphicComponentProp<ET, {}>;
    as?: AsFn;
    end?: EndFn;
  } = {}
): ReklassedComponent<ET, CS, VS> {
  const { class: defaultClass, className: defaultClassName, ...defaultProps } = config.dp ?? ({} as ClassesProps),
    reklassFn = typeof options === "function" ? options : reklass<CS, VS>(options, config),
    keys = getVariantKeys<VS>(reklassFn.rvk);

  const Component = (<C extends ElementType = ET>({
    as: As = element as unknown as C,
    class: _class = defaultClass,
    className = defaultClassName,
    ...rest
  }: PolymorphicComponentProp<C, WithClassesValueProps<VariantsOf<ReklassFn<CS, VS>>>>) => {
    const splitted = splitRestProps(rest, keys);

    return <As {...defaultProps} {...(splitted.o as any)} class={reklassFn(splitted.p, maybeSignal(_class ?? className))} />;
  }) as ReklassedComponent<ET, CS, VS>;

  Component.reklass = reklassFn;

  return Component;
}

export { klassed, reklassed };
