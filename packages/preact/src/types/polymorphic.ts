import type { ComponentChildren } from "preact";

import type { SupportedComponentProps, SupportedElementType } from "./preact";

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
  children?: ComponentChildren;
}) &
  Omit<ResolveRefProps<SupportedComponentProps<ET>>, "as" | keyof Props>;
