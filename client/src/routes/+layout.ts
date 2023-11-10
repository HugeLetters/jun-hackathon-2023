import { browser } from '$app/environment';
import { api } from '$lib';
import { QueryClient } from '@tanstack/svelte-query';

export async function load() {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser
			}
		}
	});

	await queryClient.prefetchQuery({
		queryKey: [['root', 'get']],
		queryFn() {
			return api.GET('/');
		}
	});

	return { queryClient };
}
