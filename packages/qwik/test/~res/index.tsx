import { component$, useComputed$, useSignal } from "@builder.io/qwik";

import { klass, reklass } from "@klass/core";

import { klassed, reklassed } from "./../../src";

import { shared } from "./../../../core/test/~";

const dp = { type: "button" as const };
const fp = ["color" as const];

const KlassButtonBasic = klass(shared.klass.button.basic.options);
export const KlassedButtonBasic = klassed("button", KlassButtonBasic, { dp });
export const KlassedButtonBasicCustomEnd = klassed("button", shared.klass.button.basic.options, { dp, fp, end: shared.custom.end });

export const KlassedButtonBase = klassed("button", shared.klass.button.base.options, { dp });
export const KlassedButtonBaseCustomEnd = klassed("button", shared.klass.button.base.options, { dp, fp, end: shared.custom.end });

export const KlassedButtonDefaults = klassed("button", shared.klass.button.defaults.options, { dp });
export const KlassedButtonDefaultsCustomEnd = klassed("button", shared.klass.button.defaults.options, { dp, fp, end: shared.custom.end });

export const KlassedButtonCompounds = klassed("button", shared.klass.button.compounds.options, { dp });
export const KlassedButtonCompoundsCustomEnd = klassed("button", shared.klass.button.compounds.options, { dp, fp, end: shared.custom.end });

const ReklassBoxBasic = reklass(shared.reklass.box.basic.options);
export const ReklassedBoxBasic = reklassed("div", ReklassBoxBasic);
export const ReklassedBoxBasicCustomEnd = reklassed("div", shared.reklass.box.basic.options, shared.custom.endProps);

export const ReklassedBoxCustomAs = reklassed("div", shared.reklass.box.customAs.options, shared.custom.asProps);
export const ReklassedBoxCustomAsCustomEnd = reklassed("div", shared.reklass.box.customAs.options, shared.custom.configEndAsProps);

export const KlassedButtonBasicReactive = component$(() => {
  const as = useSignal<"a" | "button">("button");
  const color = useSignal<"red" | "green" | "blue">("red");
  const classes = useSignal<string | null>(null);

  return (
    <KlassedButtonBasic
      data-testid="reactive"
      as={as.value}
      color={color}
      class={["extra", "classes", classes.value]}
      onClick$={() => {
        as.value = "a";
        color.value = "blue";
        classes.value = "reactive";
      }}
    >
      children
    </KlassedButtonBasic>
  );
});
export const KlassedButtonBasicSignalReactive = component$(() => {
  const color = useSignal<"red" | "green" | "blue">("red");
  const classes = useSignal<string | null>(null);
  const className = useComputed$(() => ["extra", "classes", classes.value]);

  return (
    <KlassedButtonBasic
      data-testid="reactive"
      as="button"
      color={color}
      class={className}
      onClick$={() => {
        color.value = "blue";
        classes.value = "reactive";
      }}
    >
      children
    </KlassedButtonBasic>
  );
});

export const ReklassedBoxBasicReactive = component$(() => {
  const as = useSignal<"a" | "button">("button");
  const x = useSignal<"1" | "2" | "2">("1");
  const classes = useSignal<string | null>(null);

  return (
    <ReklassedBoxBasic
      data-testid="reactive"
      as={as.value}
      x={x}
      class={["extra", "classes", classes.value]}
      onClick$={() => {
        as.value = "a";
        x.value = "2";
        classes.value = "reactive";
      }}
    >
      children
    </ReklassedBoxBasic>
  );
});
export const ReklassedBoxBasicSignalReactive = component$(() => {
  const x = useSignal<"1" | "2" | "2">("1");
  const classes = useSignal<string | null>(null);
  const className = useComputed$(() => ["extra", "classes", classes.value]);

  return (
    <ReklassedBoxBasic
      data-testid="reactive"
      as="button"
      x={x}
      class={className}
      onClick$={() => {
        x.value = "2";
        classes.value = "reactive";
      }}
    >
      children
    </ReklassedBoxBasic>
  );
});
