import type { BgColor } from "./type";

export function clamp(min: number, value: number, max: number) {
	return Math.max(min, Math.min(value, max));
}

export function colorToString(color: BgColor) {
	switch (color.type) {
		case "gradient":
			return `linear-gradient(${color.degree}deg, ${color.colors
				.map((color) => `hsl(${color} 100% 50%)`)
				.join(", ")})`;
		case "hsl":
			return `hsl(${color.color} ${color.saturation}% ${color.lightness}%)`;
		case "color":
			return color.color;
		default: {
			const x: never = color;
			return x;
		}
	}
}
