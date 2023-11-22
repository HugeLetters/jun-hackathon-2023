<script lang="ts">
import type { ElementTypeExtra } from "$lib/type";
import { colorToString } from "$lib/utils";

export let element: ElementTypeExtra["shape"];

$: bgColor = colorToString(element.color);
</script>

{#if element.subtype === "circle"}
	<div
		class="h-full w-full rounded-full"
		style="background: {bgColor};"
	/>
{:else if element.subtype === "square"}
	<div
		class="h-full w-full"
		style="background: {bgColor};"
	/>
{:else if element.subtype === "triangle"}
	<div
		class="h-full w-full [clip-path:polygon(50%_0,100%_100%,0_100%)]"
		style="background: {bgColor};"
	/>
{/if}
