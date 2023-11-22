<script lang="ts">
import { createPopover, createSlider, melt } from "@melt-ui/svelte";
import { fade } from "svelte/transition";

export let label: string;
export let value: number;

const {
	elements: { trigger, content, arrow },
	states: { open },
} = createPopover({
	positioning: { placement: "bottom", fitViewport: true },
	forceVisible: true,
});
const {
	elements: { range, root, thumb },
} = createSlider({
	defaultValue: [100],
	onValueChange({ next }) {
		value = next[0] ?? value;
		return next;
	},
	min: 0,
	max: 500,
});
</script>

<button
	use:melt={$trigger}
	class="h-8 rounded-lg p-1 outline outline-1 focus-within:outline-2">{label}</button
>

{#if $open}
	<div
		use:melt={$content}
		transition:fade={{ duration: 150 }}
		class="drop-shadow-around flex w-96 gap-4 rounded-lg bg-white p-4 text-zinc-800"
	>
		<div class="w-14">{value ?? 0}px</div>
		<div use:melt={$arrow} />
		<div
			use:melt={$root}
			class="relative flex w-full items-center"
		>
			<div class="block h-1 w-full rounded-full bg-zinc-800">
				<div
					use:melt={$range}
					class="h-1"
				/>
			</div>
			<button
				use:melt={$thumb()}
				class="transition-[left] focus-within:transition-none"
			>
				<div class="aspect-square h-5 w-5 rounded-full bg-zinc-500" />
			</button>
		</div>
	</div>
{/if}
