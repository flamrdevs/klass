export const render = (element: HTMLElement) => {
	document.body.appendChild(element);

	return () => {
		document.body.removeChild(element);
	};
};
