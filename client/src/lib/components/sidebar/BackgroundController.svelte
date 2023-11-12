<script lang="ts">
import PaletteIcon from "$lib/components/icons/Palette.svelte";
import type { BgColor } from "$lib/type";
import { COLORS, colorToString } from "$lib/utils";
import { createPopover, melt } from "@melt-ui/svelte";
import { fade } from "svelte/transition";
import BackgroundColorController from "./BackgroundColorController.svelte";

export let background: BgColor;
const colors: BgColor[] = [
	COLORS.white,
	COLORS.black,
	COLORS.red,
	COLORS.orange,
	COLORS.yellow,
	COLORS.green,
	COLORS.blue,
	COLORS.darkblue,
	COLORS.purple,
	{ type: "gradient", degree: 0, colors: [0, 30] },
	{ type: "gradient", degree: 60, colors: [30, 60] },
	{ type: "gradient", degree: 120, colors: [60, 120] },
	{ type: "gradient", degree: 180, colors: [120, 180] },
	{ type: "gradient", degree: 240, colors: [240, 300] },
	{ type: "gradient", degree: 300, colors: [250, 330] },
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
		<PaletteIcon class="mx-auto h-5 w-5" />
	</div>
	<span class="whitespace-nowrap text-xs font-semibold">Цвет фона</span>
</button>
{#if $open}
	<div
		use:melt={$content}
		transition:fade={{ duration: 150 }}
		class="flex translate-x-5 flex-col gap-4 rounded-lg bg-neutral-900 p-4"
	>
		<span class="block py-4">Цвета фона</span>
		<div class="grid grid-cols-4 gap-3">
			{#each colors as color}
				<button
					class="aspect-square w-20 rounded-md"
					style="background: {colorToString(color)};"
					on:click={() => {
						background = { ...color };
					}}
				/>
			{/each}
		</div>
		<div class="">
			<BackgroundColorController
				bind:color={background}
				property="color"
				label="Оттенок"
			/>

			<BackgroundColorController
				bind:color={background}
				property="saturation"
				label="Насыщенность"
			/>
			<BackgroundColorController
				bind:color={background}
				property="lightness"
				label="Яркость"
			/>
			<BackgroundColorController
				bind:color={background}
				property="opacity"
				label="Прозрачность"
			/>
		</div>
	</div>
{/if}
