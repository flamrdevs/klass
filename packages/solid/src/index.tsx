import { Dynamic } from "solid-js/web";
import { mergeProps, splitProps } from "solid-js";

import { klass, reklass } from "@klass/core";
import type { KlassFn, ConditionSchema, ReklassFn, Fx, ComposeFn } from "@klass/core";
import { typeofFunction } from "@klass/core/utils";

import type {
  FinalVariantsSchema,
  KlassedOptions,
  ReklassedOptions,
  DefaultPropsConfig,
  ForwardPropsConfig,
  KlassedConfig,
  ReklassedConfig,
  ComposedConfig,
  KlassedComponent,
  ReklassedComponent,
  ComposedComponent,
} from "./types";
import type { SupportedElementType, ClassesProps } from "./types/solid";

import { getVariantKeys, PolymorphicKeysSplitter, ClassesKeysSplitter, classesProps } from "./utils";

function create<ET extends SupportedElementType>(element: ET, fn: KlassFn<Record<any, any>> | ReklassFn<any, Record<any, any>> | ComposeFn<any>, config: DefaultPropsConfig & ForwardPropsConfig = {}) {
  const { class: defaultClass, classList: defaultClassList, ...defaultProps } = (config.dp ?? {}) as ClassesProps,
    keys = getVariantKeys(fn.k),
    fp = config.fp ?? [];

  const Comp = ((props: any) => {
    const [polymorphic, classes, picked, omited] = splitProps(props, PolymorphicKeysSplitter, ClassesKeysSplitter, keys as any);
    const [forward] = splitProps(picked, fp);

    return (
      <Dynamic component={polymorphic.as ?? element} {...(mergeProps(defaultProps, omited) as any)} {...forward} class={fn(picked as any, classesProps(classes, defaultClass, defaultClassList))} />
    );
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

function composed<ET extends SupportedElementType, Fn extends Fx>(element: ET, fn: ComposeFn<Fn>, config?: ComposedConfig<ET, Fn>): ComposedComponent<ET, Fn> {
  return create(element, fn, config) as ComposedComponent<ET, Fn>;
}

export type { KlassedComponent, ReklassedComponent, ComposedComponent };
export { klassed, reklassed, composed };
