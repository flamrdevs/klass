import type { ComponentChildren, ComponentType, JSX } from "preact";

type ElementType<P = any> =
  | {
      [K in keyof JSX.IntrinsicElements]: P extends JSX.IntrinsicElements[K] ? K : never;
    }[keyof JSX.IntrinsicElements]
  | ComponentType<P>;

type PropsWithChildren<P = unknown> = P & {
  children?: ComponentChildren;
};

export { ElementType, PropsWithChildren };
