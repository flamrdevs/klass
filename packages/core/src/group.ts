import { klass } from ".";
import type { ClassValue, TransformKey, EndFn, RestrictedVariantsKey, KlassFn } from ".";

type StrictGroupVariantsSchema<B extends string, E extends string = RestrictedVariantsKey> = {
  [variant: string]: {
    [type: string]: { [key in B]?: ClassValue };
  };
} & {
  [variant in E]?: undefined;
};

type ToVariantsSchema<B extends string, T extends StrictGroupVariantsSchema<B>> = {
  [variant in keyof Omit<T, RestrictedVariantsKey>]: {
    [type in keyof Omit<T, RestrictedVariantsKey>[variant]]: ClassValue;
  };
};

type GroupCompoundVariant<B extends string, T extends StrictGroupVariantsSchema<B>> = Omit<
  {
    [K in keyof ToVariantsSchema<B, T>]?: TransformKey<keyof ToVariantsSchema<B, T>[K]>;
  },
  RestrictedVariantsKey
> & {
  class: { [key in B]?: ClassValue };
};

type GroupOptions<B extends string, T extends StrictGroupVariantsSchema<B>> = {
  base: { [key in B]: ClassValue };
  variants: T;
  defaultVariants?: { [K in keyof T]?: TransformKey<keyof T[K]> };
  compoundVariants?: GroupCompoundVariant<B, T>[];
};

type GroupResult<B extends string, T extends StrictGroupVariantsSchema<B>> = {
  [key in B]: KlassFn<ToVariantsSchema<B, T>>;
};

const group = <B extends string, T extends StrictGroupVariantsSchema<B>>(options: GroupOptions<B, T>, config?: { end?: EndFn }): GroupResult<B, T> => {
  const keyofBase = Object.keys(options.base) as B[];

  const klasses = {} as {
    [key in B]: KlassFn<ToVariantsSchema<B, T>>;
  };

  for (const base of keyofBase) {
    klasses[base] = klass<ToVariantsSchema<B, T>>(
      {
        base: options.base[base],
        variants: Object.entries(options.variants).reduce(
          (obj, [variant, types]) => ((obj[variant] = Object.entries(types).reduce((obj, [type, bases]) => ((obj[type] = bases[base]), obj), {} as { [type: string]: ClassValue })), obj),
          {} as { [variant: string]: { [type: string]: ClassValue } }
        ) as any,
        defaultVariants: options.defaultVariants,
        compoundVariants: options.compoundVariants
          ?.map(({ class: _class, ...variants }) => ({ ...variants, class: _class?.[base] }))
          .filter((compound) => typeof compound.class !== "undefined") as any,
      },
      config
    );
  }

  return klasses;
};

export type { StrictGroupVariantsSchema, GroupCompoundVariant, GroupOptions, GroupResult };
export default group;
