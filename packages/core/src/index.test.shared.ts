import { variant, klass, revariant, reklass } from "./index";
import type { ItFn } from "./index";

const itControlClasses: ItFn = (value) => `controlled-classes( ${value} )`;

const PaddingVariant = variant({
  variant: {
    sm: "padding-sm",
    md: "padding-md",
    lg: "padding-lg",
  },
});

const PaddingVariantOptions = {
  variant: {
    sm: "padding-sm",
    md: "padding-md",
    lg: "padding-lg",
  },
};

const SizeVariant = variant({
  variant: {
    sm: "size-sm",
    md: "size-md",
    lg: "size-lg",
  },
  defaultVariant: "md",
});

const SizeVariantOptions = {
  variant: {
    sm: "size-sm",
    md: "size-md",
    lg: "size-lg",
  },
  defaultVariant: "md",
};

const LoadingVariant = variant({
  variant: {
    true: "loading-true",
    false: "loading-false",
  },
});

const LoadingVariantOptions = {
  variant: {
    true: "loading-true",
    false: "loading-false",
  },
};

const DisableVariant = variant({
  variant: {
    true: "disable-true",
    false: "disable-false",
  },
  defaultVariant: false,
});

const DisableVariantOptions = {
  variant: {
    true: "disable-true",
    false: "disable-false",
  },
  defaultVariant: false,
};

const ZIndexVariant = variant({
  variant: {
    0: "z-index-0",
    1: "z-index-1",
    2: "z-index-2",
    3: "z-index-3",
    4: "z-index-4",
    5: "z-index-5",
  },
});

const ZIndexVariantOptions = {
  variant: {
    0: "z-index-0",
    1: "z-index-1",
    2: "z-index-2",
    3: "z-index-3",
    4: "z-index-4",
    5: "z-index-5",
  },
};

const OrderVariant = variant({
  variant: {
    0: "order-0",
    1: "order-1",
    2: "order-2",
    3: "order-3",
    4: "order-4",
    5: "order-5",
  },
  defaultVariant: 0,
});

const OrderVariantOptions = {
  variant: {
    0: "order-0",
    1: "order-1",
    2: "order-2",
    3: "order-3",
    4: "order-4",
    5: "order-5",
  },
  defaultVariant: 0,
};

const MixedVariant = variant({
  variant: {
    "": "mix-",
    true: "mix-true",
    1: "mix-1",
  },
});

const MixedVariantOptions = {
  variant: {
    "": "mix-",
    true: "mix-true",
    1: "mix-1",
  },
};

const BoxKlass = klass({
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

const BoxKlassOptions = {
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

const ButtonKlass = klass({
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

const ButtonKlassOptions = {
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

const BoxWithItKlass = klass(
  {
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
    it: itControlClasses,
  }
);

const PaddingRevariant = revariant({
  conditions: {
    base: "",
    sm: "sm:",
    md: "md:",
    lg: "lg:",
  },
  defaultCondition: "base",
  variant: {
    sm: "padding-sm",
    md: "padding-md",
    lg: "padding-lg",
  },
});

const PaddingRevariantOptions = {
  conditions: {
    base: "",
    sm: "sm:",
    md: "md:",
    lg: "lg:",
  },
  defaultCondition: "base",
  variant: {
    sm: "padding-sm",
    md: "padding-md",
    lg: "padding-lg",
  },
};

const LoadingRevariant = revariant({
  conditions: {
    base: "",
    sm: "sm:",
    md: "md:",
    lg: "lg:",
  },
  defaultCondition: "base",
  variant: {
    true: "loading-true",
    false: "loading-false",
  },
});

const LoadingRevariantOptions = {
  conditions: {
    base: "",
    sm: "sm:",
    md: "md:",
    lg: "lg:",
  },
  defaultCondition: "base",
  variant: {
    true: "loading-true",
    false: "loading-false",
  },
};

const ZIndexRevariant = revariant({
  conditions: {
    base: "",
    sm: "sm:",
    md: "md:",
    lg: "lg:",
  },
  defaultCondition: "base",
  variant: {
    0: "z-index-0",
    1: "z-index-1",
    2: "z-index-2",
    3: "z-index-3",
    4: "z-index-4",
    5: "z-index-5",
  },
});

const ZIndexRevariantOptions = {
  conditions: {
    base: "",
    sm: "sm:",
    md: "md:",
    lg: "lg:",
  },
  defaultCondition: "base",
  variant: {
    0: "z-index-0",
    1: "z-index-1",
    2: "z-index-2",
    3: "z-index-3",
    4: "z-index-4",
    5: "z-index-5",
  },
};

const MixedRevariant = revariant({
  conditions: {
    base: "",
    sm: "sm:",
    md: "md:",
    lg: "lg:",
  },
  defaultCondition: "base",
  variant: {
    "": "mix-",
    true: "mix-true",
    1: "mix-1",
  },
});

const MixedRevariantOptions = {
  conditions: {
    base: "",
    sm: "sm:",
    md: "md:",
    lg: "lg:",
  },
  defaultCondition: "base",
  variant: {
    "": "mix-",
    true: "mix-true",
    1: "mix-1",
  },
};

const MixedAsSuffixRevariant = revariant(
  {
    conditions: {
      base: "",
      sm: "@sm",
      md: "@md",
      lg: "@lg",
    },
    defaultCondition: "base",
    variant: {
      "": "mix-",
      true: "mix-true",
      1: "mix-1",
    },
  },
  {
    as: "suffix",
  }
);

const BoxReklass = reklass({
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

const BoxReklassOptions = {
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

const BoxAsSuffixReklass = reklass(
  {
    conditions: {
      base: "",
      sm: "@sm",
      md: "@md",
      lg: "@lg",
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
    as: "suffix",
  }
);

const BoxWithItReklass = reklass(
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
    it: itControlClasses,
  }
);

export {
  PaddingVariant,
  PaddingVariantOptions,
  SizeVariant,
  SizeVariantOptions,
  LoadingVariant,
  LoadingVariantOptions,
  DisableVariant,
  DisableVariantOptions,
  ZIndexVariant,
  ZIndexVariantOptions,
  OrderVariant,
  OrderVariantOptions,
  MixedVariant,
  MixedVariantOptions,
};
export { BoxKlass, BoxKlassOptions, ButtonKlass, ButtonKlassOptions };
export { BoxWithItKlass };
export {
  PaddingRevariant,
  PaddingRevariantOptions,
  LoadingRevariant,
  LoadingRevariantOptions,
  ZIndexRevariant,
  ZIndexRevariantOptions,
  MixedRevariant,
  MixedRevariantOptions,
};
export { MixedAsSuffixRevariant };
export { BoxReklass, BoxReklassOptions };
export { BoxAsSuffixReklass, BoxWithItReklass };
