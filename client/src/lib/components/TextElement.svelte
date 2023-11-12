<script lang="ts">
import type { ElementTypeExtra } from "$lib/type";
import { onMount } from "svelte";

export let element: ElementTypeExtra["text"];
let root: HTMLTextAreaElement;
onMount(async () => {
	root.select();
});
</script>

<textarea
	bind:this={root}
	bind:value={element.content}
	class="h-full w-full resize-none overflow-hidden bg-transparent outline-none"
	style="text-align: {element.align ?? 'center'};"
/>
