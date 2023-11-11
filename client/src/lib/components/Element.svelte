<script lang="ts">
import { createDrag } from "$lib/hooks";
import type { Boundary, ElementType } from "$lib/type";

export let element: ElementType;
export let virtualBoundary: Boundary;
// export

const { drag, position } = createDrag({ initialPosition: element.position });
</script>

<button
	class="absolute left-[var(--left)] top-[var(--top)]"
	style="--left: {$position[0]}px; --top: {$position[1]}px"
	use:drag={{ boundary: virtualBoundary }}
>
	{element.type}
</button>
