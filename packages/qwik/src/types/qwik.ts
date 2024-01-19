import type { FunctionComponent, Signal } from "@builder.io/qwik";
import type { JSX } from "@builder.io/qwik/jsx-runtime";

type Signalish<T> = T | Signal<T>;

type SignalishRecord<T extends Record<any, any>> = { [K in keyof T]: Signalish<T[K]> };

type ValidComponent = FunctionComponent | keyof JSX.IntrinsicElements;

type ComponentProps<T extends ValidComponent> = T extends FunctionComponent<infer P> ? P : T extends keyof JSX.IntrinsicElements ? JSX.IntrinsicElements[T] : Record<string, unknown>;

type ElementType<P extends Record<any, any> = Record<any, any>> =
  | {
      [K in keyof JSX.IntrinsicElements]: P extends JSX.IntrinsicElements[K] ? K : never;
    }[keyof JSX.IntrinsicElements]
  | FunctionComponent<P>;

type Classes = "class";
type ClassesProps = Partial<Record<Classes, Signalish<string>>>;

type BaseComponent = {
  displayName?: string;
};

export type { Signalish, SignalishRecord, ComponentProps, ElementType, Classes, ClassesProps, BaseComponent };
