<script lang="ts">
import PaletteIcon from "$lib/components/icons/Palette.svelte";
import { turn } from "$lib/hooks";
import type { BgColor } from "$lib/type";
import { COLORS, colorToString } from "$lib/utils";
import { createPopover, melt } from "@melt-ui/svelte";
import BackgroundColorController from "./BackgroundColorController.svelte";

export let background: BgColor;
const colors = Object.values(COLORS);

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
	<div class="w-full rounded-full px-4 py-2 transition-colors {$open ? 'bg-zinc-600' : ''}">
		<PaletteIcon class="mx-auto h-5 w-5" />
	</div>
	<span class="whitespace-nowrap text-xs font-semibold">Цвет фона</span>
</button>
{#if $open}
	<div
		use:melt={$content}
		transition:turn={{ duration: 250, offsetOrigin: 10, rotateTo: 50 }}
		class="flex translate-x-5 flex-col gap-4 rounded-lg bg-neutral-900 p-4"
	>
		<span class="block py-4">Цвета фона</span>
		<div class="grid grid-cols-4 gap-3">
			{#each colors as color (color)}
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
