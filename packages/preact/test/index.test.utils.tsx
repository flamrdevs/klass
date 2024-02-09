import { useState } from "preact/hooks";
import { computed, useSignal } from "@preact/signals";

import { klass, reklass } from "@klass/core";

import { klassed, reklassed } from "../src/index.tsx";

import { shared } from "./../../core/test/exports.ts";

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
  const [as, setAs] = useState<"a" | "button">("button");
  const [color, setColor] = useState<"red" | "green" | "blue">("red");
  const [classes, setClasses] = useState<string | null>(null);

  return (
    <KlassedButtonBasic
      data-testid="reactive"
      as={as}
      color={color}
      className={["extra", "classes", classes]}
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
export const KlassedButtonBasicSignalReactive = () => {
  const color = useSignal<"red" | "green" | "blue">("red");
  const classes = useSignal<string | null>(null);
  const className = computed(() => ["extra", "classes", classes.value]);

  return (
    <KlassedButtonBasic
      data-testid="reactive"
      as="button"
      color={color}
      className={className}
      onClick={() => {
        color.value = "blue";
        classes.value = "reactive";
      }}
    >
      children
    </KlassedButtonBasic>
  );
};

export const ReklassedBoxBasicReactive = () => {
  const [as, setAs] = useState<"a" | "button">("button");
  const [x, setX] = useState<"1" | "2" | "2">("1");
  const [classes, setClasses] = useState<string | null>(null);

  return (
    <ReklassedBoxBasic
      data-testid="reactive"
      as={as}
      x={x}
      className={["extra", "classes", classes]}
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
export const ReklassedBoxBasicSignalReactive = () => {
  const x = useSignal<"1" | "2" | "2">("1");
  const classes = useSignal<string | null>(null);
  const className = computed(() => ["extra", "classes", classes.value]);

  return (
    <ReklassedBoxBasic
      data-testid="reactive"
      as="button"
      x={x}
      className={className}
      onClick={() => {
        x.value = "2";
        classes.value = "reactive";
      }}
    >
      children
    </ReklassedBoxBasic>
  );
};
