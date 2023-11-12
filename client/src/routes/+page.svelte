<script lang="ts">
import Element from "$lib/components/Element.svelte";
import Sidebar from "$lib/components/sidebar/Sidebar.svelte";
import Topbar from "$lib/components/topbar/Topbar.svelte";
import { getLastProjectStore } from "$lib/hooks";
import type { ElementType } from "$lib/type";
import { colorToString } from "$lib/utils";

export let data;

const project = getLastProjectStore();

function createElement(element: ElementType) {
	$project.elements.push(element);
	$project.elements = $project.elements;
	focusedElement = focusedElement;
}

let focusedElement: ElementType | null = null;
let canvas: HTMLElement;
</script>

<div class="flex min-h-screen">
	<Sidebar
		assets={data.assets}
		{canvas}
		bind:project={$project}
		{createElement}
	/>
	<div class="flex grow flex-col items-center p-4">
		<Topbar
			bind:elementList={$project.elements}
			bind:focusedElement
		/>
		<div class="my-auto flex min-w-fit items-center justify-center bg-white">
			<div
				class="w-canvas relative z-0 aspect-video overflow-hidden"
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
	</div>
</div>
