<script lang="ts">
import type { ElementTypeExtra } from "$lib/type";

export let element: ElementTypeExtra["image"];
</script>

<img
	src={element.src}
	alt=""
	class="h-full w-full object-fill"
/>
