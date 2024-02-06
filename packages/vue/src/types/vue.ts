import { FunctionalComponent } from "vue";
import type { JSX } from "vue/jsx-runtime";

export type SupportedComponentType<P = {}> = FunctionalComponent<P>;

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
export type ClassesProps = Partial<Record<Classes, string>>;

export type BaseComponent = {
  displayName?: string;
};
