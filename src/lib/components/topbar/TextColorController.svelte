<script lang="ts">
import type { HslColor } from "$lib/type";
import { COLORS } from "$lib/utils";
import { createSlider, melt } from "@melt-ui/svelte";

export let color: HslColor;
export let property: Exclude<keyof HslColor, "type">;
export let label: string;

const {
	elements: { range, root, thumb },
	states: { value: rangeValue },
} = createSlider({
	defaultValue: [color.type === "hsl" ? color[property] ?? 0 : 0],
	onValueChange({ next }) {
		const [value] = next;
		if (value === undefined) return next;
		else if (color.type === "hsl") color[property] = value;
		else color = { ...COLORS.white, [property]: value };

		return next;
	},
	min: 0,
	max: property === "color" ? 360 : 100,
});
$: if ($rangeValue[0] !== color[property]) {
	$rangeValue = [color[property] ?? 0];
}
</script>

<label>
	<span>{label}</span>
	<div
		use:melt={$root}
		class="relative flex h-14 w-full items-center"
	>
		<div
			class="block h-1 w-full rounded-full {property === 'color'
				? 'bg-[linear-gradient(90deg,hsl(0,100%,50%)_0%,hsl(51,100%,50%)_14%,hsl(103,100%,50%)_28%,hsl(154,100%,50%)_42%,hsl(205,100%,50%)_57%,hsl(257,100%,50%)_71%,hsl(308,100%,50%)_85%,hsl(360,100%,50%)_100%)]'
				: 'bg-gradient-to-r from-neutral-700 to-neutral-200'}"
		>
			<div
				use:melt={$range}
				class="h-1"
			/>
		</div>
		<button
			use:melt={$thumb()}
			class="transition-[left] focus-within:transition-none"
		>
			<div
				class="aspect-square h-5 w-5 rounded-full bg-purple-300"
				style="{property === 'color'
					? `background-color: hsl(${$rangeValue[0] ?? 0} 100% 50%);`
					: ''} "
			/>
		</button>
	</div>
</label>
