<script lang="ts">
import type { ElementType } from "$lib/type";

export let element: ElementType;
export let update: () => void;
export let moveLayerUp: () => void;
export let moveLayerDown: () => void;
</script>

<input
	bind:value={element.size[0]}
	on:input={update}
	placeholder="width"
/>
<input
	bind:value={element.size[1]}
	on:input={update}
	placeholder="height"
/>
<input
	bind:value={element.opacity}
	on:input={update}
	placeholder="opacity"
/>
<button on:click={moveLayerUp}>move layer up</button>
<button on:click={moveLayerDown}>move layer down</button>
