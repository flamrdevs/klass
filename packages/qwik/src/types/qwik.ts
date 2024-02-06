import type { FunctionComponent, Signal } from "@builder.io/qwik";
import type { JSX } from "@builder.io/qwik/jsx-runtime";

export type Signalish<T> = T | Signal<T>;
export type SignalishRecord<T extends Record<any, any>> = {
  [K in keyof T]: Signalish<T[K]>;
};

export type SupportedComponentType<P = {}> = FunctionComponent<P>;

export type SupportedComponentProps<T extends SupportedComponentType | keyof JSX.IntrinsicElements> = T extends SupportedComponentType<infer P>
  ? P
  : T extends keyof JSX.IntrinsicElements
  ? JSX.IntrinsicElements[T]
  : never;

export type SupportedElementType<P = any> =
  | {
      [K in keyof JSX.IntrinsicElements]: P extends JSX.IntrinsicElements[K] ? K : never;
    }[keyof JSX.IntrinsicElements]
  | SupportedComponentType<P>;

export type Classes = "class";
export type ClassesProps = Partial<Record<Classes, Signalish<string>>>;
