import { computed, defineComponent, h } from "vue";
import type { SetupContext } from "vue";

import { klass, reklass } from "@klass/core";
import type { KlassOptions, KlassFn, VariantsOf, ConditionSchema, ReklassOptions, ReklassFn, EndFn, AsFn, ClassValue } from "@klass/core";

import type { WithClassesValueProps, FinalRestrictedVariantsKey, FinalVariantsSchema, KlassedComponent, ReklassedComponent } from "./types/index.ts";
import type { ElementType, ClassesProps } from "./types/vue.ts";
import type { PolymorphicComponentProp } from "./types/polymorphic.ts";

const getVariantKeys__filterFn = <VS extends FinalVariantsSchema>(el: keyof VS) => el !== "class",
  getVariantKeys = <VS extends FinalVariantsSchema>(keys: (keyof VS)[]) => keys.filter(getVariantKeys__filterFn) as unknown as (keyof Exclude<VS, FinalRestrictedVariantsKey>)[];

const splitRestProps = <P extends { [key: PropertyKey]: any }, K extends PropertyKey>(props: P, keys: K[]) => {
  let o: /** omited */ Record<string, any> = {},
    p: /** picked */ Record<string, any> = {},
    key: string;
  for (key in props) (keys.includes(key as K) ? p : o)[key] = props[key];
  return { o, p } as const;
};

const defaultComponentOptions = {
  props: ["as", "class"] as any,
  inheritAttrs: false,
};

function klassed<ET extends ElementType, VS extends FinalVariantsSchema>(
  element: ET,
  options: KlassOptions<VS>,
  config: {
    dp?: PolymorphicComponentProp<ET, {}>;
    end?: EndFn;
  } = {}
): KlassedComponent<ET, VS> {
  const { dp: { class: defaultClass, ...defaultProps } = {} as ClassesProps, end } = config,
    klassFn = klass<VS>(options, { end }),
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
  options: ReklassOptions<CS, VS>,
  config: {
    dp?: PolymorphicComponentProp<ET, {}>;
    as?: AsFn;
    end?: EndFn;
  } = {}
): ReklassedComponent<ET, CS, VS> {
  const { dp: { class: defaultClass, ...defaultProps } = {} as ClassesProps, as, end } = config,
    reklassFn = reklass<CS, VS>(options, { as, end }),
    keys = getVariantKeys<VS>(reklassFn.rvk);

  const Component = defineComponent(<C extends ElementType = ET>(props: PolymorphicComponentProp<C, WithClassesValueProps<VariantsOf<ReklassFn<CS, VS>>>>, { attrs, slots }: SetupContext) => {
    const splitted = computed(() => splitRestProps(attrs, keys));

    return () => h(props.as ?? element, { ...defaultProps, ...(splitted.value.o as any), class: reklassFn(splitted.value.p, (props.class ?? defaultClass) as ClassValue) }, slots);
  }, defaultComponentOptions) as ReklassedComponent<ET, CS, VS>;

  Component.reklass = reklassFn;

  return Component;
}

export { klassed, reklassed };
