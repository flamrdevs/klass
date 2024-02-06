import React from "react";

import { klass, reklass } from "@klass/core";
import type { EndFn, AsFn, KlassOptions, KlassFn, ConditionSchema, ReklassOptions, ReklassFn } from "@klass/core";

import type { FinalVariantsSchema, KlassedComponent, ReklassedComponent } from "./types/index.ts";
import type { SupportedElementType, ClassesProps } from "./types/react.ts";
import type { PolymorphicComponentProps, PolymorphicRef } from "./types/polymorphic.ts";

import { getVariantKeys, splitRestProps } from "./utils.ts";

function klassed<ET extends SupportedElementType, VS extends FinalVariantsSchema>(
  element: ET,
  options: KlassOptions<VS> | KlassFn<VS>,
  config: {
    dp?: PolymorphicComponentProps<ET, {}>;
    end?: EndFn;
  } = {}
): KlassedComponent<ET, VS> {
  const { className: defaultClassName, ...defaultProps } = (config.dp ?? {}) as ClassesProps,
    klassFn = typeof options === "function" ? options : klass<VS>(options, config),
    keys = getVariantKeys<VS>(klassFn.vk);

  const Component = React.forwardRef<any, any>(({ as: As = element as any, className = defaultClassName, ...rest }, ref?: PolymorphicRef<SupportedElementType>) => {
    const splitted = splitRestProps(rest, keys);

    return <As {...defaultProps} {...(splitted.o as any)} ref={ref} className={klassFn(splitted.p, className)} />;
  }) as unknown as KlassedComponent<ET, VS>;

  Component.klass = klassFn;

  return Component;
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
    reklassFn = typeof options === "function" ? options : reklass<CS, VS>(options, config),
    keys = getVariantKeys<VS>(reklassFn.rvk);

  const Component = React.forwardRef<any, any>(({ as: As = element as any, className = defaultClassName, ...rest }, ref?: PolymorphicRef<SupportedElementType>) => {
    const splitted = splitRestProps(rest, keys);

    return <As {...defaultProps} {...(splitted.o as any)} ref={ref} className={reklassFn(splitted.p, className)} />;
  }) as unknown as ReklassedComponent<ET, CS, VS>;

  Component.reklass = reklassFn;

  return Component;
}

export { klassed, reklassed };
