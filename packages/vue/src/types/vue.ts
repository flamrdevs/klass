import { FunctionalComponent } from "vue";
import type { JSX } from "vue/jsx-runtime";

type ValidComponent = FunctionalComponent | keyof JSX.IntrinsicElements;

type ComponentProps<T extends ValidComponent> = T extends FunctionalComponent<infer P> ? P : T extends keyof JSX.IntrinsicElements ? JSX.IntrinsicElements[T] : Record<string, unknown>;

type ElementType<P = any> =
  | {
      [K in keyof JSX.IntrinsicElements]: P extends JSX.IntrinsicElements[K] ? K : never;
    }[keyof JSX.IntrinsicElements]
  | FunctionalComponent<P>;

type Classes = "class";
type ClassesProps = Partial<Record<Classes, string>>;

type BaseComponent = {
  displayName?: string;
};

export type { ComponentProps, ElementType, Classes, ClassesProps, BaseComponent };
