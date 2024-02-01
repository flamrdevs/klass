import { Dynamic } from "solid-js/web";
import { mergeProps, splitProps } from "solid-js";
import type { ValidComponent } from "solid-js";

import { klass, reklass } from "@klass/core";
import type { KlassOptions, KlassFn, VariantsOf, ConditionSchema, ReklassOptions, ReklassFn, EndFn, AsFn } from "@klass/core";

import type { WithClassesValueProps, FinalRestrictedVariantsKey, FinalVariantsSchema, KlassedComponent, ReklassedComponent } from "./types/index.ts";
import type { ClassesProps } from "./types/solid.ts";
import type { PolymorphicComponentProp } from "./types/polymorphic.ts";

const getVariantKeys__filterFn = <VS extends FinalVariantsSchema>(el: keyof VS) => el !== "class" && el !== "classList",
  getVariantKeys = <VS extends FinalVariantsSchema>(keys: (keyof VS)[]) => keys.filter(getVariantKeys__filterFn) as unknown as (keyof Exclude<VS, FinalRestrictedVariantsKey>)[];

const PolymorphicKeysSplitter = ["as"] as const,
  ClassesKeysSplitter = ["class", "classList"] as const,
  classesProps = <P extends Partial<Record<FinalRestrictedVariantsKey, any>>>(props: P, defaultClass: any, defaultClassList: any) => [props.class ?? defaultClass, props.classList ?? defaultClassList];

function klassed<VC extends ValidComponent, VS extends FinalVariantsSchema>(
  element: VC,
  options: KlassOptions<VS> | KlassFn<VS>,
  config: {
    dp?: PolymorphicComponentProp<VC, {}>;
    end?: EndFn;
  } = {}
): KlassedComponent<VC, VS> {
  const { class: defaultClass, classList: defaultClassList, ...defaultProps } = config.dp ?? ({} as ClassesProps),
    klassFn = typeof options === "function" ? options : klass<VS>(options, config),
    keys = getVariantKeys<VS>(klassFn.vk);

  const Component = (<C extends ValidComponent = VC>(props: PolymorphicComponentProp<C, WithClassesValueProps<VariantsOf<KlassFn<VS>>>>) => {
    const [polymorphic, classes, picked, omited] = splitProps(props, PolymorphicKeysSplitter, ClassesKeysSplitter, keys as any);

    return <Dynamic component={polymorphic.as ?? element} {...(mergeProps(defaultProps, omited) as any)} class={klassFn(picked as any, classesProps(classes, defaultClass, defaultClassList))} />;
  }) as KlassedComponent<VC, VS>;

  Component.klass = klassFn;

  return Component;
}

function reklassed<VC extends ValidComponent, CS extends ConditionSchema, VS extends FinalVariantsSchema>(
  element: VC,
  options: ReklassOptions<CS, VS> | ReklassFn<CS, VS>,
  config: {
    dp?: PolymorphicComponentProp<VC, {}>;
    as?: AsFn;
    end?: EndFn;
  } = {}
): ReklassedComponent<VC, CS, VS> {
  const { class: defaultClass, classList: defaultClassList, ...defaultProps } = config.dp ?? ({} as ClassesProps),
    reklassFn = typeof options === "function" ? options : reklass<CS, VS>(options, config),
    keys = getVariantKeys<VS>(reklassFn.rvk);

  const Component = (<C extends ValidComponent = VC>(props: PolymorphicComponentProp<C, WithClassesValueProps<VariantsOf<ReklassFn<CS, VS>>>>) => {
    const [polymorphic, classes, picked, omited] = splitProps(props, PolymorphicKeysSplitter, ClassesKeysSplitter, keys as any);

    return <Dynamic component={polymorphic.as ?? element} {...(mergeProps(defaultProps, omited) as any)} class={reklassFn(picked as any, classesProps(classes, defaultClass, defaultClassList))} />;
  }) as ReklassedComponent<VC, CS, VS>;

  Component.reklass = reklassFn;

  return Component;
}

export { klassed, reklassed };
