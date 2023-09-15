import { klass, reklass } from "@klass/core";
import type { KlassOptions, KlassFn, VariantsOf, ConditionSchema, ReklassOptions, ReklassFn, ItFn, AsCondition } from "@klass/core";

import type { ElementType, PolymorphicComponentProp, ClassesNormalProps, WithClassesValueProps, PreactClassesPropsKey, PreactVariantsSchema, KlassedComponent, ReklassedComponent } from "./types";

const getVariantKeys__filterFn = (el: string) => el !== "class" && el !== "className",
  getVariantKeys = <VS extends PreactVariantsSchema>(variants: VS) => Object.keys(variants).filter(getVariantKeys__filterFn) as unknown as (keyof Exclude<VS, PreactClassesPropsKey>)[],
  splitRestProps = <P extends { [key: PropertyKey]: any }, K extends PropertyKey>(props: P, keys: K[]) => {
    let omited: Record<string, any> = {},
      picked: Record<string, any> = {};

    Object.entries(props).forEach(([key, value]) => ((keys.includes(key as K) ? picked : omited)[key] = value));

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
function klassed<ET extends ElementType, VS extends PreactVariantsSchema>(
  element: ET,
  options: KlassOptions<VS>,
  config: {
    dp?: PolymorphicComponentProp<ET, {}>;
    it?: ItFn;
    /**
     * @deprecated rename to "dp"
     */
    defaultProps?: undefined;
  } = {}
): KlassedComponent<ET, VS> {
  const { dp: { class: __class, className: _className, ...dp } = {} as ClassesNormalProps, it } = config,
    klassFn = klass<VS>(options, { it }),
    keys = getVariantKeys<VS>(options.variants);

  const Component = <C extends ElementType = ET>(props: PolymorphicComponentProp<C, WithClassesValueProps<VariantsOf<KlassFn<VS>>>>) => {
    const { as: As = element, class: _class, className, ...rest } = props,
      [omited, picked] = splitRestProps(rest, keys);

    return (
      <As
        {...({
          ...dp,
          ...omited,
          class: klassFn(picked, _class ?? __class ?? className ?? _className),
        } as any)}
      />
    );
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
function reklassed<ET extends ElementType, CS extends ConditionSchema, VS extends PreactVariantsSchema>(
  element: ET,
  options: ReklassOptions<CS, VS>,
  config: {
    dp?: PolymorphicComponentProp<ET, {}>;
    as?: AsCondition;
    it?: ItFn;
    /**
     * @deprecated rename to "dp"
     */
    defaultProps?: undefined;
  } = {}
): ReklassedComponent<ET, CS, VS> {
  const { dp: { class: __class, className: _className, ...dp } = {} as ClassesNormalProps, as, it } = config,
    reklassFn = reklass<CS, VS>(options, { as, it }),
    keys = getVariantKeys<VS>(options.variants);

  const Component = <C extends ElementType = ET>(props: PolymorphicComponentProp<C, WithClassesValueProps<VariantsOf<ReklassFn<CS, VS>>>>) => {
    const { as: As = element, class: _class, className, ...rest } = props,
      [omited, picked] = splitRestProps(rest, keys);

    return (
      <As
        {...({
          ...dp,
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
