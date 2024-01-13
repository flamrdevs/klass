import { klass, reklass } from "@klass/core";
import type { KlassOptions, KlassFn, VariantsOf, ConditionSchema, ReklassOptions, ReklassFn, ItFn, AsCondition } from "@klass/core";

import type { WithClassesValueProps, FinalRestrictedVariantsKey, FinalVariantsSchema, KlassedComponent, ReklassedComponent } from "./types/index.ts";
import type { ElementType, ClassesProps } from "./types/preact.ts";
import type { PolymorphicComponentProp } from "./types/polymorphic.ts";

const getVariantKeys__filterFn = (el: string) => el !== "class" && el !== "className",
  getVariantKeys = <VS extends FinalVariantsSchema>(variants: VS) => Object.keys(variants).filter(getVariantKeys__filterFn) as unknown as (keyof Exclude<VS, FinalRestrictedVariantsKey>)[],
  splitRestProps = <P extends { [key: PropertyKey]: any }, K extends PropertyKey>(props: P, keys: K[]) => {
    let omited: Record<string, any> = {},
      picked: Record<string, any> = {};

    let key: string;
    for (key in props) (keys.includes(key as K) ? picked : omited)[key] = props[key];

    return [omited, picked] as const;
  };

/**
 *
 * @param element element
 * @param options klass options
 * @param config additional config
 * @returns klass component
 *
 * @see {@link https://klass.pages.dev/klass/preact.html#usage | klassed}
 */
function klassed<ET extends ElementType, VS extends FinalVariantsSchema>(
  element: ET,
  options: KlassOptions<VS>,
  config: {
    /**
     * default props
     */
    dp?: PolymorphicComponentProp<ET, {}>;
    /**
     * it function
     */
    it?: ItFn;
  } = {}
): KlassedComponent<ET, VS> {
  const { dp: { class: defaultClass, className: defaultClassName, ...defaultProps } = {} as ClassesProps, it } = config,
    klassFn = klass<VS>(options, { it }),
    keys = getVariantKeys<VS>(options.variants);

  const Component = <C extends ElementType = ET>({
    as: As = element as unknown as C,
    class: CLASS = defaultClass,
    className = defaultClassName,
    ...rest
  }: PolymorphicComponentProp<C, WithClassesValueProps<VariantsOf<KlassFn<VS>>>>) => {
    const [omited, picked] = splitRestProps(rest, keys);

    return <As {...defaultProps} {...(omited as any)} class={klassFn(picked, CLASS ?? className)} />;
  };

  (Component as KlassedComponent<ET, VS>).klass = klassFn;

  return Component as KlassedComponent<ET, VS>;
}

/**
 *
 * @param element element
 * @param options reklass options
 * @param config additional config
 * @returns reklass component
 *
 * @see {@link https://klass.pages.dev/klass/preact.html#usage | reklassed}
 */
function reklassed<ET extends ElementType, CS extends ConditionSchema, VS extends FinalVariantsSchema>(
  element: ET,
  options: ReklassOptions<CS, VS>,
  config: {
    /**
     * default props
     */
    dp?: PolymorphicComponentProp<ET, {}>;
    /**
     * condition as
     */
    as?: AsCondition;
    /**
     * it function
     */
    it?: ItFn;
  } = {}
): ReklassedComponent<ET, CS, VS> {
  const { dp: { class: defaultClass, className: defaultClassName, ...defaultProps } = {} as ClassesProps, as, it } = config,
    reklassFn = reklass<CS, VS>(options, { as, it }),
    keys = getVariantKeys<VS>(options.variants);

  const Component = <C extends ElementType = ET>({
    as: As = element as unknown as C,
    class: CLASS = defaultClass,
    className = defaultClassName,
    ...rest
  }: PolymorphicComponentProp<C, WithClassesValueProps<VariantsOf<ReklassFn<CS, VS>>>>) => {
    const [omited, picked] = splitRestProps(rest, keys);

    return <As {...defaultProps} {...(omited as any)} class={reklassFn(picked, CLASS ?? className)} />;
  };

  (Component as ReklassedComponent<ET, CS, VS>).reklass = reklassFn;

  return Component as ReklassedComponent<ET, CS, VS>;
}

export { klassed, reklassed };
