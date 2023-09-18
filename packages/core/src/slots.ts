import { klass } from ".";
import type { ClassValue, TransformKey, RestrictedVariantsKey, KlassFn } from ".";

type StrictSlotsVariantsSchema<B extends string, E extends string = RestrictedVariantsKey> = {
  [variant: string]: {
    [type: string]: { [key in B]?: ClassValue };
  };
} & {
  [variant in E]?: undefined;
};

type ToVariantsSchema<B extends string, T extends StrictSlotsVariantsSchema<B>> = {
  [variant in keyof Omit<T, RestrictedVariantsKey>]: {
    [type in keyof Omit<T, RestrictedVariantsKey>[variant]]: ClassValue;
  };
};

type SlotsCompoundVariant<B extends string, T extends StrictSlotsVariantsSchema<B>> = Omit<
  {
    [K in keyof ToVariantsSchema<B, T>]?: TransformKey<keyof ToVariantsSchema<B, T>[K]>;
  },
  RestrictedVariantsKey
> & {
  class: { [key in B]?: ClassValue };
};

type SlotsOptions<B extends string, T extends StrictSlotsVariantsSchema<B>> = {
  base: { [key in B]: ClassValue };
  variants: T;
  defaultVariants?: { [K in keyof T]?: TransformKey<keyof T[K]> };
  compoundVariants?: SlotsCompoundVariant<B, T>[];
};

type KlassOnlyFn<B extends string, T extends StrictSlotsVariantsSchema<B>> = (props?: { [K in keyof T]?: TransformKey<keyof T[K]> }, classes?: ClassValue) => string;

type SlotsFn<B extends string, T extends StrictSlotsVariantsSchema<B>> = {
  (props?: { [K in keyof T]?: TransformKey<keyof T[K]> }): {
    [key in B]: KlassOnlyFn<B, T>;
  };
} & {
  /**
   * options
   */
  o: SlotsOptions<B, T>;
  /**
   * klasses
   */
  klass: {
    [key in B]: KlassFn<ToVariantsSchema<B, T>>;
  };
};

/**
 *
 * @param options slots options
 * @returns slots function
 *
 * @see {@link https://klass.pages.dev/klass/core.html#slots | slots}
 */
const slots = <B extends string, T extends StrictSlotsVariantsSchema<B>>(options: SlotsOptions<B, T>): SlotsFn<B, T> => {
  const keyofBase = Object.keys(options.base) as B[];

  const klasses = {} as {
    [key in B]: KlassFn<ToVariantsSchema<B, T>>;
  };

  for (const base of keyofBase) {
    klasses[base] = klass<ToVariantsSchema<B, T>>({
      base: options.base[base],
      variants: Object.entries(options.variants).reduce(
        (obj, [variant, types]) => ((obj[variant] = Object.entries(types).reduce((obj, [type, bases]) => ((obj[type] = bases[base]), obj), {} as { [type: string]: ClassValue })), obj),
        {} as { [variant: string]: { [type: string]: ClassValue } }
      ) as any,
      defaultVariants: options.defaultVariants,
      compoundVariants: options.compoundVariants?.map(({ class: _class, ...variants }) => ({ ...variants, class: _class?.[base] })).filter((compound) => typeof compound.class !== "undefined") as any,
    });
  }

  const fn: Omit<SlotsFn<B, T>, "o" | "klass"> = (props = {}) => {
    const klassesonly = {} as {
      [key in B]: KlassOnlyFn<B, T>;
    };

    for (const base of keyofBase) klassesonly[base] = (_props = {}, classes) => klasses[base]({ ...props, ..._props }, classes);

    return klassesonly;
  };

  (fn as SlotsFn<B, T>).o = options;
  (fn as SlotsFn<B, T>).klass = klasses;

  return fn as SlotsFn<B, T>;
};

export type { StrictSlotsVariantsSchema, SlotsCompoundVariant, SlotsOptions, SlotsFn };
export default slots;
