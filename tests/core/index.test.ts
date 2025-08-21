import * as vt from "vitest";

import { compose, klass, reklass } from "@klass/core";

import * as fixtures from "@test/shared/fixtures";

vt.describe("klass", () => {
	vt.describe("basic", () => {
		vt.it("should work", () => {
			const fx = klass(fixtures.klass.basic.options);

			vt.expect(fx.g).toEqual({ string: vt.expect.any(Function), boolean: vt.expect.any(Function), number: vt.expect.any(Function) });
			vt.expect(fx.k).toEqual(["string", "boolean", "number"]);

			for (const { props, equal } of fixtures.klass.basic.test) {
				vt.expect(fx(props as any)).toEqual(equal);
				vt.expect(fx(props as any, ["extra"])).toEqual(equal ? `${equal} extra` : "extra");
			}
		});
	});

	vt.describe("withBase", () => {
		vt.it("should work", () => {
			const fx = klass(fixtures.klass.withBase.options);

			vt.expect(fx.g).toEqual({ string: vt.expect.any(Function), boolean: vt.expect.any(Function), number: vt.expect.any(Function) });
			vt.expect(fx.k).toEqual(["string", "boolean", "number"]);

			for (const { props, equal } of fixtures.klass.withBase.test) {
				vt.expect(fx(props as any)).toEqual(equal);
				vt.expect(fx(props as any, ["extra"])).toEqual(equal ? `${equal} extra` : "extra");
			}
		});
	});

	vt.describe("withBaseDefaults", () => {
		vt.it("should work", () => {
			const fx = klass(fixtures.klass.withBaseDefaults.options);

			vt.expect(fx.g).toEqual({ string: vt.expect.any(Function), boolean: vt.expect.any(Function), number: vt.expect.any(Function) });
			vt.expect(fx.k).toEqual(["string", "boolean", "number"]);

			for (const { props, equal } of fixtures.klass.withBaseDefaults.test) {
				vt.expect(fx(props as any)).toEqual(equal);
				vt.expect(fx(props as any, ["extra"])).toEqual(equal ? `${equal} extra` : "extra");
			}
		});
	});

	vt.describe("withBaseDefaultsCompounds", () => {
		vt.it("should work", () => {
			const fx = klass(fixtures.klass.withBaseDefaultsCompounds.options);

			vt.expect(fx.g).toEqual({ string: vt.expect.any(Function), boolean: vt.expect.any(Function), number: vt.expect.any(Function) });
			vt.expect(fx.k).toEqual(["string", "boolean", "number"]);

			for (const { props, equal } of fixtures.klass.withBaseDefaultsCompounds.test) {
				vt.expect(fx(props as any)).toEqual(equal);
				vt.expect(fx(props as any, ["extra"])).toEqual(equal ? `${equal} extra` : "extra");
			}
		});
	});
});

vt.describe("reklass", () => {
	vt.describe("basic", () => {
		vt.it("should work", () => {
			const fx = reklass(fixtures.reklass.basic.options);

			vt.expect(fx.g).toEqual({ string: vt.expect.any(Function), boolean: vt.expect.any(Function), number: vt.expect.any(Function) });
			vt.expect(fx.k).toEqual(["string", "boolean", "number"]);

			for (const { props, equal } of fixtures.reklass.basic.test) {
				vt.expect(fx(props as any)).toEqual(equal);
				vt.expect(fx(props as any, ["extra"])).toEqual(equal ? `${equal} extra` : "extra");
			}
		});
	});
});

vt.describe("compose", () => {
	vt.it("should work", () => {
		const fx = compose(fixtures.compose.fx.color, fixtures.compose.fx.disabled, fixtures.compose.fx.weight, fixtures.compose.fx.box, fixtures.compose.fx.spacing);

		vt.expect(fx.k).toEqual(["color", "disabled", "weight", "block", "flex", "hidden", "margin", "padding"]);

		for (const { props, equal } of fixtures.compose.test) {
			vt.expect(fx(props as any)).toEqual(equal);
			vt.expect(fx(props as any, ["extra"])).toEqual(equal ? `${equal} extra` : "extra");
		}
	});
});
