import type { VariantsOf } from "@klass/core";
import { klassed } from "@klass/react";

type InputVariants = VariantsOf<typeof Input["klass"]>;

const Input = klassed(
  "input",
  {
    base: "input",
    variants: {
      color: {
        default: "",
        primary: "",
        secondary: "",
        success: "",
        error: "",
        warning: "",
      },
      variant: {
        default: "",
        ghost: "",
      },
      size: {
        xs: "input-xs",
        sm: "input-sm",
        md: "input-md",
        lg: "input-lg",
        xl: "input-xl",
      },
      rounded: {
        true: "input-rounded",
      },
      block: {
        true: "input-block",
      },
    },
    compoundVariants: [
      {
        variant: { color: "primary", variant: "default" },
        classes: "input-primary",
      },
      {
        variant: { color: "secondary", variant: "default" },
        classes: "input-secondary",
      },
      {
        variant: { color: "success", variant: "default" },
        classes: "input-success",
      },
      {
        variant: { color: "error", variant: "default" },
        classes: "input-error",
      },
      {
        variant: { color: "warning", variant: "default" },
        classes: "input-warning",
      },
      {
        variant: { color: "primary", variant: "ghost" },
        classes: "input-ghost-primary",
      },
      {
        variant: { color: "secondary", variant: "ghost" },
        classes: "input-ghost-secondary",
      },
      {
        variant: { color: "success", variant: "ghost" },
        classes: "input-ghost-success",
      },
      {
        variant: { color: "error", variant: "ghost" },
        classes: "input-ghost-error",
      },
      {
        variant: { color: "warning", variant: "ghost" },
        classes: "input-ghost-warning",
      },
    ],
    defaultVariants: {
      color: "default",
      variant: "default",
      size: "md",
    },
  },
  {
    defaultProps: {
      type: "text",
    },
  }
);

export type { InputVariants };
export default Input;
