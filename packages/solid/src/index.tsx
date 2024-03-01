import { Dynamic } from "solid-js/web";
import { mergeProps, splitProps } from "solid-js";

import { klass, reklass } from "@klass/core";
import type { KlassFn, ConditionSchema, ReklassFn } from "@klass/core";
import { typeofFunction } from "@klass/core/utils";

import type { FinalVariantsSchema, KlassedOptions, ReklassedOptions, DefaultPropsConfig, KlassedConfig, ReklassedConfig, KlassedComponent, ReklassedComponent } from "./types";
import type { SupportedElementType, ClassesProps } from "./types/solid";

import { getVariantKeys, PolymorphicKeysSplitter, ClassesKeysSplitter, classesProps } from "./utils";

function create<ET extends SupportedElementType, VS extends FinalVariantsSchema>(element: ET, fn: KlassFn<VS> | ReklassFn<any, VS>, config: DefaultPropsConfig = {}) {
  const { class: defaultClass, classList: defaultClassList, ...defaultProps } = (config.dp ?? {}) as ClassesProps,
    keys = getVariantKeys(fn.k);

  return ((props: any) => {
    const [polymorphic, classes, picked, omited] = splitProps(props, PolymorphicKeysSplitter, ClassesKeysSplitter, keys as any);

    return <Dynamic component={polymorphic.as ?? element} {...(mergeProps(defaultProps, omited) as any)} class={fn(picked as any, classesProps(classes, defaultClass, defaultClassList))} />;
  }) as any;
}

function klassed<ET extends SupportedElementType, VS extends FinalVariantsSchema>(element: ET, options: KlassedOptions<VS>, config?: KlassedConfig<ET>): KlassedComponent<ET, VS> {
  const fn = typeofFunction(options) ? options : klass<VS>(options, config);
  const Component = create(element, fn, config) as KlassedComponent<ET, VS>;
  return (Component.klass = fn), Component;
}

function reklassed<ET extends SupportedElementType, CS extends ConditionSchema, VS extends FinalVariantsSchema>(
  element: ET,
  options: ReklassedOptions<CS, VS>,
  config?: ReklassedConfig<ET>
): ReklassedComponent<ET, CS, VS> {
  const fn = typeofFunction(options) ? options : reklass<CS, VS>(options, config);
  const Component = create(element, fn, config) as ReklassedComponent<ET, CS, VS>;
  return (Component.reklass = fn), Component;
}

export type { KlassedComponent, ReklassedComponent };
export { klassed, reklassed };
