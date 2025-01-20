import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "fs";
import { v4 as uuidv4 } from "uuid";

import { updateTranslationsMulti, type TranslationType } from "../../src";

describe("updateTranslationsMulti", () => {
	let key: string;
	let endpoint: string;
	let location: string;
	let fromLang: string;
	let toLangs: string[];
	let folderName: string;
	let jsonFile: { [key: string]: string };

	beforeAll(() => {
		key = "YOUR_AZURE_KEY"; // Replace with your Azure API key
		endpoint = "https://api.cognitive.microsofttranslator.com/";
		location = "eastus";
		fromLang = "en";
		toLangs = ["pt"];
		folderName = "physicalTest/update/multiFolderGeneratedTranslations";
		const folderFile = folderName + "/pt";
		const jsonFilePath = folderFile + "/pt.json";

		if (!existsSync(folderName)) {
			mkdirSync(folderName, { recursive: true });
		}

		if (!existsSync(folderFile)) {
			mkdirSync(folderFile, { recursive: true });
		} else {
			rmSync(folderFile, { recursive: true });
			mkdirSync(folderFile, { recursive: true });
		}

		// Write initial JSON file with one key-value pair
		const initialJson = {
			Welcome: "Bem-vindo",
		};
		writeFileSync(jsonFilePath, JSON.stringify(initialJson, null, 2));
	});

	beforeEach(() => {
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

		key = uuidv4(); // Gera uma chave única para cada teste
		jsonFile = {
			[key]: "Welcome",
		};
	});

	it("should translate to multiple folders", async () => {
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

		// Add a delay to ensure the file is created
		await new Promise((resolve) => setTimeout(resolve, 350));

		await updateTranslationsMulti(
			key,
			endpoint,
			location,
			fromLang,
			toLangs,
			jsonFile as unknown as TranslationType,
			folderName,
		);

		const result = readFileSync(folderName + "/pt/pt.json", "utf8");
		const parsedResult = JSON.parse(result);

		expect(parsedResult).toEqual({
			Welcome: "Bem-vindo",
		});
	});

	it("should create folderName if it does not exist", async () => {
		rmSync(folderName, { recursive: true });

		await updateTranslationsMulti(
			key,
			endpoint,
			location,
			fromLang,
			toLangs,
			jsonFile as unknown as TranslationType,
			folderName,
		);

		// Add a delay to ensure the file is created
		await new Promise((resolve) => setTimeout(resolve, 350));

		const result = existsSync(folderName);

		expect(result).toBeTruthy();
	});
});
