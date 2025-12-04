import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
				"hero-gradient":
					"linear-gradient(135deg, rgb(248 250 252) 0%, rgb(241 245 249) 50%, rgb(248 250 252) 100%)",
			},
			height: {
				"85%": "85%",
				106: "26rem",
			},
			maxWidth: {
				"1152px": "1152px",
			},
			animation: {
				"fade-in": "fadeIn 0.3s ease-in-out",
				"slide-up": "slideUp 0.4s ease-out",
				"pulse-subtle": "pulseSubtle 2s ease-in-out infinite",
			},
			keyframes: {
				fadeIn: {
					"0%": { opacity: "0" },
					"100%": { opacity: "1" },
				},
				slideUp: {
					"0%": { opacity: "0", transform: "translateY(10px)" },
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
				pulseSubtle: {
					"0%, 100%": { opacity: "1" },
					"50%": { opacity: "0.8" },
				},
			},
			boxShadow: {
				soft: "0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)",
				"soft-lg":
					"0 10px 40px -10px rgba(0, 0, 0, 0.1), 0 2px 10px -2px rgba(0, 0, 0, 0.04)",
			},
		},
	},
	plugins: [],
};
export default config;
