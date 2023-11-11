export type ElementKind = "text" | "image" | "shape" | "line";
export type Position = [x: number, y: number];
export type ElementType = {
	type: ElementKind;
	position: Position;
};

export type Boundary = [left: number, top: number, right: number, bottom: number];
