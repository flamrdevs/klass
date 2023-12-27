import type { ComponentPropsWithRef, ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type PolymorphicComponentProp<ET extends ElementType, Props = {}> = (Props & { as?: ET } & { children?: ReactNode }) & Omit<ComponentPropsWithoutRef<ET>, "as" | keyof Props>;

type PolymorphicRef<ET extends ElementType> = ComponentPropsWithRef<ET>["ref"];

type PolymorphicComponentPropWithRef<ET extends ElementType, Props = {}> = PolymorphicComponentProp<ET, Props> & {
  ref?: PolymorphicRef<ET>;
};

export type { PolymorphicRef, PolymorphicComponentPropWithRef };
