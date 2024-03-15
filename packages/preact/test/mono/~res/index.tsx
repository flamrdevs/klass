import { useState } from "preact/hooks";
import { computed, useSignal } from "@preact/signals";

import { klass, reklass } from "@klass/core";
import { createKlass, createReklass } from "@klass/core/create";

import { klassed, reklassed } from "./../../../src/mono";
import { createKlassed, createReklassed } from "./../../../src/mono/create";

import { shared } from "./../../../../core/test/~";

const dp = { type: "button" as const };
const fp = ["color" as const];

const klassCustomEnd = createKlass(shared.custom.endProps);
const reklassCustomEnd = createReklass(shared.custom.endProps);
const reklassCustomAs = createReklass(shared.custom.asProps);
const reklassCustomAsCustomEnd = createReklass(shared.custom.configEndAsProps);

const klassedCustomEnd = createKlassed(klassCustomEnd);
const reklassedCustomEnd = createReklassed(reklassCustomEnd);
const reklassedCustomAs = createReklassed(reklassCustomAs);
const reklassedCustomAsCustomEnd = createReklassed(reklassCustomAsCustomEnd);

const KlassButtonBasic = klass(shared.klass.button.basic.options);
export const KlassedButtonBasic = klassed("button", KlassButtonBasic, { dp });
export const KlassedButtonBasicCustomEnd = klassedCustomEnd("button", shared.klass.button.basic.options, { dp, fp });

export const KlassedButtonBase = klassed("button", shared.klass.button.base.options, { dp });
export const KlassedButtonBaseCustomEnd = klassedCustomEnd("button", shared.klass.button.base.options, { dp, fp });

export const KlassedButtonDefaults = klassed("button", shared.klass.button.defaults.options, { dp });
export const KlassedButtonDefaultsCustomEnd = klassedCustomEnd("button", shared.klass.button.defaults.options, { dp, fp });

export const KlassedButtonCompounds = klassed("button", shared.klass.button.compounds.options, { dp });
export const KlassedButtonCompoundsCustomEnd = klassedCustomEnd("button", shared.klass.button.compounds.options, { dp, fp });

const ReklassBoxBasic = reklass(shared.reklass.box.basic.options);
export const ReklassedBoxBasic = reklassed("div", ReklassBoxBasic);
export const ReklassedBoxBasicCustomEnd = reklassedCustomEnd("div", shared.reklass.box.basic.options);

export const ReklassedBoxCustomAs = reklassedCustomAs("div", shared.reklass.box.customAs.options);
export const ReklassedBoxCustomAsCustomEnd = reklassedCustomAsCustomEnd("div", shared.reklass.box.customAs.options);

export const KlassedButtonBasicReactive = () => {
  const [color, setColor] = useState<"red" | "green" | "blue">("red");
  const [classes, setClasses] = useState<string | null>(null);

  return (
    <KlassedButtonBasic
      data-testid="reactive"
      color={color}
      class={["extra", "classes", classes]}
      onClick={() => {
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
      color={color}
      class={className}
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
  const [x, setX] = useState<"1" | "2" | "2">("1");
  const [classes, setClasses] = useState<string | null>(null);

  return (
    <ReklassedBoxBasic
      data-testid="reactive"
      x={x}
      class={["extra", "classes", classes]}
      onClick={() => {
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
      x={x}
      class={className}
      onClick={() => {
        x.value = "2";
        classes.value = "reactive";
      }}
    >
      children
    </ReklassedBoxBasic>
  );
};
