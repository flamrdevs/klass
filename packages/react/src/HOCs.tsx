import React from "react";
import type { ComponentType } from "react";

import { cxs } from "@klass/core";
import type { ClassValue } from "@klass/core";

import type { WithClassesValueProps } from "./types";

function withClassValue<P extends { [key: string]: any }>(Component: ComponentType<P>, ...classes: ClassValue[]) {
  return React.forwardRef<P extends { ref?: any } ? P["ref"] : unknown, WithClassesValueProps<P>>(function Wrapper({ className, ...others }, ref) {
    return <Component ref={ref} {...(others as P)} className={cxs(classes, className)} />;
  });
}

export { withClassValue };
