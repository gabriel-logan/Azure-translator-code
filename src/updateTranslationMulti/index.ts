import CircularJSON from "circular-json";
import * as fs from "fs";
import * as path from "path";

import translate from "../translate";
import translateToMultipleFolders from "../translateToMultipleFolders";
import type { TranslationType } from "../types";

/**
 * @param key Your key from azure translator, something like: 'sds12312a213aaaa9b2d0c37eds37b'
 * @param endpoint The endpoint: 'https://api.cognitive.microsofttranslator.com/'
 * @param location Ex. 'eastus'
 * @param fromLang Ex. 'en'
 * @param toLangs Ex. [
												'pt',
												'de',
												'es',
												'fr',
												'it',
												'ja',
												'ko',
												'nl',
												'ru',
												'zh',
												'pt-pt',
												'ar',
												'tlh-Latn'
											];
 * @param jsonFile
 * It must be a valid JSON object:
 *
 * {
			"translation": {
				"welcome": "Welcome",
				"hello": "Hello",
				"good_morning": "Good morning",
				"good_afternoon": "Good afternoon",
				"good_evening": "Good evening",
				"thank_you": "Thank you",
				"please": "Please",
				"yes": "Yes",
				"no": "No",
				"error_message": "An error occurred"
			}
		}
 *
 * @description This function checks the json with the already existing translations and adds only the non-existing translations to the file, this serves to save data.
 * Otherwise it works the same as the other 2 functions
 *
 * 	@param [folderNamePath='multiFolderGeneratedTranslations'] If it is undefined, it will be associated by default: multiFolderGeneratedTranslations
		You can use this like: 'myfoldername' or 'myfoldername/otherfolder' or './myfoldername/etcfolder'
		@IMPORTANT Saving always starts from the project root folder.
		@return {void} This function will return a folder called folder multiFolderGeneratedTranslations in root folder or YourChoice
 */
export default function updateTranslationsMulti(
	key: string,
	endpoint: string,
	location: string,
	fromLang: string,
	toLangs: string[],
	jsonFile: TranslationType,
	folderNamePath: string = "multiFolderGeneratedTranslations", // Onde sera salvo os arquivos
): void {
	const traducoesDir: string = path.join(process.cwd(), folderNamePath);

	if (!fs.existsSync(traducoesDir)) {
		fs.mkdirSync(traducoesDir, { recursive: true });
	}

	async function translateAndUpdate(lang: string, obj: TranslationType) {
		const langDir = path.join(traducoesDir, lang);
		const outputFileName = path.join(langDir, `${lang}.json`);

		let existingTranslations: TranslationType = {};

		if (fs.existsSync(outputFileName)) {
			const rawData = fs.readFileSync(outputFileName, "utf8");
			existingTranslations = JSON.parse(rawData);
		}

		const translations = await translate(
			key,
			endpoint,
			location,
			fromLang,
			[lang],
			obj,
		);

		const updatedTranslations = { ...existingTranslations, ...translations };

		fs.writeFileSync(
			outputFileName,
			JSON.stringify(updatedTranslations, null, 4),
		);

		// eslint-disable-next-line no-console
		console.log(`Translations for ${lang} saved in ${outputFileName} \n\n`);

		return translations;
	}

	async function translateAndSaveAll() {
		const translationPromises = toLangs.map(async (lang) => {
			const langDir = path.join(traducoesDir, lang);

			const outputFileName = path.join(langDir, `${lang}.json`);

			const missingTranslation: TranslationType = {};

			if (fs.existsSync(outputFileName)) {
				const rawData = fs.readFileSync(outputFileName, "utf8");

				for (const [key, value] of Object.entries(jsonFile)) {
					if (!rawData.includes(key)) {
						missingTranslation[key] = value;
					}
				}
			} else {
				return await translateToMultipleFolders(
					key,
					endpoint,
					location,
					fromLang,
					[lang],
					jsonFile,
					folderNamePath,
				);
			}

			return await translateAndUpdate(lang, missingTranslation);
		});

		await Promise.all(translationPromises);

		// eslint-disable-next-line no-console
		console.log("All translations updated successfully!");
	}

	translateAndSaveAll().catch((error) => {
		// eslint-disable-next-line no-console
		console.error(
			`Error translating and saving texts: ${CircularJSON.stringify(error)} \n`,
		);
	});
}
