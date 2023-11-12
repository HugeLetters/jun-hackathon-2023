<script lang="ts">
import { drag } from "$lib/hooks";
import type { ElementType } from "$lib/type";
import { onMount } from "svelte";
import ImageElement from "./ImageElement.svelte";
import ShapeElement from "./ShapeElement.svelte";
import TextElement from "./TextElement.svelte";

export let element: ElementType;
export let canvas: HTMLElement;
export let focusedElement: ElementType | null;
export let deleteElement: () => void;

let root: HTMLElement;
onMount(async () => {
	if (!canvas || canvas.contains(document.activeElement)) return;

	root.focus();
});
</script>

<button
	bind:this={root}
	on:focus|capture={() => {
		focusedElement = element;
	}}
	on:keydown={(e) => {
		if (e.key === "Delete") {
			deleteElement();
		}
	}}
	data-type={element.type}
	data-href={element.type === "text" ? element.href : undefined}
	class="absolute max-h-full max-w-full rounded-sm outline-2 outline-offset-8 outline-black/20 focus-within:outline"
	class:italic={element.type === "text" && element.italic}
	class:underline={element.type === "text" && element.underline}
	style="left: {element.position[0]}px; top: {element.position[1]}px;
	width: {element.size[0]}px; height: {element.size[1]}px; opacity: {element.opacity ?? 1};
	{element.type === 'text'
		? `font-family: ${element.font}; color: ${element.color}; font-size: ${element.fontSize}rem; font-weight: ${element.weight}`
		: ''}"
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
	{:else}
		{element.type}
	{/if}
</button>
