import { klass, reklass } from "@klass/core";
import type { KlassFn, ConditionSchema, ReklassFn } from "@klass/core";
import { typeofFunction } from "@klass/core/utils";

import { FinalVariantsSchema, KlassedOptions, ReklassedOptions, DefaultPropsConfig, ForwardPropsConfig } from "./../types";
import type { SupportedElementType, ClassesProps } from "./../types/preact";

import { getVariantKeys, splitRestProps, maybeSignal } from "./../utils";

import type { KlassedConfig, ReklassedConfig, MonoKlassedComponent, MonoReklassedComponent } from "./types";

function create<ET extends SupportedElementType, VS extends FinalVariantsSchema>(Element: ET, fn: KlassFn<VS> | ReklassFn<any, VS>, config: DefaultPropsConfig & ForwardPropsConfig = {}) {
  const { class: defaultClass, className: defaultClassName, ...defaultProps } = (config.dp ?? {}) as ClassesProps,
    keys = getVariantKeys(fn.k);

  return (({ class: _class = defaultClass, className = defaultClassName, ...rest }) => {
    const splitted = splitRestProps(rest, keys, config.fp);

    return <Element {...defaultProps} {...(splitted.o as any)} class={fn(splitted.p, maybeSignal(_class ?? className))} />;
  }) as any;
}

function klassed<ET extends SupportedElementType, VS extends FinalVariantsSchema>(element: ET, options: KlassedOptions<VS>, config?: KlassedConfig<ET, VS>): MonoKlassedComponent<ET, VS> {
  const fn = typeofFunction(options) ? options : klass<VS>(options, config);
  const Component = create(element, fn, config) as MonoKlassedComponent<ET, VS>;
  return (Component.klass = fn), Component;
}

function reklassed<ET extends SupportedElementType, CS extends ConditionSchema, VS extends FinalVariantsSchema>(
  element: ET,
  options: ReklassedOptions<CS, VS>,
  config?: ReklassedConfig<ET, VS>
): MonoReklassedComponent<ET, CS, VS> {
  const fn = typeofFunction(options) ? options : reklass<CS, VS>(options, config);
  const Component = create(element, fn, config) as MonoReklassedComponent<ET, CS, VS>;
  return (Component.reklass = fn), Component;
}

export type { MonoKlassedComponent, MonoReklassedComponent };
export { klassed, reklassed };
