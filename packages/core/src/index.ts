import { clsx } from "clsx";

import { createKlass, createReklass, createCompose } from "./create";

const klass = createKlass();
const reklass = createReklass();
const compose = createCompose();

export type * from "./types";
export type { ClassValue } from "clsx";
export { clsx, klass, reklass, compose };
