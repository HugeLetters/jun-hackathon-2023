<script lang="ts">
import Eraser from "$lib/components/icons/Eraser.svelte";
import Tt from "$lib/components/icons/Tt.svelte";
import type { CreateElementFn, ElementType, SavedProject } from "$lib/type";
import { COLORS } from "$lib/utils";
import BackgroundController from "./BackgroundController.svelte";
import ExportPopover from "./ExportPopover.svelte";
import ImagePopover from "./ImagePopover.svelte";
import ShapePopover from "./ShapePopover.svelte";

export let project: SavedProject;
export let focusedElement: ElementType | null;
export let canvas: HTMLElement;
export let assets: string[];
export let createElement: CreateElementFn;
</script>

<div
	class="flex w-28 flex-col justify-center gap-8 bg-neutral-900 p-4"
	on:focus|capture={() => {
		focusedElement = null;
	}}
>
	<BackgroundController bind:background={project.background} />
	<button
		class="group w-full text-zinc-200"
		on:click={() => {
			createElement({ type: "text", color: COLORS.black, content: "text", fontSize: 1 });
		}}
	>
		<div class="w-full rounded-full px-4 py-2 transition-colors group-focus-within:bg-zinc-600">
			<Tt class="mx-auto h-5 w-5" />
		</div>
		<span class="whitespace-nowrap text-xs font-semibold">Текст</span>
	</button>
	<ShapePopover {createElement} />
	<ImagePopover
		{createElement}
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
