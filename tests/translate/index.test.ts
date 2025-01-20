import translate from "../../src/translate";
import translateText from "../../src/translate/translateText";
import type { TranslationType } from "../../src/types";

describe("translate", () => {
	const key = "YOUR_AZURE_KEY"; // Replace with your Azure API key
	const endpoint = "https://api.cognitive.microsofttranslator.com/";
	const location = "eastus";

	const fromLang = "en";
	const toLangs = ["pt"];

	beforeEach(() => {
		jest.clearAllMocks();
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	describe("translateText", () => {
		it("should return the translated text", async () => {
			const spyOnFetch = jest.spyOn(global, "fetch").mockResolvedValue({
				json: async () => [
					{
						translations: [
							{
								text: "Bem-vindo",
							},
						],
					},
				],
			} as Response);

			const result = await translateText(
				"Welcome",
				fromLang,
				toLangs,
				endpoint,
				key,
				location,
			);

			expect(spyOnFetch).toHaveBeenCalled();

			expect(result[0].translations[0].text).toEqual("Bem-vindo");
		});
	});

	describe("translate", () => {
		describe("translateValue", () => {
			it("should throw an error if invalid JSON object is passed", async () => {
				jest.spyOn(global, "fetch").mockResolvedValue({
					json: async () => [
						{
							translations: [
								{
									text: "Bem-vindo",
								},
							],
						},
					],
				} as Response);

				const jsonFile = {
					Welcome: "Welcome",
					invalid: undefined,
				};

				await expect(
					translate(
						key,
						endpoint,
						location,
						fromLang,
						toLangs,
						jsonFile as unknown as TranslationType,
					),
				).rejects.toThrow("Invalid JSON value");
			});

			describe("translateString", () => {
				it("should translate a JSON object from one language to another with welcome msg", async () => {
					jest.spyOn(global, "fetch").mockResolvedValue({
						json: async () => [
							{
								translations: [
									{
										text: "Bem-vindo",
									},
								],
							},
						],
					} as Response);

					const jsonFile = {
						Welcome: "Welcome",
					};

					const result = await translate(
						key,
						endpoint,
						location,
						fromLang,
						toLangs,
						jsonFile as unknown as TranslationType,
					);

					expect(result).toEqual({
						Welcome: "Bem-vindo",
					});
				});

				it("should return an array with multiple translations", async () => {
					jest.spyOn(global, "fetch").mockResolvedValue({
						json: async () => [
							{
								translations: [
									{
										text: "Bem-vindo",
									},
									{
										text: "Olá",
									},
								],
							},
						],
					} as Response);

					const jsonFile = {
						Welcome: "Welcome",
					};

					const result = await translate(
						key,
						endpoint,
						location,
						fromLang,
						["pt", "es"],
						jsonFile as unknown as TranslationType,
					);

					expect(result).toEqual({
						Welcome: ["Bem-vindo", "Olá"],
					});
				});
			});
			describe("translateArray", () => {
				it("should translate a JSON object from one language to another with arrays", async () => {
					jest
						.spyOn(global, "fetch")
						.mockImplementationOnce(() =>
							Promise.resolve({
								json: async () => [
									{
										translations: [
											{
												text: "Traduza-me",
											},
										],
									},
								],
							} as Response),
						)
						.mockImplementationOnce(() =>
							Promise.resolve({
								json: async () => [
									{
										translations: [
											{
												text: "Traduza-me também",
											},
										],
									},
								],
							} as Response),
						);

					const jsonFile = {
						HomePage: {
							WithArrays: {
								array: ["Translate me", "Translate me too"],
							},
						},
					};

					const result = await translate(
						key,
						endpoint,
						location,
						fromLang,
						toLangs,
						jsonFile as unknown as TranslationType,
					);

					expect(result).toEqual({
						HomePage: {
							WithArrays: {
								array: ["Traduza-me", "Traduza-me também"],
							},
						},
					});
				});

				it("should translate a JSON object with arrays and if elements are not strings", async () => {
					jest
						.spyOn(global, "fetch")
						.mockImplementationOnce(() =>
							Promise.resolve({
								json: async () => [
									{
										translations: [
											{
												text: "verdadeiro",
											},
										],
									},
								],
							} as Response),
						)
						.mockImplementationOnce(() =>
							Promise.resolve({
								json: async () => [
									{
										translations: [
											{
												text: false,
											},
										],
									},
								],
							} as Response),
						);

					const jsonFile = {
						HomePage: {
							WithArrays: {
								array: ["true", false],
							},
						},
					};

					const result = await translate(
						key,
						endpoint,
						location,
						fromLang,
						toLangs,
						jsonFile as unknown as TranslationType,
					);

					expect(result).toEqual({
						HomePage: {
							WithArrays: {
								array: ["verdadeiro", false],
							},
						},
					});
				});
			});
			describe("translateObject", () => {
				it("should translate a JSON object from one language to another with nested objects", async () => {
					const spyOnFetch = jest
						.spyOn(global, "fetch")
						.mockImplementationOnce(() =>
							Promise.resolve({
								json: async () => [
									{
										translations: [
											{
												text: "Traduza-me",
											},
										],
									},
								],
							} as Response),
						)
						.mockImplementationOnce(() =>
							Promise.resolve({
								json: async () => [
									{
										translations: [
											{
												text: "Traduza-me também",
											},
										],
									},
								],
							} as Response),
						);

					const jsonFile = {
						HomePage: {
							Nested: {
								message: "Translate me",
								SubNested: {
									message: "Translate me too",
								},
							},
						},
					};

					const result = await translate(
						key,
						endpoint,
						location,
						fromLang,
						toLangs,
						jsonFile as unknown as TranslationType,
					);

					expect(spyOnFetch).toHaveBeenCalledTimes(2);

					expect(result).toEqual({
						HomePage: {
							Nested: {
								message: "Traduza-me",
								SubNested: {
									message: "Traduza-me também",
								},
							},
						},
					});
				});

				it("should translate a JSON object from one language to another with fake booleans", async () => {
					jest
						.spyOn(global, "fetch")
						.mockImplementationOnce(() =>
							Promise.resolve({
								json: async () => [
									{
										translations: [
											{
												text: "verdadeiro",
											},
										],
									},
								],
							} as Response),
						)
						.mockImplementationOnce(() =>
							Promise.resolve({
								json: async () => [
									{
										translations: [
											{
												text: "falso",
											},
										],
									},
								],
							} as Response),
						);

					const jsonFile = {
						HomePage: {
							WithFakeBooleans: {
								true: "true",
								false: "false",
							},
						},
					};

					const result = await translate(
						key,
						endpoint,
						location,
						fromLang,
						toLangs,
						jsonFile as unknown as TranslationType,
					);

					expect(result).toEqual({
						HomePage: {
							WithFakeBooleans: {
								true: "verdadeiro",
								false: "falso",
							},
						},
					});
				});
			});

			describe("translateBool or numbers", () => {
				it("should translate a JSON object from one language to another with booleans", async () => {
					const spyOnFetch = jest.spyOn(global, "fetch");

					const jsonFile = {
						HomePage: {
							WithBooleans: {
								true: true as unknown as string,
								false: false as unknown as string,
							},
						},
					};

					const result = await translate(
						key,
						endpoint,
						location,
						fromLang,
						toLangs,
						jsonFile as unknown as TranslationType,
					);

					expect(spyOnFetch).not.toHaveBeenCalled();

					expect(result).toEqual({
						HomePage: {
							WithBooleans: {
								true: true,
								false: false,
							},
						},
					});
				});

				it("should translate a JSON object from one language to another with numbers", async () => {
					const spyOnFetch = jest.spyOn(global, "fetch");

					const jsonFile = {
						HomePage: {
							WithNumbers: {
								number: 123,
							},
						},
					};

					const result = await translate(
						key,
						endpoint,
						location,
						fromLang,
						toLangs,
						jsonFile as unknown as TranslationType,
					);

					expect(spyOnFetch).not.toHaveBeenCalled();

					expect(result).toEqual({
						HomePage: {
							WithNumbers: {
								number: 123,
							},
						},
					});
				});
			});

			describe("translateNull", () => {
				it("should translate a JSON object from one language to another with null", async () => {
					const spyOnFetch = jest.spyOn(global, "fetch");

					const jsonFile = {
						HomePage: {
							WithNull: {
								null: null,
							},
						},
					};

					const result = await translate(
						key,
						endpoint,
						location,
						fromLang,
						toLangs,
						jsonFile as unknown as TranslationType,
					);

					expect(spyOnFetch).not.toHaveBeenCalled();

					expect(result).toEqual({
						HomePage: {
							WithNull: {
								null: null,
							},
						},
					});
				});
			});
		});
	});
});
