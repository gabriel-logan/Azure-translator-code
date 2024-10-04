import axios from "axios";
import { existsSync, readFileSync, rmSync } from "fs";

import { translateToMultipleFolders, type TranslationType } from "../../src";

describe("translateToMultipleFolders", () => {
	let key: string;
	let endpoint: string;
	let location: string;
	let fromLang: string;
	let toLangs: string[];
	let folderName: string;

	beforeAll(() => {
		key = "YOUR_AZURE_KEY"; // Replace with your Azure API key
		endpoint = "https://api.cognitive.microsofttranslator.com/";
		location = "eastus";
		fromLang = "en";
		toLangs = ["pt"];
		folderName = "physicalTest/create/multiFolderGeneratedTranslations";

		if (existsSync(folderName)) {
			rmSync(folderName, { recursive: true });
		}
	});

	it("should translate to multiple folders", async () => {
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

		await translateToMultipleFolders(
			key,
			endpoint,
			location,
			fromLang,
			toLangs,
			jsonFile as unknown as TranslationType,
			folderName,
		);

		// Add a delay to ensure the file is created
		await new Promise((resolve) => setTimeout(resolve, 250));

		const result = readFileSync(folderName + "/pt/pt.json", "utf8");
		const parsedResult = JSON.parse(result);

		expect(parsedResult).toEqual({
			Welcome: "Bem-vindo",
		});
	});
});
