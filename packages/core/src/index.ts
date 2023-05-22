type ClassValue = ClassArray | ClassDictionary | string | number | null | boolean | undefined;
type ClassDictionary = Record<string, any>;
type ClassArray = ClassValue[];

type GetKey<T extends PropertyKey> = T extends "true" & "false" ? boolean : T extends "true" ? true : T extends "false" ? false : Exclude<T, symbol>;

type VariantsSchema<E extends string = "class"> = {
  [variant: string]: {
    [type: string]: ClassValue;
  };
} & {
  [variant in E]?: undefined;
};

type VariantOptions<T extends VariantsSchema[string]> = {
  variant: T;
  defaultVariant?: GetKey<keyof T>;
};

type VariantFn<T extends VariantsSchema[string]> = {
  (value?: GetKey<keyof T>): string | undefined;
} & {
  options: VariantOptions<T>;
};

type VariantGroup<T extends VariantsSchema> = {
  [K in keyof T]: VariantFn<T[K]>;
};

type CompoundVariant<T extends VariantsSchema> = Omit<{ [K in keyof T]?: GetKey<keyof T[K]> }, "class"> & {
  class?: ClassValue;
};

type KlassOptions<T extends VariantsSchema> = {
  base?: ClassValue;
  variants: T;
  defaultVariants?: { [K in keyof T]?: GetKey<keyof T[K]> };
  compoundVariants?: CompoundVariant<T>[];
};

type KlassFn<T extends VariantsSchema> = {
  (props?: { [K in keyof T]?: GetKey<keyof T[K]> }, classes?: ClassValue): string;
} & {
  options: KlassOptions<T>;
  variant: VariantGroup<T>;
  variantKeys: (keyof T)[];
};

type ConditionSchema = {
  [type: string]: string;
};

type RevariantOptions<C extends ConditionSchema, T extends VariantsSchema[string]> = {
  conditions: C;
  defaultCondition: keyof C;
  variant: T;
};

type RevariantFn<C extends ConditionSchema, T extends VariantsSchema[string]> = {
  (value?: GetKey<keyof T> | { [condition in keyof C]?: GetKey<keyof T> }): string | undefined;
} & {
  options: RevariantOptions<C, T>;
};

type RevariantGroup<C extends ConditionSchema, T extends VariantsSchema> = {
  [K in keyof T]: RevariantFn<C, T[K]>;
};

type ReklassOptions<C extends ConditionSchema, T extends VariantsSchema> = {
  conditions: C;
  defaultCondition: keyof C;
  variants: T;
};

type ReklassFn<C extends ConditionSchema, T extends VariantsSchema> = {
  (
    props?: {
      [K in keyof T]?: GetKey<keyof T[K]> | { [condition in keyof C]?: GetKey<keyof T[K]> };
    },
    classes?: ClassValue
  ): string;
} & {
  options: ReklassOptions<C, T>;
  revariant: RevariantGroup<C, T>;
  revariantKeys: (keyof T)[];
};

type VariantsOf<T extends (...args: any[]) => any> = Exclude<Parameters<T>[0], undefined>;

type ItFn = (value: string) => string;
type AsCondition = "prefix" | "suffix";
type AsConditionFn = (condition: string, value: string) => string;

const isString = (value: unknown): value is string => typeof value === "string",
  isNumber = (value: unknown): value is number => typeof value === "number",
  isObject = (value: unknown): value is Record<PropertyKey, any> => typeof value === "object",
  isArray = (value: unknown): value is any[] => Array.isArray(value),
  isPropertyKey = (value: unknown): value is string | number => isString(value) || isNumber(value),
  cx = (mix: any) => {
    let result: string = "",
      temp: string | number,
      i: number;
    if (isString(mix) || isNumber(mix)) {
      result += mix;
    } else if (isObject(mix)) {
      if (isArray(mix)) {
        for (i = 0; i < mix.length; i++)
          if ((temp = cx(mix[i]))) {
            result && (result += " ");
            result += temp;
          }
      } else {
        for (temp in mix)
          if (mix[temp]) {
            result && (result += " ");
            result += temp;
          }
      }
    }
    return result;
  },
  cxs = (...classes: ClassValue[]) => {
    let result: string = "",
      temp: string,
      i: number;
    for (i = 0; i < classes.length; i++)
      if ((temp = cx(classes[i]))) {
        result && (result += " ");
        result += temp;
      }
    return result;
  },
  getPropKey = <T extends VariantsSchema[string]>(value?: GetKey<keyof T>, defaultValue?: GetKey<keyof T>) => String(typeof value === "undefined" ? defaultValue : value),
  defaultItFn: ItFn = (value) => value,
  defaultAsCondition: AsCondition = "prefix",
  defaultAsPrefixFn: AsConditionFn = (condition, value) => `${condition}${value}`,
  defaultAsSuffixFn: AsConditionFn = (condition, value) => `${value}${condition}`;

function variant<T extends VariantsSchema[string]>(options: VariantOptions<T>): VariantFn<T> {
  const { variant, defaultVariant } = options,
    inVariant = (value: unknown) => isPropertyKey(value) && value in variant,
    fn: Omit<VariantFn<T>, "options"> = (props?: GetKey<keyof T>) => {
      let key: string | GetKey<keyof T>;
      return inVariant((key = getPropKey<T>(props, defaultVariant))) ? cx(variant[key]) : undefined;
    };

  (fn as VariantFn<T>).options = options;

  return fn as VariantFn<T>;
}

