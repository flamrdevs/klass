import type { JSX } from "preact/jsx-runtime";

import type { FinalRestrictedVariantsKey, FinalVariantsSchema } from "./types";

const getVariantKeys__filterFn = <VS extends FinalVariantsSchema>(el: keyof VS) => el !== "class" && el !== "className";
export const getVariantKeys = <VS extends FinalVariantsSchema>(keys: (keyof VS)[]) =>
  keys.filter(getVariantKeys__filterFn) as unknown as Exclude<keyof VS, symbol | number | FinalRestrictedVariantsKey>[];

export const splitRestProps = <P extends Record<string, any>>(props: P, keys: string[], fkeys?: string[]) => {
  const o: /** omited */ Record<string, any> = {},
    p: /** picked */ Record<string, any> = {};
  let key: string;
  for (key in props) {
    const value = maybeSignal(props[key]);
    if (keys.includes(key)) {
      p[key] = value;
      if (fkeys?.includes(key)) o[key] = value;
    } else {
      o[key] = value;
    }
  }
  return { o, p } as const;
};

export const isSignal = <T extends any>(obj: any): obj is JSX.SignalLike<T> => obj !== null && typeof obj === "object" && obj.brand === Symbol.for("preact-signals");

export const maybeSignal = <T extends any = any>(obj: any): obj is T => (isSignal<any>(obj) ? obj.value : obj);
