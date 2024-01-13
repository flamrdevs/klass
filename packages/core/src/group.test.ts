import { describe, it, expect } from "vitest";

import group from "./group.ts";

import { expectKlassFn, itOptimizedClass } from "./tests.ts";

describe("group", async () => {
  it("works", async () => {
    const card = group({
      base: {
        root: "root",
        header: "header",
        body: "body",
        footer: "footer",
      },
      variants: {
        color: {
          primary: {
            root: "color-primary",
            body: "color-primary",
          },
          secondary: {
            root: "color-secondary",
            body: "color-secondary",
          },
        },
        size: {
          sm: {
            root: "size-sm",
            body: "size-sm",
          },
          md: {
            root: "size-md",
            body: "size-md",
          },
          lg: {
            root: "size-lg",
            body: "size-lg",
          },
        },
      },
      defaultVariants: {
        color: "primary",
        size: "md",
      },
      compoundVariants: [
        {
          color: "primary",
          size: "lg",
          class: {
            header: "header-color-primary-size-lg",
          },
        },
        {
          color: "primary",
          size: "lg",
          class: {
            footer: "footer-color-primary-size-lg",
          },
        },
      ],
    });

    expect(card).toBeTypeOf("object");

    const keys = ["color", "size"] as ["color", "size"];

    expectKlassFn(card.root, { keys });
    expectKlassFn(card.header, { keys });
    expectKlassFn(card.body, { keys });
    expectKlassFn(card.footer, { keys });

    const { root, header, body, footer } = card;

    expect(root()).toEqual("root color-primary size-md");
    expect(header()).toEqual("header");
    expect(body()).toEqual("body color-primary size-md");
    expect(footer()).toEqual("footer");

    expect(root()).toEqual("root color-primary size-md");
    expect(header()).toEqual("header");
    expect(body()).toEqual("body color-primary size-md");
    expect(footer()).toEqual("footer");

    expect(root({ color: "secondary" })).toEqual("root color-secondary size-md");
    expect(header({ size: "lg" })).toEqual("header header-color-primary-size-lg");
    expect(body({ size: "lg" })).toEqual("body color-primary size-lg");
    expect(footer({ size: "lg" })).toEqual("footer footer-color-primary-size-lg");
  });

  it("works with it", async () => {
    const card = group(
      {
        base: {
          root: "root",
          header: "header",
          body: "body",
          footer: "footer",
        },
        variants: {
          color: {
            primary: {
              root: "color-primary",
              body: "color-primary",
            },
            secondary: {
              root: "color-secondary",
              body: "color-secondary",
            },
          },
          size: {
            sm: {
              root: "size-sm",
              body: "size-sm",
            },
            md: {
              root: "size-md",
              body: "size-md",
            },
            lg: {
              root: "size-lg",
              body: "size-lg",
            },
          },
        },
        defaultVariants: {
          color: "primary",
          size: "md",
        },
        compoundVariants: [
          {
            color: "primary",
            size: "lg",
            class: {
              header: "header-color-primary-size-lg",
            },
          },
          {
            color: "primary",
            size: "lg",
            class: {
              footer: "footer-color-primary-size-lg",
            },
          },
        ],
      },
      { it: itOptimizedClass }
    );

    expect(card).toBeTypeOf("object");

    const keys = ["color", "size"] as ["color", "size"];

    expectKlassFn(card.root, { keys });
    expectKlassFn(card.header, { keys });
    expectKlassFn(card.body, { keys });
    expectKlassFn(card.footer, { keys });

    const { root, header, body, footer } = card;

    expect(root()).toEqual(itOptimizedClass("root color-primary size-md"));
    expect(header()).toEqual(itOptimizedClass("header"));
    expect(body()).toEqual(itOptimizedClass("body color-primary size-md"));
    expect(footer()).toEqual(itOptimizedClass("footer"));

    expect(root()).toEqual(itOptimizedClass("root color-primary size-md"));
    expect(header()).toEqual(itOptimizedClass("header"));
    expect(body()).toEqual(itOptimizedClass("body color-primary size-md"));
    expect(footer()).toEqual(itOptimizedClass("footer"));

    expect(root({ color: "secondary" })).toEqual(itOptimizedClass("root color-secondary size-md"));
    expect(header({ size: "lg" })).toEqual(itOptimizedClass("header header-color-primary-size-lg"));
    expect(body({ size: "lg" })).toEqual(itOptimizedClass("body color-primary size-lg"));
    expect(footer({ size: "lg" })).toEqual(itOptimizedClass("footer footer-color-primary-size-lg"));
  });
});
