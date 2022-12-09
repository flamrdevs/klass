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

function withKlassProps<T extends VariantsSchema, P extends { className?: ClassValue } & VariantsOf<KlassFn<T>>>(
  klassFn: KlassFn<T>,
  props: Omit<P, "as">,
  keys: (keyof Exclude<T, "className">)[]
) {
  const { className, ...rest } = props;

  let omited: Record<string, any> = {};
  let picked: Record<string, any> = {};

  Object.entries(rest).forEach(([key, value]) => {
    if (keys.includes(key)) picked[key] = value;
    else omited[key] = value;
  });

  return {
    ...omited,
    className: klassFn(picked, className),
  } as Omit<P, "className" | keyof Omit<VariantsOf<KlassFn<T>>, "className">> & { className: string };
}

type KlassedComponent<E extends ElementType, T extends VariantsSchema> = {
  <C extends ElementType = E>(
    props: PolymorphicComponentPropWithRef<C, Omit<VariantsOf<KlassFn<T>>, "className">> & { className?: ClassValue }
  ): ReactElement | null;
} & {
  klass: KlassFn<T>;
};

function klassed<E extends ElementType, T extends VariantsSchema>(
  element: E,
  options: KlassOptions<T>,
  setup?: { defaultProps: PolymorphicComponentPropWithRef<E, {}> }
): KlassedComponent<E, T> {
  const klassFn = klass<T>(options);
  const keys = Object.keys(options.variants).filter((el) => el !== "className") as unknown as (keyof Exclude<T, "className">)[];

  const defaultProps = setup?.defaultProps || ({} as PolymorphicComponentPropWithRef<E, {}>);

  const Component = <C extends ElementType = E>(
    props: PolymorphicComponentPropWithRef<C, Omit<VariantsOf<KlassFn<T>>, "className">> & { className?: ClassValue },
    ref?: PolymorphicRef<C>
  ) => {
    const { as: As = element, ...rest } = props;

    return <As {...defaultProps} {...(withKlassProps(klassFn, rest, keys) as unknown as any)} ref={ref} />;
  };

  const ComponentWithRef: Omit<KlassedComponent<E, T>, "klass"> = React.forwardRef<any, any>(Component);

  (ComponentWithRef as KlassedComponent<E, T>).klass = klassFn;

  return ComponentWithRef as KlassedComponent<E, T>;
}

export { klassed };
