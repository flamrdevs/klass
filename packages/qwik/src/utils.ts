import { isSignal } from "@builder.io/qwik";

export const maybeSignal = <T extends any = any>(obj: any): obj is T => (isSignal<any>(obj) ? obj.value : obj);
