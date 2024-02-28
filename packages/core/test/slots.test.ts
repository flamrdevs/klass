import { describe, it, expect } from "vitest";

import slots from "./../src/slots";

import * as shared from "./shared";
import * as expects from "./expects";

describe("slots", async () => {
  it("works", async () => {
    const card = slots({
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

    expect(card).toBeTypeOf("function");
    expect(card).toHaveProperty("o");
    expect(card).toHaveProperty("klass");
    expect(card.o).toBeTypeOf("object");
    expect(card.klass).toBeTypeOf("object");

    expects.klassFn(card.klass.root);
    expects.klassFn(card.klass.header);
    expects.klassFn(card.klass.body);
    expects.klassFn(card.klass.footer);

    const card1 = card();

    expect(card1.root()).toEqual("root color-primary size-md");
    expect(card1.header()).toEqual("header");
    expect(card1.body()).toEqual("body color-primary size-md");
    expect(card1.footer()).toEqual("footer");

    const card2 = card({ color: "secondary" });

    expect(card2.root()).toEqual("root color-secondary size-md");
    expect(card2.header()).toEqual("header");
    expect(card2.body()).toEqual("body color-secondary size-md");
    expect(card2.footer()).toEqual("footer");

    const card3 = card({ color: "secondary", size: "lg" });

    expect(card3.root({ color: "primary" })).toEqual("root color-primary size-lg");
    expect(card3.header({ color: "primary" })).toEqual("header header-color-primary-size-lg");
    expect(card3.body({ size: "md" })).toEqual("body color-secondary size-md");
    expect(card3.footer({ color: "primary" })).toEqual("footer footer-color-primary-size-lg");
  });

  it("customize end", async () => {
    const card = slots(
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

    expect(card).toBeTypeOf("function");
    expect(card).toHaveProperty("o");
    expect(card).toHaveProperty("klass");
    expect(card.o).toBeTypeOf("object");
    expect(card.klass).toBeTypeOf("object");

    expects.klassFn(card.klass.root);
    expects.klassFn(card.klass.header);
    expects.klassFn(card.klass.body);
    expects.klassFn(card.klass.footer);

    const card1 = card();

    expect(card1.root()).toEqual(shared.customEnd("root color-primary size-md"));
    expect(card1.header()).toEqual(shared.customEnd("header"));
    expect(card1.body()).toEqual(shared.customEnd("body color-primary size-md"));
    expect(card1.footer()).toEqual(shared.customEnd("footer"));

    const card2 = card({ color: "secondary" });

    expect(card2.root()).toEqual(shared.customEnd("root color-secondary size-md"));
    expect(card2.header()).toEqual(shared.customEnd("header"));
    expect(card2.body()).toEqual(shared.customEnd("body color-secondary size-md"));
    expect(card2.footer()).toEqual(shared.customEnd("footer"));

    const card3 = card({ color: "secondary", size: "lg" });

    expect(card3.root({ color: "primary" })).toEqual(shared.customEnd("root color-primary size-lg"));
    expect(card3.header({ color: "primary" })).toEqual(shared.customEnd("header header-color-primary-size-lg"));
    expect(card3.body({ size: "md" })).toEqual(shared.customEnd("body color-secondary size-md"));
    expect(card3.footer({ color: "primary" })).toEqual(shared.customEnd("footer footer-color-primary-size-lg"));
  });
});
