export type ElementKind = keyof ElementTypeExtra;
export type Position = [x: number, y: number];
export type Size = [w: number, h: number];
export type GradientColor = {
	type: "gradient";
	degree: number;
	colors: readonly [number, number, ...number[]];
};
export type HslColor = { type: "hsl"; color: number; saturation: number; lightness: number };
export type BgColor = (GradientColor | HslColor) & { opacity?: number };
export type ElementType<TKind extends ElementKind = ElementKind> = TKind extends TKind
	? {
			type: TKind;
			position: Position;
			size: Size;
			opacity?: number;
	  } & ElementTypeExtra[TKind]
	: never;
export type ElementTypeExtra = {
	text: {
		content: string;
		href?: string;
		color: string;
		weight: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
		italic?: boolean;
		fontSize: number;
		align?: "left" | "center" | "right";
		underline?: boolean;
		font: string;
	};
	image: { src: string };
	shape: { subtype: "circle" | "triangle" | "square"; color: BgColor };
	line: {
		color: string;
		points: string[];
	};
};
export type SavedProject = {
	background: BgColor;
	elements: ElementType[];
};
