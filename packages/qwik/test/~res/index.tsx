import { component$, useComputed$, useSignal } from "@builder.io/qwik";

import { klass, reklass } from "@klass/core";
import { createKlass, createReklass } from "@klass/core/create";

import { A$ } from "./components";

import { klassed, reklassed } from "./../../src";
import { createKlassed, createReklassed } from "./../../src/create";

import { DATA_TESTID_REACTIVE_PROPS } from "./../../../tests";

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

export const KlassedButtonBasicReactive = component$(() => {
  const as = useSignal<typeof A$ | "button">("button");
  const color = useSignal<"red" | "green" | "blue">("red");
  const classes = useSignal<string | null>(null);

  return (
    <KlassedButtonBasic
      {...DATA_TESTID_REACTIVE_PROPS}
      as={as.value as "button"}
      color={color}
      class={["extra", "classes", classes.value]}
      onClick$={() => {
        as.value = A$;
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
      {...DATA_TESTID_REACTIVE_PROPS}
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
  const as = useSignal<typeof A$ | "button">("button");
  const x = useSignal<"1" | "2" | "2">("1");
  const classes = useSignal<string | null>(null);

  return (
    <ReklassedBoxBasic
      {...DATA_TESTID_REACTIVE_PROPS}
      as={as.value as "button"}
      x={x}
      class={["extra", "classes", classes.value]}
      onClick$={() => {
        as.value = A$;
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
      {...DATA_TESTID_REACTIVE_PROPS}
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
