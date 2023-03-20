/** @jsxImportSource solid-js */

import { Dynamic } from "solid-js/web";
import { mergeProps, splitProps } from "solid-js";
import type { ValidComponent } from "solid-js";

import { klass, reklass } from "@klass/core";
import type { VariantsSchema, KlassOptions, KlassFn, VariantsOf, ConditionSchema, ReklassOptions, ReklassFn } from "@klass/core";

import type { PolymorphicComponentProp, ClassesNormalProps, WithClassesValueProps, KlassedComponent, ReklassedComponent } from "./types";

const getVariantKeys__filterFn = (el: string) => el !== "class" && el !== "classList",
  getVariantKeys = <VS extends VariantsSchema>(variants: VS) =>
    Object.keys(variants).filter(getVariantKeys__filterFn) as unknown as (keyof Exclude<VS, "class" | "classList">)[],
  LocalKeysSplitter = ["as", "class", "classList"] as const;

function klassed<VC extends ValidComponent, VS extends VariantsSchema>(
  element: VC,
  options: KlassOptions<VS>,
  setup?: {
    defaultProps?: PolymorphicComponentProp<VC, {}>;
  }
): KlassedComponent<VC, VS> {
  const klassFn = klass<VS>(options),
    keys = getVariantKeys<VS>(options.variants),
    { class: defaultClassProps, classList: defaultClassListProps, ...defaultProps } = (setup?.defaultProps || {}) as ClassesNormalProps;

  const Component = <C extends ValidComponent = VC>(props: PolymorphicComponentProp<C, WithClassesValueProps<VariantsOf<KlassFn<VS>>>>) => {
    const [local, picked, omited] = splitProps(props, LocalKeysSplitter, keys as any);

    return (
      <Dynamic
        component={local.as || element}
        {...(mergeProps(defaultProps, omited, () => ({
          class: klassFn(picked as any, [local.class ?? defaultClassProps, local.classList ?? defaultClassListProps]),
        })) as any)}
      />
    );
  };

  (Component as KlassedComponent<VC, VS>).klass = klassFn;

  return Component as KlassedComponent<VC, VS>;
}

function reklassed<VC extends ValidComponent, CS extends ConditionSchema, VS extends VariantsSchema>(
  element: VC,
  options: ReklassOptions<CS, VS>,
  setup?: {
    defaultProps?: PolymorphicComponentProp<VC, {}>;
  }
): ReklassedComponent<VC, CS, VS> {
  const reklassFn = reklass<CS, VS>(options),
    keys = getVariantKeys<VS>(options.variants),
    { class: defaultClassProps, classList: defaultClassListProps, ...defaultProps } = (setup?.defaultProps || {}) as ClassesNormalProps;

  const Component = <C extends ValidComponent = VC>(
    props: PolymorphicComponentProp<C, WithClassesValueProps<VariantsOf<ReklassFn<CS, VS>>>>
  ) => {
    const [local, picked, omited] = splitProps(props, LocalKeysSplitter, keys as any);

    return (
      <Dynamic
        component={local.as || element}
        {...(mergeProps(defaultProps, omited, () => ({
          class: reklassFn(picked as any, [local.class ?? defaultClassProps, local.classList ?? defaultClassListProps]),
        })) as any)}
      />
    );
  };

  (Component as ReklassedComponent<VC, CS, VS>).reklass = reklassFn;

  return Component as ReklassedComponent<VC, CS, VS>;
}

export { klassed, reklassed };
export * from "./HOCs";
