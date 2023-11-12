import { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		extend: {
			fontFamily: {
				roboto: ["Roboto", ...defaultTheme.fontFamily.sans],
			},
			dropShadow: {
				around: "0 0 3px rgb(0 0 0 / 0.4)",
			},
			width: {
				canvas: "1400px",
			},
		},
	},
	plugins: [],
} satisfies Config;
