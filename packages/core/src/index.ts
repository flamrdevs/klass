import { clsx } from "clsx";
import type { ClassValue } from "clsx";

export type { ClassValue };
export { clsx };

type BooleanKey<T extends PropertyKey> = T extends "true" | "false" ? boolean : T;

type VariantsSchema = {
  [variant: string]: {
    [type: string]: ClassValue;
  };
};

type VariantProps<T extends VariantsSchema[string]> = BooleanKey<keyof T>;

type VariantOptions<T extends VariantsSchema[string]> = {
  variant: T;
  defaultVariant?: VariantProps<T>;
};

type VariantFn<T extends VariantsSchema[string]> = {
  (value?: BooleanKey<keyof T>): string | undefined;
};

type VariantGroup<T extends VariantsSchema> = {
  [K in keyof T]: VariantFn<T[K]>;
};

type KlassProps<T extends VariantsSchema> = {
  [K in keyof T]?: BooleanKey<keyof T[K]>;
};

type KlassOptions<T extends VariantsSchema> = {
  base?: string;
  variants: T;
  defaultVariants?: KlassProps<T>;
};

type KlassFn<T extends VariantsSchema> = {
  (props?: KlassProps<T>, classes?: ClassValue): string;
} & {
  variant: VariantGroup<T>;
};

type VariantsOf<T extends (...args: any[]) => any> = Exclude<Parameters<T>[0], undefined>;

function isPropertyKey(value: unknown): value is string | number | symbol {
  return typeof value === "string" || typeof value === "number" || typeof value === "symbol";
}

function variant<T extends VariantsSchema[string]>(options: VariantOptions<T>): VariantFn<T> {
  const { variant, defaultVariant } = options;

  const instance = (props?: VariantProps<T>) => {
    const valueKey = typeof props === "symbol" ? props : String(props);
    if (isPropertyKey(valueKey) && valueKey in variant) return clsx(variant[valueKey]);

    const defaultVariantKey = typeof defaultVariant === "symbol" ? defaultVariant : String(defaultVariant);
    if (isPropertyKey(defaultVariantKey) && defaultVariantKey in variant) return clsx(variant[defaultVariantKey]);

    return undefined;
  };

  return instance;
}

function klass<T extends VariantsSchema>(options: KlassOptions<T>): KlassFn<T> {
  const { base, variants, defaultVariants } = options;

  const variantFn = Object.entries(variants).reduce((obj, [key, value]) => {
    obj[key as keyof typeof obj] = variant({
      variant: value,
      defaultVariant: defaultVariants?.[key] as keyof typeof value,
    }) as VariantGroup<T>[string];
    return obj;
  }, {} as VariantGroup<T>);

  const keys = Object.keys(variants) as (keyof T)[];

  const instance = (props?: KlassProps<T>, classes?: ClassValue) => {
    return clsx(
      base,
      keys.map((key) => variantFn[key](props?.[key])),
      classes
    );
  };

  (instance as KlassFn<T>).variant = variantFn;

  return instance as KlassFn<T>;
}

export type { VariantsSchema, VariantProps, VariantOptions, VariantFn, KlassProps, KlassOptions, KlassFn, VariantsOf };
export { variant, klass };
