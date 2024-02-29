import { describe, it } from "vitest";

import setup from "./../../src/group/setup";

import * as shared from "./../shared";

import { options, expectResult } from "./shared";

describe("group/setup", async () => {
  it("basic", async () => {
    const group = setup({});

    expectResult(group(options));
  });

  it("custom end", async () => {
    const group = setup({ end: shared.customEnd });

    expectResult(group(options), shared.customEnd);
  });
});
