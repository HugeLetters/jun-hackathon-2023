<script lang="ts">
import type { ElementType } from "$lib/type";

export let element: ElementType<"image">;
</script>

<img
	src={element.src}
	draggable="false"
	alt=""
	class="h-full w-full object-fill"
/>
