import { clsx } from "clsx";

import { createKlass, createReklass, createCompose } from "./create";

const klass = /* @__PURE__ */ createKlass();
const reklass = /* @__PURE__ */ createReklass();
const compose = /* @__PURE__ */ createCompose();

export type * from "./types";
export type { ClassValue } from "clsx";
export { clsx, klass, reklass, compose };
