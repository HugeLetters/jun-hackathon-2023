<script lang="ts">
import TextCenter from "$lib/components/icons/TextCenter.svelte";
import TextLeft from "$lib/components/icons/TextLeft.svelte";
import TextRight from "$lib/components/icons/TextRight.svelte";
import type { ElementTypeExtra } from "$lib/type";
import { includes } from "$lib/utils";

import { createRadioGroup, melt } from "@melt-ui/svelte";

type Align = ElementTypeExtra["text"]["align"];
export let value: Align;

const {
	elements: { root, item },
	states: { value: radioValue },
} = createRadioGroup({
	defaultValue: value,
	onValueChange({ next }) {
		if (!includes(options, next)) {
			value = "center";
			return "center";
		}

		value = next;
		return next;
	},
});

const options = ["left", "center", "right"] as const satisfies readonly NonNullable<Align>[];
$: if (value !== $radioValue) {
	$radioValue = value ?? "center";
}
</script>

<div
	use:melt={$root}
	class="contents"
>
	<button
		use:melt={$item(options[0])}
		class="rounded-lg p-1 transition-colors {options[0] === value ? 'bg-zinc-800/20' : ''}"
	>
		<TextLeft class="h-5 w-5" />
	</button>
	<button
		use:melt={$item(options[1])}
		class="rounded-lg p-1 transition-colors {options[1] === value ? 'bg-zinc-800/20' : ''}"
	>
		<TextCenter class="h-5 w-5" />
	</button>
	<button
		use:melt={$item(options[2])}
		class="rounded-lg p-1 transition-colors {options[2] === value ? 'bg-zinc-800/20' : ''}"
	>
		<TextRight class="h-5 w-5" />
	</button>
</div>
