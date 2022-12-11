import type { VariantsOf } from "@klass/core";
import { klassed } from "@klass/solid";

type LinkVariants = VariantsOf<typeof Link["klass"]>;

const Link = klassed("a", {
  base: "link",
  variants: {
    color: {
      primary: "link-primary",
      secondary: "link-secondary",
      accent: "link-accent",
      info: "link-info",
      success: "link-success",
      warning: "link-warning",
      error: "link-error",
    },
  },
  defaultVariants: {
    color: "primary",
  },
});

export type { LinkVariants };
export default Link;
