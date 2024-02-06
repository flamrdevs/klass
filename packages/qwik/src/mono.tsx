import { jsx } from "@builder.io/qwik";
import type { JSX } from "@builder.io/qwik/jsx-runtime";

import { klass, reklass } from "@klass/core";
import type { EndFn, AsFn, VariantsOf, KlassOptions, KlassFn, ConditionSchema, ReklassOptions, ReklassFn } from "@klass/core";

import { FinalVariantsSchema, WithClassesValueProps, KlassedBase, ReklassedBase } from "./types/index.ts";
import type { SignalishRecord, SupportedComponentProps, SupportedElementType, ClassesProps } from "./types/qwik.ts";

import { getVariantKeys, splitRestProps, maybeSignal, typeofFunction } from "./utils.ts";

export type KlassedComponent<ET extends SupportedElementType, VS extends FinalVariantsSchema> = {
  (props: WithClassesValueProps<SupportedComponentProps<ET> & SignalishRecord<VariantsOf<KlassFn<VS>>>>): JSX.Element;
} & KlassedBase<VS>;

export type ReklassedComponent<ET extends SupportedElementType, CS extends ConditionSchema, VS extends FinalVariantsSchema> = {
  (props: WithClassesValueProps<SupportedComponentProps<ET> & SignalishRecord<VariantsOf<ReklassFn<CS, VS>>>>): JSX.Element;
} & ReklassedBase<CS, VS>;

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
    keys = getVariantKeys<VS>(klassFn.vk);

  const Component = (({ class: _class = defaultClass, ...rest }) => {
    const splitted = splitRestProps(rest, keys);

    return jsx(Element, { ...defaultProps, ...(splitted.o as any), class: klassFn(splitted.p, maybeSignal(_class)) });
  }) as KlassedComponent<ET, VS>;

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
    keys = getVariantKeys<VS>(reklassFn.rvk);

  const Component = (({ class: _class = defaultClass, ...rest }) => {
    const splitted = splitRestProps(rest, keys);

    return jsx(Element, { ...defaultProps, ...(splitted.o as any), class: reklassFn(splitted.p, maybeSignal(_class)) });
  }) as ReklassedComponent<ET, CS, VS>;

  return (Component.reklass = reklassFn), Component;
}

export { klassed, reklassed };
