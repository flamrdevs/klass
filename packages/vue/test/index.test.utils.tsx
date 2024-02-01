import { defineComponent, ref } from "vue";

import { klass, reklass } from "@klass/core";

import { klassed, reklassed } from "../src/index.tsx";

import { customEnd, Div } from "./utils.tsx";

const boxKlass = klass({
  base: "block",
  variants: {
    m: { "1": "m-1", "2": "m-2", "3": "m-3", "4": "m-4", "5": "m-5" },
    p: { "1": "p-1", "2": "p-2", "3": "p-3", "4": "p-4", "5": "p-5" },
  },
});

export const BoxKlassed = klassed("div", boxKlass);

export const ButtonKlassed = klassed(
  "button",
  {
    base: "inline-block outline-none",
    variants: {
      color: { red: null, green: null, blue: null },
      variant: { filled: "text-white", outline: "bg-transparent border" },
      full: { true: "w-full h-full", width: "w-full", height: "h-full" },
    },
    defaults: { color: "red", variant: "filled" },
    compounds: [
      [{ color: "red", variant: "filled" }, "bg-red-600"],
      [{ color: "green", variant: "filled" }, "bg-green-600"],
      [{ color: "blue", variant: "filled" }, "bg-blue-600"],
      [{ color: "red", variant: "outline" }, "text-red-600 border-red-600"],
      [{ color: "green", variant: "outline" }, "text-green-600 border-green-600"],
      [{ color: "blue", variant: "outline" }, "text-blue-600 border-blue-600"],
    ],
  },
  { dp: { type: "button" } }
);

export const BoxElement = klassed(Div, boxKlass.o, { end: customEnd });

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

const boxReklass = reklass({
  conditions: [{ base: "", sm: "sm:", md: "md:", lg: "lg:" }, "base"],
  variants: {
    m: { "1": "m-1", "2": "m-2", "3": "m-3", "4": "m-4", "5": "m-5" },
    p: { "1": "p-1", "2": "p-2", "3": "p-3", "4": "p-4", "5": "p-5" },
  },
});

export const BoxReklassed = reklassed("div", boxReklass);

export const BoxCustomEndReklassed = reklassed("div", boxReklass.o, { end: customEnd });

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
