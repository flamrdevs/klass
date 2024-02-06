import { Dynamic } from "solid-js/web";
import { mergeProps, splitProps } from "solid-js";

import { klass, reklass } from "@klass/core";
import type { EndFn, AsFn, KlassOptions, KlassFn, ConditionSchema, ReklassOptions, ReklassFn } from "@klass/core";

import type { FinalVariantsSchema, KlassedComponent, ReklassedComponent } from "./types/index.ts";
import type { SupportedElementType, ClassesProps } from "./types/solid.ts";
import type { PolymorphicComponentProps } from "./types/polymorphic.ts";

import { getVariantKeys, PolymorphicKeysSplitter, ClassesKeysSplitter, classesProps } from "./utils.ts";

function klassed<ET extends SupportedElementType, VS extends FinalVariantsSchema>(
  element: ET,
  options: KlassOptions<VS> | KlassFn<VS>,
  config: {
    dp?: PolymorphicComponentProps<ET, {}>;
    end?: EndFn;
  } = {}
): KlassedComponent<ET, VS> {
  const { class: defaultClass, classList: defaultClassList, ...defaultProps } = (config.dp ?? {}) as ClassesProps,
    klassFn = typeof options === "function" ? options : klass<VS>(options, config),
    keys = getVariantKeys<VS>(klassFn.vk);

  const Component = ((props) => {
    const [polymorphic, classes, picked, omited] = splitProps(props, PolymorphicKeysSplitter, ClassesKeysSplitter, keys as any);

    return <Dynamic component={polymorphic.as ?? element} {...(mergeProps(defaultProps, omited) as any)} class={klassFn(picked as any, classesProps(classes, defaultClass, defaultClassList))} />;
  }) as KlassedComponent<ET, VS>;

  Component.klass = klassFn;

  return Component;
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
  const { class: defaultClass, classList: defaultClassList, ...defaultProps } = (config.dp ?? {}) as ClassesProps,
    reklassFn = typeof options === "function" ? options : reklass<CS, VS>(options, config),
    keys = getVariantKeys<VS>(reklassFn.rvk);

  const Component = ((props) => {
    const [polymorphic, classes, picked, omited] = splitProps(props, PolymorphicKeysSplitter, ClassesKeysSplitter, keys as any);

    return <Dynamic component={polymorphic.as ?? element} {...(mergeProps(defaultProps, omited) as any)} class={reklassFn(picked as any, classesProps(classes, defaultClass, defaultClassList))} />;
  }) as ReklassedComponent<ET, CS, VS>;

  Component.reklass = reklassFn;

  return Component;
}

export { klassed, reklassed };
