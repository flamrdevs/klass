import { klass, reklass } from "@klass/core";

import { klassed, reklassed } from "./../../src/mono";

import { shared } from "./../../../core/test/exports";

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
