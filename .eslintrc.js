module.exports = {
	root: true,
	extends: ["universe/node"],
	ignorePatterns: [
		".eslintrc.js",
		"jest.config.js",
		"dist",
		"/types/",
		"geraTraducoes.js",
		"setupTests.js",
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: './tsconfig.json',
		tsconfigRootDir: __dirname,
	},
	rules: {
		"no-console": "warn",
		"@typescript-eslint/consistent-type-imports": "error",
		"@typescript-eslint/consistent-type-exports": "error",
	},
};
