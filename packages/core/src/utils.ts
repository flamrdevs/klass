import { clsx } from "clsx";
import type { ClassValue } from "clsx";

import type { EndFn, AsFn } from "./types.ts";

export const defaultEndFn: EndFn = (value) => value;
export const defaultAsFn: AsFn = (condition, className) => `${condition}${className}`;

export const normalizeVariant = <T extends { [type: string]: ClassValue }>(variant: T) => {
  const result = {} as { [key in keyof T]: string };
  for (const key in variant) result[key] = clsx(variant[key]);
  return result;
};
