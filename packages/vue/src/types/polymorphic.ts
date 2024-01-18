import type { JSX } from "vue/jsx-runtime";

import type { ComponentProps, ElementType } from "./vue.ts";

type PolymorphicComponentProp<VC extends ElementType, Props = {}> = (Props & { as?: VC }) &
  Omit<
    Omit<ComponentProps<VC>, "ref"> & { ref?: (VC extends keyof JSX.IntrinsicElements ? JSX.IntrinsicElements[VC] : ComponentProps<VC>) extends { ref?: infer Ref } ? Ref : unknown },
    "as" | keyof Props
  >;

export type { PolymorphicComponentProp };
