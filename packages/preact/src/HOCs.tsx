import type { ComponentType } from "preact";

import { clsx } from "@klass/core";
import type { ClassValue } from "@klass/core";

function withClassValue<P extends { [key: string]: any }>(Component: ComponentType<P>, ...classes: ClassValue[]) {
  const classesx = clsx(classes);

  const Wrapper = ({
    class: _class,
    className,
    ...others
  }: Omit<P, "class" | "className"> & { class?: ClassValue; className?: ClassValue }) => {
    return <Component {...(others as P)} class={clsx(classesx, _class, className)} />;
  };

  return Wrapper;
}

export { withClassValue };
