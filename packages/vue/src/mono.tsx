import { computed, defineComponent, h } from "vue";

import { klass, reklass } from "@klass/core";
import type { ClassValue, EndFn, AsFn, VariantsOf, KlassOptions, KlassFn, ConditionSchema, ReklassOptions, ReklassFn } from "@klass/core";

import { FinalVariantsSchema, WithClassesValueProps, KlassedBase, ReklassedBase } from "./types";
import type { SupportedComponentProps, SupportedElementType, ClassesProps } from "./types/vue";

import { getVariantKeys, splitRestProps, typeofFunction } from "./utils";

export type KlassedComponent<ET extends SupportedElementType, VS extends FinalVariantsSchema> = {
  (props: WithClassesValueProps<SupportedComponentProps<ET> & VariantsOf<KlassFn<VS>>>): any;
} & KlassedBase<VS>;

export type ReklassedComponent<ET extends SupportedElementType, CS extends ConditionSchema, VS extends FinalVariantsSchema> = {
  (props: WithClassesValueProps<SupportedComponentProps<ET> & VariantsOf<ReklassFn<CS, VS>>>): any;
} & ReklassedBase<CS, VS>;

const defaultComponentOptions = {
  props: ["as", "class"] as any,
  inheritAttrs: false,
};

function klassed<ET extends SupportedElementType, VS extends FinalVariantsSchema>(
  Element: ET,
  options: KlassOptions<VS> | KlassFn<VS>,
  config: {
    dp?: SupportedComponentProps<ET>;
    end?: EndFn;
  } = {}
): KlassedComponent<ET, VS> {
  const { class: defaultClass, ...defaultProps } = (config.dp ?? {}) as ClassesProps,
    klassFn = typeofFunction(options) ? options : klass<VS>(options, config),
    keys = getVariantKeys<VS>(klassFn.k);

  const Component = defineComponent<WithClassesValueProps<{}>>((props, { attrs, slots }) => {
    const splitted = computed(() => splitRestProps(attrs, keys));

    return () => h(Element, { ...defaultProps, ...(splitted.value.o as any), class: klassFn(splitted.value.p, (props.class ?? defaultClass) as ClassValue) }, slots);
  }, defaultComponentOptions) as unknown as KlassedComponent<ET, VS>;

  return (Component.klass = klassFn), Component;
}

function reklassed<ET extends SupportedElementType, CS extends ConditionSchema, VS extends FinalVariantsSchema>(
  Element: ET,
  options: ReklassOptions<CS, VS> | ReklassFn<CS, VS>,
  config: {
    dp?: SupportedComponentProps<ET>;
    as?: AsFn;
    end?: EndFn;
  } = {}
): ReklassedComponent<ET, CS, VS> {
  const { class: defaultClass, ...defaultProps } = (config.dp ?? {}) as ClassesProps,
    reklassFn = typeofFunction(options) ? options : reklass<CS, VS>(options, config),
    keys = getVariantKeys<VS>(reklassFn.k);

  const Component = defineComponent<WithClassesValueProps<{}>>((props, { attrs, slots }) => {
    const splitted = computed(() => splitRestProps(attrs, keys));

    return () => h(Element, { ...defaultProps, ...(splitted.value.o as any), class: reklassFn(splitted.value.p, (props.class ?? defaultClass) as ClassValue) }, slots);
  }, defaultComponentOptions) as unknown as ReklassedComponent<ET, CS, VS>;

  return (Component.reklass = reklassFn), Component;
}

export { klassed, reklassed };
