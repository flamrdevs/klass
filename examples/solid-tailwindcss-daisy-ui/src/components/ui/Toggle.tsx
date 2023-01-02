import type { VariantsOf } from "@klass/core";
import { klassed } from "@klass/solid";

type ToggleVariants = VariantsOf<typeof Toggle["klass"]>;

const Toggle = klassed(
  "input",
  {
    base: "toggle",
    variants: {
      color: {
        default: "",
        primary: "toggle-primary",
        secondary: "toggle-secondary",
        accent: "toggle-accent",
        info: "toggle-info",
        success: "toggle-success",
        warning: "toggle-warning",
        error: "toggle-error",
      },
      size: {
        xs: "toggle-xs",
        sm: "toggle-sm",
        md: "toggle-md",
        lg: "toggle-lg",
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

export type { ToggleVariants };
export default Toggle;
