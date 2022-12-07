import React from "react";
import type { ComponentProps, ComponentPropsWithRef, ComponentPropsWithoutRef, ElementType, ForwardRefExoticComponent } from "react";

import { klass } from "@klass/core";
import type { ClassValue, VariantsSchema, KlassOptions, KlassFn, VariantsOf } from "@klass/core";

function withKlassProps<T extends VariantsSchema, P extends { className?: ClassValue } & VariantsOf<KlassFn<T>>>(
  klassFn: KlassFn<T>,
  props: P,
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

type KlassedComponent<E extends ElementType, T extends VariantsSchema> = ForwardRefExoticComponent<
  Omit<ComponentProps<E> & VariantsOf<KlassFn<T>>, "className"> & { className?: ClassValue }
> & {
  klass: KlassFn<T>;
};

function klassed<E extends ElementType, T extends VariantsSchema>(Element: E, options: KlassOptions<T>): KlassedComponent<E, T> {
  const klassFn = klass<T>(options);
  const keys = Object.keys(options.variants).filter((el) => el !== "className") as unknown as (keyof Exclude<T, "className">)[];

  const Component = React.forwardRef(
    (
      props: Omit<ComponentPropsWithoutRef<E> & VariantsOf<KlassFn<T>>, "className"> & { className?: ClassValue },
      ref?: ComponentPropsWithRef<E>["ref"]
    ) => {
      return <Element {...(withKlassProps(klassFn, props, keys) as unknown as any)} ref={ref} />;
    }
  );

  (Component as KlassedComponent<E, T>).klass = klassFn;

  return Component as KlassedComponent<E, T>;
}

export { klassed };
