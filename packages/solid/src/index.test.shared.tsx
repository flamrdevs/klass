import { klassed, reklassed } from "./index";
import type { ItFn } from "@klass/core";

const itControlClasses: ItFn = (value) => `controlled-classes( ${value} )`;

const BoxKlassed = klassed(
  "div",
  {
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
  },
  {
    defaultProps: {
      title: "box-klassed",
    },
  }
);

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

const ButtonKlassed = klassed(
  "button",
  {
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
        color: "red",
        variant: "filled",
        class: "bg-red-600",
      },
      {
        color: "green",
        variant: "filled",
        class: "bg-green-600",
      },
      {
        color: "blue",
        variant: "filled",
        class: "bg-blue-600",
      },
      {
        color: "red",
        variant: "outline",
        class: "text-red-600 border-red-600",
      },
      {
        color: "green",
        variant: "outline",
        class: "text-green-600 border-green-600",
      },
      {
        color: "blue",
        variant: "outline",
        class: "text-blue-600 border-blue-600",
      },
    ],
  },
  {
    defaultProps: {
      title: "button-klassed",
      onClick: () => {
        console.log("button-klassed");
      },
    },
  }
);

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
      color: "red",
      variant: "filled",
      class: "bg-red-600",
    },
    {
      color: "green",
      variant: "filled",
      class: "bg-green-600",
    },
    {
      color: "blue",
      variant: "filled",
      class: "bg-blue-600",
    },
    {
      color: "red",
      variant: "outline",
      class: "text-red-600 border-red-600",
    },
    {
      color: "green",
      variant: "outline",
      class: "text-green-600 border-green-600",
    },
    {
      color: "blue",
      variant: "outline",
      class: "text-blue-600 border-blue-600",
    },
  ],
};

const BoxWithItKlassed = klassed(
  "div",
  {
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
  },
  {
    defaultProps: {
      title: "box-klassed",
    },
    it: itControlClasses,
  }
);

const BoxReklassed = reklassed(
  "div",
  {
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
  },
  {
    defaultProps: {
      title: "box-reklassed",
    },
  }
);

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

const BoxWithItReklassed = reklassed(
  "div",
  {
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
  },
  {
    defaultProps: {
      title: "box-reklassed",
    },
    it: itControlClasses,
  }
);

export { BoxKlassed, BoxKlassedOptions, ButtonKlassed, ButtonKlassedOptions };
export { BoxWithItKlassed };
export { BoxReklassed, BoxReklassedOptions };
export { BoxWithItReklassed };
