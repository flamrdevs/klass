import type { ComponentProps, JSX } from "preact";

import { klass } from "@klass/core";
import type { ClassValue, VariantsSchema, KlassOptions, KlassFn, VariantsOf } from "@klass/core";

import type { ElementType, PropsWithChildren } from "./types";

type AsProp<C extends ElementType> = { as?: C };

type PropsToOmit<C extends ElementType, P> = keyof (AsProp<C> & P);

type RefValue<T extends any> = T extends { ref?: any } ? T["ref"] : unknown;

type ComponentPropsRef<C extends ElementType> = C extends keyof JSX.IntrinsicElements
  ? RefValue<JSX.IntrinsicElements[C]>
  : RefValue<ComponentProps<C>>;

type PolymorphicComponentProp<C extends ElementType, Props = {}> = PropsWithChildren<Props & AsProp<C>> &
  Omit<Omit<ComponentProps<C>, "ref"> & { ref?: ComponentPropsRef<C> }, PropsToOmit<C, Props>>;

type KlassedComponent<E extends ElementType, T extends VariantsSchema> = {
  <C extends ElementType = E>(
    props: PolymorphicComponentProp<C, Omit<VariantsOf<KlassFn<T>>, "class" | "className"> & { class?: ClassValue; className?: ClassValue }>
  ): JSX.Element | null;
} & {
  klass: KlassFn<T>;
};

function klassed<E extends ElementType, T extends VariantsSchema>(
  element: E,
  options: KlassOptions<T>,
  setup?: {
    defaultProps?: PolymorphicComponentProp<E, {}>;
  }
): KlassedComponent<E, T> {
  const klassFn = klass<T>(options);
  const keys = Object.keys(options.variants).filter((el) => el !== "class" && el !== "className") as unknown as (keyof Exclude<
    T,
    "class" | "className"
  >)[];

  const {
    class: defaultClassProps,
    className: defaultClassNameProps,
    ...defaultProps
  } = (setup?.defaultProps || {}) as PolymorphicComponentProp<E, { class?: string; className?: string }>;

  const Component = <C extends ElementType = E>(
    props: PolymorphicComponentProp<C, Omit<VariantsOf<KlassFn<T>>, "class" | "className"> & { class?: ClassValue; className?: ClassValue }>
  ) => {
    const { as: As = element, class: _class, className, ...rest } = props;

    let omited: Record<string, any> = {};
    let picked: Record<string, any> = {};

    Object.entries(rest).forEach(([key, value]) => {
      if (keys.includes(key)) picked[key] = value;
      else omited[key] = value;
    });

    let mergedProps = {
      ...defaultProps,
      ...omited,
      class: klassFn(picked, _class ?? defaultClassProps ?? className ?? defaultClassNameProps),
    };

    return <As {...(mergedProps as any)} />;
  };

  (Component as KlassedComponent<E, T>).klass = klassFn;

  return Component as KlassedComponent<E, T>;
}

export { klassed };
