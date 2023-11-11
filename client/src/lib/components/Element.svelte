<script lang="ts">
import { drag } from "$lib/hooks";
import type { ElementType } from "$lib/type";

export let element: ElementType;
export let canvas: HTMLElement;
</script>

<button
	class="absolute left-[var(--left)] top-[var(--top)]"
	style="--left: {element.position[0]}px; --top: {element.position[1]}px"
	use:drag={{
		canvas,
		currentPosition: element.position,
		updatePosition(position) {
			element.position = position;
		},
	}}
>
	{element.type}
</button>
