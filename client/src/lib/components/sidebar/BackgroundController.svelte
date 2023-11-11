<script lang="ts">
import type { Background, BgColor } from "$lib/type";
import { colorToString } from "$lib/utils";
import { createPopover, melt } from "@melt-ui/svelte";
import BackgroundColorController from "./BackgroundColorController.svelte";
import { fade } from "svelte/transition";

export let background: Background;
const colors: BgColor[] = [
	{ type: "color", color: "white" },
	{ type: "color", color: "black" },
	{ type: "color", color: "purple" },
	{ type: "gradient", degree: 35, colors: [200, 100] },
];

const {
	elements: { trigger, content },
	states: { open },
} = createPopover({
	positioning: { placement: "right" },
	forceVisible: true,
});
</script>

<button use:melt={$trigger}> Заливка </button>
{#if $open}
	<div
		use:melt={$content}
		transition:fade={{ duration: 150 }}
		class="flex translate-x-2 flex-col gap-4 rounded-lg bg-neutral-900 p-4"
	>
		<span class="block py-4">Цвета заливки</span>
		<div class="grid grid-cols-4 gap-3">
			{#each colors as color}
				<button
					class="aspect-square w-20 rounded-md"
					style="background: {colorToString(color)};"
					on:click={() => {
						background.color = color;
					}}
				/>
			{/each}
		</div>
		<div class="">
			<BackgroundColorController
				bind:color={background.color}
				property="color"
				label="Оттенок"
			/>

			<BackgroundColorController
				bind:color={background.color}
				property="saturation"
				label="Насыщенность"
			/>
			<BackgroundColorController
				bind:color={background.color}
				property="lightness"
				label="Яркость"
			/>
		</div>
	</div>
{/if}
