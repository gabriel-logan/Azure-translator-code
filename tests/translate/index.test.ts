import axios from "axios";
import dotenv from "dotenv";

import translate, { translateText } from "../../src/translate";
import type { TranslationType } from "../../src/types";

dotenv.config();

describe("translate", () => {
	const key = process.env.KEY as string;
	const endpoint = "https://api.cognitive.microsofttranslator.com/";
	const location = process.env.LOCATION as string;

	const fromLang = "en";
	const toLang = "pt";

	beforeEach(() => {
		jest.clearAllMocks();
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	describe("translateText", () => {
		test("conexion with the API", async () => {
			const spyOnAxios = jest.spyOn(axios, "post");

			const result = await translateText(
				"Welcome",
				fromLang,
				toLang,
				endpoint,
				key,
				location,
			);

			expect(spyOnAxios).toHaveBeenCalled();

			expect(result.data[0].translations[0].text).toEqual("Bem-vindo");
		});
	});

	it("should translate a JSON object from one language to another with welcome msg", async () => {
		jest.spyOn(axios, "post").mockResolvedValue({
			data: [
				{
					translations: [
						{
							text: "Bem-vindo",
						},
					],
				},
			],
		});

		const jsonFile = {
			Welcome: "Welcome",
		};

		const result = await translate(
			key,
			endpoint,
			location,
			fromLang,
			toLang,
			jsonFile as unknown as TranslationType,
		);

		expect(result).toEqual({
			Welcome: "Bem-vindo",
		});
	});

	it("should translate a JSON object from one language to another with nested objects", async () => {
		const spyOnAxios = jest
			.spyOn(axios, "post")
			.mockImplementationOnce(() =>
				Promise.resolve({
					data: [
						{
							translations: [
								{
									text: "Traduza-me",
								},
							],
						},
					],
				}),
			)
			.mockImplementationOnce(() =>
				Promise.resolve({
					data: [
						{
							translations: [
								{
									text: "Traduza-me também",
								},
							],
						},
					],
				}),
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
			toLang,
			jsonFile as unknown as TranslationType,
		);

		expect(spyOnAxios).toHaveBeenCalledTimes(2);

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

	it("should translate a JSON object from one language to another with booleans", async () => {
		const spyOnAxios = jest.spyOn(axios, "post");

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
			toLang,
			jsonFile as unknown as TranslationType,
		);

		expect(spyOnAxios).not.toHaveBeenCalled();

		expect(result).toEqual({
			HomePage: {
				WithBooleans: {
					true: true,
					false: false,
				},
			},
		});
	});

	it("should translate a JSON object from one language to another with fake booleans", async () => {
		jest
			.spyOn(axios, "post")
			.mockImplementationOnce(() =>
				Promise.resolve({
					data: [
						{
							translations: [
								{
									text: "verdadeiro",
								},
							],
						},
					],
				}),
			)
			.mockImplementationOnce(() =>
				Promise.resolve({
					data: [
						{
							translations: [
								{
									text: "falso",
								},
							],
						},
					],
				}),
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
			toLang,
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

	it("should translate a JSON object from one language to another with arrays", async () => {
		jest
			.spyOn(axios, "post")
			.mockImplementationOnce(() =>
				Promise.resolve({
					data: [
						{
							translations: [
								{
									text: "Traduza-me",
								},
							],
						},
					],
				}),
			)
			.mockImplementationOnce(() =>
				Promise.resolve({
					data: [
						{
							translations: [
								{
									text: "Traduza-me também",
								},
							],
						},
					],
				}),
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
			toLang,
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

	it("should translate a JSON object from one language to another with numbers", async () => {
		const spyOnAxios = jest.spyOn(axios, "post");

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
			toLang,
			jsonFile as unknown as TranslationType,
		);

		expect(spyOnAxios).not.toHaveBeenCalled();

		expect(result).toEqual({
			HomePage: {
				WithNumbers: {
					number: 123,
				},
			},
		});
	});

	it("should translate a JSON object from one language to another with null", async () => {
		const spyOnAxios = jest.spyOn(axios, "post");

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
			toLang,
			jsonFile as unknown as TranslationType,
		);

		expect(spyOnAxios).not.toHaveBeenCalled();

		expect(result).toEqual({
			HomePage: {
				WithNull: {
					null: null,
				},
			},
		});
	});
});
