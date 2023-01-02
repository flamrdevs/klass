import type { VariantsOf } from "@klass/core";
import { klassed } from "@klass/preact";

type BoxVariants = VariantsOf<typeof Box["klass"]>;

const Box = klassed("div", {
  variants: {
    display: {
      none: "none",
      block: "block",
      "inline-block": "inline-block",
      flex: "flex",
      "inline-flex": "inline-flex",
    },
    m: {
      xs: "m-4",
      sm: "m-8",
      md: "m-12",
      lg: "m-16",
      xl: "m-20",
    },
    mt: {
      xs: "mt-4",
      sm: "mt-8",
      md: "mt-12",
      lg: "mt-16",
      xl: "mt-20",
    },
    mb: {
      xs: "mb-4",
      sm: "mb-8",
      md: "mb-12",
      lg: "mb-16",
      xl: "mb-20",
    },
    ml: {
      xs: "ml-4",
      sm: "ml-8",
      md: "ml-12",
      lg: "ml-16",
      xl: "ml-20",
    },
    mr: {
      xs: "mr-4",
      sm: "mr-8",
      md: "mr-12",
      lg: "mr-16",
      xl: "mr-20",
    },
    mx: {
      xs: "mx-4",
      sm: "mx-8",
      md: "mx-12",
      lg: "mx-16",
      xl: "mx-20",
    },
    my: {
      xs: "my-4",
      sm: "my-8",
      md: "my-12",
      lg: "my-16",
      xl: "my-20",
    },
    p: {
      xs: "p-4",
      sm: "p-8",
      md: "p-12",
      lg: "p-16",
      xl: "p-20",
    },
    pt: {
      xs: "pt-4",
      sm: "pt-8",
      md: "pt-12",
      lg: "pt-16",
      xl: "pt-20",
    },
    pb: {
      xs: "pb-4",
      sm: "pb-8",
      md: "pb-12",
      lg: "pb-16",
      xl: "pb-20",
    },
    pl: {
      xs: "pl-4",
      sm: "pl-8",
      md: "pl-12",
      lg: "pl-16",
      xl: "pl-20",
    },
    pr: {
      xs: "pr-4",
      sm: "pr-8",
      md: "pr-12",
      lg: "pr-16",
      xl: "pr-20",
    },
    px: {
      xs: "px-4",
      sm: "px-8",
      md: "px-12",
      lg: "px-16",
      xl: "px-20",
    },
    py: {
      xs: "py-4",
      sm: "py-8",
      md: "py-12",
      lg: "py-16",
      xl: "py-20",
    },
  },
});

export type { BoxVariants };
export default Box;
