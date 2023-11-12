<script lang="ts">
import Opacity from "$lib/components/icons/Opacity.svelte";
import { createPopover, createSlider, melt } from "@melt-ui/svelte";
import { fade } from "svelte/transition";

export let value: number | undefined = undefined;

const {
	elements: { trigger, content, arrow },
	states: { open },
} = createPopover({
	positioning: { placement: "bottom", fitViewport: true },
	forceVisible: true,
});
const {
	elements: { range, root, thumb },
	states: { value: rangeValue },
} = createSlider({
	defaultValue: [+(value ?? 1)],
	onValueChange({ next }) {
		const [newVal] = next;
		value = newVal ?? value;
		return next;
	},
	min: 0,
	max: 1,
	step: 0.01,
});
$: if (value && $rangeValue[0] !== value) {
	$rangeValue = [value];
}
</script>

<button
	use:melt={$trigger}
	class="flex h-8 w-8 shrink-0 items-center rounded-lg p-1.5 outline outline-1 first-letter:justify-center focus-within:outline-2"
>
	<Opacity class="h-full w-full" />
</button>

{#if $open}
	<div
		use:melt={$content}
		transition:fade={{ duration: 150 }}
		class="drop-shadow-around flex w-96 gap-4 rounded-lg bg-white p-4 text-zinc-800"
	>
		<div class="w-14">{Math.round((value ?? 1) * 100)}</div>
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
