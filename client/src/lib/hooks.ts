import type { Action } from "svelte/action";
import type { Position } from "./type";
import { clamp } from "./utils";

export const drag: Action<
	HTMLElement,
	{ currentPosition: Position; canvas: HTMLElement; updatePosition: (position: Position) => void }
> = function (node, options) {
	node.draggable = true;
	let [startX, startY] = [0, 0];

	let transform: string;
	function onDrag(e: DragEvent) {
		node.style.transform = `translate(${e.clientX - startX}px, ${
			e.clientY - startY
		}px) ${transform}`;
	}
	function onDragStart(e: DragEvent) {
		if (e.currentTarget instanceof HTMLElement) {
			e.dataTransfer?.setDragImage(document.createElement("div"), 0, 0);
		}
		transform = node.style.transform;
		startX = e.clientX;
		startY = e.clientY;
		node.addEventListener("drag", onDrag);
	}

	function onDragEnd(e: DragEvent) {
		node.style.opacity = "";
		node.style.transform = transform;

		const [currentX, currentY] = options.currentPosition;
		const { left, top, right, bottom } = options.canvas.getBoundingClientRect();
		const { height, width } = node.getBoundingClientRect();

		options.updatePosition([
			clamp(-0.9 * width, currentX + e.clientX - startX, right - left - 0.1 * width),
			clamp(-0.9 * height, currentY + e.clientY - startY, bottom - top - 0.1 * height),
		]);

		node.removeEventListener("drag", onDrag);
	}
	node.addEventListener("dragstart", onDragStart);
	node.addEventListener("dragend", onDragEnd);

	return {
		update(updatedOptions) {
			options = updatedOptions;
		},
		destroy() {
			node.removeEventListener("dragstart", onDragStart);
			node.removeEventListener("dragend", onDragEnd);
		},
	};
};
