import React from "react";

import { klass, reklass } from "@klass/core";
import type { EndFn, AsFn, KlassOptions, KlassFn, ConditionSchema, ReklassOptions, ReklassFn } from "@klass/core";

import type { FinalVariantsSchema, KlassedComponent, ReklassedComponent } from "./types";
import type { SupportedElementType, ClassesProps } from "./types/react";
import type { PolymorphicComponentProps, PolymorphicRef } from "./types/polymorphic";

import { getVariantKeys, splitRestProps, typeofFunction } from "./utils";

function klassed<ET extends SupportedElementType, VS extends FinalVariantsSchema>(
  element: ET,
  options: KlassOptions<VS> | KlassFn<VS>,
  config: {
    dp?: PolymorphicComponentProps<ET, {}>;
    end?: EndFn;
  } = {}
): KlassedComponent<ET, VS> {
  const { className: defaultClassName, ...defaultProps } = (config.dp ?? {}) as ClassesProps,
    klassFn = typeofFunction(options) ? options : klass<VS>(options, config),
    keys = getVariantKeys<VS>(klassFn.k);

  const Component = React.forwardRef<any, any>(({ as: As = element as any, className = defaultClassName, ...rest }, ref?: PolymorphicRef<SupportedElementType>) => {
    const splitted = splitRestProps(rest, keys);

    return <As {...defaultProps} {...(splitted.o as any)} ref={ref} className={klassFn(splitted.p, className)} />;
  }) as unknown as KlassedComponent<ET, VS>;

  return (Component.klass = klassFn), Component;
}

function reklassed<ET extends SupportedElementType, CS extends ConditionSchema, VS extends FinalVariantsSchema>(
  element: ET,
  options: ReklassOptions<CS, VS> | ReklassFn<CS, VS>,
  config: {
    dp?: PolymorphicComponentProps<ET, {}>;
    as?: AsFn;
    end?: EndFn;
  } = {}
): ReklassedComponent<ET, CS, VS> {
  const { className: defaultClassName, ...defaultProps } = (config.dp ?? {}) as ClassesProps,
    reklassFn = typeofFunction(options) ? options : reklass<CS, VS>(options, config),
    keys = getVariantKeys<VS>(reklassFn.k);

  const Component = React.forwardRef<any, any>(({ as: As = element as any, className = defaultClassName, ...rest }, ref?: PolymorphicRef<SupportedElementType>) => {
    const splitted = splitRestProps(rest, keys);

    return <As {...defaultProps} {...(splitted.o as any)} ref={ref} className={reklassFn(splitted.p, className)} />;
  }) as unknown as ReklassedComponent<ET, CS, VS>;

  return (Component.reklass = reklassFn), Component;
}

export type { KlassedComponent, ReklassedComponent };
export { klassed, reklassed };
