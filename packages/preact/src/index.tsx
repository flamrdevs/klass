import { klass, reklass } from "@klass/core";
import type { EndFn, AsFn, KlassOptions, KlassFn, ConditionSchema, ReklassOptions, ReklassFn } from "@klass/core";

import type { FinalVariantsSchema, KlassedComponent, ReklassedComponent } from "./types/index.ts";
import type { SupportedElementType, ClassesProps } from "./types/preact.ts";
import type { PolymorphicComponentProps } from "./types/polymorphic.ts";

import { getVariantKeys, splitRestProps, maybeSignal, typeofFunction } from "./utils.ts";

function klassed<ET extends SupportedElementType, VS extends FinalVariantsSchema>(
  element: ET,
  options: KlassOptions<VS> | KlassFn<VS>,
  config: {
    dp?: PolymorphicComponentProps<ET, {}>;
    end?: EndFn;
  } = {}
): KlassedComponent<ET, VS> {
  const { class: defaultClass, className: defaultClassName, ...defaultProps } = (config.dp ?? {}) as ClassesProps,
    klassFn = typeofFunction(options) ? options : klass<VS>(options, config),
    keys = getVariantKeys<VS>(klassFn.vk);

  const Component = (({ as: As = element as any, class: _class = defaultClass, className = defaultClassName, ...rest }) => {
    const splitted = splitRestProps(rest, keys);

    return <As {...defaultProps} {...(splitted.o as any)} class={klassFn(splitted.p, maybeSignal(_class ?? className))} />;
  }) as KlassedComponent<ET, VS>;

  return (Component.klass = klassFn), Component;
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
  const { class: defaultClass, className: defaultClassName, ...defaultProps } = (config.dp ?? {}) as ClassesProps,
    reklassFn = typeofFunction(options) ? options : reklass<CS, VS>(options, config),
    keys = getVariantKeys<VS>(reklassFn.rvk);

  const Component = (({ as: As = element as any, class: _class = defaultClass, className = defaultClassName, ...rest }) => {
    const splitted = splitRestProps(rest, keys);

    return <As {...defaultProps} {...(splitted.o as any)} class={reklassFn(splitted.p, maybeSignal(_class ?? className))} />;
  }) as ReklassedComponent<ET, CS, VS>;

  return (Component.reklass = reklassFn), Component;
}

export type { KlassedComponent, ReklassedComponent };
export { klassed, reklassed };
