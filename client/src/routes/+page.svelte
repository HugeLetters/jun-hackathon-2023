<script lang="ts">
import Element from "$lib/components/Element.svelte";
import ElementController from "$lib/components/ElementController.svelte";
import TextElementController from "$lib/components/TextElementController.svelte";
import Sidebar from "$lib/components/sidebar/Sidebar.svelte";
import { getLastProjectStore } from "$lib/hooks";
import type { ElementType } from "$lib/type";
import { colorToString } from "$lib/utils";

export let data;

const project = getLastProjectStore();

let focusedElement: ElementType | null = null;
let canvas: HTMLElement;

function updateElementList() {
	$project = $project;
}
</script>

<div class="flex min-h-screen">
	<Sidebar
		assets={data.assets}
		{canvas}
		bind:project={$project}
	/>
	<div class="flex grow flex-col items-center p-4">
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
		<div class="my-auto flex min-w-fit items-center justify-center bg-white">
			<div
				class="relative z-0 aspect-video w-[1400px] overflow-hidden"
				style="background: {colorToString($project.background)};"
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
