import { klass } from "./index.ts";
import type { ClassValue, TransformKey, EndFn, KlassFn } from "./index.ts";

type StrictSlotsVariantsSchema<B extends string> = {
  [variant: string]: {
    [type: string]: { [key in B]?: ClassValue };
  };
};

type ToVariantsSchema<B extends string, T extends StrictSlotsVariantsSchema<B>> = {
  [variant in keyof T]: {
    [type in keyof T[variant]]: ClassValue;
  };
};

type SlotsCompoundVariant<B extends string, T extends StrictSlotsVariantsSchema<B>> = [
  {
    [K in keyof ToVariantsSchema<B, T>]?: TransformKey<keyof ToVariantsSchema<B, T>[K]>;
  },
  {
    [key in B]?: ClassValue;
  }
];

type SlotsOptions<B extends string, T extends StrictSlotsVariantsSchema<B>> = {
  base: { [key in B]: ClassValue };
  variants: T;
  defaults?: { [K in keyof T]?: TransformKey<keyof T[K]> };
  compounds?: SlotsCompoundVariant<B, T>[];
};

type KlassOnlyFn<B extends string, T extends StrictSlotsVariantsSchema<B>> = (props?: { [K in keyof T]?: TransformKey<keyof T[K]> }, classes?: ClassValue) => string;

type SlotsFn<B extends string, T extends StrictSlotsVariantsSchema<B>> = {
  (props?: { [K in keyof T]?: TransformKey<keyof T[K]> }): {
    [key in B]: KlassOnlyFn<B, T>;
  };
} & {
  o: SlotsOptions<B, T>;
  klass: {
    [key in B]: KlassFn<ToVariantsSchema<B, T>>;
  };
};

const compoundsFilterFn = <T extends Readonly<[any, any]>>(value: T) => typeof value[1] !== "undefined";

const slots = <B extends string, T extends StrictSlotsVariantsSchema<B>>(options: SlotsOptions<B, T>, config?: { end?: EndFn }): SlotsFn<B, T> => {
  const keyofBase = Object.keys(options.base) as B[];

  const klasses = {} as {
    [key in B]: KlassFn<ToVariantsSchema<B, T>>;
  };

  const variantsEntries = Object.entries(options.variants);

  for (const base of keyofBase) {
    klasses[base] = klass<ToVariantsSchema<B, T>>(
      {
        base: options.base[base],
        variants: variantsEntries.reduce(
          (obj, [variant, types]) => ((obj[variant] = Object.entries(types).reduce((obj, [type, bases]) => ((obj[type] = bases[base]), obj), {} as { [type: string]: ClassValue })), obj),
          {} as { [variant: string]: { [type: string]: ClassValue } }
        ) as any,
        defaults: options.defaults,
        compounds: options.compounds?.map(([variants, _class]) => [variants, _class?.[base]] as const).filter(compoundsFilterFn) as any,
      },
      config
    );
  }

  const fn = ((props = {}) => {
    const klassesonly = {} as {
      [key in B]: KlassOnlyFn<B, T>;
    };

    for (const base of keyofBase) klassesonly[base] = (_props = {}, classes) => klasses[base]({ ...props, ..._props }, classes);

    return klassesonly;
  }) as SlotsFn<B, T>;

  fn.o = options;
  fn.klass = klasses;

  return fn;
};

export type { StrictSlotsVariantsSchema, SlotsCompoundVariant, SlotsOptions, SlotsFn };
export default slots;
