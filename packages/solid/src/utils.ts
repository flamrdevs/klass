import type { FinalRestrictedVariantsKey, FinalVariantsSchema } from "./types/index.ts";

const getVariantKeys__filterFn = <VS extends FinalVariantsSchema>(el: keyof VS) => el !== "class" && el !== "classList";
export const getVariantKeys = <VS extends FinalVariantsSchema>(keys: (keyof VS)[]) => keys.filter(getVariantKeys__filterFn) as unknown as (keyof Exclude<VS, FinalRestrictedVariantsKey>)[];

export const PolymorphicKeysSplitter = ["as"] as const,
  ClassesKeysSplitter = ["class", "classList"] as const,
  classesProps = <P extends Partial<Record<FinalRestrictedVariantsKey, any>>>(props: P, defaultClass: any, defaultClassList: any) => [props.class ?? defaultClass, props.classList ?? defaultClassList];

export const typeofFunction = (value: unknown): value is Function => typeof value === "function";
