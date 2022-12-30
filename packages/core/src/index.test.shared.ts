import { variant, klass } from "./index";

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

const MixedVariant_SymbolVariant = Symbol("SYMBOL");
const MixedVariant = variant({
  variant: {
    "": "mix-",
    true: "mix-true",
    1: "mix-1",
    [MixedVariant_SymbolVariant]: "mix-symbol(SYMBOL)",
  },
});

const MixedVariantOptions = {
  variant: {
    "": "mix-",
    true: "mix-true",
    1: "mix-1",
    [MixedVariant_SymbolVariant]: "mix-symbol(SYMBOL)",
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

export {
  PaddingVariant,
  PaddingVariantOptions,
  SizeVariant,
  SizeVariantOptions,
  LoadingVariant,
  LoadingVariantOptions,
  DisableVariant,
  DisableVariantOptions,
  MixedVariant_SymbolVariant,
  MixedVariant,
  MixedVariantOptions,
};
export { BoxKlass, BoxKlassOptions, ButtonKlass, ButtonKlassOptions };
