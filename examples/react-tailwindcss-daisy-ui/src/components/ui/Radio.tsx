import type { VariantsOf } from "@klass/core";
import { klassed } from "@klass/react";

type RadioVariants = VariantsOf<typeof Radio["klass"]>;

const Radio = klassed(
  "input",
  {
    base: "radio",
    variants: {
      color: {
        primary: "radio-primary",
        secondary: "radio-secondary",
        accent: "radio-accent",
        info: "radio-info",
        success: "radio-success",
        warning: "radio-warning",
        error: "radio-error",
      },
      size: {
        xs: "radio-xs",
        sm: "radio-sm",
        md: "radio-md",
        lg: "radio-lg",
      },
    },
    defaultVariants: {
      color: "primary",
      size: "sm",
    },
  },
  {
    defaultProps: {
      type: "radio",
    },
  }
);

export type { RadioVariants };
export default Radio;
