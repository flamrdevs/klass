import { computed, defineComponent, h } from "vue";

import { klass, reklass } from "@klass/core";
import type { ClassValue, KlassFn, ConditionSchema, ReklassFn, Fx, ComposeFn } from "@klass/core";
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
import type { SupportedElementType, ClassesProps } from "./types/vue";
import type { PolymorphicComponentProps } from "./types/polymorphic";

import { getVariantKeys, splitRestProps } from "./utils";

const defaultComponentOptions = {
  props: ["as", "class"] as any,
  inheritAttrs: false,
};

function create<ET extends SupportedElementType>(element: ET, fn: KlassFn<Record<any, any>> | ReklassFn<any, Record<any, any>> | ComposeFn<any>, config: DefaultPropsConfig & ForwardPropsConfig = {}) {
  const { class: defaultClass, ...defaultProps } = (config.dp ?? {}) as ClassesProps,
    keys = getVariantKeys(fn.k);

  const Comp = defineComponent<PolymorphicComponentProps<ET, ClassesProps>>((props, { attrs, slots }) => {
    const splitted = computed(() => splitRestProps(attrs, keys, config.fp));

    return () => h(props.as ?? element, { ...defaultProps, ...(splitted.value.o as any), class: fn(splitted.value.p, (props.class ?? defaultClass) as ClassValue) }, slots);
  }, defaultComponentOptions) as any;

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
