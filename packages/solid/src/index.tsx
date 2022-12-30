/** @jsxImportSource solid-js */

import { Dynamic } from "solid-js/web";
import { mergeProps, splitProps } from "solid-js";
import type { ComponentProps, JSX, ValidComponent } from "solid-js";

import { klass } from "@klass/core";
import type { ClassValue, VariantsSchema, KlassOptions, KlassFn, VariantsOf } from "@klass/core";

import type { PropsWithChildren } from "./types";

type AsProp<C extends ValidComponent> = { as?: C };

type PropsToOmit<C extends ValidComponent, P> = keyof (AsProp<C> & P);

type RefValue<T extends any> = T extends { ref?: any } ? T["ref"] : unknown;

type ComponentPropsRef<C extends ValidComponent> = C extends keyof JSX.IntrinsicElements
  ? RefValue<JSX.IntrinsicElements[C]>
  : RefValue<ComponentProps<C>>;

type PolymorphicComponentProp<C extends ValidComponent, Props = {}> = PropsWithChildren<Props & AsProp<C>> &
  Omit<Omit<ComponentProps<C>, "ref"> & { ref?: ComponentPropsRef<C> }, PropsToOmit<C, Props>>;

type KlassedComponent<E extends ValidComponent, T extends VariantsSchema> = {
  <C extends ValidComponent = E>(
    props: PolymorphicComponentProp<C, Omit<VariantsOf<KlassFn<T>>, "class" | "classList"> & { class?: ClassValue; classList?: ClassValue }>
  ): JSX.Element | null;
} & {
  klass: KlassFn<T>;
};

const klassed = <E extends ValidComponent, T extends VariantsSchema>(
  element: E,
  options: KlassOptions<T>,
  setup?: {
    defaultProps?: PolymorphicComponentProp<E, {}>;
  }
): KlassedComponent<E, T> => {
  const klassFn = klass<T>(options);
  const keys = Object.keys(options.variants).filter((el) => el !== "class" && el !== "classList") as unknown as (keyof Exclude<
    T,
    "class" | "classList"
  >)[];

  const {
    class: defaultClassProps,
    classList: defaultClassListProps,
    ...defaultProps
  } = (setup?.defaultProps || {}) as PolymorphicComponentProp<E, { class?: string; classList?: { [k: string]: boolean | undefined } }>;

  const Component = <C extends ValidComponent = E>(
    props: PolymorphicComponentProp<C, Omit<VariantsOf<KlassFn<T>>, "class" | "classList"> & { class?: ClassValue; classList?: ClassValue }>
  ) => {
    const [local, picked, omited] = splitProps(props, ["as", "class", "classList"], keys as any);

    const mergedProps = mergeProps(defaultProps, omited, () => ({
      class: klassFn(picked as any, local.class ?? defaultClassProps ?? local.classList ?? defaultClassListProps),
    }));

    return <Dynamic component={local.as || element} {...(mergedProps as any)} />;
  };

  (Component as KlassedComponent<E, T>).klass = klassFn;

  return Component as KlassedComponent<E, T>;
};

export { klassed };
