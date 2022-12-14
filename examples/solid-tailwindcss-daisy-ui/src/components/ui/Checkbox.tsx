import type { VariantsOf } from "@klass/core";
import { klassed } from "@klass/solid";

type CheckboxVariants = VariantsOf<typeof Checkbox["klass"]>;

const Checkbox = klassed(
  "input",
  {
    base: "checkbox",
    variants: {
      color: {
        default: "",
        primary: "checkbox-primary",
        secondary: "checkbox-secondary",
        accent: "checkbox-accent",
        info: "checkbox-info",
        success: "checkbox-success",
        warning: "checkbox-warning",
        error: "checkbox-error",
      },
      size: {
        xs: "checkbox-xs",
        sm: "checkbox-sm",
        md: "checkbox-md",
        lg: "checkbox-lg",
      },
    },
    defaultVariants: {
      color: "default",
      size: "sm",
    },
  },
  {
    defaultProps: {
      type: "checkbox",
    },
  }
);

export type { CheckboxVariants };
export default Checkbox;
