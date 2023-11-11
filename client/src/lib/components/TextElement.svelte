<script lang="ts">
import type { ElementType } from "$lib/type";

export let element: ElementType<"text">;
</script>

<textarea
	bind:value={element.content}
	class="h-full w-full resize-none overflow-hidden bg-transparent outline-none"
	style="text-align: {element.align ?? 'center'};"
/>
