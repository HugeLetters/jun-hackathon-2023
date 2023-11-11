<script lang="ts">
import Element from "$lib/components/Element.svelte";
import type { Boundary, ElementType } from "$lib/type";

const BOUNDARY: Boundary = [0, 0, 1000, 1000];

let bgColor = "";
let bgGradient = "";

let elementList: ElementType[] = [];
</script>

<div class="min-h-screen grid grid-cols-5">
	<div class="bg-neutral-400 flex flex-col p-2">
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
				elementList.push({ position: [BOUNDARY[2] / 2, BOUNDARY[3] / 2], type: "text" });
				elementList = elementList;
			}}
		>
			add element
		</button>
	</div>
	<div
		class="relative col-span-4 bg-[color:var(--bg-color)] bg-[image:var(--bg-gradient)]"
		style="--bg-color: {bgColor}; --bg-gradient: {bgGradient}"
	>
		{#each elementList as element}
			<Element
				{element}
				virtualBoundary={BOUNDARY}
			/>
		{/each}
	</div>
</div>
