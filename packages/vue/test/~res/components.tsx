import { defineComponent, h } from "vue";
import type { FunctionalComponent } from "vue";
import type { JSX } from "vue/jsx-runtime";

export const A: FunctionalComponent<JSX.IntrinsicElements["a"]> = (_, { attrs, slots }) => h("a", attrs, slots);
export const Button: FunctionalComponent<JSX.IntrinsicElements["button"]> = (_, { attrs, slots }) => h("button", attrs, slots);
export const Div: FunctionalComponent<JSX.IntrinsicElements["div"]> = (_, { attrs, slots }) => h("div", attrs, slots);

A.inheritAttrs = false;
Button.inheritAttrs = false;
Div.inheritAttrs = false;

type WithRequiredProps<P> = Omit<P, "id"> & { id: string };

export const RequiredA: FunctionalComponent<WithRequiredProps<JSX.IntrinsicElements["a"]>> = (_, { attrs, slots }) => h("a", attrs, slots);
export const RequiredButton: FunctionalComponent<WithRequiredProps<JSX.IntrinsicElements["button"]>> = (_, { attrs, slots }) => h("button", attrs, slots);
export const RequiredDiv: FunctionalComponent<WithRequiredProps<JSX.IntrinsicElements["div"]>> = (_, { attrs, slots }) => h("div", attrs, slots);

RequiredA.inheritAttrs = false;
RequiredButton.inheritAttrs = false;
RequiredDiv.inheritAttrs = false;

export const DefinedA = defineComponent<WithRequiredProps<JSX.IntrinsicElements["a"]>>(
  (_, { attrs, slots }) =>
    () =>
      h("a", attrs, slots),
  { inheritAttrs: false }
);
export const DefinedButton = defineComponent<WithRequiredProps<JSX.IntrinsicElements["button"]>>(
  (_, { attrs, slots }) =>
    () =>
      h("button", attrs, slots),
  { inheritAttrs: false }
);
export const DefinedDiv = defineComponent<WithRequiredProps<JSX.IntrinsicElements["div"]>>(
  (_, { attrs, slots }) =>
    () =>
      h("div", attrs, slots),
  { inheritAttrs: false }
);
