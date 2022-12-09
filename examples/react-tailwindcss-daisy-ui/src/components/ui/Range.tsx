import type { VariantsOf } from "@klass/core";
import { klassed } from "@klass/react";

type RangeVariants = VariantsOf<typeof Range["klass"]>;

const Range = klassed(
  "input",
  {
    base: "range",
    variants: {
      color: {
        primary: "range-primary",
        secondary: "range-secondary",
        accent: "range-accent",
        info: "range-info",
        success: "range-success",
        warning: "range-warning",
        error: "range-error",
      },
      size: {
        xs: "range-xs",
        sm: "range-sm",
        md: "range-md",
        lg: "range-lg",
      },
    },
    defaultVariants: {
      color: "primary",
      size: "sm",
    },
  },
  {
    defaultProps: {
      type: "range",
    },
  }
);

export type { RangeVariants };
export default Range;
