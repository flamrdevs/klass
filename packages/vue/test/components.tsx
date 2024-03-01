import { defineComponent, h } from "vue";
import type { FunctionalComponent } from "vue";
import type { JSX } from "vue/jsx-runtime";

export const A: FunctionalComponent<JSX.IntrinsicElements["a"]> = (_, { attrs, slots }) => h("a", attrs, slots);
export const Button: FunctionalComponent<JSX.IntrinsicElements["button"]> = (_, { attrs, slots }) => h("button", attrs, slots);
export const Div: FunctionalComponent<JSX.IntrinsicElements["div"]> = (_, { attrs, slots }) => h("div", attrs, slots);

A.inheritAttrs = false;
Button.inheritAttrs = false;
Div.inheritAttrs = false;

export const DefineA = defineComponent<JSX.IntrinsicElements["a"]>(
  (_, { attrs, slots }) =>
    () =>
      h("a", attrs, slots),
  { inheritAttrs: false }
);
export const DefineButton = defineComponent<JSX.IntrinsicElements["button"]>(
  (_, { attrs, slots }) =>
    () =>
      h("button", attrs, slots),
  { inheritAttrs: false }
);
export const DefineDiv = defineComponent<JSX.IntrinsicElements["div"]>(
  (_, { attrs, slots }) =>
    () =>
      h("div", attrs, slots),
  { inheritAttrs: false }
);
