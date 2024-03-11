import { klass, reklass } from "@klass/core";
import type { KlassFn, ConditionSchema, ReklassFn } from "@klass/core";
import { typeofFunction } from "@klass/core/utils";

import type { FinalVariantsSchema, KlassedOptions, ReklassedOptions, DefaultPropsConfig, ForwardPropsConfig, KlassedConfig, ReklassedConfig, KlassedComponent, ReklassedComponent } from "./types";
import type { SupportedElementType, ClassesProps } from "./types/preact";

import { getVariantKeys, splitRestProps, maybeSignal } from "./utils";

function create<ET extends SupportedElementType, VS extends FinalVariantsSchema>(element: ET, fn: KlassFn<VS> | ReklassFn<any, VS>, config: DefaultPropsConfig & ForwardPropsConfig = {}) {
  const { class: defaultClass, className: defaultClassName, ...defaultProps } = (config.dp ?? {}) as ClassesProps,
    keys = getVariantKeys(fn.k);

  const Comp = (({ as: As = element as any, class: _class = defaultClass, className = defaultClassName, ...rest }) => {
    const splitted = splitRestProps(rest, keys, config.fp);

    return <As {...defaultProps} {...(splitted.o as any)} class={fn(splitted.p, maybeSignal(_class ?? className))} />;
  }) as any;

  return (Comp.fx = fn), Comp;
}

function klassed<ET extends SupportedElementType, VS extends FinalVariantsSchema>(element: ET, options: KlassedOptions<VS>, config?: KlassedConfig<ET, VS>): KlassedComponent<ET, VS> {
  return create(element, typeofFunction(options) ? options : klass<VS>(options, config), config) as KlassedComponent<ET, VS>;
}

function reklassed<ET extends SupportedElementType, CS extends ConditionSchema, VS extends FinalVariantsSchema>(
  element: ET,
  options: ReklassedOptions<CS, VS>,
  config?: ReklassedConfig<ET, VS>
): ReklassedComponent<ET, CS, VS> {
  return create(element, typeofFunction(options) ? options : reklass<CS, VS>(options, config), config) as ReklassedComponent<ET, CS, VS>;
}

export type { KlassedComponent, ReklassedComponent };
export { klassed, reklassed };
