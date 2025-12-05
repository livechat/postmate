import pkg from "../package.json" assert { type: "json" };

const { author, description, homepage, license, name, version } = pkg;

const loose = true;

const babelSetup = {
	babelrc: false,
	presets: [["@babel/preset-env", { modules: false, loose }]],
	plugins: [["@babel/plugin-transform-class-properties", { loose }]],
	exclude: "node_modules/**",
};

const banner = `/**
  ${name} - ${description}
  @version v${version}
  @link ${homepage}
  @author ${author}
  @license ${license}
**/`;

export { babelSetup, banner, name, version };
