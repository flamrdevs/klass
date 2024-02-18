import React from "react";

import { klass, reklass } from "@klass/core";
import type { EndFn, AsFn, VariantsOf, KlassOptions, KlassFn, ConditionSchema, ReklassOptions, ReklassFn } from "@klass/core";

import { FinalVariantsSchema, WithClassesValueProps, KlassedBase, ReklassedBase } from "./types/index.ts";
import type { SupportedComponentProps, SupportedElementType, ClassesProps } from "./types/react.ts";

import { getVariantKeys, splitRestProps, typeofFunction } from "./utils.ts";

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
  const { className: defaultClassName, ...defaultProps } = (config.dp ?? {}) as ClassesProps,
    klassFn = typeofFunction(options) ? options : klass<VS>(options, config),
    keys = getVariantKeys<VS>(klassFn.k);

  const Component = React.forwardRef<any, any>(({ className = defaultClassName, ...rest }, ref) => {
    const splitted = splitRestProps(rest, keys);

    return <Element {...defaultProps} {...(splitted.o as any)} ref={ref} className={klassFn(splitted.p, className)} />;
  }) as unknown as KlassedComponent<ET, VS>;

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
  const { className: defaultClassName, ...defaultProps } = (config.dp ?? {}) as ClassesProps,
    reklassFn = typeofFunction(options) ? options : reklass<CS, VS>(options, config),
    keys = getVariantKeys<VS>(reklassFn.k);

  const Component = React.forwardRef<any, any>(({ className = defaultClassName, ...rest }, ref) => {
    const splitted = splitRestProps(rest, keys);

    return <Element {...defaultProps} {...(splitted.o as any)} ref={ref} className={reklassFn(splitted.p, className)} />;
  }) as unknown as ReklassedComponent<ET, CS, VS>;

  return (Component.reklass = reklassFn), Component;
}

export { klassed, reklassed };
