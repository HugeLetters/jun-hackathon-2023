<script lang="ts">
import type { ElementType } from "$lib/type";

import ElementController from "../ElementController.svelte";
import TextElementController from "../TextElementController.svelte";

export let focusedElement: ElementType | null;
export let elementList: ElementType[];

function moveFocusedLayer(direction: "up" | "down") {
	if (!focusedElement) return;
	const idx = elementList.findIndex((x) => x === focusedElement);
	if (idx === -1) return;

	elementList.splice(idx, 1);
	elementList.splice(direction === "up" ? idx + 1 : Math.max(0, idx - 1), 0, focusedElement);
	elementList = elementList;
}
$: if (focusedElement) {
	elementList = elementList;
}
</script>

<div class="self-stretch">
	header ui
	{#if focusedElement}
		<div>{focusedElement.position}</div>
		<ElementController
			bind:element={focusedElement}
			moveLayerUp={() => moveFocusedLayer("up")}
			moveLayerDown={() => moveFocusedLayer("down")}
		/>
		{#if focusedElement.type === "text"}
			<TextElementController bind:element={focusedElement} />
		{/if}
	{/if}
</div>
