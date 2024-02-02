import { computed, defineComponent, h } from "vue";
import type { SetupContext } from "vue";

import { klass, reklass } from "@klass/core";
import type { KlassOptions, KlassFn, VariantsOf, ConditionSchema, ReklassOptions, ReklassFn, EndFn, AsFn, ClassValue } from "@klass/core";

import type { WithClassesValueProps, FinalVariantsSchema, KlassedComponent, ReklassedComponent } from "./types/index.ts";
import type { ElementType, ClassesProps } from "./types/vue.ts";
import type { PolymorphicComponentProp } from "./types/polymorphic.ts";

import { getVariantKeys, splitRestProps } from "./utils.ts";

const defaultComponentOptions = {
  props: ["as", "class"] as any,
  inheritAttrs: false,
};

function klassed<ET extends ElementType, VS extends FinalVariantsSchema>(
  element: ET,
  options: KlassOptions<VS> | KlassFn<VS>,
  config: {
    dp?: PolymorphicComponentProp<ET, {}>;
    end?: EndFn;
  } = {}
): KlassedComponent<ET, VS> {
  const { class: defaultClass, ...defaultProps } = config.dp ?? ({} as ClassesProps),
    klassFn = typeof options === "function" ? options : klass<VS>(options, config),
    keys = getVariantKeys<VS>(klassFn.vk);

  const Component = defineComponent(<C extends ElementType = ET>(props: PolymorphicComponentProp<C, WithClassesValueProps<VariantsOf<KlassFn<VS>>>>, { attrs, slots }: SetupContext) => {
    const splitted = computed(() => splitRestProps(attrs, keys));

    return () => h(props.as ?? element, { ...defaultProps, ...(splitted.value.o as any), class: klassFn(splitted.value.p, (props.class ?? defaultClass) as ClassValue) }, slots);
  }, defaultComponentOptions) as KlassedComponent<ET, VS>;

  Component.klass = klassFn;

  return Component;
}

function reklassed<ET extends ElementType, CS extends ConditionSchema, VS extends FinalVariantsSchema>(
  element: ET,
  options: ReklassOptions<CS, VS> | ReklassFn<CS, VS>,
  config: {
    dp?: PolymorphicComponentProp<ET, {}>;
    as?: AsFn;
    end?: EndFn;
  } = {}
): ReklassedComponent<ET, CS, VS> {
  const { class: defaultClass, ...defaultProps } = config.dp ?? ({} as ClassesProps),
    reklassFn = typeof options === "function" ? options : reklass<CS, VS>(options, config),
    keys = getVariantKeys<VS>(reklassFn.rvk);

  const Component = defineComponent(<C extends ElementType = ET>(props: PolymorphicComponentProp<C, WithClassesValueProps<VariantsOf<ReklassFn<CS, VS>>>>, { attrs, slots }: SetupContext) => {
    const splitted = computed(() => splitRestProps(attrs, keys));

    return () => h(props.as ?? element, { ...defaultProps, ...(splitted.value.o as any), class: reklassFn(splitted.value.p, (props.class ?? defaultClass) as ClassValue) }, slots);
  }, defaultComponentOptions) as ReklassedComponent<ET, CS, VS>;

  Component.reklass = reklassFn;

  return Component;
}

export { klassed, reklassed };
