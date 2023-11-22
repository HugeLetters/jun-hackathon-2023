import type { BgColor } from "./type";

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
	orangeRed: { type: "gradient", degree: 0, colors: [0, 30] },
	orangeYellow: { type: "gradient", degree: 60, colors: [30, 60] },
	yellowGreen: { type: "gradient", degree: 120, colors: [60, 120] },
	greenCyan: { type: "gradient", degree: 180, colors: [120, 180] },
	magentaBlue: { type: "gradient", degree: 240, colors: [240, 300] },
	magentaViolet: { type: "gradient", degree: 300, colors: [250, 330] },
} as const satisfies Record<string, BgColor>;

export function randomArrayElement<T>(arr: T[]) {
	return arr[Math.floor(Math.random() * arr.length)]!;
}

export function randomRecordEntry<T>(record: Record<string, T>) {
	return randomArrayElement(Object.values(record));
}

export function includes<T>(arr: readonly T[], value: unknown): value is T {
	return arr.includes(value as T);
}
