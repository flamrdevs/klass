import { clsx } from "clsx";

import { createCompose, createKlass, createReklass } from "./create";

const klass = /* @__PURE__ */ createKlass();
const reklass = /* @__PURE__ */ createReklass();
const compose = /* @__PURE__ */ createCompose();

export type { ClassValue } from "clsx";

export type * from "./types";
export { clsx, klass, reklass, compose };
