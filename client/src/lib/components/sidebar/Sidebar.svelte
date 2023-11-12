<script lang="ts">
import Tt from "$lib/components/icons/Tt.svelte";
import Eraser from "$lib/components/icons/Eraser.svelte";
import type { Position, SavedProject } from "$lib/type";
import { COLORS } from "$lib/utils";
import BackgroundController from "./BackgroundController.svelte";
import ShapePopover from "./ShapePopover.svelte";
import ExportPopover from "./ExportPopover.svelte";
import ImagePopover from "./ImagePopover.svelte";

export let project: SavedProject;
export let canvas: HTMLElement;
export let assets: string[];

function getCanvasCenter(): Position {
	if (!canvas) return [0, 0];

	const { width, height } = canvas.getBoundingClientRect();

	return [width / 2, height / 2];
}
</script>

<div class="flex w-28 flex-col bg-neutral-900 p-4 pt-20">
	<BackgroundController bind:background={project.background} />
	<button
		class="group w-full text-zinc-200"
		on:click={() => {
			project.elements.push({
				position: getCanvasCenter(),
				type: "text",
				color: "black",
				font: "ui-serif",
				content: "text",
				weight: 400,
				fontSize: 1,
				size: [100, 100],
			});
			project.elements = project.elements;
		}}
	>
		<div class="w-full rounded-full px-4 py-2 transition-colors group-focus-within:bg-zinc-600">
			<Tt class="mx-auto h-5 w-5" />
		</div>
		<span class="whitespace-nowrap text-xs font-semibold">Текст</span>
	</button>
	<ShapePopover
		bind:elements={project.elements}
		canvasCenter={getCanvasCenter()}
	/>
	<ImagePopover
		bind:elements={project.elements}
		canvasCenter={getCanvasCenter()}
		{assets}
	/>
	<button
		class="group w-full text-zinc-200"
		on:click={() => {
			project.elements = [];
			project.background = { ...COLORS.white };
		}}
	>
		<div class="w-full rounded-full px-4 py-2 transition-colors group-focus-within:bg-zinc-600">
			<Eraser class="mx-auto h-5 w-5" />
		</div>
		<span class="whitespace-nowrap text-xs font-semibold">Очистить</span>
	</button>
	<ExportPopover {canvas} />
</div>
