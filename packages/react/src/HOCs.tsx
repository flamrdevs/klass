import { forwardRef } from "react";
import type { ComponentType } from "react";

import { clsx } from "@klass/core";
import type { ClassValue } from "@klass/core";

function withClassValue<P extends { [key: string]: any }>(Component: ComponentType<P>, ...classes: ClassValue[]) {
  const classesx = clsx(classes);

  const Wrapper = forwardRef<P extends { ref?: any } ? P["ref"] : unknown, Omit<P, "className"> & { className?: ClassValue }>(
    ({ className, ...others }, ref) => {
      return <Component ref={ref} {...(others as P)} className={clsx(classesx, className)} />;
    }
  );

  return Wrapper;
}

export { withClassValue };
