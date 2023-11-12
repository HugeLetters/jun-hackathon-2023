<script lang="ts">
import type { ElementTypeExtra } from "$lib/type";
import { onMount } from "svelte";

export let element: ElementTypeExtra["text"];
let root: HTMLTextAreaElement;
onMount(() => {
	root.select();
});
</script>

<textarea
	bind:this={root}
	bind:value={element.content}
	class="h-full w-full cursor-[inherit] resize-none overflow-hidden bg-transparent outline-none group-focus-within:cursor-text"
	class:italic={element.italic}
	class:underline={element.underline}
	style="text-align: {element.align ?? 'center'}; font-family: {element.font}; 
		color: {element.color}; font-size: {element.fontSize}rem; font-weight: {element.weight};"
/>
