import type { SupportedComponentProps, SupportedElementType } from "./vue.ts";

type ResolveRefProps<P extends {}> = Omit<P, "ref"> & {
  ref?: P extends {
    ref?: infer Ref;
  }
    ? Ref
    : unknown;
};

type PolymorphicComponentProps<ET extends SupportedElementType, Props = {}> = (Props & {
  as?: ET;
}) &
  Omit<ResolveRefProps<SupportedComponentProps<ET>>, "as" | keyof Props>;

export type { PolymorphicComponentProps };
