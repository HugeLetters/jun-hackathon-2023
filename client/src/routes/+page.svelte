<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';

	const q = createQuery({
		queryKey: [1],
		queryFn() {
			return 1;
		}
	});
</script>

<h1>Welcome to SvelteKit - {$q.data}</h1>
<p>
	Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
</p>
