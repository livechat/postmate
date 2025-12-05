import { babelSetup, banner } from "./config.js";
import { babel } from "@rollup/plugin-babel";
import replace from "@rollup/plugin-replace";
import terser from "@rollup/plugin-terser";
import pkg from "../package.json" assert { type: "json" };

const ensureArray = maybeArr =>
	Array.isArray(maybeArr) ? maybeArr : [maybeArr];

const createConfig = ({ output, env } = {}) => {
	const umd = output.format === "umd";

	if (umd && typeof env === "undefined") {
		throw new Error("You need to specify `env` when using umd format.");
	}

	const min = umd && env === "production";

	return {
		input: "src/index.js",
		plugins: [
			babel({
				...babelSetup,
				babelHelpers: "bundled",
			}),

			env &&
				replace({
					preventAssignment: true,
					values: {
						"process.env.NODE_ENV": JSON.stringify(env),
					},
				}),

			min &&
				terser({
					format: {
						comments: (node, comment) => {
							const text = comment.value;
							const type = comment.type;
							if (type === "comment2") {
								// multiline comment
								return /@preserve|@license|@cc_on/i.test(text);
							}
						},
					},
				}),
		].filter(Boolean),

		output: ensureArray(output).map(format =>
			Object.assign({}, format, {
				banner,
				name: "Postmate",
			})
		),
	};
};

export default [
	createConfig({
		output: [
			{ file: pkg.main, format: "cjs" },
			{ file: pkg.module, format: "es" },
		],
	}),

	createConfig({
		output: {
			file: "build/postmate.min.js",
			format: "umd",
		},
		env: "production",
	}),

	createConfig({
		output: {
			file: "build/postmate.dev.js",
			format: "umd",
		},
		env: "development",
	}),
];
