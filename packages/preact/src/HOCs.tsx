import type { ComponentType } from "preact";

import { cx } from "@klass/core";
import type { ClassValue } from "@klass/core";

import type { WithClassesValueProps } from "./types";

function withClassValue<P extends { [key: string]: any }>(Component: ComponentType<P>, ...classes: ClassValue[]) {
  return function ({ class: _class, className, ...others }: WithClassesValueProps<P>) {
    return <Component {...(others as P)} class={cx(classes, _class, className)} />;
  };
}

export { withClassValue };
