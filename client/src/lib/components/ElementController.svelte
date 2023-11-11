<script lang="ts">
import type { ElementType } from "$lib/type";

export let element: ElementType;
export let update: () => void;
</script>

<input
	bind:value={element.size[0]}
	on:input={update}
	placeholder="width"
/>
<input
	bind:value={element.size[1]}
	on:input={update}
	placeholder="height"
/>
<input
	bind:value={element.opacity}
	on:input={update}
	placeholder="opacity"
/>
