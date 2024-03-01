import React from "react";

import { klass, reklass } from "@klass/core";
import type { KlassFn, ConditionSchema, ReklassFn } from "@klass/core";
import { typeofFunction } from "@klass/core/utils";

import type { FinalVariantsSchema, KlassedOptions, ReklassedOptions, DefaultPropsConfig, KlassedConfig, ReklassedConfig, KlassedComponent, ReklassedComponent } from "./types";
import type { SupportedElementType, ClassesProps } from "./types/react";
import type { PolymorphicComponentProps, PolymorphicRef } from "./types/polymorphic";

import { getVariantKeys, splitRestProps } from "./utils";

function create<ET extends SupportedElementType, VS extends FinalVariantsSchema>(element: ET, fn: KlassFn<VS> | ReklassFn<any, VS>, config: DefaultPropsConfig = {}) {
  const { className: defaultClassName, ...defaultProps } = (config.dp ?? {}) as ClassesProps,
    keys = getVariantKeys(fn.k);

  return React.forwardRef<any, PolymorphicComponentProps<ET, ClassesProps>>(({ as: As = element as any, className = defaultClassName, ...rest }, ref?: PolymorphicRef<SupportedElementType>) => {
    const splitted = splitRestProps(rest, keys);

    return <As {...defaultProps} {...(splitted.o as any)} ref={ref} className={fn(splitted.p, className)} />;
  });
}

function klassed<ET extends SupportedElementType, VS extends FinalVariantsSchema>(element: ET, options: KlassedOptions<VS>, config?: KlassedConfig<ET>): KlassedComponent<ET, VS> {
  const fn = typeofFunction(options) ? options : klass<VS>(options, config);
  const Component = create(element, fn, config) as unknown as KlassedComponent<ET, VS>;
  return (Component.klass = fn), Component;
}

function reklassed<ET extends SupportedElementType, CS extends ConditionSchema, VS extends FinalVariantsSchema>(
  element: ET,
  options: ReklassedOptions<CS, VS>,
  config?: ReklassedConfig<ET>
): ReklassedComponent<ET, CS, VS> {
  const fn = typeofFunction(options) ? options : reklass<CS, VS>(options, config);
  const Component = create(element, fn, config) as unknown as ReklassedComponent<ET, CS, VS>;
  return (Component.reklass = fn), Component;
}

export type { KlassedComponent, ReklassedComponent };
export { klassed, reklassed };
