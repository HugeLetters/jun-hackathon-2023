export const prerender = true;

import { readdir } from "node:fs/promises";

export function load() {
	return { assets: readdir("static") };
}
