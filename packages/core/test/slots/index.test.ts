import { describe, it } from "vitest";

import slots from "./../../src/slots";

import * as shared from "./../shared";

import { options, expectResult } from "./shared";

describe("slots", async () => {
  it("basic", async () => {
    expectResult(slots(options));
  });

  it("custom end", async () => {
    expectResult(slots(options, { end: shared.customEnd }), shared.customEnd);
  });
});
