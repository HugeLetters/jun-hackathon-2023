<script lang="ts">
import Element from "$lib/components/Element.svelte";
import ElementController from "$lib/components/ElementController.svelte";
import TextElementController from "$lib/components/TextElementController.svelte";
import { getLastProjectStore } from "$lib/hooks";
import type { ElementType } from "$lib/type";
import { toJpeg, toPng } from "html-to-image";
import { jsPDF } from "jspdf";

export let data;

let bgColor = "";
let bgGradient = "";

const elementList = getLastProjectStore();

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
	$elementList = $elementList;
}
</script>

<div class="grid min-h-screen grid-cols-5">
	<div class="flex flex-col bg-neutral-400 p-2">
		UI
		<input
			bind:value={bgColor}
			placeholder="bg color"
		/>
		<input
			bind:value={bgGradient}
			placeholder="bg gradient"
		/>
		<button
			on:click={() => {
				const { width, height } = canvas.getBoundingClientRect();

				$elementList.push({
					position: [width / 2, height / 2],
					type: "text",
					color: "black",
					font: "ui-serif",
					content: "new",
					weight: 100,
					fontSize: 1,
					size: [100, 100],
				});
				$elementList = $elementList;
			}}
		>
			add element
		</button>
		<button
			on:click={() => {
				const { width, height } = canvas.getBoundingClientRect();
				const doc = new jsPDF({ orientation: "landscape", format: [width, height] });

				// canvas.querySelectorAll("[data-type=text][href]").forEach((el) => {
				// 	if (!(el instanceof HTMLElement)) return;
				// 	doc.textWithLink("this is link", 20, 20, {
				// 		url: el.getAttribute("href"),
				// 	});
				// 	console.log(el.getAttribute("href"));
				// 	console.log(el["clientWidth"]);
				// });
				// doc.textWithLink("this is link", 20, 20, {
				// 	url: "https://www.youtube.com/feed/subscriptions",
				// });
				doc.html(canvas, {
					callback(doc) {
						doc.deletePage(doc.getNumberOfPages());
						doc.save("./project.pdf");
					},
					// html2canvas: {
					// ignoreElements(element) {
					// return false;
					// return element.getAttribute("data-type") === "text" && !!element.getAttribute("href");
					// },
					// },
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
				$elementList = [];
			}}
		>
			clear
		</button>
		<div class="grid grid-cols-2">
			{#each data.assets as asset}
				<button
					on:click={() => {
						$elementList.push({
							type: "image",
							src: asset,
							position: [0, 0],
							size: [100, 100],
						});
						$elementList = $elementList;
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
	<div class="col-span-4 flex flex-col">
		<div>
			header ui
			{#if focusedElement}
				<div>{focusedElement.position}</div>
				<ElementController
					element={focusedElement}
					update={updateElementList}
				/>
				{#if focusedElement.type === "text"}
					<TextElementController
						element={focusedElement}
						update={updateElementList}
					/>
				{/if}
			{/if}
		</div>
		<div class="my-auto flex min-w-fit items-center justify-center">
			<div
				class="relative z-0 aspect-video h-[512px] overflow-hidden bg-[color:var(--bg-color)] bg-[image:var(--bg-gradient)]"
				style="--bg-color: {bgColor || 'aqua'}; --bg-gradient: {bgGradient}"
				bind:this={canvas}
			>
				{#each $elementList as element}
					<Element
						deleteElement={() => {
							$elementList = $elementList.filter((x) => x !== element);
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
