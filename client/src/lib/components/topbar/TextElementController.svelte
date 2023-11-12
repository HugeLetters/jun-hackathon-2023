<script lang="ts">
import Bold from "$lib/components/icons/Bold.svelte";
import Italic from "$lib/components/icons/Italic.svelte";
import Minus from "$lib/components/icons/Minus.svelte";
import Paint from "$lib/components/icons/Paint.svelte";
import Plus from "$lib/components/icons/Plus.svelte";
import Underline from "$lib/components/icons/Underline.svelte";
import type { ElementType } from "$lib/type";
import { createPopover, melt } from "@melt-ui/svelte";
import { fade } from "svelte/transition";
import TextAlign from "./TextAlign.svelte";
import TextCheckbox from "./TextCheckbox.svelte";
import TextColorController from "./TextColorController.svelte";

export let element: ElementType<"text">;

const {
	elements: { trigger, content, arrow },
	states: { open },
} = createPopover({
	positioning: { placement: "bottom", fitViewport: true },
	forceVisible: true,
});
</script>

<button use:melt={$trigger}>
	<Paint class="h-5 w-5" />
</button>
{#if $open}
	<div
		use:melt={$content}
		transition:fade={{ duration: 150 }}
		class="drop-shadow-around flex w-64 translate-y-2 flex-col gap-4 rounded-lg bg-white p-4 text-zinc-800"
	>
		<div use:melt={$arrow} />
		<TextColorController
			bind:color={element.color}
			property="color"
			label="Оттенок"
		/>
		<TextColorController
			bind:color={element.color}
			property="saturation"
			label="Насыщенность"
		/>
		<TextColorController
			bind:color={element.color}
			property="lightness"
			label="Яркость"
		/>
	</div>
{/if}
<div
	class="grid h-8 w-24 shrink-0 grid-cols-3 items-center justify-center gap-x-0.5 rounded-lg px-2 leading-[0] outline outline-1 focus-within:outline-2"
>
	<button
		on:click={() => {
			if (element.fontSize <= 0.5) return;
			element.fontSize -= 0.5;
		}}
		class="h-6 w-6 outline-none"
	>
		<Minus class="h-full w-full" />
	</button>
	<div class="text-center text-sm font-semibold">{element.fontSize}</div>
	<button
		on:click={() => {
			if (element.fontSize >= 42) return;
			element.fontSize += 0.5;
		}}
		class="h-6 w-6 outline-none"
	>
		<Plus class="h-full w-full" />
	</button>
</div>
<TextCheckbox bind:value={element.italic}>
	<Italic class="h-full w-full" />
</TextCheckbox>
<TextCheckbox bind:value={element.bold}>
	<Bold class="h-full w-full" />
</TextCheckbox>
<TextCheckbox bind:value={element.underline}>
	<Underline class="h-full w-full" />
</TextCheckbox>
<TextAlign bind:value={element.align} />
