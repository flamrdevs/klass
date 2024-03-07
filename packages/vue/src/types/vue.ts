import type { DefineSetupFnComponent, FunctionalComponent } from "vue";
import type { JSX } from "vue/jsx-runtime";

type SimpleComponent<P> = new () => { $props: P };

export type SupportedComponentType<P = any> = SimpleComponent<P> | FunctionalComponent<P> | (P extends Record<string, any> ? DefineSetupFnComponent<P> : never);

export type SupportedComponentProps<T extends SupportedComponentType | keyof JSX.IntrinsicElements> =
  T extends SupportedComponentType<infer P> ? P : T extends keyof JSX.IntrinsicElements ? JSX.IntrinsicElements[T] : {};

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
