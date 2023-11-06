import { browser } from '$app/environment';
import { PUBLIC_IS_DOCKER } from '$env/static/public';
import type { paths } from '$lib/openapi'; // generated from openapi-typescript
import createClient from 'openapi-fetch';

const baseUrl = browser
	? undefined
	: PUBLIC_IS_DOCKER
	? 'http://client:80'
	: 'http://localhost:4444';

export const api = createClient<paths>({ baseUrl });
