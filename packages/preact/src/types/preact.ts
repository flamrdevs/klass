import type { ComponentType, JSX } from "preact";

type Signalish<T> = JSX.Signalish<T>;

type SignalishRecord<T extends Record<any, any>> = { [K in keyof T]: Signalish<T[K]> };

type ElementType<P = any> =
  | {
      [K in keyof JSX.IntrinsicElements]: P extends JSX.IntrinsicElements[K] ? K : never;
    }[keyof JSX.IntrinsicElements]
  | ComponentType<P>;

type Classes = "class" | "className";
type ClassesProps = Partial<Record<Classes, Signalish<string>>>;

type BaseComponent = {
  displayName?: string;
};

export type { Signalish, SignalishRecord, ElementType, Classes, ClassesProps, BaseComponent };
