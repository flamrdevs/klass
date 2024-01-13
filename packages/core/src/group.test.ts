import { describe, it, expect } from "vitest";

import group from "./group.ts";

import { expectKlassFn, customEnd } from "./tests.ts";

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

  it("customize end", async () => {
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
      { end: customEnd }
    );

    expect(card).toBeTypeOf("object");

    const keys = ["color", "size"] as ["color", "size"];

    expectKlassFn(card.root, { keys });
    expectKlassFn(card.header, { keys });
    expectKlassFn(card.body, { keys });
    expectKlassFn(card.footer, { keys });

    const { root, header, body, footer } = card;

    expect(root()).toEqual(customEnd("root color-primary size-md"));
    expect(header()).toEqual(customEnd("header"));
    expect(body()).toEqual(customEnd("body color-primary size-md"));
    expect(footer()).toEqual(customEnd("footer"));

    expect(root()).toEqual(customEnd("root color-primary size-md"));
    expect(header()).toEqual(customEnd("header"));
    expect(body()).toEqual(customEnd("body color-primary size-md"));
    expect(footer()).toEqual(customEnd("footer"));

    expect(root({ color: "secondary" })).toEqual(customEnd("root color-secondary size-md"));
    expect(header({ size: "lg" })).toEqual(customEnd("header header-color-primary-size-lg"));
    expect(body({ size: "lg" })).toEqual(customEnd("body color-primary size-lg"));
    expect(footer({ size: "lg" })).toEqual(customEnd("footer footer-color-primary-size-lg"));
  });
});
