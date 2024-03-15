import { defineComponent, ref } from "vue";

import { klass, reklass } from "@klass/core";
import { createKlass, createReklass } from "@klass/core/create";

import { A } from "./components";

import { klassed, reklassed } from "./../../src";
import { createKlassed, createReklassed } from "./../../src/create";

import { shared } from "./../../../core/test/~";

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

export const KlassedButtonBasicReactive = defineComponent(() => {
  const as = ref<typeof A | "button">("button");
  const color = ref<"red" | "green" | "blue">("red");
  const classes = ref<string | null>(null);

  return () => (
    <KlassedButtonBasic
      data-testid="reactive"
      as={as.value}
      color={color.value}
      class={["extra", "classes", classes.value]}
      onClick={() => {
        as.value = A;
        color.value = "blue";
        classes.value = "reactive";
      }}
    >
      children
    </KlassedButtonBasic>
  );
});

export const ReklassedBoxBasicReactive = defineComponent(() => {
  const as = ref<typeof A | "button">("button");
  const x = ref<"1" | "2" | "2">("1");
  const classes = ref<string | null>(null);

  return () => (
    <ReklassedBoxBasic
      data-testid="reactive"
      as={as.value}
      x={x.value}
      class={["extra", "classes", classes.value]}
      onClick={() => {
        as.value = A;
        x.value = "2";
        classes.value = "reactive";
      }}
    >
      children
    </ReklassedBoxBasic>
  );
});
