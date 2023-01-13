import type { ComponentProps, JSX } from "preact";

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

import type { ElementType, PropsWithChildren } from "./types";

type AsProp<ET extends ElementType> = { as?: ET };

type PropsToOmit<ET extends ElementType, P> = keyof (AsProp<ET> & P);

type RefValue<T extends any> = T extends { ref?: any } ? T["ref"] : unknown;

type ComponentPropsRef<ET extends ElementType> = ET extends keyof JSX.IntrinsicElements
  ? RefValue<JSX.IntrinsicElements[ET]>
  : RefValue<ComponentProps<ET>>;

type PolymorphicComponentProp<ET extends ElementType, Props = {}> = PropsWithChildren<Props & AsProp<ET>> &
  Omit<Omit<ComponentProps<ET>, "ref"> & { ref?: ComponentPropsRef<ET> }, PropsToOmit<ET, Props>>;

type ClassesStringProps = { class?: string; className?: string };
type ClassesValueProps = { class?: ClassValue; className?: ClassValue };
type WithClassesValueProps<P extends {}> = Omit<P, keyof ClassesValueProps> & ClassesValueProps;

function getVariantKeys__filterFn(el: string) {
  return el !== "class" && el !== "className";
}

function getVariantKeys<VS extends VariantsSchema>(options: KlassOptions<VS>) {
  return Object.keys(options.variants).filter(getVariantKeys__filterFn) as unknown as (keyof Exclude<VS, "class" | "className">)[];
}

function getSetupDefaultProps<ET extends ElementType>(setup?: { defaultProps?: PolymorphicComponentProp<ET, {}> }) {
  const { class: _class, className, ...others } = (setup?.defaultProps || {}) as PolymorphicComponentProp<ET, ClassesStringProps>;

  return [{ class: _class, className }, others] as const;
}

function splitRestProps<P extends { [key: PropertyKey]: any }, K extends PropertyKey>(props: P, keys: K[]) {
  let omited: Record<string, any> = {};
  let picked: Record<string, any> = {};

  Object.entries(props).forEach(([key, value]) => {
    if (keys.includes(key as K)) picked[key] = value;
    else omited[key] = value;
  });

  return { omited, picked };
}

type KlassedComponent<ET extends ElementType, VS extends VariantsSchema> = {
  <C extends ElementType = ET>(props: PolymorphicComponentProp<C, WithClassesValueProps<VariantsOf<KlassFn<VS>>>>): JSX.Element | null;
} & {
  klass: KlassFn<VS>;
};

function klassed<ET extends ElementType, VS extends VariantsSchema>(
  element: ET,
  options: KlassOptions<VS>,
  setup?: {
    defaultProps?: PolymorphicComponentProp<ET, {}>;
  }
): KlassedComponent<ET, VS> {
  const klassFn = klass<VS>(options);
  const keys = getVariantKeys<VS>(options);

  const [defaultClasses, defaultProps] = getSetupDefaultProps<ET>(setup);

  const Component = <C extends ElementType = ET>(props: PolymorphicComponentProp<C, WithClassesValueProps<VariantsOf<KlassFn<VS>>>>) => {
    const { as: As = element, class: _class, className, ...rest } = props;

    const { omited, picked } = splitRestProps(rest, keys);

    return (
      <As
        {...({
          ...defaultProps,
          ...omited,
          class: klassFn(picked, _class ?? defaultClasses.class ?? className ?? defaultClasses.className),
        } as any)}
      />
    );
  };

  (Component as KlassedComponent<ET, VS>).klass = klassFn;

  return Component as KlassedComponent<ET, VS>;
}

type ReklassedComponent<ET extends ElementType, CS extends ConditionSchema, VS extends VariantsSchema> = {
  <C extends ElementType = ET>(
    props: PolymorphicComponentProp<C, WithClassesValueProps<VariantsOf<ReklassFn<CS, VS>>>>
  ): JSX.Element | null;
} & {
  reklass: ReklassFn<CS, VS>;
};

function reklassed<ET extends ElementType, CS extends ConditionSchema, VS extends VariantsSchema>(
  element: ET,
  options: ReklassOptions<CS, VS>,
  setup?: {
    defaultProps?: PolymorphicComponentProp<ET, {}>;
  }
): ReklassedComponent<ET, CS, VS> {
  const reklassFn = reklass<CS, VS>(options);
  const keys = getVariantKeys<VS>(options);

  const [defaultClasses, defaultProps] = getSetupDefaultProps<ET>(setup);

  const Component = <C extends ElementType = ET>(
    props: PolymorphicComponentProp<C, WithClassesValueProps<VariantsOf<ReklassFn<CS, VS>>>>
  ) => {
    const { as: As = element, class: _class, className, ...rest } = props;

    const { omited, picked } = splitRestProps(rest, keys);

    return (
      <As
        {...({
          ...defaultProps,
          ...omited,
          class: reklassFn(picked, _class ?? defaultClasses.class ?? className ?? defaultClasses.className),
        } as any)}
      />
    );
  };

  (Component as ReklassedComponent<ET, CS, VS>).reklass = reklassFn;

  return Component as ReklassedComponent<ET, CS, VS>;
}

export { klassed, reklassed };
export * from "./HOCs";
