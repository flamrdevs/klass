import { clsx } from "clsx";
import type { ClassValue } from "clsx";

import type { EndFn, AsFn } from "./types";

export const defaultEndFn: EndFn = /* @__PURE__ */ (value) => value;
export const defaultAsFn: AsFn = /* @__PURE__ */ (condition, className) => `${condition}${className}`;

export const normalizeVariant = /* @__PURE__ */ <T extends { [type: string]: ClassValue }>(variant: T) => {
  let result = {} as { [key in keyof T]: string },
    key: keyof T;
  for (key in variant) result[key] = clsx(variant[key]);
  return result;
};

export const typeofFunction = /* @__PURE__ */ (value: unknown): value is Function => typeof value === "function";
