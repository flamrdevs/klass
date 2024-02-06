import type { JSXChildren } from "@builder.io/qwik";

import type { SupportedComponentProps, SupportedElementType } from "./qwik.ts";

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
  children?: JSXChildren;
}) &
  Omit<ResolveRefProps<SupportedComponentProps<ET>>, "as" | keyof Props>;
