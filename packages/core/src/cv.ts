export type ClassValue = string | false | 0 | null | undefined | ClassValue[];

export type ClassKey = "className";
export type ClassObj = { className?: ClassValue };

export const cx = (classes: ClassValue[]) => {
  let result = "";

  for (let idx = 0, len = classes.length; idx < len; idx++) {
    let value = classes[idx];

    if (Array.isArray(value)) {
      value = cx(value);
    }

    if (typeof value === "string" && value) {
      result && (result += " ");
      result += value;
    }
  }

  return result;
};

const coerceKey = <T extends unknown>(value: T) => {
  return typeof value === "boolean" ? `${value}` : value === 0 ? "0" : value;
};

type OmitUndefined<T> = T extends undefined ? never : T;
type StringToBoolean<T> = T extends "true" | "false" ? boolean : T;

type ConfigSchema = Record<string, Record<string, ClassValue>>;

type ConfigVariants<T> = T extends ConfigSchema ? { [Variant in keyof T]?: StringToBoolean<keyof T[Variant]> | null } : never;

type ConfigMultiVariants<T> = T extends ConfigSchema
  ? { [Variant in keyof T]?: StringToBoolean<keyof T[Variant]> | StringToBoolean<keyof T[Variant]>[] | null }
  : never;

type Config<T> = T extends ConfigSchema
  ? {
      variants: T;
      defaultVariants?: ConfigVariants<T>;
      compoundVariants?: (T extends ConfigSchema ? ConfigMultiVariants<T> & ClassObj : ClassObj)[];
    }
  : never;

type Props<T> = T extends ConfigSchema ? ConfigVariants<T> & ClassObj : ClassObj;

type InternalSchema = Record<string, Record<string, string>>;
type InternalVariants<T> = ConfigVariants<T> & { className: string };

export type VariantProps<Component extends (...args: any) => any> = Omit<OmitUndefined<Parameters<Component>[0]>, "className">;

const rv = (className: ClassValue) => {
  return Array.isArray(className) ? cx(className) : className || "";
};

export const cv = <T>(base: ClassValue, config?: Config<T>) => {
  const resolvedBase = rv(base);

  let variants: InternalSchema | undefined;
  let compoundVariants: InternalVariants<T>[] | undefined;
  let defaultVariants: ConfigVariants<T> | undefined;

  if (config) {
    const confVariants = config.variants;
    const confCompoundVariants = config.compoundVariants;

    defaultVariants = config.defaultVariants;

    for (const variant in confVariants) {
      const confElements = confVariants[variant];
      const elements: Record<string, string> = {};

      for (const element in confElements) {
        const elementClass = confElements[element];

        const resolvedElementClass = rv(elementClass);
        elements[element] = resolvedElementClass;
      }

      if (!variants) {
        variants = {};
      }

      variants[variant] = elements;
    }

    if (confCompoundVariants) {
      for (let idx = 0, len = confCompoundVariants.length; idx < len; idx++) {
        const options = confCompoundVariants[idx];
        const className = options.className;

        const resolvedClassName = rv(className);

        if (!resolvedClassName) {
          continue;
        }

        if (!compoundVariants) {
          compoundVariants = [];
        }

        // @ts-expect-error
        compoundVariants.push({ ...options, className: resolvedClassName });
      }
    }
  }

  return (props?: Props<T>) => {
    const className = props && props.className;

    if (!variants) {
      if (typeof className === "string") {
        return resolvedBase + " " + className;
      }

      if (Array.isArray(className)) {
        return resolvedBase + " " + cx(className);
      }

      return resolvedBase;
    }

    let result = resolvedBase;

    let combinedProps: Record<string, unknown>;

    if (defaultVariants) {
      combinedProps = { ...defaultVariants };

      for (const key in props) {
        const value = props[key];

        if (value === undefined) {
          continue;
        }

        combinedProps[key] = value;
      }
    } else {
      combinedProps = (props as any) || {};
    }

    for (const variant in variants) {
      const variantProp = combinedProps[variant as keyof typeof props];

      if (variantProp === null) {
        continue;
      }

      const variantKey = coerceKey(variantProp) as keyof (typeof variants)[typeof variant];
      const variantClass = variants[variant][variantKey];

      if (variantClass) {
        result += " " + variantClass;
      }
    }

    if (compoundVariants) {
      loop: for (let idx = 0, len = compoundVariants.length; idx < len; idx++) {
        const compoundOptions = compoundVariants[idx];

        for (const key in compoundOptions) {
          if (key === "className") {
            continue;
          }

          const match = compoundOptions[key];
          const value = combinedProps[key];

          if (Array.isArray(match)) {
            if (!match.includes(value)) {
              continue loop;
            }
          } else if (match !== value) {
            continue loop;
          }
        }

        result += " " + compoundOptions.className;
      }
    }

    if (typeof className === "string") {
      return result + " " + className;
    }

    if (Array.isArray(className)) {
      return result + " " + cx(className);
    }

    return result;
  };
};