const cxCompoundVariantsMapFn = <T extends VariantsSchema>({ class: _class, ...v }: CompoundVariant<T>) => ({ v, c: cx(_class) });

function klass<T extends VariantsSchema>(options: KlassOptions<T>, setup: { it?: ItFn } = {}): KlassFn<T> {
  const { base, variants, defaultVariants, compoundVariants } = options,
    { it = defaultItFn } = setup,
    cxBase = cx(base),
    variantGroup = Object.entries(variants).reduce((obj, [key, value]) => {
      obj[key as keyof typeof obj] = variant<T[keyof T]>({ variant: value as any, defaultVariant: defaultVariants?.[key] as any });
      return obj;
    }, {} as VariantGroup<T>),
    keyofVariants = Object.keys(variants) as (keyof T)[],
    hasCompoundVariants = isArray(compoundVariants),
    cxCompoundVariants = hasCompoundVariants ? compoundVariants.map(cxCompoundVariantsMapFn) : [],
    fn: Omit<KlassFn<T>, "options" | "variant" | "variantKeys"> = (props?: { [K in keyof T]?: GetKey<keyof T[K]> }, ...classes: ClassValue[]) => {
      let result: string = "",
        i: number,
        temp: string | undefined;

      for (i = 0; i < keyofVariants.length; i++) {
        if ((temp = variantGroup[keyofVariants[i]](props?.[keyofVariants[i]]))) {
          result && (result += " ");
          result += temp;
        }
      }

      if (hasCompoundVariants) {
        for (i = 0; i < cxCompoundVariants.length; i++) {
          let { c, v } = cxCompoundVariants[i];
          if (
            Object.keys(v).every((key) =>
              typeof v[key as keyof typeof v] === "undefined"
                ? false
                : typeof props?.[key] !== "undefined"
                ? props?.[key] === v[key as keyof typeof v]
                : defaultVariants?.[key] === v[key as keyof typeof v]
            )
          ) {
            result && (result += " ");
            result += c;
          }
        }
      }

      return it(cx([cxBase, result, classes]));
    };

  (fn as KlassFn<T>).options = options;
  (fn as KlassFn<T>).variant = variantGroup;
  (fn as KlassFn<T>).variantKeys = keyofVariants;

  return fn as KlassFn<T>;
}

function revariant<C extends ConditionSchema, T extends VariantsSchema[string]>(options: RevariantOptions<C, T>, setup: { as?: AsCondition } = {}) {
  const { conditions, defaultCondition, variant } = options,
    { as = defaultAsCondition } = setup,
    keyofConditions = Object.keys(conditions) as (keyof C)[],
    inVariant = (value: unknown) => isPropertyKey(value) && value in variant,
    asCondition = as === "suffix" ? defaultAsSuffixFn : defaultAsPrefixFn,
    fn: Omit<RevariantFn<C, T>, "options"> = (props?: GetKey<keyof T> | { [condition in keyof C]?: GetKey<keyof T> }) => {
      let key: string | GetKey<keyof T>;

      return typeof props !== "object"
        ? inVariant((key = getPropKey<T>(props)))
          ? asCondition(conditions[defaultCondition], cx(variant[key]))
          : undefined
        : cx(keyofConditions.map((condition) => condition in props && inVariant((key = getPropKey<T>(props[condition]))) && asCondition(conditions[condition], cx(variant[key]))));
    };

  (fn as RevariantFn<C, T>).options = options;

  return fn as RevariantFn<C, T>;
}

function reklass<C extends ConditionSchema, T extends VariantsSchema>(options: ReklassOptions<C, T>, setup: { as?: AsCondition; it?: ItFn } = {}) {
  const { conditions, defaultCondition, variants } = options,
    { as, it = defaultItFn } = setup,
    revariantGroup = Object.entries(variants).reduce((obj, [key, value]) => {
      obj[key as keyof typeof obj] = revariant<C, T[keyof T]>({ conditions, defaultCondition, variant: value as any }, { as });
      return obj;
    }, {} as RevariantGroup<C, T>),
    keyofVariants = Object.keys(variants) as (keyof T)[],
    fn: Omit<ReklassFn<C, T>, "options" | "revariant" | "revariantKeys"> = (
      props?: {
        [K in keyof T]?: GetKey<keyof T[K]> | { [condition in keyof C]?: GetKey<keyof T[K]> };
      },
      ...classes: ClassValue[]
    ) => {
      return it(cx([keyofVariants.map((key) => revariantGroup[key](props?.[key])), classes]));
    };

  (fn as ReklassFn<C, T>).options = options;
  (fn as ReklassFn<C, T>).revariant = revariantGroup;
  (fn as ReklassFn<C, T>).revariantKeys = keyofVariants;

  return fn as ReklassFn<C, T>;
}

export type {
  ClassValue,
  CompoundVariant,
  ConditionSchema,
  GetKey,
  ItFn,
  AsCondition,
  AsConditionFn,
  KlassFn,
  KlassOptions,
  ReklassFn,
  ReklassOptions,
  RevariantFn,
  RevariantGroup,
  RevariantOptions,
  VariantFn,
  VariantGroup,
  VariantOptions,
  VariantsOf,
  VariantsSchema,
};
export { cxs, klass, reklass, revariant, variant };
