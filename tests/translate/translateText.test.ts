/**
 * @jest-environment jsdom
 */

import { translateText } from "../../src";

describe("translateText", () => {
	let fromLang: string;
	let toLangs: string[];
	let endpoint: string;
	let key: string;
	let location: string;

	beforeAll(() => {
		fromLang = "en";
		toLangs = ["pt"];
		endpoint = "https://api.cognitive.microsofttranslator.com/translate";
		key = "12345";
		location = "eastus";
	});

	it("window.fetch is defined and should be called", async () => {
		global.fetch = jest.fn(() =>
			Promise.resolve({
				json: () =>
					Promise.resolve({
						translations: [
							{
								text: "Bem-vindo",
							},
						],
					}),
			}),
		) as jest.Mock;

		const result: any = await translateText(
			"Welcome",
			fromLang,
			toLangs,
			endpoint,
			key,
			location,
		);

		expect(result.translations[0].text).toEqual("Bem-vindo");
	});
});
