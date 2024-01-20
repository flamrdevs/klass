import { createSignal } from "solid-js";

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

export const BoxElement = klassed(Div, BoxKlassed.klass.o, { end: customEnd });

export const BoxCustomEndKlassed = klassed("div", BoxKlassed.klass.o, { end: customEnd });

export const KlassedReactiveComponent = () => {
  const [as, setAs] = createSignal<"a" | "button">("button");

  const [m, setM] = createSignal<"1" | "2">("1");
  const [p, setP] = createSignal<"1" | "2">("1");
  const [classes, setClasses] = createSignal<string | null>(null);

  return (
    <BoxKlassed
      data-testid="reactive"
      as={as()}
      m={m()}
      p={p()}
      class={["extra-reactive", "classes", classes()]}
      onClick={() => {
        setAs("a");
        setM("2");
        setP("2");
        setClasses("reactive");
      }}
    >
      ReactiveKlassed
    </BoxKlassed>
  );
};

export const BoxReklassed = reklassed("div", {
  conditions: [{ base: "", sm: "sm:", md: "md:", lg: "lg:" }, "base"],
  variants: {
    m: { "1": "m-1", "2": "m-2", "3": "m-3", "4": "m-4", "5": "m-5" },
    p: { "1": "p-1", "2": "p-2", "3": "p-3", "4": "p-4", "5": "p-5" },
  },
});

export const BoxCustomEndReklassed = reklassed("div", BoxReklassed.reklass.o, { end: customEnd });

export const ReklassedReactiveComponent = () => {
  const [as, setAs] = createSignal<"a" | "button">("button");

  const [m, setM] = createSignal<"1" | { base: "1"; md: "3" }>("1");
  const [p, setP] = createSignal<"1" | "2">("1");
  const [classes, setClasses] = createSignal<string | undefined>();

  return (
    <BoxReklassed
      data-testid="reactive"
      as={as()}
      m={m()}
      p={p()}
      class={["extra-reactive", "classes", classes()]}
      onClick={() => {
        setAs("a");
        setM({ base: "1", md: "3" });
        setP("2");
        setClasses("reactive");
      }}
    >
      ReactiveReklassed
    </BoxReklassed>
  );
};
