import React from "react";
import type { ComponentPropsWithRef, ComponentPropsWithoutRef, ElementType, PropsWithChildren, ReactElement } from "react";

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

type AsProp<ET extends ElementType> = { as?: ET };

type PropsToOmit<ET extends ElementType, P> = keyof (AsProp<ET> & P);

type PolymorphicComponentProp<ET extends ElementType, Props = {}> = PropsWithChildren<Props & AsProp<ET>> &
  Omit<ComponentPropsWithoutRef<ET>, PropsToOmit<ET, Props>>;

type PolymorphicRef<ET extends ElementType> = ComponentPropsWithRef<ET>["ref"];

type PolymorphicComponentPropWithRef<ET extends ElementType, Props = {}> = PolymorphicComponentProp<ET, Props> & {
  ref?: PolymorphicRef<ET>;
};

type ClassesStringProps = { className?: string };
type ClassesValueProps = { className?: ClassValue };
type WithClassesValueProps<P extends {}> = Omit<P, keyof ClassesValueProps> & ClassesValueProps;

function getVariantKeys__filterFn(el: string) {
  return el !== "className";
}

function getVariantKeys<VS extends VariantsSchema>(options: KlassOptions<VS>) {
  return Object.keys(options.variants).filter(getVariantKeys__filterFn) as unknown as (keyof Exclude<VS, "className">)[];
}

function getSetupDefaultProps<ET extends ElementType>(setup?: { defaultProps?: PolymorphicComponentPropWithRef<ET, {}> }) {
  const { className, ...others } = (setup?.defaultProps || {}) as PolymorphicComponentPropWithRef<ET, ClassesStringProps>;

  return [className, others] as const;
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
  <C extends ElementType = ET>(
    props: PolymorphicComponentPropWithRef<C, WithClassesValueProps<VariantsOf<KlassFn<VS>>>>
  ): ReactElement | null;
} & {
  klass: KlassFn<VS>;
};

function klassed<ET extends ElementType, VS extends VariantsSchema>(
  element: ET,
  options: KlassOptions<VS>,
  setup?: {
    defaultProps?: PolymorphicComponentPropWithRef<ET, {}>;
  }
): KlassedComponent<ET, VS> {
  const klassFn = klass<VS>(options);
  const keys = getVariantKeys<VS>(options);

  const [defaultClass, defaultProps] = getSetupDefaultProps<ET>(setup);

  const Component = <C extends ElementType = ET>(
    props: PolymorphicComponentPropWithRef<C, WithClassesValueProps<VariantsOf<KlassFn<VS>>>>,
    ref?: PolymorphicRef<C>
  ) => {
    const { as: As = element, className, ...rest } = props;

    const { omited, picked } = splitRestProps(rest, keys);

    return (
      <As
        {...({
          ...defaultProps,
          ...omited,
          className: klassFn(picked, className ?? defaultClass),
        } as any)}
        ref={ref}
      />
    );
  };

  const ComponentWithRef: Omit<KlassedComponent<ET, VS>, "klass"> = React.forwardRef<any, any>(Component);

  (ComponentWithRef as KlassedComponent<ET, VS>).klass = klassFn;

  return ComponentWithRef as KlassedComponent<ET, VS>;
}

type ReklassedComponent<ET extends ElementType, CS extends ConditionSchema, VS extends VariantsSchema> = {
  <C extends ElementType = ET>(
    props: PolymorphicComponentPropWithRef<C, WithClassesValueProps<VariantsOf<ReklassFn<CS, VS>>>>
  ): ReactElement | null;
} & {
  reklass: ReklassFn<CS, VS>;
};

function reklassed<ET extends ElementType, CS extends ConditionSchema, VS extends VariantsSchema>(
  element: ET,
  options: ReklassOptions<CS, VS>,
  setup?: {
    defaultProps?: PolymorphicComponentPropWithRef<ET, {}>;
  }
): ReklassedComponent<ET, CS, VS> {
  const reklassFn = reklass<CS, VS>(options);
  const keys = getVariantKeys<VS>(options);

  const [defaultClass, defaultProps] = getSetupDefaultProps<ET>(setup);

  const Component = <C extends ElementType = ET>(
    props: PolymorphicComponentPropWithRef<C, WithClassesValueProps<VariantsOf<ReklassFn<CS, VS>>>>,
    ref?: PolymorphicRef<C>
  ) => {
    const { as: As = element, className, ...rest } = props;

    const { omited, picked } = splitRestProps(rest, keys);

    return (
      <As
        {...({
          ...defaultProps,
          ...omited,
          className: reklassFn(picked, className ?? defaultClass),
        } as any)}
        ref={ref}
      />
    );
  };

  const ComponentWithRef: Omit<ReklassedComponent<ET, CS, VS>, "reklass"> = React.forwardRef<any, any>(Component);

  (ComponentWithRef as ReklassedComponent<ET, CS, VS>).reklass = reklassFn;

  return ComponentWithRef as ReklassedComponent<ET, CS, VS>;
}

export { klassed, reklassed };
export * from "./HOCs";
