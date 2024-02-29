import { describe, it } from "vitest";

import group from "./../../src/group";

import * as shared from "./../shared";

import { options, expectResult } from "./shared";

describe("group", async () => {
  it("basic", async () => {
    expectResult(group(options));
  });

  it("custom end", async () => {
    expectResult(group(options, { end: shared.customEnd }), shared.customEnd);
  });
});
