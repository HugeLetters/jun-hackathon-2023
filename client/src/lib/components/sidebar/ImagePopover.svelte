<script lang="ts">
import ImageIcon from "$lib/components/icons/Image.svelte";
import { turn } from "$lib/hooks";
import type { ElementType, Position } from "$lib/type";
import { createPopover, melt } from "@melt-ui/svelte";
import { onMount } from "svelte";

export let assets: string[];
export let canvasCenter: Position;
export let createElement: (element: ElementType<"image">) => void;

const {
	elements: { trigger, content },
	states: { open },
} = createPopover({
	positioning: { placement: "right", fitViewport: true },
	forceVisible: true,
});

onMount(() => {
	// preload images to avoid jank when popover is triggered for the first time - this worked better than link with rel='prefetch'
	assets.forEach((asset) => {
		const img = new Image();
		img.src = asset;
	});
});
</script>

<button
	use:melt={$trigger}
	class="w-full text-zinc-200"
>
	<div
		class="w-full origin-left rounded-full px-4 py-2 transition-colors {$open ? 'bg-zinc-600' : ''}"
	>
		<ImageIcon class="mx-auto h-5 w-5" />
	</div>
	<span class="whitespace-nowrap text-xs font-semibold">Изображения</span>
</button>
{#if $open}
	<div
		use:melt={$content}
		transition:turn={{ duration: 150, offsetOrigin: 15, rotateTo: 50 }}
		class="grid w-96 translate-x-5 grid-cols-2 gap-4 overflow-y-auto rounded-lg bg-neutral-900 p-4"
	>
		{#each assets as asset (asset)}
			<button
				on:click={() => {
					createElement({
						type: "image",
						src: asset,
						position: canvasCenter,
						size: [100, 100],
					});
					$open = false;
				}}
				class="aspect-square basis-1/2 overflow-hidden rounded-lg bg-white/10"
			>
				<img
					src={asset}
					alt=""
					class="h-full object-cover"
				/>
			</button>
		{/each}
	</div>
{/if}

<style>
::-webkit-scrollbar-thumb {
	background-color: theme("colors.zinc.200");
	border-radius: theme("borderRadius.md");
	background-clip: padding-box;
	border: theme("width[0.5]") transparent solid;
}
::-webkit-scrollbar {
	background-color: theme("colors.black/20");
	border-radius: theme("borderRadius.md");
	width: theme("width.2");
}
</style>
