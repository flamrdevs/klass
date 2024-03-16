import type { FinalRestrictedVariantsKey, FinalVariantsSchema } from "./types";

const getVariantKeys__filterFn = /* @__PURE__ */ <VS extends FinalVariantsSchema>(el: keyof VS) => el !== "className";
export const getVariantKeys = /* @__PURE__ */ <VS extends FinalVariantsSchema>(keys: (keyof VS)[]) =>
  keys.filter(getVariantKeys__filterFn) as unknown as Exclude<keyof VS, symbol | number | FinalRestrictedVariantsKey>[];

export const splitRestProps = /* @__PURE__ */ <P extends Record<string, any>>(props: P, keys: string[], fkeys?: string[]) => {
  const o: /** omited */ Record<string, any> = {},
    p: /** picked */ Record<string, any> = {};
  let key: string;
  for (key in props) {
    const value = props[key];
    if (keys.includes(key)) {
      p[key] = value;
      if (fkeys?.includes(key)) o[key] = value;
    } else {
      o[key] = value;
    }
  }
  return { o, p } as const;
};
