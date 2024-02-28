import type { ForwardedRef, ReactNode } from "react";

import type { SupportedComponentProps, SupportedElementType } from "./react";

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
  children?: ReactNode;
}) &
  Omit<ResolveRefProps<SupportedComponentProps<ET>>, "as" | keyof Props>;

type ResolvePolymorphicRef<P extends {}> = ForwardedRef<
  P extends {
    ref?: infer Ref;
  }
    ? Ref
    : any
>;

export type PolymorphicRef<ET extends SupportedElementType> = ResolvePolymorphicRef<SupportedComponentProps<ET>>;
