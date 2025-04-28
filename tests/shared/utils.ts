import { expect } from "vitest";

import { screen } from "@testing-library/dom";

import "@testing-library/jest-dom/vitest";

type Screen = typeof screen;

export const cleanupable = () => {
	type Fn = () => void;

	const sets = new Set<Fn>();

	return (fn?: Fn) => {
		if (typeof fn === "undefined") {
			for (const set of sets) {
				set();
				sets.delete(set);
			}
		} else {
			sets.add(fn);
		}
	};
};

export { screen };

export const expectElementToBeInTheDocument = (element: Element) => {
	expect(element).toBeInTheDocument();
	return element;
};

export const expectGetElementToBeInTheDocument = (get: (screen: Screen) => Element) => expectElementToBeInTheDocument(get(screen));

export const expectElementsToBeInTheDocument = (elements: Element[]) => {
	for (const element of elements) expectElementToBeInTheDocument(element);
	return elements;
};

export const expectGetElementsToBeInTheDocument = (get: (screen: Screen) => Element[]) => expectElementsToBeInTheDocument(get(screen));
