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
} & {
  options: VariantOptions<T>;
};

type VariantGroup<T extends VariantsSchema> = {
  [K in keyof T]: VariantFn<T[K]>;
};

type KlassProps<T extends VariantsSchema> = {
  [K in keyof T]?: BooleanKey<keyof T[K]>;
};

type CompoundVariant<T extends VariantsSchema> = {
  variant: KlassProps<T>;
  classes?: ClassValue;
};

type KlassOptions<T extends VariantsSchema> = {
  base?: string;
  variants: T;
  defaultVariants?: KlassProps<T>;
  compoundVariants?: CompoundVariant<T>[];
};

type KlassFn<T extends VariantsSchema> = {
  (props?: KlassProps<T>, classes?: ClassValue): string;
} & {
  options: KlassOptions<T>;
  variant: VariantGroup<T>;
};

type VariantsOf<T extends (...args: any[]) => any> = Exclude<Parameters<T>[0], undefined>;

function isTypeofPropertyKey(value: unknown): value is string | number | symbol {
  return typeof value === "string" || typeof value === "number" || typeof value === "symbol";
}

function transformKey<T extends VariantsSchema[string]>(value?: BooleanKey<keyof T>): string | (BooleanKey<keyof T> & symbol) {
  return typeof value === "symbol" ? value : String(value);
}

function getKey<T extends VariantsSchema[string]>(value?: BooleanKey<keyof T>, defaultValue?: BooleanKey<keyof T>) {
  return typeof value !== "undefined" ? transformKey(value) : transformKey(defaultValue);
}

function variant<T extends VariantsSchema[string]>(options: VariantOptions<T>): VariantFn<T> {
  const { variant, defaultVariant } = options;

  function inVariant(value: unknown) {
    return isTypeofPropertyKey(value) && value in variant;
  }

  let key: string | (BooleanKey<keyof T> & symbol);
  const instance: Omit<VariantFn<T>, "options"> = (props?: VariantProps<T>) => {
    return inVariant((key = getKey(props, defaultVariant))) ? clsx(variant[key]) : undefined;
  };

  (instance as VariantFn<T>).options = options;

  return instance as VariantFn<T>;
}

function klass<T extends VariantsSchema>(options: KlassOptions<T>): KlassFn<T> {
  const { base, variants, defaultVariants, compoundVariants } = options;

  const variantGroup = Object.entries(variants).reduce((obj, [key, value]) => {
    obj[key as keyof typeof obj] = variant<T[keyof T]>({
      variant: value as any,
      defaultVariant: defaultVariants?.[key] as any,
    });
    return obj;
  }, {} as VariantGroup<T>);

  const keys = Object.keys(variants) as (keyof T)[];

  const instance: Omit<KlassFn<T>, "options" | "variant"> = (props?: KlassProps<T>, classes?: ClassValue) => {
    return clsx(
      base,
      keys.map((key) => variantGroup[key](props?.[key])),
      compoundVariants?.map(({ variant, classes }) => {
        return Object.keys(variant).every((vkey) => {
          if (typeof variant[vkey] === "undefined") return false;
          if (typeof props?.[vkey] !== "undefined") return props?.[vkey] === variant[vkey];
          return defaultVariants?.[vkey] === variant[vkey];
        })
          ? classes
          : undefined;
      }),
      classes
    );
  };

  (instance as KlassFn<T>).options = options;
  (instance as KlassFn<T>).variant = variantGroup;

  return instance as KlassFn<T>;
}

export type { VariantsSchema, VariantProps, VariantOptions, VariantFn, KlassProps, KlassOptions, KlassFn, VariantsOf };
export { variant, klass };
