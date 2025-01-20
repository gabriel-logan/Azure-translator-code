import randomString from "../../src/randomString";

describe("randomString", () => {
	it("should return a random string", () => {
		const generateRandomString = randomString();

		expect(typeof generateRandomString).toBe("string");
		expect(generateRandomString).not.toBeNull();
		expect(generateRandomString).not.toBeUndefined();
		expect(generateRandomString).not.toBe("");
		expect(generateRandomString.trim()).not.toBe("");
	});
});
