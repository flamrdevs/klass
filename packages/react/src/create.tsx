import React from "react";

import type { Compose, ComposeFn, ConditionSchema, FxFrom, Fxs, Klass, KlassFn, Reklass, ReklassFn } from "@klass/core";
import { typeofFunction } from "@klass/core/utils";

import type {
	ComponentConfig,
	ComposedComponent,
	ComposedComponentConfig,
	ComposedOptions,
	DefaultPropsConfig,
	FinalVariantsSchema,
	ForwardPropsConfig,
	KlassedComponent,
	KlassedOptions,
	ReklassedComponent,
	ReklassedOptions,
} from "./types";
import type { PolymorphicComponentProps, PolymorphicRef } from "./types/polymorphic";
import type { ClassesProps, SupportedElementType } from "./types/react";

import { getVariantKeys, splitRestProps } from "./utils";

function create<ET extends SupportedElementType>(element: ET, fn: KlassFn<Record<any, any>> | ReklassFn<any, Record<any, any>> | ComposeFn<any>, config: DefaultPropsConfig & ForwardPropsConfig = {}) {
	const { className: defaultClassName, ...defaultProps } = (config.dp ?? {}) as ClassesProps,
		keys = getVariantKeys(fn.k);

	const Comp = React.forwardRef<any, PolymorphicComponentProps<ET, ClassesProps>>(({ as: As = element as any, className = defaultClassName, ...rest }, ref?: PolymorphicRef<SupportedElementType>) => {
		const splitted = splitRestProps(rest, keys, config.fp);

		return <As {...defaultProps} {...(splitted.o as any)} ref={ref} className={fn(splitted.p, className)} />;
	}) as any;

	return (Comp.fx = fn), Comp;
}

type Klassed = <ET extends SupportedElementType, VS extends FinalVariantsSchema>(element: ET, options: KlassedOptions<VS>, config?: ComponentConfig<ET, VS> | undefined) => KlassedComponent<ET, VS>;
type Reklassed = <ET extends SupportedElementType, CS extends ConditionSchema, VS extends FinalVariantsSchema>(
	element: ET,
	options: ReklassedOptions<CS, VS>,
	config?: ComponentConfig<ET, VS>
) => ReklassedComponent<ET, CS, VS>;
type Composed = <ET extends SupportedElementType, Fn extends Fxs>(element: ET, options: ComposedOptions<Fn>, config?: ComposedComponentConfig<ET, FxFrom<Fn>>) => ComposedComponent<ET, FxFrom<Fn>>;

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

export { createKlassed, createReklassed, createComposed };
