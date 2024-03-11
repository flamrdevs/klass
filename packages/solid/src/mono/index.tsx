import { Dynamic } from "solid-js/web";
import { mergeProps, splitProps } from "solid-js";

import { klass, reklass } from "@klass/core";
import type { KlassFn, ConditionSchema, ReklassFn } from "@klass/core";
import { typeofFunction } from "@klass/core/utils";

import { FinalVariantsSchema, KlassedOptions, ReklassedOptions, DefaultPropsConfig, ForwardPropsConfig } from "./../types";
import type { SupportedElementType, ClassesProps } from "./../types/solid";

import { getVariantKeys, ClassesKeysSplitter, classesProps } from "./../utils";

import type { KlassedConfig, ReklassedConfig, MonoKlassedComponent, MonoReklassedComponent } from "./types";

function create<ET extends SupportedElementType, VS extends FinalVariantsSchema>(element: ET, fn: KlassFn<VS> | ReklassFn<any, VS>, config: DefaultPropsConfig & ForwardPropsConfig = {}) {
  const { class: defaultClass, classList: defaultClassList, ...defaultProps } = (config.dp ?? {}) as ClassesProps,
    keys = getVariantKeys(fn.k),
    fp = config.fp ?? [];

  const Comp = ((props: any) => {
    const [classes, picked, omited] = splitProps(props, ClassesKeysSplitter, keys as any);
    const [forward] = splitProps(picked, fp);

    return <Dynamic component={element} {...(mergeProps(defaultProps, omited) as any)} {...forward} class={fn(picked as any, classesProps(classes, defaultClass, defaultClassList))} />;
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
