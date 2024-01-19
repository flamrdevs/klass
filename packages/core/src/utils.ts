import { clsx } from "clsx";
import type { ClassValue } from "clsx";

import type { EndFn, AsFn } from "./types.ts";

export const defaultEndFn: EndFn = (value) => value;
export const defaultAsFn: AsFn = (condition, className) => `${condition}${className}`;

export const normalizeVariant = <T extends { [type: string]: ClassValue }>(variant: T) => {
  let result = {} as { [key in keyof T]: string },
    key: keyof T;
  for (key in variant) result[key] = clsx(variant[key]);
  return result;
};
