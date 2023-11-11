<script lang="ts">
import Element from "$lib/components/Element.svelte";
import type { ElementType } from "$lib/type";

let bgColor = "";
let bgGradient = "";

let elementList: ElementType[] = [];
let canvas: HTMLElement;
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
				elementList.push({ position: [50, 50], type: "text" });
				elementList = elementList;
			}}
		>
			add element {elementList[0]?.position.join(", ")}
		</button>
	</div>
	<div class="col-span-4 flex min-w-fit items-center justify-center">
		<div
			class="relative aspect-video h-[512px] overflow-hidden bg-[color:var(--bg-color)] bg-[image:var(--bg-gradient)]"
			style="--bg-color: {bgColor || 'aqua'}; --bg-gradient: {bgGradient}"
			bind:this={canvas}
		>
			{#each elementList as element}
				<Element
					bind:element
					{canvas}
				/>
			{/each}
		</div>
	</div>
</div>
