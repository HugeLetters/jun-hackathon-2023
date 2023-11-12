<script lang="ts">
import type { ElementType } from "$lib/type";

export let element: ElementType;
export let moveLayerUp: () => void;
export let moveLayerDown: () => void;
</script>

<input
	bind:value={element.size[0]}
	placeholder="width"
/>
<input
	bind:value={element.size[1]}
	placeholder="height"
/>
<input
	bind:value={element.opacity}
	placeholder="opacity"
/>
<button on:click={moveLayerUp}>move layer up</button>
<button on:click={moveLayerDown}>move layer down</button>
