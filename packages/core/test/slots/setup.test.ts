import { describe, it } from "vitest";

import setup from "./../../src/slots/setup";

import * as shared from "./../shared";

import { options, expectResult } from "./shared";

describe("slots/setup", async () => {
  it("basic", async () => {
    const slots = setup({});

    expectResult(slots(options));
  });

  it("custom end", async () => {
    const slots = setup({ end: shared.customEnd });

    expectResult(slots(options), shared.customEnd);
  });
});
