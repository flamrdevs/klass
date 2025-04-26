import type { ClassValue } from "@klass/core";

import type { ClassesValueProps, FinalRestrictedVariantsKey, FinalVariantsSchema } from "./types";
import type { ClassesProps } from "./types/solid";

const getVariantKeys__filterFn = /* @__PURE__ */ <VS extends FinalVariantsSchema>(el: keyof VS) => el !== "class" && el !== "classList";
export const getVariantKeys = /* @__PURE__ */ <VS extends FinalVariantsSchema>(keys: (keyof VS)[]) =>
	keys.filter(getVariantKeys__filterFn) as unknown as Exclude<keyof VS, symbol | number | FinalRestrictedVariantsKey>[];

export const PolymorphicKeysSplitter = ["as"] as const;
export const ClassesKeysSplitter = ["class", "classList"] as const;

export const classesProps: (props: ClassesValueProps, defaultClass?: ClassesProps["class"], defaultClassList?: ClassesProps["classList"]) => [ClassValue, ClassValue] = /* @__PURE__ */ (
	props,
	defaultClass,
	defaultClassList
) => [props.class ?? defaultClass, props.classList ?? defaultClassList];
