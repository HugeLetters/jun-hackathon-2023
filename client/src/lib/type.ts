export type ElementKind = keyof ElementTypeExtraProps;
export type Position = [x: number, y: number];
export type Size = [w: number, h: number];
export type ElementType<TKind extends ElementKind = ElementKind> = TKind extends TKind
	? {
			type: TKind;
			position: Position;
			size: Size;
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
	shape: { color: string };
	line: {
		color: string;
		points: string[];
	};
};
