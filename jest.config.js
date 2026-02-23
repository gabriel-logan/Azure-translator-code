/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
	preset: "ts-jest",
	testEnvironment: "node",
	modulePathIgnorePatterns: ["<rootDir>/docs/", "<rootDir>/dist/"],
	setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
};
