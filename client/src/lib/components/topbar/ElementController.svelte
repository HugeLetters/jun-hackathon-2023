<script lang="ts">
import Arrows from "$lib/components/icons/Arrows.svelte";
import Up from "$lib/components/icons/Up.svelte";
import Down from "$lib/components/icons/Down.svelte";
import type { ElementType } from "$lib/type";
import OpacityPopover from "./OpacityPopover.svelte";
import SizePopover from "./SizePopover.svelte";

export let element: ElementType;
export let moveLayerUp: () => void;
export let moveLayerDown: () => void;
</script>

<SizePopover
	label="Ширина"
	bind:value={element.size[0]}
/>
<Arrows class="h-6 w-6 shrink-0" />
<SizePopover
	label="Высота"
	bind:value={element.size[1]}
/>
<OpacityPopover bind:value={element.opacity} />
<button on:click={moveLayerUp}><Up class="h-7 w-7" /></button>
<button on:click={moveLayerDown}><Down class="h-7 w-7" /></button>
