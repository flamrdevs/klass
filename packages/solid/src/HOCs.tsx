import { splitProps } from "solid-js";
import type { Component } from "solid-js";

import { clsx } from "@klass/core";
import type { ClassValue } from "@klass/core";

function withClassValue<P extends { [key: string]: any }>(Component: Component<P>, ...classes: ClassValue[]) {
  const classesx = clsx(classes);

  const Wrapper = (props: Omit<P, "class" | "classList"> & { class?: ClassValue; classList?: ClassValue }) => {
    const [local, others] = splitProps(props, ["class", "classList"]);

    return <Component {...(others as P)} class={clsx(classesx, local.class, local.classList)} />;
  };

  return Wrapper;
}

export { withClassValue };
