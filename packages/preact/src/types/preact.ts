import type { ComponentType, JSX } from "preact";

type ElementType<P = any> =
  | {
      [K in keyof JSX.IntrinsicElements]: P extends JSX.IntrinsicElements[K] ? K : never;
    }[keyof JSX.IntrinsicElements]
  | ComponentType<P>;

type Classes = "class" | "className";
type ClassesProps = Partial<Record<Classes, string>>;

type BaseComponent = {
  displayName?: string;
};

export type { ElementType, Classes, ClassesProps, BaseComponent };
