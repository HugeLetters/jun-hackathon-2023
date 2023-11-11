<script lang="ts">
import PaletteIcon from "$lib/components/icons/Palette.svelte";
import type { Background, BgColor } from "$lib/type";
import { colorToString } from "$lib/utils";
import { createPopover, melt } from "@melt-ui/svelte";
import { fade } from "svelte/transition";
import BackgroundColorController from "./BackgroundColorController.svelte";

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

<button
	use:melt={$trigger}
	class="w-full text-zinc-200"
>
	<div class="w-full rounded-full bg-zinc-600 px-4 py-2">
		<PaletteIcon class="h-5 w-5" />
	</div>
	<span class="text-xs font-semibold"> Заливка </span>
</button>
{#if $open}
	<div
		use:melt={$content}
		transition:fade={{ duration: 150 }}
		class="flex translate-x-5 flex-col gap-4 rounded-lg bg-neutral-900 p-4"
	>
		<span class="block py-4"> Цвета заливки</span>
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
