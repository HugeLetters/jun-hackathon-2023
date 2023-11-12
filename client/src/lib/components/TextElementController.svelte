<script lang="ts">
import type { ElementType } from "$lib/type";

export let element: ElementType<"text">;
export let update: () => void;
</script>

<input
	bind:value={element.color}
	on:input={update}
	placeholder="color"
/>
<input
	bind:value={element.font}
	on:input={update}
	placeholder="font"
/>
<input
	bind:value={element.fontSize}
	on:input={update}
	placeholder="size"
/>
<select
	bind:value={element.align}
	on:change={update}
>
	<option value="center">center</option>
	<option value="right">right</option>
	<option value="left">left</option>
</select>
