import * as vt from "vitest";

import * as fixtures from "@test/shared/fixtures";
import { cleanupable, expectGetElementToBeInTheDocument } from "@test/shared/utils";

import { klassed, reklassed, composed } from "@klass/preact";

import { render } from "~/utils";

const cleanup = cleanupable();

vt.beforeEach(() => {
	cleanup();
});

vt.describe("klassed", () => {
	vt.describe("basic", () => {
		vt.it("should work", async () => {
			const Component = klassed("div", fixtures.klass.basic.options);

			vt.expect(Component.fx.g).toEqual({ string: vt.expect.any(Function), boolean: vt.expect.any(Function), number: vt.expect.any(Function) });
			vt.expect(Component.fx.k).toEqual(["string", "boolean", "number"]);

			for await (const { props, equal } of fixtures.klass.basic.test) {
				let ref: HTMLDivElement | null = null;

				const clean = render(
					<Component
						ref={(element) => {
							if (element) ref = element;
						}}
						data-testid="component"
						data-custom="attribute"
						{...(props as any)}
						class="extra"
					>
						children
					</Component>
				);
				cleanup(clean);

				await vt.vi.waitFor(() => {
					if (ref === null) throw new Error("Ref is null");
				});

				const component = expectGetElementToBeInTheDocument((screen) => screen.getByTestId("component"));

				vt.assert(typeof component! !== "undefined");

				vt.expect(component.className).toEqual(equal ? `${equal} extra` : "extra");
				vt.expect(component.innerHTML).toEqual("children");

				clean();
			}
		});
	});
});

vt.describe("reklassed", () => {
	vt.describe("basic", () => {
		vt.it("should work", async () => {
			const Component = reklassed("div", fixtures.reklass.basic.options);

			vt.expect(Component.fx.g).toEqual({ string: vt.expect.any(Function), boolean: vt.expect.any(Function), number: vt.expect.any(Function) });
			vt.expect(Component.fx.k).toEqual(["string", "boolean", "number"]);

			for await (const { props, equal } of fixtures.reklass.basic.test) {
				let ref: HTMLDivElement | null = null;

				const clean = render(
					<Component
						ref={(element) => {
							if (element) ref = element;
						}}
						data-testid="component"
						data-custom="attribute"
						{...(props as any)}
						class="extra"
					>
						children
					</Component>
				);
				cleanup(clean);

				await vt.vi.waitFor(() => {
					if (ref === null) throw new Error("Ref is null");
				});

				const component = expectGetElementToBeInTheDocument((screen) => screen.getByTestId("component"));

				vt.assert(typeof component! !== "undefined");

				vt.expect(component.className).toEqual(equal ? `${equal} extra` : "extra");
				vt.expect(component.innerHTML).toEqual("children");

				clean();
			}
		});
	});
});

vt.describe("composed", () => {
	vt.it("should work", async () => {
		const Component = composed("div", [fixtures.compose.fx.color, fixtures.compose.fx.disabled, fixtures.compose.fx.weight, fixtures.compose.fx.box, fixtures.compose.fx.spacing]);

		vt.expect(Component.fx.k).toEqual(["color", "disabled", "weight", "block", "flex", "hidden", "margin", "padding"]);

		for await (const { props, equal } of fixtures.compose.test) {
			let ref: HTMLDivElement | null = null;

			const clean = render(
				<Component
					ref={(element) => {
						if (element) ref = element;
					}}
					data-testid="component"
					data-custom="attribute"
					{...(props as any)}
					class="extra"
				>
					children
				</Component>
			);
			cleanup(clean);

			await vt.vi.waitFor(() => {
				if (ref === null) throw new Error("Ref is null");
			});

			const component = expectGetElementToBeInTheDocument((screen) => screen.getByTestId("component"));

			vt.assert(typeof component! !== "undefined");

			vt.expect(component.className).toEqual(equal ? `${equal} extra` : "extra");
			vt.expect(component.innerHTML).toEqual("children");

			clean();
		}
	});
});
