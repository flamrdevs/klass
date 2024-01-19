import { defineComponent, ref } from "vue";

import { klassed, reklassed } from "../src/index.tsx";

import { customEnd, Div } from "./utils.tsx";

export const BoxKlassed = klassed("div", {
  base: "block",
  variants: {
    m: { "1": "m-1", "2": "m-2", "3": "m-3", "4": "m-4", "5": "m-5" },
    p: { "1": "p-1", "2": "p-2", "3": "p-3", "4": "p-4", "5": "p-5" },
  },
});

export const ButtonKlassed = klassed(
  "button",
  {
    base: "inline-block outline-none",
    variants: {
      color: { red: null, green: null, blue: null },
      variant: { filled: "text-white", outline: "bg-transparent border" },
      full: { true: "w-full h-full", width: "w-full", height: "h-full" },
    },
    defaultVariants: { color: "red", variant: "filled" },
    compoundVariants: [
      { color: "red", variant: "filled", class: "bg-red-600" },
      { color: "green", variant: "filled", class: "bg-green-600" },
      { color: "blue", variant: "filled", class: "bg-blue-600" },
      { color: "red", variant: "outline", class: "text-red-600 border-red-600" },
      { color: "green", variant: "outline", class: "text-green-600 border-green-600" },
      { color: "blue", variant: "outline", class: "text-blue-600 border-blue-600" },
    ],
  },
  { dp: { type: "button" } }
);

export const BoxElement = klassed(Div, BoxKlassed.klass.o, { end: customEnd });

export const BoxCustomEndKlassed = klassed("div", BoxKlassed.klass.o, { end: customEnd });

export const KlassedReactiveComponent = defineComponent(() => {
  const as = ref<"a" | "button">("button");

  const m = ref<"1" | "2">("1");
  const p = ref<"1" | "2">("1");
  const classes = ref<string | null>(null);

  return () => (
    <BoxKlassed
      data-testid="reactive"
      as={as.value}
      m={m.value}
      p={p.value}
      class={["extra-reactive", "classes", classes.value]}
      onClick={() => {
        as.value = "a";
        m.value = "2";
        p.value = "2";
        classes.value = "reactive";
      }}
    >
      ReactiveKlassed
    </BoxKlassed>
  );
});

export const BoxReklassed = reklassed("div", {
  conditions: { base: "", sm: "sm:", md: "md:", lg: "lg:" },
  defaultCondition: "base",
  variants: {
    m: { "1": "m-1", "2": "m-2", "3": "m-3", "4": "m-4", "5": "m-5" },
    p: { "1": "p-1", "2": "p-2", "3": "p-3", "4": "p-4", "5": "p-5" },
  },
});

export const BoxCustomEndReklassed = reklassed("div", BoxReklassed.reklass.o, { end: customEnd });

export const ReklassedReactiveComponent = defineComponent(() => {
  const as = ref<"a" | "button">("button");

  const m = ref<"1" | { base: "1"; md: "3" }>("1");
  const p = ref<"1" | "2">("1");
  const classes = ref<string | undefined>();

  return () => (
    <BoxReklassed
      data-testid="reactive"
      as={as.value}
      m={m.value}
      p={p.value}
      class={["extra-reactive", "classes", classes.value]}
      onClick={() => {
        as.value = "a";
        m.value = { base: "1", md: "3" };
        p.value = "2";
        classes.value = "reactive";
      }}
    >
      ReactiveReklassed
    </BoxReklassed>
  );
});
