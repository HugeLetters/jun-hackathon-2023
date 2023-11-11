<script lang="ts">
import "@fontsource/roboto";
import { QueryClientProvider } from "@tanstack/svelte-query";
import "../app.pcss";

export let data;
</script>

<QueryClientProvider client={data.queryClient}>
	<slot />
</QueryClientProvider>
