<script lang="ts">
import Eraser from "$lib/components/icons/Eraser.svelte";
import Tt from "$lib/components/icons/Tt.svelte";
import type { ElementType, Position, SavedProject } from "$lib/type";
import { COLORS } from "$lib/utils";
import BackgroundController from "./BackgroundController.svelte";
import ExportPopover from "./ExportPopover.svelte";
import ImagePopover from "./ImagePopover.svelte";
import ShapePopover from "./ShapePopover.svelte";

export let project: SavedProject;
export let canvas: HTMLElement;
export let assets: string[];
export let createElement: (element: ElementType) => void;

$: canvasCenter = ((): Position => {
	if (!canvas) return [0, 0];

	const { width, height } = canvas.getBoundingClientRect();

	return [width / 2, height / 2];
})();
</script>

<div class="flex w-28 flex-col justify-center gap-8 bg-neutral-900 p-4">
	<BackgroundController bind:background={project.background} />
	<button
		class="group w-full text-zinc-200"
		on:click={() => {
			createElement({
				position: canvasCenter,
				type: "text",
				color: "black",
				font: "Roboto",
				content: "text",
				weight: 400,
				fontSize: 1,
				size: [100, 100],
			});
		}}
	>
		<div class="w-full rounded-full px-4 py-2 transition-colors group-focus-within:bg-zinc-600">
			<Tt class="mx-auto h-5 w-5" />
		</div>
		<span class="whitespace-nowrap text-xs font-semibold">Текст</span>
	</button>
	<ShapePopover
		{createElement}
		{canvasCenter}
	/>
	<ImagePopover
		{createElement}
		{canvasCenter}
		{assets}
	/>
	<button
		class="group w-full text-zinc-200"
		on:click={() => {
			project = {
				elements: [],
				background: { ...COLORS.white },
			};
		}}
	>
		<div class="w-full rounded-full px-4 py-2 transition-colors group-focus-within:bg-zinc-600">
			<Eraser class="mx-auto h-5 w-5" />
		</div>
		<span class="whitespace-nowrap text-xs font-semibold">Очистить</span>
	</button>
	<ExportPopover {canvas} />
</div>
