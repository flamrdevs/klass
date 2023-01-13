/** @jsxImportSource solid-js */

import { Dynamic } from "solid-js/web";
import { mergeProps, splitProps } from "solid-js";
import type { ComponentProps, JSX, ValidComponent } from "solid-js";

import { klass, reklass } from "@klass/core";
import type {
  ClassValue,
  VariantsSchema,
  KlassOptions,
  KlassFn,
  VariantsOf,
  ConditionSchema,
  ReklassOptions,
  ReklassFn,
} from "@klass/core";

import type { PropsWithChildren } from "./types";

type AsProp<VC extends ValidComponent> = { as?: VC };

type PropsToOmit<VC extends ValidComponent, P> = keyof (AsProp<VC> & P);

type RefValue<T extends any> = T extends { ref?: any } ? T["ref"] : unknown;

type ComponentPropsRef<VC extends ValidComponent> = VC extends keyof JSX.IntrinsicElements
  ? RefValue<JSX.IntrinsicElements[VC]>
  : RefValue<ComponentProps<VC>>;

type PolymorphicComponentProp<VC extends ValidComponent, Props = {}> = PropsWithChildren<Props & AsProp<VC>> &
  Omit<Omit<ComponentProps<VC>, "ref"> & { ref?: ComponentPropsRef<VC> }, PropsToOmit<VC, Props>>;

type ClassesStringProps = { class?: string; classList?: string };
type ClassesValueProps = { class?: ClassValue; classList?: ClassValue };
type WithClassesValueProps<P extends {}> = Omit<P, keyof ClassesValueProps> & ClassesValueProps;

function getVariantKeys__filterFn(el: string) {
  return el !== "class" && el !== "classList";
}

function getVariantKeys<VS extends VariantsSchema>(options: KlassOptions<VS>) {
  return Object.keys(options.variants).filter(getVariantKeys__filterFn) as unknown as (keyof Exclude<VS, "class" | "classList">)[];
}

function getSetupDefaultProps<VC extends ValidComponent>(setup?: { defaultProps?: PolymorphicComponentProp<VC, {}> }) {
  const { class: _class, classList, ...others } = (setup?.defaultProps || {}) as PolymorphicComponentProp<VC, ClassesStringProps>;

  return [{ class: _class, classList }, others] as const;
}

const LocalKeysSplitter = ["as", "class", "classList"] as const;

type KlassedComponent<VC extends ValidComponent, VS extends VariantsSchema> = {
  <C extends ValidComponent = VC>(props: PolymorphicComponentProp<C, WithClassesValueProps<VariantsOf<KlassFn<VS>>>>): JSX.Element | null;
} & {
  klass: KlassFn<VS>;
};

const klassed = <VC extends ValidComponent, VS extends VariantsSchema>(
  element: VC,
  options: KlassOptions<VS>,
  setup?: {
    defaultProps?: PolymorphicComponentProp<VC, {}>;
  }
): KlassedComponent<VC, VS> => {
  const klassFn = klass<VS>(options);
  const keys = getVariantKeys<VS>(options);

  const [defaultClasses, defaultProps] = getSetupDefaultProps<VC>(setup);

  const Component = <C extends ValidComponent = VC>(props: PolymorphicComponentProp<C, WithClassesValueProps<VariantsOf<KlassFn<VS>>>>) => {
    const [local, picked, omited] = splitProps(props, LocalKeysSplitter, keys as any);

    return (
      <Dynamic
        component={local.as || element}
        {...(mergeProps(defaultProps, omited, () => ({
          class: klassFn(picked as any, [local.class ?? defaultClasses.class, local.classList ?? defaultClasses.classList]),
        })) as any)}
      />
    );
  };

  (Component as KlassedComponent<VC, VS>).klass = klassFn;

  return Component as KlassedComponent<VC, VS>;
};

type ReklassedComponent<VC extends ValidComponent, CS extends ConditionSchema, VS extends VariantsSchema> = {
  <C extends ValidComponent = VC>(
    props: PolymorphicComponentProp<C, WithClassesValueProps<VariantsOf<ReklassFn<CS, VS>>>>
  ): JSX.Element | null;
} & {
  reklass: ReklassFn<CS, VS>;
};

const reklassed = <VC extends ValidComponent, CS extends ConditionSchema, VS extends VariantsSchema>(
  element: VC,
  options: ReklassOptions<CS, VS>,
  setup?: {
    defaultProps?: PolymorphicComponentProp<VC, {}>;
  }
): ReklassedComponent<VC, CS, VS> => {
  const reklassFn = reklass<CS, VS>(options);
  const keys = getVariantKeys<VS>(options);

  const [defaultClasses, defaultProps] = getSetupDefaultProps<VC>(setup);

  const Component = <C extends ValidComponent = VC>(props: PolymorphicComponentProp<C, WithClassesValueProps<VariantsOf<KlassFn<VS>>>>) => {
    const [local, picked, omited] = splitProps(props, LocalKeysSplitter, keys as any);

    return (
      <Dynamic
        component={local.as || element}
        {...(mergeProps(defaultProps, omited, () => ({
          class: reklassFn(picked as any, [local.class ?? defaultClasses.class, local.classList ?? defaultClasses.classList]),
        })) as any)}
      />
    );
  };

  (Component as ReklassedComponent<VC, CS, VS>).reklass = reklassFn;

  return Component as ReklassedComponent<VC, CS, VS>;
};

export { klassed, reklassed };
export * from "./HOCs";
