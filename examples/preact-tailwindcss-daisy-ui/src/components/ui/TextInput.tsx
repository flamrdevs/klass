import type { VariantsOf } from "@klass/core";
import { klassed } from "@klass/preact";

type TextInputVariants = VariantsOf<typeof TextInput["klass"]>;

const TextInput = klassed(
  "input",
  {
    base: "input",
    variants: {
      color: {
        default: "",
        primary: "input-primary",
        secondary: "input-secondary",
        accent: "input-accent",
        info: "input-info",
        success: "input-success",
        warning: "input-warning",
        error: "input-error",
      },
      variant: {
        default: "",
        bordered: "input-bordered",
        ghost: "input-ghost",
      },
      size: {
        xs: "input-xs",
        sm: "input-sm",
        md: "input-md",
        lg: "input-lg",
      },
    },
    defaultVariants: {
      color: "default",
      variant: "default",
      size: "sm",
    },
  },
  {
    defaultProps: {
      type: "text",
    },
  }
);

export type { TextInputVariants };
export default TextInput;
