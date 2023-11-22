<script lang="ts">
import type { ElementTypeExtra } from "$lib/type";
import { colorToString } from "$lib/utils";
import { onMount } from "svelte";

export let element: ElementTypeExtra["text"];
let root: HTMLTextAreaElement;

onMount(() => {
	root.select();
});
</script>

<textarea
	on:dragstart|preventDefault
	on:focus={() => root.select()}
	bind:this={root}
	bind:value={element.content}
	class="h-full w-full cursor-[inherit] resize-none overflow-hidden bg-transparent outline-none transition-colors group-focus-within:cursor-text"
	class:italic={element.italic}
	class:underline={element.underline}
	style="text-align: {element.align ?? 'center'}; font-weight: {element.bold ? 900 : 400};
		color: {colorToString(element.color)}; font-size: {element.fontSize}rem;"
/>
