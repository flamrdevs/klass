import { isSignal } from "@builder.io/qwik";

import type { FinalRestrictedVariantsKey, FinalVariantsSchema } from "./types";

const getVariantKeys__filterFn = <VS extends FinalVariantsSchema>(el: keyof VS) => el !== "class";
export const getVariantKeys = <VS extends FinalVariantsSchema>(keys: (keyof VS)[]) => keys.filter(getVariantKeys__filterFn) as unknown as (keyof Exclude<VS, FinalRestrictedVariantsKey>)[];

export const splitRestProps = <P extends { [key: PropertyKey]: any }, K extends PropertyKey>(props: P, keys: K[]) => {
  let o: /** omited */ Record<string, any> = {},
    p: /** picked */ Record<string, any> = {},
    key: string;
  for (key in props) (keys.includes(key as K) ? p : o)[key] = maybeSignal(props[key]);
  return { o, p } as const;
};

export const maybeSignal = <T extends any = any>(obj: any): obj is T => (isSignal<any>(obj) ? obj.value : obj);

export const typeofFunction = (value: unknown): value is Function => typeof value === "function";
