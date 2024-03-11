export * as custom from "./custom";

export * as klass from "./klass";
export * as reklass from "./reklass";

export const compose = {
  klass: {
    color: {
      options: {
        base: "color-base",
        variants: {
          color: {
            red: "color-red",
            green: "color-green",
            blue: "color-blue",
          },
        },
      } as {
        base: string;
        variants: {
          color: {
            red: string;
            green: string;
            blue: string;
          };
        };
      },
    },
    size: {
      options: {
        base: "size-base",
        variants: {
          size: {
            sm: "size-sm",
            md: "size-md",
            lg: "size-lg",
          },
        },
      } as {
        base: string;
        variants: {
          size: {
            sm: string;
            md: string;
            lg: string;
          };
        };
      },
    },
  },
  reklass: {
    margin: {
      options: {
        conditions: [
          {
            base: "",
            sm: "sm:",
            md: "md:",
            lg: "lg:",
          },
          "base",
        ] as [
          {
            base: "";
            sm: "sm:";
            md: "md:";
            lg: "lg:";
          },
          "base",
        ],
        variants: {
          m: {
            xs: "m-1",
            sm: "m-2",
            md: "m-3",
            lg: "m-4",
            xl: "m-5",
          },
          mx: {
            xs: "mx-1",
            sm: "mx-2",
            md: "mx-3",
            lg: "mx-4",
            xl: "mx-5",
          },
          my: {
            xs: "my-1",
            sm: "my-2",
            md: "my-3",
            lg: "my-4",
            xl: "my-5",
          },
        },
      },
    },
    padding: {
      options: {
        conditions: [
          {
            base: "",
            sm: "sm:",
            md: "md:",
            lg: "lg:",
          },
          "base",
        ] as [
          {
            base: "";
            sm: "sm:";
            md: "md:";
            lg: "lg:";
          },
          "base",
        ],
        variants: {
          p: {
            xs: "p-1",
            sm: "p-2",
            md: "p-3",
            lg: "p-4",
            xl: "p-5",
          },
          px: {
            xs: "px-1",
            sm: "px-2",
            md: "px-3",
            lg: "px-4",
            xl: "px-5",
          },
          py: {
            xs: "py-1",
            sm: "py-2",
            md: "py-3",
            lg: "py-4",
            xl: "py-5",
          },
        },
      },
    },
  },
};
