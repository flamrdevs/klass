import { jsx } from "@builder.io/qwik";

import type { KlassFn, Klass, ConditionSchema, ReklassFn, Reklass, Fxs, FxFrom, ComposeFn, Compose } from "@klass/core";
import { typeofFunction } from "@klass/core/utils";

import { FinalVariantsSchema, KlassedOptions, ReklassedOptions, ComposedOptions, DefaultPropsConfig, ForwardPropsConfig } from "./../types";
import type { SupportedElementType, ClassesProps } from "./../types/qwik";

import { getVariantKeys, splitRestProps, maybeSignal } from "./../utils";

import type { ComponentConfig, ComposedComponentConfig, MonoKlassedComponent, MonoReklassedComponent, MonoComposedComponent } from "./types";

function create<ET extends SupportedElementType>(element: ET, fn: KlassFn<Record<any, any>> | ReklassFn<any, Record<any, any>> | ComposeFn<any>, config: DefaultPropsConfig & ForwardPropsConfig = {}) {
  const { class: defaultClass, ...defaultProps } = (config.dp ?? {}) as ClassesProps,
    keys = getVariantKeys(fn.k);

  const Comp = (({ class: _class = defaultClass, ...rest }) => {
    const splitted = splitRestProps(rest, keys, config.fp);

    return jsx(element, { ...defaultProps, ...(splitted.o as any), class: fn(splitted.p, maybeSignal(_class)) });
  }) as any;

  return (Comp.fx = fn), Comp;
}

type Klassed = <ET extends SupportedElementType, VS extends FinalVariantsSchema>(
  element: ET,
  options: KlassedOptions<VS>,
  config?: ComponentConfig<ET, VS> | undefined
) => MonoKlassedComponent<ET, VS>;
type Reklassed = <ET extends SupportedElementType, CS extends ConditionSchema, VS extends FinalVariantsSchema>(
  element: ET,
  options: ReklassedOptions<CS, VS>,
  config?: ComponentConfig<ET, VS>
) => MonoReklassedComponent<ET, CS, VS>;
type Composed = <ET extends SupportedElementType, Fn extends Fxs>(element: ET, options: ComposedOptions<Fn>, config?: ComposedComponentConfig<ET, FxFrom<Fn>>) => MonoComposedComponent<ET, FxFrom<Fn>>;

const createKlassed =
  (klass: Klass): Klassed =>
  (element, options, config) =>
    /* @__PURE__ */ create(element, typeofFunction(options) ? options : klass(options), config) as any;
const createReklassed =
  (reklass: Reklass): Reklassed =>
  (element, options, config) =>
    /* @__PURE__ */ create(element, typeofFunction(options) ? options : reklass(options), config) as any;
const createComposed =
  (compose: Compose): Composed =>
  (element, options, config) =>
    /* @__PURE__ */ create(element, typeofFunction(options) ? options : compose(...options), config) as any;

export type { MonoKlassedComponent, MonoReklassedComponent, MonoComposedComponent };
export { createKlassed, createReklassed, createComposed };
