import React from "react";
import type { ComponentPropsWithRef, ComponentPropsWithoutRef, ElementType, PropsWithChildren, ReactElement } from "react";

import { klass } from "@klass/core";
import type { ClassValue, VariantsSchema, KlassOptions, KlassFn, VariantsOf } from "@klass/core";

type AsProp<C extends ElementType> = { as?: C };

type PropsToOmit<C extends ElementType, P> = keyof (AsProp<C> & P);

type PolymorphicComponentProp<C extends ElementType, Props = {}> = PropsWithChildren<Props & AsProp<C>> &
  Omit<ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

type PolymorphicRef<C extends ElementType> = ComponentPropsWithRef<C>["ref"];

type PolymorphicComponentPropWithRef<C extends ElementType, Props = {}> = PolymorphicComponentProp<C, Props> & { ref?: PolymorphicRef<C> };

type KlassedComponent<E extends ElementType, T extends VariantsSchema> = {
  <C extends ElementType = E>(
    props: PolymorphicComponentPropWithRef<C, Omit<VariantsOf<KlassFn<T>>, "className"> & { className?: ClassValue }>
  ): ReactElement | null;
} & {
  klass: KlassFn<T>;
};

function klassed<E extends ElementType, T extends VariantsSchema>(
  element: E,
  options: KlassOptions<T>,
  setup?: {
    defaultProps?: PolymorphicComponentPropWithRef<E, {}>;
  }
): KlassedComponent<E, T> {
  const klassFn = klass<T>(options);
  const keys = Object.keys(options.variants).filter((el) => el !== "className") as unknown as (keyof Exclude<T, "className">)[];

  const { className: defaultClassNameProps, ...defaultProps } = (setup?.defaultProps || {}) as PolymorphicComponentPropWithRef<
    E,
    { className?: string }
  >;

  const Component = <C extends ElementType = E>(
    props: PolymorphicComponentPropWithRef<C, Omit<VariantsOf<KlassFn<T>>, "className"> & { className?: ClassValue }>,
    ref?: PolymorphicRef<C>
  ) => {
    const { as: As = element, className, ...rest } = props;

    let omited: Record<string, any> = {};
    let picked: Record<string, any> = {};

    Object.entries(rest).forEach(([key, value]) => {
      if (keys.includes(key)) picked[key] = value;
      else omited[key] = value;
    });

    let mergedProps = {
      ...defaultProps,
      ...omited,
      className: klassFn(picked, className ?? defaultClassNameProps),
    };

    return <As {...(mergedProps as any)} ref={ref} />;
  };

  const ComponentWithRef: Omit<KlassedComponent<E, T>, "klass"> = React.forwardRef<any, any>(Component);

  (ComponentWithRef as KlassedComponent<E, T>).klass = klassFn;

  return ComponentWithRef as KlassedComponent<E, T>;
}

export { klassed };
