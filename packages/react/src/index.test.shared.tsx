import { klassed, reklassed } from "./index";

const BoxKlassed = klassed("div", {
  base: "block",
  variants: {
    m: {
      "1": "m-1",
      "2": "m-2",
      "3": "m-3",
      "4": "m-4",
      "5": "m-5",
    },
    p: {
      "1": "p-1",
      "2": "p-2",
      "3": "p-3",
      "4": "p-4",
      "5": "p-5",
    },
  },
});

const BoxKlassedOptions = {
  base: "block",
  variants: {
    m: {
      "1": "m-1",
      "2": "m-2",
      "3": "m-3",
      "4": "m-4",
      "5": "m-5",
    },
    p: {
      "1": "p-1",
      "2": "p-2",
      "3": "p-3",
      "4": "p-4",
      "5": "p-5",
    },
  },
};

const ButtonKlassed = klassed("button", {
  base: "inline-block outline-none",
  variants: {
    color: {
      red: null,
      green: null,
      blue: null,
    },
    variant: {
      filled: "text-white",
      outline: "bg-transparent border",
    },
    full: {
      true: "w-full h-full",
      width: "w-full",
      height: "h-full",
    },
  },
  defaultVariants: {
    color: "red",
    variant: "filled",
  },
  compoundVariants: [
    {
      variant: {
        color: "red",
        variant: "filled",
      },
      classes: "bg-red-600",
    },
    {
      variant: {
        color: "green",
        variant: "filled",
      },
      classes: "bg-green-600",
    },
    {
      variant: {
        color: "blue",
        variant: "filled",
      },
      classes: "bg-blue-600",
    },
    {
      variant: {
        color: "red",
        variant: "outline",
      },
      classes: "text-red-600 border-red-600",
    },
    {
      variant: {
        color: "green",
        variant: "outline",
      },
      classes: "text-green-600 border-green-600",
    },
    {
      variant: {
        color: "blue",
        variant: "outline",
      },
      classes: "text-blue-600 border-blue-600",
    },
  ],
});

const ButtonKlassedOptions = {
  base: "inline-block outline-none",
  variants: {
    color: {
      red: null,
      green: null,
      blue: null,
    },
    variant: {
      filled: "text-white",
      outline: "bg-transparent border",
    },
    full: {
      true: "w-full h-full",
      width: "w-full",
      height: "h-full",
    },
  },
  defaultVariants: {
    color: "red",
    variant: "filled",
  },
  compoundVariants: [
    {
      variant: {
        color: "red",
        variant: "filled",
      },
      classes: "bg-red-600",
    },
    {
      variant: {
        color: "green",
        variant: "filled",
      },
      classes: "bg-green-600",
    },
    {
      variant: {
        color: "blue",
        variant: "filled",
      },
      classes: "bg-blue-600",
    },
    {
      variant: {
        color: "red",
        variant: "outline",
      },
      classes: "text-red-600 border-red-600",
    },
    {
      variant: {
        color: "green",
        variant: "outline",
      },
      classes: "text-green-600 border-green-600",
    },
    {
      variant: {
        color: "blue",
        variant: "outline",
      },
      classes: "text-blue-600 border-blue-600",
    },
  ],
};

const BoxReklassed = reklassed("div", {
  conditions: {
    base: "",
    sm: "sm:",
    md: "md:",
    lg: "lg:",
  },
  defaultCondition: "base",
  variants: {
    m: {
      "1": "m-1",
      "2": "m-2",
      "3": "m-3",
      "4": "m-4",
      "5": "m-5",
    },
    p: {
      "1": "p-1",
      "2": "p-2",
      "3": "p-3",
      "4": "p-4",
      "5": "p-5",
    },
  },
});

const BoxReklassedOptions = {
  conditions: {
    base: "",
    sm: "sm:",
    md: "md:",
    lg: "lg:",
  },
  defaultCondition: "base",
  variants: {
    m: {
      "1": "m-1",
      "2": "m-2",
      "3": "m-3",
      "4": "m-4",
      "5": "m-5",
    },
    p: {
      "1": "p-1",
      "2": "p-2",
      "3": "p-3",
      "4": "p-4",
      "5": "p-5",
    },
  },
};

export { BoxKlassed, BoxKlassedOptions, ButtonKlassed, ButtonKlassedOptions };
export { BoxReklassed, BoxReklassedOptions };
