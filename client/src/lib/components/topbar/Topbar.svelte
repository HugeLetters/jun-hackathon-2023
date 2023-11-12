<script lang="ts">
import type { ElementType } from "$lib/type";
import ElementController from "./ElementController.svelte";
import ShapeElementController from "./ShapeElementController.svelte";
import TextElementController from "./TextElementController.svelte";

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

<div class="flex w-full items-center gap-2 self-stretch overflow-x-auto bg-white p-6 text-zinc-800">
	{#if focusedElement}
		<ElementController
			bind:element={focusedElement}
			moveLayerUp={() => moveFocusedLayer("up")}
			moveLayerDown={() => moveFocusedLayer("down")}
		/>
		{#if focusedElement.type === "text"}
			<TextElementController bind:element={focusedElement} />
		{:else if focusedElement.type === "shape"}
			<ShapeElementController bind:element={focusedElement} />
		{/if}
	{/if}
</div>

<style>
::-webkit-scrollbar-thumb {
	background-color: theme("colors.zinc.800");
	border-radius: theme("borderRadius.full");
	background-clip: padding-box;
	border: 5px transparent solid;
}
::-webkit-scrollbar {
	width: 3px;
}
</style>
