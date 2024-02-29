import { describe, it } from "vitest";

import slots from "./../../src/slots";

import * as shared from "./../shared";

import { options, expectResult } from "./shared";

describe("slots", () => {
  it("basic", () => {
    expectResult(slots(options));
  });

  it("custom end", () => {
    expectResult(slots(options, { end: shared.customEnd }), shared.customEnd);
  });
});
