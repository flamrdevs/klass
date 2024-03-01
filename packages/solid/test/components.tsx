import type { JSX } from "solid-js";

export const A = (props: JSX.IntrinsicElements["a"]) => <a {...props} />;
export const Button = (props: JSX.IntrinsicElements["button"]) => <button {...props} />;
export const Div = (props: JSX.IntrinsicElements["div"]) => <div {...props} />;

type WithRequiredProps<P> = Omit<P, "id"> & { id: string };

export const RequiredA = (props: WithRequiredProps<JSX.IntrinsicElements["a"]>) => <a {...props} />;
export const RequiredButton = (props: WithRequiredProps<JSX.IntrinsicElements["button"]>) => <button {...props} />;
export const RequiredDiv = (props: WithRequiredProps<JSX.IntrinsicElements["div"]>) => <div {...props} />;
