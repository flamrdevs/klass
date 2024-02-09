import type { JSX } from "preact";

export const A = (props: JSX.IntrinsicElements["a"]) => <a {...props} />;
export const Button = (props: JSX.IntrinsicElements["button"]) => <button {...props} />;
export const Div = (props: JSX.IntrinsicElements["div"]) => <div {...props} />;
