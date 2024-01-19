import { JSX } from "preact/jsx-runtime";

export const isSignal = <T extends any>(obj: any): obj is JSX.SignalLike<T> => obj !== null && typeof obj === "object" && obj.brand === Symbol.for("preact-signals");

export const maybeSignal = <T extends any = any>(obj: any): obj is T => (isSignal<any>(obj) ? obj.value : obj);
