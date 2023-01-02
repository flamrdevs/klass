import type { VariantsOf } from "@klass/core";
import { klassed } from "@klass/solid";

type CheckboxVariants = VariantsOf<typeof Checkbox["klass"]>;

const Checkbox = klassed(
  "input",
  {
    base: "checkbox",
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
      },
      size: {
        xs: "checkbox-xs",
        sm: "checkbox-sm",
        md: "checkbox-md",
        lg: "checkbox-lg",
        xl: "checkbox-xl",
      },
    },
    compoundVariants: [
      {
        variant: { color: "primary", variant: "default" },
        classes: "checkbox-primary",
      },
      {
        variant: { color: "secondary", variant: "default" },
        classes: "checkbox-secondary",
      },
      {
        variant: { color: "success", variant: "default" },
        classes: "checkbox-success",
      },
      {
        variant: { color: "error", variant: "default" },
        classes: "checkbox-error",
      },
      {
        variant: { color: "warning", variant: "default" },
        classes: "checkbox-warning",
      },
      {
        variant: { color: "primary", variant: "bordered" },
        classes: "checkbox-bordered-primary",
      },
      {
        variant: { color: "secondary", variant: "bordered" },
        classes: "checkbox-bordered-secondary",
      },
      {
        variant: { color: "success", variant: "bordered" },
        classes: "checkbox-bordered-success",
      },
      {
        variant: { color: "error", variant: "bordered" },
        classes: "checkbox-bordered-error",
      },
      {
        variant: { color: "warning", variant: "bordered" },
        classes: "checkbox-bordered-warning",
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

export type { CheckboxVariants };
export default Checkbox;
