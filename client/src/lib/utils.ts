import type { BgColor, HslColor } from "./type";

export function clamp(min: number, value: number, max: number) {
	return Math.max(min, Math.min(value, max));
}

export function colorToString(color: BgColor) {
	switch (color.type) {
		case "gradient":
			return `linear-gradient(${color.degree}deg, ${color.colors
				.map((hue) => `hsla(${hue} 100% 50%  / ${100 - (color.opacity ?? 0)}%)`)
				.join(", ")})`;
		case "hsl":
			return `hsl(${color.color} ${color.saturation}% ${color.lightness}% / ${
				100 - (color.opacity ?? 0)
			}%)`;
		default: {
			const x: never = color;
			return x;
		}
	}
}

export const COLORS = {
	white: { type: "hsl", color: 0, lightness: 100, saturation: 0 },
	black: { type: "hsl", color: 0, lightness: 0, saturation: 100 },
	red: { type: "hsl", color: 0, lightness: 50, saturation: 100 },
	orange: { type: "hsl", color: 30, lightness: 50, saturation: 100 },
	yellow: { type: "hsl", color: 60, lightness: 50, saturation: 100 },
	green: { type: "hsl", color: 120, lightness: 50, saturation: 100 },
	blue: { type: "hsl", color: 200, lightness: 60, saturation: 100 },
	darkblue: { type: "hsl", color: 230, lightness: 50, saturation: 100 },
	purple: { type: "hsl", color: 280, lightness: 20, saturation: 100 },
} as const satisfies Record<string, HslColor>;
