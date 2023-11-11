<script lang="ts">
import type { ElementType } from "$lib/type";

export let element: ElementType<"image">;
</script>

<img
	src={element.src}
	alt=""
	class="h-full w-full object-fill"
/>
