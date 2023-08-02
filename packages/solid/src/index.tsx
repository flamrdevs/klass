/** @jsxImportSource solid-js */

import { Dynamic } from "solid-js/web";
import { mergeProps, splitProps } from "solid-js";
import type { ValidComponent } from "solid-js";

import { klass, reklass } from "@klass/core";
import type { KlassOptions, KlassFn, VariantsOf, ConditionSchema, ReklassOptions, ReklassFn, ItFn, AsCondition } from "@klass/core";

import type { PolymorphicComponentProp, ClassesNormalProps, WithClassesValueProps, SolidClassesPropsKey, SolidVariantsSchema, KlassedComponent, ReklassedComponent } from "./types";

const getVariantKeys__filterFn = (el: string) => el !== "class" && el !== "classList",
  getVariantKeys = <VS extends SolidVariantsSchema>(variants: VS) => Object.keys(variants).filter(getVariantKeys__filterFn) as unknown as (keyof Exclude<VS, SolidClassesPropsKey>)[],
  LocalKeysSplitter = ["as", "class", "classList"] as const;

function klassed<VC extends ValidComponent, VS extends SolidVariantsSchema>(
  element: VC,
  options: KlassOptions<VS>,
  config: {
    dp?: PolymorphicComponentProp<VC, {}>;
    it?: ItFn;
  } = {}
): KlassedComponent<VC, VS> {
  const { dp: { class: _class, classList, ...dp } = {} as ClassesNormalProps, it } = config,
    klassFn = klass<VS>(options, { it }),
    keys = getVariantKeys<VS>(options.variants);

  const Component = <C extends ValidComponent = VC>(props: PolymorphicComponentProp<C, WithClassesValueProps<VariantsOf<KlassFn<VS>>>>) => {
    const [local, picked, omited] = splitProps(props, LocalKeysSplitter, keys as any);

    return (
      <Dynamic
        component={local.as || element}
        {...(mergeProps(dp, omited, () => ({
          class: klassFn(picked as any, [local.class ?? _class, local.classList ?? classList]),
        })) as any)}
      />
    );
  };

  (Component as KlassedComponent<VC, VS>).klass = klassFn;

  return Component as KlassedComponent<VC, VS>;
}

function reklassed<VC extends ValidComponent, CS extends ConditionSchema, VS extends SolidVariantsSchema>(
  element: VC,
  options: ReklassOptions<CS, VS>,
  config: {
    dp?: PolymorphicComponentProp<VC, {}>;
    as?: AsCondition;
    it?: ItFn;
  } = {}
): ReklassedComponent<VC, CS, VS> {
  const { dp: { class: _class, classList, ...dp } = {} as ClassesNormalProps, as, it } = config,
    reklassFn = reklass<CS, VS>(options, { as, it }),
    keys = getVariantKeys<VS>(options.variants);

  const Component = <C extends ValidComponent = VC>(props: PolymorphicComponentProp<C, WithClassesValueProps<VariantsOf<ReklassFn<CS, VS>>>>) => {
    const [local, picked, omited] = splitProps(props, LocalKeysSplitter, keys as any);

    return (
      <Dynamic
        component={local.as || element}
        {...(mergeProps(dp, omited, () => ({
          class: reklassFn(picked as any, [local.class ?? _class, local.classList ?? classList]),
        })) as any)}
      />
    );
  };

  (Component as ReklassedComponent<VC, CS, VS>).reklass = reklassFn;

  return Component as ReklassedComponent<VC, CS, VS>;
}

export { klassed, reklassed };
export * from "./HOCs";
