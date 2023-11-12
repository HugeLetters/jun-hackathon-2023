import { getContext, setContext } from "svelte";
import { persisted } from "svelte-persisted-store";
import type { Action } from "svelte/action";
import type { Writable } from "svelte/store";
import type { Position, SavedProject } from "./type";
import { COLORS, clamp } from "./utils";

export const drag: Action<
	HTMLElement,
	{ currentPosition: Position; canvas: HTMLElement; updatePosition: (position: Position) => void }
> = function (node, options) {
	node.draggable = false;
	let [startX, startY] = [0, 0];

	let transform: string;
	function onPointerMove(e: PointerEvent) {
		node.style.transform = `translate(${e.clientX - startX}px, ${
			e.clientY - startY
		}px) ${transform}`;
	}
	function onPointerDown(e: PointerEvent) {
		transform = node.style.transform;
		startX = e.clientX;
		startY = e.clientY;
		window.addEventListener("pointermove", onPointerMove);
		window.addEventListener("pointerup", onPointerUp, { once: true });
	}

	function onPointerUp(e: PointerEvent) {
		node.style.transform = transform;

		const [currentX, currentY] = options.currentPosition;
		const { left, top, right, bottom } = options.canvas.getBoundingClientRect();
		const { height, width } = node.getBoundingClientRect();

		options.updatePosition([
			clamp(-0.9 * width, currentX + e.clientX - startX, right - left - 0.1 * width),
			clamp(-0.9 * height, currentY + e.clientY - startY, bottom - top - 0.1 * height),
		]);

		window.removeEventListener("pointermove", onPointerMove);
	}

	node.addEventListener("pointerdown", onPointerDown);

	return {
		update(updatedOptions) {
			options = updatedOptions;
		},
		destroy() {
			node.removeEventListener("pointerdown", onPointerDown);
			window.removeEventListener("pointermove", onPointerMove);
			window.removeEventListener("pointerup", onPointerUp);
		},
	};
};

const lastProjectStoreContextKey = "lpsk";
export function getLastProjectStore(): Writable<SavedProject> {
	const store = getContext<Writable<SavedProject> | undefined>(lastProjectStoreContextKey);
	if (store) return store;

	const newStore = persisted<SavedProject>("current-project", {
		background: { ...COLORS.white },
		elements: [],
	});
	setContext(lastProjectStoreContextKey, newStore);
	return newStore;
}
