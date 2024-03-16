import { isSignal } from "@builder.io/qwik";

import type { FinalRestrictedVariantsKey, FinalVariantsSchema } from "./types";

const getVariantKeys__filterFn = /* @__PURE__ */ <VS extends FinalVariantsSchema>(el: keyof VS) => el !== "class";
export const getVariantKeys = /* @__PURE__ */ <VS extends FinalVariantsSchema>(keys: (keyof VS)[]) =>
  keys.filter(getVariantKeys__filterFn) as unknown as Exclude<keyof VS, symbol | number | FinalRestrictedVariantsKey>[];

export const splitRestProps = /* @__PURE__ */ <P extends Record<string, any>>(props: P, keys: string[], fkeys?: string[]) => {
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

export const maybeSignal = /* @__PURE__ */ <T extends any = any>(obj: any): obj is T => (isSignal<any>(obj) ? obj.value : obj);
