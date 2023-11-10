<script lang="ts">
import { api } from "$lib";
import { createQuery } from "@tanstack/svelte-query";
import { createPopover, melt } from "@melt-ui/svelte";
import { fade } from "svelte/transition";
const q = createQuery({
	queryKey: [["root", "get"]],
	queryFn() {
		return api.GET("/");
	},
});

const {
	elements: { trigger, content },
	states: { open },
} = createPopover({
	positioning: { placement: "right-start" },
	forceVisible: true,
});
</script>

<h1>Welcome to SvelteKit - {$q.data?.data?.Greeting}</h1>
<p>
	Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
</p>
<button
	use:melt={$trigger}
	class="p-4 bg-green-500"
>
	popover
</button>
{#if $open}
	<div
		use:melt={$content}
		transition:fade={{ duration: 150 }}
		class="bg-green-300 p-4"
	>
		content
	</div>
{/if}
