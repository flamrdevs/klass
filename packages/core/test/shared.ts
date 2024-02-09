import { EndFn, AsFn } from "./../src/types.ts";

export const customEnd: EndFn = (value) => `end( ${value} )`;
export const customAs: AsFn = (condition, className) => `${className}${condition}`;

export * as klass from "./shared/klass.ts";
export * as reklass from "./shared/reklass.ts";
