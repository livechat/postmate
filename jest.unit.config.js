export default {
	testMatch: ["<rootDir>/test/unit/**/*.js"],
	testEnvironment: "jest-environment-jsdom",
	testEnvironmentOptions: {
		url: "http://localhost/",
	},
	moduleFileExtensions: ["js", "mjs", "cjs"],
	collectCoverage: true,
	coverageDirectory: "<rootDir>/coverage/unit",
	coverageReporters: ["text", "lcov"],
	testPathIgnorePatterns: ["/node_modules/", "/build/"],
};
