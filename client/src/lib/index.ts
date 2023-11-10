import { browser } from '$app/environment';
import { PUBLIC_ENV, PUBLIC_IS_DOCKER } from '$env/static/public';
import type { paths } from '$lib/openapi'; // generated from openapi-typescript
import createClient from 'openapi-fetch';

const isProd = PUBLIC_ENV === 'prod';
const baseUrl = browser
	? ''
	: PUBLIC_IS_DOCKER
	? isProd
		? 'http://0.0.0.0:80'
		: 'http://proxy:80'
	: isProd
	? 'http://0.0.0.0:4444'
	: 'http://localhost:4444';

export const api = createClient<paths>({ baseUrl: `${baseUrl}/api` });
