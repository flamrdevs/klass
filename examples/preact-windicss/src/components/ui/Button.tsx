import type { VariantsOf } from "@klass/core";
import { klassed } from "@klass/preact";

type ButtonVariants = VariantsOf<typeof Button["klass"]>;

const Button = klassed(
  "button",
  {
    base: "inline-block outline-none focus-visible:ring",
    variants: {
      color: {
        red: ["bg-red-600 text-red-50 focus-visible:ring-red-500", "hover:bg-red-700", "active:bg-red-800"],
        green: ["bg-green-600 text-green-50 focus-visible:ring-green-500", "hover:bg-green-700", "active:bg-green-800"],
        blue: ["bg-blue-600 text-blue-50 focus-visible:ring-blue-500", "hover:bg-blue-700", "active:bg-blue-800"],
      },
      size: {
        sm: "px-3 py-1 text-sm",
        md: "px-4 py-1.5 text-base",
        lg: "px-5 py-2 text-lg",
      },
      rounded: {
        sm: "rounded",
        md: "rounded-xl",
        lg: "rounded-3xl",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      color: "blue",
      size: "md",
      rounded: "md",
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
