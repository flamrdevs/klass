import { mergeProps, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";

import type { Compose, ComposeFn, ConditionSchema, FxFrom, Fxs, Klass, KlassFn, Reklass, ReklassFn } from "@klass/core";
import { typeofFunction } from "@klass/core/utils";

import type { ComposedOptions, DefaultPropsConfig, FinalVariantsSchema, ForwardPropsConfig, KlassedOptions, ReklassedOptions } from "./../types";
import type { ClassesProps, SupportedElementType } from "./../types/solid";
import { ClassesKeysSplitter, classesProps, getVariantKeys } from "./../utils";
import type { ComponentConfig, ComposedComponentConfig, MonoComposedComponent, MonoKlassedComponent, MonoReklassedComponent } from "./types";

function create<ET extends SupportedElementType>(element: ET, fn: KlassFn<Record<any, any>> | ReklassFn<any, Record<any, any>> | ComposeFn<any>, config: DefaultPropsConfig & ForwardPropsConfig = {}) {
	const { class: defaultClass, classList: defaultClassList, ...defaultProps } = (config.dp ?? {}) as ClassesProps,
		keys = getVariantKeys(fn.k),
		fp = config.fp ?? [];

	const Comp = ((props: any) => {
		const [classes, picked, omited] = splitProps(props, ClassesKeysSplitter, keys as any);
		const [forward] = splitProps(picked, fp);

		return <Dynamic component={element} {...(mergeProps(defaultProps, omited) as any)} {...forward} class={fn(picked as any, classesProps(classes, defaultClass, defaultClassList))} />;
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
