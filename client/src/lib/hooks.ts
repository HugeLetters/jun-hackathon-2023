import type { Action } from "svelte/action";
import type { Position } from "./type";
import { clamp } from "./utils";

export const drag: Action<
	HTMLElement,
	{ currentPosition: Position; canvas: HTMLElement; updatePosition: (position: Position) => void }
> = function (node, { currentPosition, canvas, updatePosition }) {
	node.draggable = true;
	let [startX, startY] = [0, 0];

	function onDrag() {
		node.style.opacity = "0";
	}
	function onDragStart(e: DragEvent) {
		startX = e.clientX;
		startY = e.clientY;
		node.addEventListener("drag", onDrag, { once: true });
	}

	function onDragEnd(e: DragEvent) {
		node.style.opacity = "";

		const [currentX, currentY] = currentPosition;
		const { left, top, right, bottom } = canvas.getBoundingClientRect();
		const { height, width } = node.getBoundingClientRect();

		updatePosition([
			clamp(0, currentX + e.clientX - startX, right - left - width),
			clamp(0, currentY + e.clientY - startY, bottom - top - height),
		]);
	}
	node.addEventListener("dragstart", onDragStart);
	node.addEventListener("dragend", onDragEnd);

	return {
		update({ currentPosition: updatedPosition }) {
			currentPosition = updatedPosition;
		},
		destroy() {
			node.removeEventListener("dragstart", onDragStart);
			node.removeEventListener("dragend", onDragEnd);
		},
	};
};
