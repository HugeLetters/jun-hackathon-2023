<script lang="ts">
import type { ElementTypeExtra } from "$lib/type";
import { COLORS, colorToString } from "$lib/utils";
import { createPopover, melt } from "@melt-ui/svelte";
import { fade } from "svelte/transition";
import Paint from "../icons/Paint.svelte";
import ShapeColorController from "./ShapeColorController.svelte";

export let element: ElementTypeExtra["shape"];
const colors = Object.values(COLORS);

const {
	elements: { trigger, content, arrow },
	states: { open },
} = createPopover({
	positioning: { placement: "bottom" },
	forceVisible: true,
});
</script>

<button use:melt={$trigger}>
	<Paint class="h-5 w-5" />
</button>
{#if $open}
	<div
		use:melt={$content}
		transition:fade={{ duration: 250 }}
		class="drop-shadow-around flex w-96 translate-y-2 flex-col gap-4 rounded-lg bg-white p-4 text-zinc-800"
	>
		<div use:melt={$arrow} />
		<div class="grid grid-cols-4 gap-3">
			{#each colors as color (color)}
				<button
					class="drop-shadow-around aspect-square w-20 rounded-md"
					style="background: {colorToString(color)};"
					on:click={() => {
						element.color = { ...color };
					}}
				/>
			{/each}
		</div>
		<div class="">
			<ShapeColorController
				bind:color={element.color}
				property="color"
				label="Оттенок"
			/>

			<ShapeColorController
				bind:color={element.color}
				property="saturation"
				label="Насыщенность"
			/>
			<ShapeColorController
				bind:color={element.color}
				property="lightness"
				label="Яркость"
			/>
		</div>
	</div>
{/if}
