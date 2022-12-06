import React from "react";
import type { ComponentProps, ComponentPropsWithRef, ComponentPropsWithoutRef, ElementType, ForwardRefExoticComponent } from "react";

import { klass } from "@klass/core";
import type { ClassValue, VariantsSchema, KlassProps, KlassOptions, KlassFn, VariantsOf } from "@klass/core";

function omit<T extends {}, K extends keyof T>(target: T, keys: K[]): Omit<T, K> {
  return {
    ...keys.reduce((obj, key) => {
      return (({ [key]: _, ...rest }) => rest)(obj);
    }, target as object),
  } as Omit<T, K>;
}

function pick<T extends {}, K extends keyof T>(target: T, keys: K[]): Pick<T, K> {
  return {
    ...keys.reduce((obj, key) => {
      return key in target ? { [key]: target[key], ...obj } : obj;
    }, {} as object),
  } as Pick<T, K>;
}

function withKlassProps<T extends VariantsSchema, P extends { className?: ClassValue } & VariantsOf<KlassFn<T>>>(
  klassFn: KlassFn<T>,
  props: P,
  keys: (keyof Exclude<T, "className">)[]
) {
  const { className, ...rest } = props;

  return {
    ...omit(rest, keys as any),
    className: klassFn(pick(rest, keys as any) as unknown as KlassProps<T>, className),
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
