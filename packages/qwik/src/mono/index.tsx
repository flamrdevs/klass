import { jsx } from "@builder.io/qwik";

import { klass, reklass } from "@klass/core";
import type { KlassFn, ConditionSchema, ReklassFn } from "@klass/core";
import { typeofFunction } from "@klass/core/utils";

import { FinalVariantsSchema, KlassedOptions, ReklassedOptions, DefaultPropsConfig, ForwardPropsConfig } from "./../types";
import type { SupportedElementType, ClassesProps } from "./../types/qwik";

import { getVariantKeys, splitRestProps, maybeSignal } from "./../utils";

import type { KlassedConfig, ReklassedConfig, MonoKlassedComponent, MonoReklassedComponent } from "./types";

function create<ET extends SupportedElementType>(element: ET, fn: KlassFn<Record<any, any>> | ReklassFn<any, Record<any, any>>, config: DefaultPropsConfig & ForwardPropsConfig = {}) {
  const { class: defaultClass, ...defaultProps } = (config.dp ?? {}) as ClassesProps,
    keys = getVariantKeys(fn.k);

  const Comp = (({ class: _class = defaultClass, ...rest }) => {
    const splitted = splitRestProps(rest, keys, config.fp);

    return jsx(element, { ...defaultProps, ...(splitted.o as any), class: fn(splitted.p, maybeSignal(_class)) });
  }) as any;

  return (Comp.fx = fn), Comp;
}

function klassed<ET extends SupportedElementType, VS extends FinalVariantsSchema>(element: ET, options: KlassedOptions<VS>, config?: KlassedConfig<ET, VS>): MonoKlassedComponent<ET, VS> {
  return create(element, typeofFunction(options) ? options : klass<VS>(options, config), config) as MonoKlassedComponent<ET, VS>;
}

function reklassed<ET extends SupportedElementType, CS extends ConditionSchema, VS extends FinalVariantsSchema>(
  element: ET,
  options: ReklassedOptions<CS, VS>,
  config?: ReklassedConfig<ET, VS>
): MonoReklassedComponent<ET, CS, VS> {
  return create(element, typeofFunction(options) ? options : reklass<CS, VS>(options, config), config) as MonoReklassedComponent<ET, CS, VS>;
}

export type { MonoKlassedComponent, MonoReklassedComponent };
export { klassed, reklassed };
