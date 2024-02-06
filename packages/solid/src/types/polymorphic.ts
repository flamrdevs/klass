import type { JSX } from "solid-js";

import type { SupportedComponentProps, SupportedElementType } from "./solid.ts";

type ResolveRefProps<P extends {}> = Omit<P, "ref"> & {
  ref?: P extends {
    ref?: infer Ref;
  }
    ? Ref
    : unknown;
};

export type PolymorphicComponentProps<ET extends SupportedElementType, Props = {}> = (Props & {
  as?: ET;
} & {
  children?: JSX.Element;
}) &
  Omit<ResolveRefProps<SupportedComponentProps<ET>>, "as" | keyof Props>;
