<script lang="ts">
import Element from "$lib/components/Element.svelte";
import type { ElementType } from "$lib/type";

let bgColor = "";
let bgGradient = "";

let elementList: ElementType[] = [];
let canvas: HTMLElement;
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
				elementList.push({ position: [50, 50], type: "text" });
				elementList = elementList;
			}}
		>
			add element {elementList[0]?.position.join(", ")}
		</button>
	</div>
	<div class="col-span-4 flex items-center justify-center min-w-fit">
		<div
			class="relative bg-[color:var(--bg-color)] bg-[image:var(--bg-gradient)] aspect-video h-[512px]"
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
