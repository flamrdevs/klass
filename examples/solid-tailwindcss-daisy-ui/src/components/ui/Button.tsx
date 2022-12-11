import type { VariantsOf } from "@klass/core";
import { klassed } from "@klass/solid";

type ButtonVariants = VariantsOf<typeof Button["klass"]>;

const Button = klassed(
  "button",
  {
    base: "btn",
    variants: {
      color: {
        primary: "btn-primary",
        secondary: "btn-secondary",
        accent: "btn-accent",
        info: "btn-info",
        success: "btn-success",
        warning: "btn-warning",
        error: "btn-error",
      },
      variant: {
        ghost: "btn-ghost",
        link: "btn-link",
      },
      size: {
        xs: "btn-xs",
        sm: "btn-sm",
        md: "btn-md",
        lg: "btn-lg",
      },
      wide: {
        true: "btn-wide",
      },
      block: {
        true: "btn-block",
      },
      ratio: {
        circle: "btn-circle",
        square: "btn-square",
      },
      noAnimation: {
        true: "no-animation",
      },
    },
    defaultVariants: {
      color: "primary",
      size: "sm",
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
