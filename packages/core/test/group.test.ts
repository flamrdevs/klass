import { describe, it, expect } from "vitest";

import group from "./../src/group";

import * as shared from "./shared";
import * as expects from "./expects";

describe("group", async () => {
  it("works", async () => {
    const card = group({
      base: { root: "root", header: "header", body: "body", footer: "footer" },
      variants: {
        color: { primary: { root: "color-primary", body: "color-primary" }, secondary: { root: "color-secondary", body: "color-secondary" } },
        size: { sm: { root: "size-sm", body: "size-sm" }, md: { root: "size-md", body: "size-md" }, lg: { root: "size-lg", body: "size-lg" } },
      },
      defaults: { color: "primary", size: "md" },
      compounds: [
        [{ color: "primary", size: "lg" }, { header: "header-color-primary-size-lg" }],
        [{ color: "primary", size: "lg" }, { footer: "footer-color-primary-size-lg" }],
      ],
    });

    expect(card).toBeTypeOf("object");

    expects.klassFn(card.root);
    expects.klassFn(card.header);
    expects.klassFn(card.body);
    expects.klassFn(card.footer);

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
        base: { root: "root", header: "header", body: "body", footer: "footer" },
        variants: {
          color: { primary: { root: "color-primary", body: "color-primary" }, secondary: { root: "color-secondary", body: "color-secondary" } },
          size: { sm: { root: "size-sm", body: "size-sm" }, md: { root: "size-md", body: "size-md" }, lg: { root: "size-lg", body: "size-lg" } },
        },
        defaults: { color: "primary", size: "md" },
        compounds: [
          [{ color: "primary", size: "lg" }, { header: "header-color-primary-size-lg" }],
          [{ color: "primary", size: "lg" }, { footer: "footer-color-primary-size-lg" }],
        ],
      },
      { end: shared.customEnd }
    );

    expect(card).toBeTypeOf("object");

    expects.klassFn(card.root);
    expects.klassFn(card.header);
    expects.klassFn(card.body);
    expects.klassFn(card.footer);

    const { root, header, body, footer } = card;

    expect(root()).toEqual(shared.customEnd("root color-primary size-md"));
    expect(header()).toEqual(shared.customEnd("header"));
    expect(body()).toEqual(shared.customEnd("body color-primary size-md"));
    expect(footer()).toEqual(shared.customEnd("footer"));

    expect(root()).toEqual(shared.customEnd("root color-primary size-md"));
    expect(header()).toEqual(shared.customEnd("header"));
    expect(body()).toEqual(shared.customEnd("body color-primary size-md"));
    expect(footer()).toEqual(shared.customEnd("footer"));

    expect(root({ color: "secondary" })).toEqual(shared.customEnd("root color-secondary size-md"));
    expect(header({ size: "lg" })).toEqual(shared.customEnd("header header-color-primary-size-lg"));
    expect(body({ size: "lg" })).toEqual(shared.customEnd("body color-primary size-lg"));
    expect(footer({ size: "lg" })).toEqual(shared.customEnd("footer footer-color-primary-size-lg"));
  });
});
