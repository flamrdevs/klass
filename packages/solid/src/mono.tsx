import { Dynamic } from "solid-js/web";
import { mergeProps, splitProps } from "solid-js";
import type { JSX } from "solid-js";

import { klass, reklass } from "@klass/core";
import type { EndFn, AsFn, VariantsOf, KlassOptions, KlassFn, ConditionSchema, ReklassOptions, ReklassFn } from "@klass/core";

import { FinalVariantsSchema, WithClassesValueProps, KlassedBase, ReklassedBase } from "./types/index.ts";
import type { SupportedComponentProps, SupportedElementType, ClassesProps } from "./types/solid.ts";

import { getVariantKeys, ClassesKeysSplitter, classesProps } from "./utils.ts";

export type KlassedComponent<ET extends SupportedElementType, VS extends FinalVariantsSchema> = {
  (props: WithClassesValueProps<SupportedComponentProps<ET> & VariantsOf<KlassFn<VS>>>): JSX.Element;
} & KlassedBase<VS>;

export type ReklassedComponent<ET extends SupportedElementType, CS extends ConditionSchema, VS extends FinalVariantsSchema> = {
  (props: WithClassesValueProps<SupportedComponentProps<ET> & VariantsOf<ReklassFn<CS, VS>>>): JSX.Element;
} & ReklassedBase<CS, VS>;

function klassed<ET extends SupportedElementType, VS extends FinalVariantsSchema>(
  Element: ET,
  options: KlassOptions<VS> | KlassFn<VS>,
  config: {
    dp?: SupportedComponentProps<ET>;
    end?: EndFn;
  } = {}
): KlassedComponent<ET, VS> {
  const { class: defaultClass, classList: defaultClassList, ...defaultProps } = (config.dp ?? {}) as ClassesProps,
    klassFn = typeof options === "function" ? options : klass<VS>(options, config),
    keys = getVariantKeys<VS>(klassFn.vk);

  const Component = ((props) => {
    const [classes, picked, omited] = splitProps(props, ClassesKeysSplitter, keys as any);

    return <Dynamic component={Element} {...(mergeProps(defaultProps, omited) as any)} class={klassFn(picked as any, classesProps(classes, defaultClass, defaultClassList))} />;
  }) as KlassedComponent<ET, VS>;

  Component.klass = klassFn;

  return Component;
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
  const { class: defaultClass, classList: defaultClassList, ...defaultProps } = (config.dp ?? {}) as ClassesProps,
    reklassFn = typeof options === "function" ? options : reklass<CS, VS>(options, config),
    keys = getVariantKeys<VS>(reklassFn.rvk);

  const Component = ((props) => {
    const [classes, picked, omited] = splitProps(props, ClassesKeysSplitter, keys as any);

    return <Dynamic component={Element} {...(mergeProps(defaultProps, omited) as any)} class={reklassFn(picked as any, classesProps(classes, defaultClass, defaultClassList))} />;
  }) as ReklassedComponent<ET, CS, VS>;

  Component.reklass = reklassFn;

  return Component;
}

export { klassed, reklassed };
