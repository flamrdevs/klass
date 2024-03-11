import React from "react";

import { klass, reklass } from "@klass/core";
import type { KlassFn, ConditionSchema, ReklassFn } from "@klass/core";
import { typeofFunction } from "@klass/core/utils";

import { FinalVariantsSchema, WithClassesValueProps, KlassedOptions, ReklassedOptions, DefaultPropsConfig, ForwardPropsConfig } from "./../types";
import type { SupportedElementType, ClassesProps } from "./../types/react";

import { getVariantKeys, splitRestProps } from "./../utils";

import type { KlassedConfig, ReklassedConfig, MonoKlassedComponent, MonoReklassedComponent } from "./types";

function create<ET extends SupportedElementType, VS extends FinalVariantsSchema>(Element: ET, fn: KlassFn<VS> | ReklassFn<any, VS>, config: DefaultPropsConfig & ForwardPropsConfig = {}) {
  const { className: defaultClassName, ...defaultProps } = (config.dp ?? {}) as ClassesProps,
    keys = getVariantKeys(fn.k);

  const Comp = React.forwardRef<any, WithClassesValueProps<{}>>(({ className = defaultClassName, ...rest }, ref) => {
    const splitted = splitRestProps(rest, keys, config.fp);

    return <Element {...defaultProps} {...(splitted.o as any)} ref={ref} className={fn(splitted.p, className)} />;
  }) as any;

  return (Comp.fx = fn), Comp;
}

function klassed<ET extends SupportedElementType, VS extends FinalVariantsSchema>(element: ET, options: KlassedOptions<VS>, config?: KlassedConfig<ET, VS>): MonoKlassedComponent<ET, VS> {
  return create(element, typeofFunction(options) ? options : klass<VS>(options, config), config) as unknown as MonoKlassedComponent<ET, VS>;
}

function reklassed<ET extends SupportedElementType, CS extends ConditionSchema, VS extends FinalVariantsSchema>(
  element: ET,
  options: ReklassedOptions<CS, VS>,
  config?: ReklassedConfig<ET, VS>
): MonoReklassedComponent<ET, CS, VS> {
  return create(element, typeofFunction(options) ? options : reklass<CS, VS>(options, config), config) as unknown as MonoReklassedComponent<ET, CS, VS>;
}

export type { MonoKlassedComponent, MonoReklassedComponent };
export { klassed, reklassed };
