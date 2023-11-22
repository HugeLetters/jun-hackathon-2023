import { readdir } from "node:fs/promises";

export function load() {
	readdir(".").then(console.log);
	readdir("/").then(console.log);

	return { assets: readdir("static") };
}
