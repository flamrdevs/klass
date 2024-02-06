import { jsx } from "@builder.io/qwik";

import { klass, reklass } from "@klass/core";
import type { EndFn, AsFn, KlassOptions, KlassFn, ConditionSchema, ReklassOptions, ReklassFn } from "@klass/core";

import type { FinalVariantsSchema, KlassedComponent, ReklassedComponent } from "./types/index.ts";
import type { SupportedElementType, ClassesProps } from "./types/qwik.ts";
import type { PolymorphicComponentProps } from "./types/polymorphic.ts";

import { getVariantKeys, splitRestProps, maybeSignal } from "./utils.ts";

function klassed<ET extends SupportedElementType, VS extends FinalVariantsSchema>(
  element: ET,
  options: KlassOptions<VS> | KlassFn<VS>,
  config: {
    dp?: PolymorphicComponentProps<ET, {}>;
    end?: EndFn;
  } = {}
): KlassedComponent<ET, VS> {
  const { class: defaultClass, ...defaultProps } = (config.dp ?? {}) as ClassesProps,
    klassFn = typeof options === "function" ? options : klass<VS>(options, config),
    keys = getVariantKeys<VS>(klassFn.vk);

  const Component = (({ as: As = element as any, class: _class = defaultClass, ...rest }) => {
    const splitted = splitRestProps(rest, keys);

    return jsx(As, { ...defaultProps, ...(splitted.o as any), class: klassFn(splitted.p, maybeSignal(_class)) });
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
  const { class: defaultClass, ...defaultProps } = (config.dp ?? {}) as ClassesProps,
    reklassFn = typeof options === "function" ? options : reklass<CS, VS>(options, config),
    keys = getVariantKeys<VS>(reklassFn.rvk);

  const Component = (({ as: As = element as any, class: _class = defaultClass, ...rest }) => {
    const splitted = splitRestProps(rest, keys);

    return jsx(As, { ...defaultProps, ...(splitted.o as any), class: reklassFn(splitted.p, maybeSignal(_class)) });
  }) as ReklassedComponent<ET, CS, VS>;

  Component.reklass = reklassFn;

  return Component;
}

export { klassed, reklassed };
