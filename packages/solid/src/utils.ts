import type { ClassesProps } from "./types/solid";
import type { FinalRestrictedVariantsKey, FinalVariantsSchema, ClassesValueProps } from "./types";

const getVariantKeys__filterFn = <VS extends FinalVariantsSchema>(el: keyof VS) => el !== "class" && el !== "classList";
export const getVariantKeys = <VS extends FinalVariantsSchema>(keys: (keyof VS)[]) =>
  keys.filter(getVariantKeys__filterFn) as unknown as Exclude<keyof VS, symbol | number | FinalRestrictedVariantsKey>[];

export const PolymorphicKeysSplitter = ["as"] as const,
  ClassesKeysSplitter = ["class", "classList"] as const,
  classesProps = <P extends ClassesValueProps>(props: P, defaultClass?: ClassesProps["class"], defaultClassList?: ClassesProps["classList"]) => [
    props.class ?? defaultClass,
    props.classList ?? defaultClassList,
  ];
