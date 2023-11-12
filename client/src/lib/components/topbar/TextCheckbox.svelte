<script lang="ts">
import { createCheckbox, melt } from "@melt-ui/svelte";

export let value: boolean | undefined = undefined;

const {
	elements: { root, input },
	states: { checked },
} = createCheckbox({
	defaultChecked: value ?? false,
	onCheckedChange({ next }) {
		if (next === "indeterminate") return false;

		value = next;
		return next;
	},
});

$: if (value !== $checked) {
	$checked = value ?? false;
}
</script>

<button use:melt={$root}>
	<div
		class="flex h-7 w-7 items-center justify-center rounded-lg p-1 transition-colors
        {$checked ? 'bg-zinc-800/20' : ''}"
	>
		<slot />
	</div>
	<input use:melt={$input} />
</button>
