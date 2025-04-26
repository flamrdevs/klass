import { describe, it } from "vitest";

import slots from "./../../src/slots";

import { expectResult, options } from "./shared";

describe("slots", () => {
	it("basic", () => {
		expectResult(slots(options));
	});
});
