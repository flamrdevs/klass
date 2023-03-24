import { splitProps } from "solid-js";
import type { Component } from "solid-js";

import { Dynamic } from "solid-js/web";

import { cxs } from "@klass/core";
import type { ClassValue } from "@klass/core";

import type { WithClassesValueProps } from "./types";

const LocalKeysSplitter = ["class", "classList"] as const,
  withClassValue = <P extends { [key: string]: any }>(component: Component<P>, ...classes: ClassValue[]) => {
    return function Wrapper(props: WithClassesValueProps<P>) {
      const [local, others] = splitProps(props, LocalKeysSplitter);

      return <Dynamic component={component} {...(others as P)} class={cxs(classes, local.class, local.classList)} />;
    };
  };

export { withClassValue };
