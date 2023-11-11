<script lang="ts">
import type { ElementType } from "$lib/type";

export let element: ElementType<"text">;
export let update: () => void;
</script>

<input
	bind:value={element.color}
	on:input={update}
	placeholder="focused color"
/>
<input
	bind:value={element.font}
	on:input={update}
	placeholder="focused font"
/>
<input
	bind:value={element.fontSize}
	on:input={update}
	placeholder="focused size"
/>
