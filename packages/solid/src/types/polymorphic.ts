import type { ComponentProps, JSX, ValidComponent } from "solid-js";

type PolymorphicComponentProp<VC extends ValidComponent, Props = {}> = (Props & { as?: VC } & { children?: JSX.Element }) &
  Omit<
    Omit<ComponentProps<VC>, "ref"> & { ref?: (VC extends keyof JSX.IntrinsicElements ? JSX.IntrinsicElements[VC] : ComponentProps<VC>) extends { ref?: infer Ref } ? Ref : unknown },
    "as" | keyof Props
  >;

export type { PolymorphicComponentProp };
