<script lang="ts">
import Element from "$lib/components/Element.svelte";
import ElementController from "$lib/components/ElementController.svelte";
import TextElementController from "$lib/components/TextElementController.svelte";
import BackgroundController from "$lib/components/sidebar/BackgroundController.svelte";
import { getLastProjectStore } from "$lib/hooks";
import type { ElementType } from "$lib/type";
import { colorToString } from "$lib/utils";
import { toJpeg, toPng } from "html-to-image";
import { jsPDF } from "jspdf";

export let data;

const project = getLastProjectStore();

let focusedElement: ElementType | null = null;
let canvas: HTMLElement;

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
function updateElementList() {
	$project = $project;
}
</script>

<div class="flex min-h-screen">
	<div class="flex w-24 flex-col bg-neutral-900 p-5">
		<BackgroundController bind:background={$project.background} />
		<button
			on:click={() => {
				const { width, height } = canvas.getBoundingClientRect();

				$project.elements.push({
					position: [width / 2, height / 2],
					type: "text",
					color: "black",
					font: "ui-serif",
					content: "text",
					weight: 400,
					fontSize: 1,
					size: [100, 100],
				});
				$project.elements = $project.elements;
			}}
		>
			add text element
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
				$project.elements = [];
				$project.background = { color: { type: "color", color: "white" } };
			}}
		>
			clear
		</button>
		<div class="grid grid-cols-2">
			{#each data.assets as asset}
				<button
					on:click={() => {
						$project.elements.push({
							type: "image",
							src: asset,
							position: [0, 0],
							size: [100, 100],
						});
						$project = $project;
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
	<div class="flex grow flex-col">
		<div>
			header ui
			{#if focusedElement}
				<div>{focusedElement.position}</div>
				<ElementController
					bind:element={focusedElement}
					update={updateElementList}
				/>
				{#if focusedElement.type === "text"}
					<TextElementController
						bind:element={focusedElement}
						update={updateElementList}
					/>
				{/if}
			{/if}
		</div>
		<div class="my-auto flex min-w-fit items-center justify-center">
			<div
				class="relative z-0 aspect-video w-[1400px] overflow-hidden"
				style="background: {colorToString($project.background.color) ?? 'white'}"
				bind:this={canvas}
			>
				{#each $project.elements as element}
					<Element
						deleteElement={() => {
							$project.elements = $project.elements.filter((x) => x !== element);
						}}
						bind:focusedElement
						bind:element
						{canvas}
					/>
				{/each}
			</div>
		</div>
	</div>
</div>
