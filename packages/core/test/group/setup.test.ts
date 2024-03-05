import { describe, it } from "vitest";

import setup from "./../../src/group/setup";

import * as shared from "./../~shared";

import { options, expectResult, expectSimplifyResult } from "./shared";

describe("group/setup", () => {
  it("basic", () => {
    const group = setup({});

    expectResult(group(options));
  });

  it("custom end", () => {
    const group = setup(shared.custom.endProps);

    expectResult(group(options), shared.custom.end);
  });

  describe("simplify", () => {
    it("basic", () => {
      const group = setup({});

      expectSimplifyResult(group(options));
    });

    it("custom end", () => {
      const group = setup(shared.custom.endProps);

      expectSimplifyResult(group(options), shared.custom.end);
    });
  });
});
