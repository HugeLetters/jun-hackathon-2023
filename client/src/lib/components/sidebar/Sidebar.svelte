<script lang="ts">
import type { SavedProject } from "$lib/type";
import { COLORS } from "$lib/utils";
import { toJpeg, toPng } from "html-to-image";
import { jsPDF } from "jspdf";
import BackgroundController from "./BackgroundController.svelte";

export let project: SavedProject;
export let canvas: HTMLElement;
export let assets: string[];

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
		on:click={() => {
			const { width, height } = canvas.getBoundingClientRect();

			project.elements.push({
				position: [width / 2, height / 2],
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
		add text element
	</button>
	<button
		on:click={() => {
			project.elements.push({
				type: "shape",
				subtype: "circle",
				position: [0, 0],
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
				position: [0, 0],
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
				position: [0, 0],
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
						position: [0, 0],
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
