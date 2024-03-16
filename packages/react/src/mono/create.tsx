import React from "react";

import type { KlassFn, Klass, ConditionSchema, ReklassFn, Reklass, Fx, ComposeFn, Compose } from "@klass/core";
import { typeofFunction } from "@klass/core/utils";

import { FinalVariantsSchema, WithClassesValueProps, KlassedOptions, ReklassedOptions, ComposedOptions, DefaultPropsConfig, ForwardPropsConfig } from "./../types";
import type { SupportedElementType, ClassesProps } from "./../types/react";

import { getVariantKeys, splitRestProps } from "./../utils";

import type { ComponentConfig, ComposedComponentConfig, MonoKlassedComponent, MonoReklassedComponent, MonoComposedComponent } from "./types";

/* @__PURE__ */
function create<ET extends SupportedElementType>(Element: ET, fn: KlassFn<Record<any, any>> | ReklassFn<any, Record<any, any>> | ComposeFn<any>, config: DefaultPropsConfig & ForwardPropsConfig = {}) {
  const { className: defaultClassName, ...defaultProps } = (config.dp ?? {}) as ClassesProps,
    keys = getVariantKeys(fn.k);

  const Comp = React.forwardRef<any, WithClassesValueProps<{}>>(({ className = defaultClassName, ...rest }, ref) => {
    const splitted = splitRestProps(rest, keys, config.fp);

    return <Element {...defaultProps} {...(splitted.o as any)} ref={ref} className={fn(splitted.p, className)} />;
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
type Composed = <ET extends SupportedElementType, Fn extends Fx>(element: ET, options: ComposedOptions<Fn>, config?: ComposedComponentConfig<ET, Fn>) => MonoComposedComponent<ET, Fn>;

const createKlassed =
  /* @__PURE__ */


    (klass: Klass): Klassed =>
    (element, options, config) =>
      create(element, typeofFunction(options) ? options : klass(options), config) as any;
const createReklassed =
  /* @__PURE__ */


    (reklass: Reklass): Reklassed =>
    (element, options, config) =>
      create(element, typeofFunction(options) ? options : reklass(options), config) as any;
const createComposed =
  /* @__PURE__ */


    (compose: Compose): Composed =>
    (element, options, config) =>
      create(element, typeofFunction(options) ? options : compose(...options), config) as any;

export type { MonoKlassedComponent, MonoReklassedComponent, MonoComposedComponent };
export { createKlassed, createReklassed, createComposed };
