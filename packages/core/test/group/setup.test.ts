import { describe, it } from "vitest";

import setup from "./../../src/group/setup";

import * as shared from "./../shared";

import { options, expectResult, expectSimplifyResult } from "./shared";

describe("group/setup", () => {
  it("basic", () => {
    const group = setup({});

    expectResult(group(options));
  });

  it("custom end", () => {
    const group = setup({ end: shared.customEnd });

    expectResult(group(options), shared.customEnd);
  });

  describe("simplify", () => {
    it("basic", () => {
      const group = setup({});

      expectSimplifyResult(group(options));
    });

    it("custom end", () => {
      const group = setup({ end: shared.customEnd });

      expectSimplifyResult(group(options), shared.customEnd);
    });
  });
});
