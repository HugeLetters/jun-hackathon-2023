<script lang="ts">
import Tt from "$lib/components/icons/Tt.svelte";
import type { Position, SavedProject } from "$lib/type";
import { COLORS } from "$lib/utils";
import { toJpeg, toPng } from "html-to-image";
import { jsPDF } from "jspdf";
import BackgroundController from "./BackgroundController.svelte";

export let project: SavedProject;
export let canvas: HTMLElement;
export let assets: string[];

function getCanvasCenter(): Position {
	const { width, height } = canvas.getBoundingClientRect();

	return [width / 2, height / 2];
}

type SupportedImage = "jpg" | "png";
function getConverter(type: SupportedImage) {
	switch (type) {
		case "jpg":
			return toJpeg;
		case "png":
			return toPng;
		default: {
			const x: never = type;
			return x;
		}
	}
}
function downloadImage(type: SupportedImage) {
	getConverter(type)(canvas).then((image) => {
		const anchor = document.createElement("a");
		anchor.href = image;
		anchor.download = `project.${type}`;
		anchor.click();
	});
}
</script>

<div class="flex w-28 flex-col bg-neutral-900 p-5">
	<BackgroundController bind:background={project.background} />
	<button
		class="w-full text-zinc-200"
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
		<div class="w-full rounded-full bg-zinc-600 px-4 py-2">
			<Tt class="mx-auto h-5 w-5" />
		</div>
		<span class="whitespace-nowrap text-xs font-semibold">Текст</span>
	</button>
	<button
		on:click={() => {
			project.elements.push({
				type: "shape",
				subtype: "circle",
				position: getCanvasCenter(),
				color: { ...COLORS.yellow },
				size: [100, 100],
			});
			project.elements = project.elements;
		}}
	>
		add circle
	</button>
	<button
		on:click={() => {
			project.elements.push({
				type: "shape",
				subtype: "triangle",
				position: getCanvasCenter(),
				color: { ...COLORS.red },
				size: [100, 86],
			});
			project.elements = project.elements;
		}}
	>
		add triangle
	</button>
	<button
		on:click={() => {
			project.elements.push({
				type: "shape",
				subtype: "square",
				position: getCanvasCenter(),
				color: { ...COLORS.purple },
				size: [100, 100],
			});
			project.elements = project.elements;
		}}
	>
		add square
	</button>
	<button
		on:click={() => {
			const { width, height } = canvas.getBoundingClientRect();
			const doc = new jsPDF({ orientation: "landscape", format: [width, height] });
			doc.html(canvas, {
				callback(doc) {
					doc.deletePage(doc.getNumberOfPages());
					doc.save("./project.pdf");
				},
			});
		}}
	>
		pdf
	</button>
	<button
		on:click={() => {
			downloadImage("png");
		}}
	>
		png
	</button>
	<button
		on:click={() => {
			downloadImage("jpg");
		}}
	>
		jpg
	</button>
	<button
		on:click={() => {
			project.elements = [];
			project.background = { ...COLORS.white };
		}}
	>
		clear
	</button>
	<div class="grid grid-cols-2">
		{#each assets as asset}
			<button
				on:click={() => {
					project.elements.push({
						type: "image",
						src: asset,
						position: getCanvasCenter(),
						size: [100, 100],
					});
					project = project;
				}}
			>
				<img
					src={asset}
					alt=""
					class="h-full object-cover"
				/>
			</button>
		{/each}
	</div>
</div>
