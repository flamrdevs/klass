import type { FinalRestrictedVariantsKey, FinalVariantsSchema } from "./types";

const getVariantKeys__filterFn = <VS extends FinalVariantsSchema>(el: keyof VS) => el !== "class";
export const getVariantKeys = <VS extends FinalVariantsSchema>(keys: (keyof VS)[]) =>
  keys.filter(getVariantKeys__filterFn) as unknown as Exclude<keyof VS, symbol | number | FinalRestrictedVariantsKey>[];

export const splitRestProps = <P extends { [key: PropertyKey]: any }, K extends PropertyKey>(props: P, keys: K[]) => {
  const o: /** omited */ Record<string, any> = {},
    p: /** picked */ Record<string, any> = {};
  let key: string;
  for (key in props) (keys.includes(key as K) ? p : o)[key] = props[key];
  return { o, p } as const;
};
