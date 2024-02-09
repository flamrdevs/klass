import type { JSX } from "@builder.io/qwik/jsx-runtime";

export const A = (props: JSX.IntrinsicElements["a"]) => <a {...props} />;
export const Button = (props: JSX.IntrinsicElements["button"]) => <button {...props} />;
export const Div = (props: JSX.IntrinsicElements["div"]) => <div {...props} />;
