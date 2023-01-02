import type { VariantsOf } from "@klass/core";
import { klassed } from "@klass/react";

type SwitchVariants = VariantsOf<typeof Switch["klass"]>;

const Switch = klassed(
  "input",
  {
    base: "switch",
    variants: {
      color: {
        primary: "",
        secondary: "",
        success: "",
        error: "",
        warning: "",
      },
      variant: {
        default: "",
        bordered: "",
        ghost: "",
      },
      size: {
        xs: "switch-xs",
        sm: "switch-sm",
        md: "switch-md",
        lg: "switch-lg",
        xl: "switch-xl",
      },
    },
    compoundVariants: [
      {
        variant: { color: "primary", variant: "default" },
        classes: "switch-primary",
      },
      {
        variant: { color: "secondary", variant: "default" },
        classes: "switch-secondary",
      },
      {
        variant: { color: "success", variant: "default" },
        classes: "switch-success",
      },
      {
        variant: { color: "error", variant: "default" },
        classes: "switch-error",
      },
      {
        variant: { color: "warning", variant: "default" },
        classes: "switch-warning",
      },
      {
        variant: { color: "primary", variant: "bordered" },
        classes: "switch-bordered-primary",
      },
      {
        variant: { color: "secondary", variant: "bordered" },
        classes: "switch-bordered-secondary",
      },
      {
        variant: { color: "success", variant: "bordered" },
        classes: "switch-bordered-success",
      },
      {
        variant: { color: "error", variant: "bordered" },
        classes: "switch-bordered-error",
      },
      {
        variant: { color: "warning", variant: "bordered" },
        classes: "switch-bordered-warning",
      },
      {
        variant: { color: "primary", variant: "ghost" },
        classes: "switch-ghost-primary",
      },
      {
        variant: { color: "secondary", variant: "ghost" },
        classes: "switch-ghost-secondary",
      },
      {
        variant: { color: "success", variant: "ghost" },
        classes: "switch-ghost-success",
      },
      {
        variant: { color: "error", variant: "ghost" },
        classes: "switch-ghost-error",
      },
      {
        variant: { color: "warning", variant: "ghost" },
        classes: "switch-ghost-warning",
      },
    ],
    defaultVariants: {
      color: "primary",
      variant: "default",
      size: "md",
    },
  },
  {
    defaultProps: {
      type: "checkbox",
    },
  }
);

export type { SwitchVariants };
export default Switch;
