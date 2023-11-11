import type { Action } from "svelte/action";
import { writable } from "svelte/store";
import type { Boundary, Position } from "./type";
import { clamp } from "./utils";

type CreateDragOptions = { initialPosition?: Position };
export function createDrag({ initialPosition = [0, 0] }: CreateDragOptions) {
	const position = writable(initialPosition);
	let innerPosition = initialPosition;
	position.subscribe((value) => {
		innerPosition = value;
	});

	const drag: Action<HTMLElement, { boundary: Boundary }> = function (node, { boundary }) {
		node.draggable = true;
		let startX = 0;
		let startY = 0;
		const [left, top, right, bottom] = boundary;

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
			const [currentX, currentY] = innerPosition;

			position.set([
				clamp(left, currentX + e.clientX - startX, right),
				clamp(top, currentY + e.clientY - startY, bottom),
			]);
		}
		node.addEventListener("dragstart", onDragStart);
		node.addEventListener("dragend", onDragEnd);

		return {
			destroy() {
				node.removeEventListener("dragstart", onDragStart);
				node.removeEventListener("dragend", onDragEnd);
			},
		};
	};

	return { drag, position };
}
