/** @jsxImportSource solid-js */

import { Dynamic } from "solid-js/web";
import { mergeProps, splitProps } from "solid-js";
import type { ValidComponent } from "solid-js";

import { klass, reklass } from "@klass/core";
import type { KlassOptions, KlassFn, VariantsOf, ConditionSchema, ReklassOptions, ReklassFn, ItFn, AsCondition } from "@klass/core";

import type { WithClassesValueProps, FinalRestrictedVariantsKey, FinalVariantsSchema, KlassedComponent, ReklassedComponent } from "./types";
import type { ClassesProps } from "./types/solid";
import type { PolymorphicComponentProp } from "./types/polymorphic";

const getVariantKeys__filterFn = (el: string) => el !== "class" && el !== "classList",
  getVariantKeys = <VS extends FinalVariantsSchema>(variants: VS) => Object.keys(variants).filter(getVariantKeys__filterFn) as unknown as (keyof Exclude<VS, FinalRestrictedVariantsKey>)[],
  PolymorphicKeysSplitter = ["as"] as const,
  ClassesKeysSplitter = ["class", "classList"] as const,
  classesProps = <P extends Partial<Record<FinalRestrictedVariantsKey, any>>>(props: P) => [props.class, props.classList];

/**
 *
 * @param element element
 * @param options klass options
 * @param config additional config
 * @returns klass component
 *
 * @see {@link https://klass.pages.dev/klass/solid.html#usage | klassed}
 */
function klassed<VC extends ValidComponent, VS extends FinalVariantsSchema>(
  element: VC,
  options: KlassOptions<VS>,
  config: {
    /**
     * default props
     */
    dp?: PolymorphicComponentProp<VC, {}>;
    /**
     * it function
     */
    it?: ItFn;
  } = {}
): KlassedComponent<VC, VS> {
  const { dp: { class: defaultClass, classList: defaultClassList, ...defaultProps } = {} as ClassesProps, it } = config,
    klassFn = klass<VS>(options, { it }),
    keys = getVariantKeys<VS>(options.variants),
    defaultPolymorphicProps = { as: element },
    defaultClassesProps = { class: defaultClass, classList: defaultClassList };

  const Component = <C extends ValidComponent = VC>(props: PolymorphicComponentProp<C, WithClassesValueProps<VariantsOf<KlassFn<VS>>>>) => {
    const [polymorphic, classes, picked, omited] = splitProps(props, PolymorphicKeysSplitter, ClassesKeysSplitter, keys as any);

    return (
      <Dynamic
        component={mergeProps(defaultPolymorphicProps, polymorphic).as}
        {...(mergeProps(defaultProps, omited) as any)}
        class={klassFn(picked as any, classesProps(mergeProps(defaultClassesProps, classes)))}
      />
    );
  };

  (Component as KlassedComponent<VC, VS>).klass = klassFn;

  return Component as KlassedComponent<VC, VS>;
}

/**
 *
 * @param element element
 * @param options reklass options
 * @param config additional config
 * @returns reklass component
 *
 * @see {@link https://klass.pages.dev/klass/solid.html#usage | reklassed}
 */
function reklassed<VC extends ValidComponent, CS extends ConditionSchema, VS extends FinalVariantsSchema>(
  element: VC,
  options: ReklassOptions<CS, VS>,
  config: {
    /**
     * default props
     */
    dp?: PolymorphicComponentProp<VC, {}>;
    /**
     * condition as
     */
    as?: AsCondition;
    /**
     * it function
     */
    it?: ItFn;
  } = {}
): ReklassedComponent<VC, CS, VS> {
  const { dp: { class: defaultClass, classList: defaultClassList, ...defaultProps } = {} as ClassesProps, as, it } = config,
    reklassFn = reklass<CS, VS>(options, { as, it }),
    keys = getVariantKeys<VS>(options.variants),
    defaultPolymorphicProps = { as: element },
    defaultClassesProps = { class: defaultClass, classList: defaultClassList };

  const Component = <C extends ValidComponent = VC>(props: PolymorphicComponentProp<C, WithClassesValueProps<VariantsOf<ReklassFn<CS, VS>>>>) => {
    const [polymorphic, classes, picked, omited] = splitProps(props, PolymorphicKeysSplitter, ClassesKeysSplitter, keys as any);

    return (
      <Dynamic
        component={mergeProps(defaultPolymorphicProps, polymorphic).as}
        {...(mergeProps(defaultProps, omited) as any)}
        class={reklassFn(picked as any, classesProps(mergeProps(defaultClassesProps, classes)))}
      />
    );
  };

  (Component as ReklassedComponent<VC, CS, VS>).reklass = reklassFn;

  return Component as ReklassedComponent<VC, CS, VS>;
}

export { klassed, reklassed };
