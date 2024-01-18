import type { JSXChildren } from "@builder.io/qwik";
import type { JSX } from "@builder.io/qwik/jsx-runtime";

import type { ComponentProps, ElementType } from "./qwik.ts";

type PolymorphicComponentProp<ET extends ElementType, Props = {}> = (Props & { as?: ET } & {
  children?: JSXChildren;
}) &
  Omit<
    Omit<ComponentProps<ET>, "ref"> & { ref?: (ET extends keyof JSX.IntrinsicElements ? JSX.IntrinsicElements[ET] : ComponentProps<ET>) extends { ref?: infer Ref } ? Ref : unknown },
    "as" | keyof Props
  >;

export type { PolymorphicComponentProp };
