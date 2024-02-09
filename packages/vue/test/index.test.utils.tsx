import { defineComponent, ref } from "vue";

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

export const KlassedButtonBasicReactive = defineComponent(() => {
  const as = ref<"a" | "button">("button");
  const color = ref<"red" | "green" | "blue">("red");
  const classes = ref<string | null>(null);

  return () => (
    <KlassedButtonBasic
      data-testid="reactive"
      as={as.value}
      color={color.value}
      class={["extra", "classes", classes.value]}
      onClick={() => {
        as.value = "a";
        color.value = "blue";
        classes.value = "reactive";
      }}
    >
      children
    </KlassedButtonBasic>
  );
});

export const ReklassedBoxBasicReactive = defineComponent(() => {
  const as = ref<"a" | "button">("button");
  const x = ref<"1" | "2" | "2">("1");
  const classes = ref<string | null>(null);

  return () => (
    <ReklassedBoxBasic
      data-testid="reactive"
      as={as.value}
      x={x.value}
      class={["extra", "classes", classes.value]}
      onClick={() => {
        as.value = "a";
        x.value = "2";
        classes.value = "reactive";
      }}
    >
      children
    </ReklassedBoxBasic>
  );
});
