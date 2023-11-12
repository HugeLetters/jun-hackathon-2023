<script lang="ts">
import Jpg from "$lib/components/icons/Jpg.svelte";
import Pdf from "$lib/components/icons/Pdf.svelte";
import Png from "$lib/components/icons/Png.svelte";
import Upload from "$lib/components/icons/Upload.svelte";
import { turn } from "$lib/hooks";
import { createPopover, melt } from "@melt-ui/svelte";
import { toJpeg, toPng } from "html-to-image";
import { jsPDF } from "jspdf";

export let canvas: HTMLElement;

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

function exportPdf() {
	const { width, height } = canvas.getBoundingClientRect();
	const doc = new jsPDF({ orientation: "landscape", format: [width, height] });
	doc.html(canvas, {
		callback(doc) {
			doc.deletePage(doc.getNumberOfPages());
			doc.save("./project.pdf");
		},
	});
}
function exportImage(type: SupportedImage) {
	getConverter(type)(canvas).then((image) => {
		const anchor = document.createElement("a");
		anchor.href = image;
		anchor.download = `project.${type}`;
		anchor.click();
	});
}

const {
	elements: { trigger, content },
	states: { open },
} = createPopover({
	positioning: { placement: "right-start" },
	forceVisible: true,
});
</script>

<button
	use:melt={$trigger}
	class="w-full text-zinc-200"
>
	<div
		class="w-full origin-left rounded-full px-4 py-2 transition-colors {$open ? 'bg-zinc-600' : ''}"
	>
		<Upload class="mx-auto h-5 w-5" />
	</div>
	<span class="whitespace-nowrap text-xs font-semibold">Экспорт</span>
</button>
{#if $open}
	<div
		use:melt={$content}
		transition:turn={{ duration: 150, offsetOrigin: 15, rotateTo: 50 }}
		class="grid translate-x-5 grid-cols-3 gap-4 rounded-lg bg-neutral-900 p-4"
	>
		<button on:click={exportPdf}>
			<Pdf class="h-7 w-7" />
			<span class="block pt-2 text-sm"> PDF </span>
		</button>
		<button on:click={() => exportImage("png")}>
			<Png class="h-7 w-7" />
			<span class="block pt-2 text-sm"> PNG </span>
		</button>
		<button on:click={() => exportImage("jpg")}>
			<Jpg class="h-7 w-7" />
			<span class="block pt-2 text-sm"> JPG </span>
		</button>
	</div>
{/if}
