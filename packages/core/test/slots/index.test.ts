import { describe, it } from "vitest";

import slots from "./../../src/slots";

import { options, expectResult } from "./shared";

describe("slots", () => {
  it("basic", () => {
    expectResult(slots(options));
  });
});
