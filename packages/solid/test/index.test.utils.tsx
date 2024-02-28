import { createSignal } from "solid-js";

import { klass, reklass } from "@klass/core";

import { klassed, reklassed } from "../src";

import { shared } from "./../../core/test/exports";

const KlassButtonBasic = klass(shared.klass.button.basic.options);
export const KlassedButtonBasic = klassed("button", KlassButtonBasic, { dp: { type: "button" } });
export const KlassedButtonBasicCustomEnd = klassed("button", shared.klass.button.basic.options, { dp: { type: "button" }, end: shared.customEnd });

export const KlassedButtonBase = klassed("button", shared.klass.button.base.options, { dp: { type: "button" } });
export const KlassedButtonBaseCustomEnd = klassed("button", shared.klass.button.base.options, { dp: { type: "button" }, end: shared.customEnd });

export const KlassedButtonDefaults = klassed("button", shared.klass.button.defaults.options, { dp: { type: "button" } });
export const KlassedButtonDefaultsCustomEnd = klassed("button", shared.klass.button.defaults.options, { dp: { type: "button" }, end: shared.customEnd });

export const KlassedButtonCompounds = klassed("button", shared.klass.button.compounds.options, { dp: { type: "button" } });
export const KlassedButtonCompoundsCustomEnd = klassed("button", shared.klass.button.compounds.options, { dp: { type: "button" }, end: shared.customEnd });

const ReklassBoxBasic = reklass(shared.reklass.box.basic.options);
export const ReklassedBoxBasic = reklassed("div", ReklassBoxBasic);
export const ReklassedBoxBasicCustomEnd = reklassed("div", shared.reklass.box.basic.options, { end: shared.customEnd });

export const ReklassedBoxCustomAs = reklassed("div", shared.reklass.box.customAs.options, { as: shared.customAs });
export const ReklassedBoxCustomAsCustomEnd = reklassed("div", shared.reklass.box.customAs.options, { end: shared.customEnd, as: shared.customAs });

export const KlassedButtonBasicReactive = () => {
  const [as, setAs] = createSignal<"a" | "button">("button");
  const [color, setColor] = createSignal<"red" | "green" | "blue">("red");
  const [classes, setClasses] = createSignal<string | null>(null);

  return (
    <KlassedButtonBasic
      data-testid="reactive"
      as={as()}
      color={color()}
      class={["extra", "classes", classes()]}
      onClick={() => {
        setAs("a");
        setColor("blue");
        setClasses("reactive");
      }}
    >
      children
    </KlassedButtonBasic>
  );
};

export const ReklassedBoxBasicReactive = () => {
  const [as, setAs] = createSignal<"a" | "button">("button");
  const [x, setX] = createSignal<"1" | "2" | "2">("1");
  const [classes, setClasses] = createSignal<string | null>(null);

  return (
    <ReklassedBoxBasic
      data-testid="reactive"
      as={as()}
      x={x()}
      class={["extra", "classes", classes()]}
      onClick={() => {
        setAs("a");
        setX("2");
        setClasses("reactive");
      }}
    >
      children
    </ReklassedBoxBasic>
  );
};
