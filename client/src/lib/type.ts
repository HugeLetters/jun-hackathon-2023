export type ElementKind = keyof ElementTypeExtraProps;
export type Position = [x: number, y: number];
export type Size = [w: number, h: number];
export type GradientColor = {
	type: "gradient";
	degree: number;
	colors: [number, number, ...number[]];
};
export type HslColor = { type: "hsl"; color: number; saturation: number; lightness: number };
export type StringColor = { type: "color"; color: string };
export type BgColor = GradientColor | HslColor | StringColor;
export type ElementType<TKind extends ElementKind = ElementKind> = TKind extends TKind
	? {
			type: TKind;
			position: Position;
			size: Size;
			opacity?: number;
	  } & ElementTypeExtraProps[TKind]
	: never;
export type ElementTypeExtraProps = {
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
export type Background = {
	color: BgColor;
	opacity?: number;
};
