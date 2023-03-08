import type { VariantsOf } from "@klass/core";
import { reklassed } from "@klass/preact";

type BoxVariants = VariantsOf<typeof Box["reklass"]>;

const Box = reklassed("div", {
  conditions: {
    base: "",
    sm: "sm:",
    md: "md:",
    lg: "lg:",
    xl: "xl:",
    xxl: "2xl:",
  },
  defaultCondition: "base",
  variants: {
    m: {
      none: "m-0",
      xs: "m-4",
      sm: "m-8",
      md: "m-12",
      lg: "m-16",
      xl: "m-20",
    },
    mt: {
      none: "mt-0",
      xs: "mt-4",
      sm: "mt-8",
      md: "mt-12",
      lg: "mt-16",
      xl: "mt-20",
    },
    mb: {
      none: "mb-0",
      xs: "mb-4",
      sm: "mb-8",
      md: "mb-12",
      lg: "mb-16",
      xl: "mb-20",
    },
    ml: {
      none: "ml-0",
      xs: "ml-4",
      sm: "ml-8",
      md: "ml-12",
      lg: "ml-16",
      xl: "ml-20",
    },
    mr: {
      none: "mr-0",
      xs: "mr-4",
      sm: "mr-8",
      md: "mr-12",
      lg: "mr-16",
      xl: "mr-20",
    },
    mx: {
      none: "mx-0",
      xs: "mx-4",
      sm: "mx-8",
      md: "mx-12",
      lg: "mx-16",
      xl: "mx-20",
    },
    my: {
      none: "my-0",
      xs: "my-4",
      sm: "my-8",
      md: "my-12",
      lg: "my-16",
      xl: "my-20",
    },
    p: {
      none: "p-0",
      xs: "p-4",
      sm: "p-8",
      md: "p-12",
      lg: "p-16",
      xl: "p-20",
    },
    pt: {
      none: "pt-0",
      xs: "pt-4",
      sm: "pt-8",
      md: "pt-12",
      lg: "pt-16",
      xl: "pt-20",
    },
    pb: {
      none: "pb-0",
      xs: "pb-4",
      sm: "pb-8",
      md: "pb-12",
      lg: "pb-16",
      xl: "pb-20",
    },
    pl: {
      none: "pl-0",
      xs: "pl-4",
      sm: "pl-8",
      md: "pl-12",
      lg: "pl-16",
      xl: "pl-20",
    },
    pr: {
      none: "pr-0",
      xs: "pr-4",
      sm: "pr-8",
      md: "pr-12",
      lg: "pr-16",
      xl: "pr-20",
    },
    px: {
      none: "px-0",
      xs: "px-4",
      sm: "px-8",
      md: "px-12",
      lg: "px-16",
      xl: "px-20",
    },
    py: {
      none: "py-0",
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
