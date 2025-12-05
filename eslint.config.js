import js from "@eslint/js";
import globals from "globals";

export default [
	{
		ignores: ["build/**/*", "node_modules/**/*", "assets/**/*", "configs/**/*"],
	},
	{
		files: ["src/**/*.{js,mjs,cjs}", "scripts/**/*.{js,mjs,cjs}"],
		languageOptions: {
			sourceType: "module",
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
		rules: {
			...js.configs.recommended.rules,
		},
	},
	{
		files: ["test/**/*.{js,mjs,cjs}"],
		languageOptions: {
			sourceType: "module",
			globals: {
				...globals.browser,
				...globals.node,
				...globals.jest,
			},
		},
		rules: {
			...js.configs.recommended.rules,
		},
	},
];
