<script lang="ts">
import Shape from "$lib/components/icons/Shape.svelte";
import { turn } from "$lib/hooks";
import type { ElementTypeExtra, Position, SavedProject } from "$lib/type";
import { COLORS, randomRecordEntry } from "$lib/utils";
import { createPopover, melt } from "@melt-ui/svelte";
import ShapeElement from "../ShapeElement.svelte";

export let elements: SavedProject["elements"];
export let canvasCenter: Position;

const shapes: Array<ElementTypeExtra["shape"]["subtype"]> = ["circle", "square", "triangle"];

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
		<Shape class="mx-auto h-5 w-5" />
	</div>
	<span class="whitespace-nowrap text-xs font-semibold">Фигура</span>
</button>
{#if $open}
	<div
		use:melt={$content}
		transition:turn={{ duration: 150, offsetOrigin: 15, rotateTo: 50 }}
		class="grid translate-x-5 grid-cols-3 gap-4 rounded-lg bg-neutral-900 p-4"
	>
		{#each shapes as shape}
			<button
				on:click={() => {
					elements.push({
						type: "shape",
						subtype: shape,
						position: canvasCenter,
						color: { ...COLORS.black },
						size: [100, 100],
					});
					elements = elements;
					$open = false;
				}}
				class="h-6 w-6"
			>
				<ShapeElement element={{ subtype: shape, color: randomRecordEntry(COLORS) }} />
			</button>
		{/each}
	</div>
{/if}
