import React from "react";
import type { ComponentProps, ComponentPropsWithRef, ComponentPropsWithoutRef, ElementType, ForwardRefExoticComponent } from "react";

import { klass } from "@klass/core";
import type { VariantsSchema, KlassProps, KlassOptions, KlassFn, VariantsOf } from "@klass/core";

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

function withKlassProps<T extends VariantsSchema, P extends { className?: string } & VariantsOf<KlassFn<T>>>(
  klassFn: KlassFn<T>,
  props: P,
  variantKeys: keyof T[]
) {
  const { className, ...rest } = props;

  const omited = omit(rest, variantKeys as any) as Omit<P, keyof VariantsOf<KlassFn<T>>>;
  const picked = pick(rest, variantKeys as any) as Pick<P, keyof VariantsOf<KlassFn<T>>>;

  return {
    ...omited,
    className: klassFn(picked as KlassProps<T>, className),
  } as Omit<P, "className" | keyof VariantsOf<KlassFn<T>>> & { className: string };
}

type KlassedComponent<E extends ElementType, T extends VariantsSchema> = ForwardRefExoticComponent<
  ComponentProps<E> & VariantsOf<KlassFn<T>>
> & {
  klass: KlassFn<T>;
};

function klassed<E extends ElementType, T extends VariantsSchema>(Element: E, options: KlassOptions<T>): KlassedComponent<E, T> {
  const klassy = klass<T>(options);
  const keys = Object.keys(options.variants) as unknown as keyof T[];

  const Component = React.forwardRef(
    (props: ComponentPropsWithoutRef<E> & VariantsOf<KlassFn<T>>, ref?: ComponentPropsWithRef<E>["ref"]) => {
      return <Element {...(withKlassProps(klassy, props, keys) as unknown as any)} ref={ref} />;
    }
  );

  (Component as KlassedComponent<E, T>).klass = klassy;

  return Component as KlassedComponent<E, T>;
}

export { klassed };
