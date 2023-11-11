<script lang="ts">
import { drag } from "$lib/hooks";
import type { ElementType } from "$lib/type";

export let element: ElementType;
export let canvas: HTMLElement;
export let focusedElement: ElementType | null;
</script>

<button
	on:focus|capture={() => {
		focusedElement = element;
	}}
	data-type={element.type}
	data-href={element.type === "text" ? element.href : undefined}
	class="absolute max-h-full max-w-full overflow-hidden outline-black focus-within:outline"
	class:italic={element.type === "text" && element.italic}
	class:underline={element.type === "text" && element.underline}
	style="left: {element.position[0]}px; top: {element.position[1]}px;
	width: {element.size[0]}px; height: {element.size[1]}px;
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
		<textarea
			bind:value={element.content}
			class="h-full w-full resize-none overflow-hidden bg-transparent outline-none"
			style="text-align: {element.align ?? 'center'};"
		/>
	{:else if element.type === "image"}
		<img
			src={element.src}
			alt=""
			class="h-20 object-fill"
		/>
	{:else}
		{element.type}
	{/if}
</button>
