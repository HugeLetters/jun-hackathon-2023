<script lang="ts">
import { drag } from "$lib/hooks";
import type { ElementType } from "$lib/type";
import { onMount, tick } from "svelte";
import ImageElement from "./ImageElement.svelte";
import ShapeElement from "./ShapeElement.svelte";
import TextElement from "./TextElement.svelte";

export let element: ElementType;
export let canvas: HTMLElement;
export let focusedElement: ElementType | null;
export let deleteElement: () => void;

let root: HTMLElement;
onMount(() => {
	if (!canvas || canvas.contains(document.activeElement)) return;

	root.focus();
});
</script>

<button
	bind:this={root}
	on:focus|capture={async () => {
		await tick();
		focusedElement = element;
	}}
	on:keydown={(e) => {
		if (e.key === "Delete") {
			deleteElement();
		}
	}}
	data-type={element.type}
	class="group absolute max-h-full max-w-full rounded-sm outline-dashed outline-0 outline-offset-8 outline-black/40 focus-within:focus-within:outline-2 hover:outline-1"
	style="left: {element.position[0]}px; top: {element.position[1]}px;
	width: {element.size[0]}px; height: {element.size[1]}px; opacity: {element.opacity ?? 1};"
	use:drag={{
		canvas,
		currentPosition: element.position,
		updatePosition(position) {
			element.position = position;
		},
	}}
>
	{#if element.type === "text"}
		<TextElement bind:element />
	{:else if element.type === "image"}
		<ImageElement bind:element />
	{:else if element.type === "shape"}
		<ShapeElement bind:element />
	{/if}
</button>
