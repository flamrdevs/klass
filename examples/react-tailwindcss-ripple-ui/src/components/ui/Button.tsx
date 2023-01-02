import type { VariantsOf } from "@klass/core";
import { klassed } from "@klass/react";

type ButtonVariants = VariantsOf<typeof Button["klass"]>;

const Button = klassed(
  "button",
  {
    base: "btn",
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
        outline: "",
        ghost: "btn-ghost",
      },
      size: {
        xs: "btn-xs",
        sm: "btn-sm",
        md: "btn-md",
        lg: "btn-lg",
        xl: "btn-xl",
      },
      rounded: {
        true: "btn-rounded",
      },
      block: {
        true: "btn-block",
      },
      loading: {
        true: "btn-loading",
      },
      noAnimation: {
        true: "btn-no-animation",
      },
    },
    compoundVariants: [
      {
        variant: { color: "primary", variant: "default" },
        classes: "btn-primary",
      },
      {
        variant: { color: "secondary", variant: "default" },
        classes: "btn-secondary",
      },
      {
        variant: { color: "success", variant: "default" },
        classes: "btn-success",
      },
      {
        variant: { color: "error", variant: "default" },
        classes: "btn-error",
      },
      {
        variant: { color: "warning", variant: "default" },
        classes: "btn-warning",
      },
      {
        variant: { color: "primary", variant: "outline" },
        classes: "btn-outline-primary",
      },
      {
        variant: { color: "secondary", variant: "outline" },
        classes: "btn-outline-secondary",
      },
      {
        variant: { color: "success", variant: "outline" },
        classes: "btn-outline-success",
      },
      {
        variant: { color: "error", variant: "outline" },
        classes: "btn-outline-error",
      },
      {
        variant: { color: "warning", variant: "outline" },
        classes: "btn-outline-warning",
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
      type: "button",
    },
  }
);

export type { ButtonVariants };
export default Button;
