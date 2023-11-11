<script lang="ts">
import type { BgColor, HslColor } from "$lib/type";
import { createSlider, melt } from "@melt-ui/svelte";

export let color: BgColor;
export let property: Exclude<keyof HslColor, "type">;
export let label: string;

const {
	elements: { range, root, thumb },
	states: { value: rangeValue },
} = createSlider({
	defaultValue: [color.type === "hsl" ? color[property] : 0],
	onValueChange({ next }) {
		const [value] = next;
		if (value === undefined) return next;

		if (color.type === "hsl") color[property] = value;
		else color = { type: "hsl", color: 0, lightness: 50, saturation: 100, [property]: value };

		return next;
	},
	min: 0,
	max: property === "color" ? 360 : 100,
});
</script>

<label>
	<span>{label}</span>
	<div
		use:melt={$root}
		class="relative flex h-14 w-56 items-center"
	>
		<div
			class="block h-1 w-full rounded-full {property === 'color'
				? 'bg-[linear-gradient(90deg,red,orange,yellow,green,blue,purple,red)]'
				: 'bg-gradient-to-r from-neutral-700 to-white'}"
		>
			<div
				use:melt={$range}
				class="h-1"
			/>
		</div>
		<button use:melt={$thumb()}>
			<div
				class="aspect-square h-5 w-5 rounded-full bg-purple-300"
				style="{property === 'color'
					? `background-color: hsl(${$rangeValue[0] ?? 0} 100% 50%);`
					: ''} "
			/>
		</button>
	</div>
</label>
