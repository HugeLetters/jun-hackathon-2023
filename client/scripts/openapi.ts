import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import generateOpenApiTypes, { type OpenAPI3 } from "openapi-typescript";

generateOpenApi();
async function generateOpenApi() {
	const spec = await getOpenApiSpec().catch(console.error);
	if (!spec) return;

	const types = await generateOpenApiTypes(spec);
	writeFile("./src/lib/openapi.d.ts", types)
		.then(() => {
			console.log("Sucessfully saved openapi.d.ts file");
		})
		.catch((e) => {
			console.error(e);
			console.error("Error while trying to write openapi.d.ts file");
		});
}

function getOpenApiSpec() {
	return readFile(fileURLToPath(import.meta.resolve("../../server/openapi.json")), {
		encoding: "utf-8",
	})
		.then<OpenAPI3>(JSON.parse)
		.catch(console.error);
}
