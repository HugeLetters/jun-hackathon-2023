<script lang="ts">
import Element from "$lib/components/Element.svelte";
import Sidebar from "$lib/components/sidebar/Sidebar.svelte";
import Topbar from "$lib/components/topbar/Topbar.svelte";
import { getLastProjectStore } from "$lib/hooks";
import type { CreateElementFn, ElementType, Position } from "$lib/type";
import { colorToString } from "$lib/utils";

export let data;

let focusedElement: ElementType | null = null;
let canvas: HTMLElement;
$: canvasCenter = ((): Position => {
	if (!canvas) return [0, 0];

	const { width, height } = canvas.getBoundingClientRect();

	return [width / 2, height / 2];
})();

const project = getLastProjectStore();

const createElement: CreateElementFn = (element) => {
	$project.elements.push({
		...element,
		position: [canvasCenter[0] - 50, canvasCenter[1] - 50],
		size: [100, 100],
	});
	$project.elements = $project.elements;
	focusedElement = focusedElement;
};
</script>

<div class="flex min-h-screen">
	<Sidebar
		assets={data.assets}
		{canvas}
		bind:project={$project}
		{createElement}
	/>
	<div class="flex grow flex-col items-center">
		<Topbar
			bind:elementList={$project.elements}
			bind:focusedElement
		/>
		<div class="my-auto flex min-w-fit items-center justify-center bg-white">
			<div
				class="w-canvas drop-shadow-around relative z-0 aspect-video overflow-hidden rounded-lg"
				style="background: {colorToString($project.background)};"
				bind:this={canvas}
			>
				{#each $project.elements as element (element)}
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
		<div class="text-zinc-800">Press Delete on focused element to remove it from canvas</div>
	</div>
</div>
