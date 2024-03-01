import type { FunctionComponent, JSX } from "preact";

export type SignalishRecord<T extends Record<any, any>> = {
  [K in keyof T]: JSX.Signalish<T[K]>;
};

export type SupportedComponentType<P = any> = FunctionComponent<P>;

export type SupportedComponentProps<T extends SupportedComponentType | keyof JSX.IntrinsicElements> =
  T extends SupportedComponentType<infer P> ? P : T extends keyof JSX.IntrinsicElements ? JSX.IntrinsicElements[T] : never;

export type SupportedElementType<P = any> =
  | {
      [K in keyof JSX.IntrinsicElements]: P extends JSX.IntrinsicElements[K] ? K : never;
    }[keyof JSX.IntrinsicElements]
  | SupportedComponentType<P>;

export type Classes = "class" | "className";
export type ClassesProps = Partial<Record<Classes, JSX.Signalish<string>>>;

export type BaseComponent = {
  displayName?: string;
};
