<script lang="ts">
import type { ElementType } from "$lib/type";

export let element: ElementType<"text">;
</script>

<input
	bind:value={element.color}
	placeholder="color"
/>
<input
	bind:value={element.font}
	placeholder="font"
/>
<input
	bind:value={element.fontSize}
	placeholder="size"
/>
<select bind:value={element.align}>
	<option value="center">center</option>
	<option value="right">right</option>
	<option value="left">left</option>
</select>
