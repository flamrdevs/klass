import * as vt from "vitest";

import type { ComponentPublicInstance } from "vue";

import * as fixtures from "@test/shared/fixtures";
import { cleanupable, expectGetElementsToBeInTheDocument } from "@test/shared/utils";

import * as mono from "@klass/vue/mono";

import { Avatar } from "@ark-ui/vue/avatar";

import { mount } from "./../utils";

const cleanup = cleanupable();

vt.beforeEach(() => {
	cleanup();
});

vt.describe("klassed/mono", () => {
	vt.describe("abstract", () => {
		vt.it("should work", async () => {
			const ComponentRoot = mono.klassed(Avatar.Root, fixtures.klass.abstract.options);
			const ComponentFallback = mono.klassed(Avatar.Fallback, fixtures.klass.abstract.options);
			const ComponentImage = mono.klassed(Avatar.Image, fixtures.klass.abstract.options);

			for await (const { props, equal } of fixtures.klass.abstract.test) {
				let ref: Element | ComponentPublicInstance | null = null;

				const clean = mount(() => (
					<ComponentRoot
						ref={(element) => {
							if (element) ref = element;
						}}
						data-testid="component-root"
						data-custom="attribute"
						{...(props as any)}
						class="extra"
					>
						<ComponentFallback data-testid="component-fallback" asChild>
							<span>fallback</span>
						</ComponentFallback>
						<ComponentImage data-testid="component-image" />
					</ComponentRoot>
				));
				cleanup(clean);

				await vt.vi.waitFor(() => {
					if (ref === null) throw new Error("Ref is null");
				});

				const [componentRoot] = expectGetElementsToBeInTheDocument((screen) => [screen.getByTestId("component-root"), screen.getByTestId("component-root"), screen.getByTestId("component-root")]);

				vt.expect(componentRoot.className).toEqual(equal ? `${equal} extra` : "extra");

				clean();
			}
		});
	});
});
