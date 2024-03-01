import type { FunctionComponent, JSX } from "react";

export type Props = Record<string, any>;

export type SupportedComponentType<P extends Props = {}> = FunctionComponent<P>;

export type SupportedComponentProps<T extends SupportedComponentType | keyof JSX.IntrinsicElements> =
  T extends SupportedComponentType<infer P> ? P : T extends keyof JSX.IntrinsicElements ? JSX.IntrinsicElements[T] : never;

export type SupportedElementType<P extends Props = {}> =
  | {
      [K in keyof JSX.IntrinsicElements]: P extends JSX.IntrinsicElements[K] ? K : never;
    }[keyof JSX.IntrinsicElements]
  | SupportedComponentType<P>;

export type Classes = "className";
export type ClassesProps = Partial<Record<Classes, string>>;

export type BaseComponent = {
  displayName?: string;
};
