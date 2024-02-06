import { computed, defineComponent, h } from "vue";

import { klass, reklass } from "@klass/core";
import type { ClassValue, EndFn, AsFn, KlassOptions, KlassFn, ConditionSchema, ReklassOptions, ReklassFn } from "@klass/core";

import type { FinalVariantsSchema, KlassedComponent, ReklassedComponent } from "./types/index.ts";
import type { SupportedElementType, ClassesProps } from "./types/vue.ts";
import type { PolymorphicComponentProps } from "./types/polymorphic.ts";

import { getVariantKeys, splitRestProps, typeofFunction } from "./utils.ts";

const defaultComponentOptions = {
  props: ["as", "class"] as any,
  inheritAttrs: false,
};

function klassed<ET extends SupportedElementType, VS extends FinalVariantsSchema>(
  element: ET,
  options: KlassOptions<VS> | KlassFn<VS>,
  config: {
    dp?: PolymorphicComponentProps<ET, {}>;
    end?: EndFn;
  } = {}
): KlassedComponent<ET, VS> {
  const { class: defaultClass, ...defaultProps } = (config.dp ?? {}) as ClassesProps,
    klassFn = typeofFunction(options) ? options : klass<VS>(options, config),
    keys = getVariantKeys<VS>(klassFn.vk);

  const Component = defineComponent((props, { attrs, slots }) => {
    const splitted = computed(() => splitRestProps(attrs, keys));

    return () => h(props.as ?? element, { ...defaultProps, ...(splitted.value.o as any), class: klassFn(splitted.value.p, (props.class ?? defaultClass) as ClassValue) }, slots);
  }, defaultComponentOptions) as KlassedComponent<ET, VS>;

  return (Component.klass = klassFn), Component;
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
  const { class: defaultClass, ...defaultProps } = (config.dp ?? {}) as ClassesProps,
    reklassFn = typeofFunction(options) ? options : reklass<CS, VS>(options, config),
    keys = getVariantKeys<VS>(reklassFn.rvk);

  const Component = defineComponent((props, { attrs, slots }) => {
    const splitted = computed(() => splitRestProps(attrs, keys));

    return () => h(props.as ?? element, { ...defaultProps, ...(splitted.value.o as any), class: reklassFn(splitted.value.p, (props.class ?? defaultClass) as ClassValue) }, slots);
  }, defaultComponentOptions) as ReklassedComponent<ET, CS, VS>;

  return (Component.reklass = reklassFn), Component;
}

export { klassed, reklassed };
