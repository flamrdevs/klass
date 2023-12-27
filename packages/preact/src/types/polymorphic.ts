import type { ComponentProps, ComponentChildren, JSX } from "preact";

import type { ElementType } from "./preact";

type PolymorphicComponentProp<ET extends ElementType, Props = {}> = (Props & { as?: ET } & {
  children?: ComponentChildren;
}) &
  Omit<
    Omit<ComponentProps<ET>, "ref"> & { ref?: (ET extends keyof JSX.IntrinsicElements ? JSX.IntrinsicElements[ET] : ComponentProps<ET>) extends { ref?: infer Ref } ? Ref : unknown },
    "as" | keyof Props
  >;

export type { PolymorphicComponentProp };
