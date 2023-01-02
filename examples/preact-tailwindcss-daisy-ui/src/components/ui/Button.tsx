import type { VariantsOf } from "@klass/core";
import { klassed } from "@klass/preact";

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
        accent: "",
        info: "",
        success: "",
        warning: "",
        error: "",
      },
      variant: {
        default: "",
        outline: "btn-outline",
        ghost: "btn-ghost",
      },
      size: {
        xs: "btn-xs",
        sm: "btn-sm",
        md: "btn-md",
        lg: "btn-lg",
      },
      block: {
        true: "btn-block",
      },
      wide: {
        true: "btn-wide",
      },
      glass: {
        true: "glass",
      },
      loading: {
        true: "loading",
      },
      isActive: {
        true: "btn-active",
      },
      isDisabled: {
        true: "btn-disabled",
      },
      noAnimation: {
        true: "no-animation",
      },
      ratio: {
        circle: "btn-circle",
        square: "btn-square",
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
        variant: { color: "accent", variant: "default" },
        classes: "btn-accent",
      },
      {
        variant: { color: "info", variant: "default" },
        classes: "btn-info",
      },
      {
        variant: { color: "success", variant: "default" },
        classes: "btn-success",
      },
      {
        variant: { color: "warning", variant: "default" },
        classes: "btn-warning",
      },
      {
        variant: { color: "error", variant: "default" },
        classes: "btn-error",
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
        variant: { color: "accent", variant: "outline" },
        classes: "btn-outline-accent",
      },
      {
        variant: { color: "info", variant: "outline" },
        classes: "btn-outline-info",
      },
      {
        variant: { color: "success", variant: "outline" },
        classes: "btn-outline-success",
      },
      {
        variant: { color: "warning", variant: "outline" },
        classes: "btn-outline-warning",
      },
      {
        variant: { color: "error", variant: "outline" },
        classes: "btn-outline-error",
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
