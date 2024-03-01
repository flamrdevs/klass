import { klass, reklass } from "@klass/core";

import { klassed, reklassed } from "./../../src/mono";

import { shared } from "./../../../core/test/exports";

const dp = { type: "button" as const };
const fp = ["color" as const];

const KlassButtonBasic = klass(shared.klass.button.basic.options);
export const KlassedButtonBasic = klassed("button", KlassButtonBasic, { dp });
export const KlassedButtonBasicCustomEnd = klassed("button", shared.klass.button.basic.options, { dp, fp, end: shared.customEnd });

export const KlassedButtonBase = klassed("button", shared.klass.button.base.options, { dp });
export const KlassedButtonBaseCustomEnd = klassed("button", shared.klass.button.base.options, { dp, fp, end: shared.customEnd });

export const KlassedButtonDefaults = klassed("button", shared.klass.button.defaults.options, { dp });
export const KlassedButtonDefaultsCustomEnd = klassed("button", shared.klass.button.defaults.options, { dp, fp, end: shared.customEnd });

export const KlassedButtonCompounds = klassed("button", shared.klass.button.compounds.options, { dp });
export const KlassedButtonCompoundsCustomEnd = klassed("button", shared.klass.button.compounds.options, { dp, fp, end: shared.customEnd });

const ReklassBoxBasic = reklass(shared.reklass.box.basic.options);
export const ReklassedBoxBasic = reklassed("div", ReklassBoxBasic);
export const ReklassedBoxBasicCustomEnd = reklassed("div", shared.reklass.box.basic.options, { end: shared.customEnd });

export const ReklassedBoxCustomAs = reklassed("div", shared.reklass.box.customAs.options, { as: shared.customAs });
export const ReklassedBoxCustomAsCustomEnd = reklassed("div", shared.reklass.box.customAs.options, { end: shared.customEnd, as: shared.customAs });
