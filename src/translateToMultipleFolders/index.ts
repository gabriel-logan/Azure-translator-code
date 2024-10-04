import * as fs from "fs";
import * as path from "path";

import translate from "../translate";
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
		@param [folderNamePath='multiFolderGeneratedTranslations'] If it is undefined, it will be associated by default: multiFolderGeneratedTranslations
		You can use this like: 'myfoldername' or 'myfoldername/otherfolder' or './myfoldername/etcfolder'
		@IMPORTANT Saving always starts from the project root folder.
		@return {void} This function will return a folder called folder multiFolderGeneratedTranslations in root folder or YourChoice
 */
export default function translateToMultipleFolders(
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

	async function translateAndSave(lang: string) {
		const langDir = path.join(traducoesDir, lang);

		if (!fs.existsSync(langDir)) {
			fs.mkdirSync(langDir, { recursive: true });
		}

		const translations = await translate(
			key,
			endpoint,
			location,
			fromLang,
			[lang],
			jsonFile,
		);

		const outputFileName = path.join(langDir, `${lang}.json`);

		fs.writeFileSync(outputFileName, JSON.stringify(translations, null, 4), {
			encoding: "utf8",
		});

		// eslint-disable-next-line no-console
		console.log(`Translations for ${lang} saved in ${outputFileName} \n\n`);

		return translations;
	}

	async function translateAndSaveAll() {
		const translationPromises = toLangs.map(
			async (lang) => await translateAndSave(lang),
		);

		await Promise.all(translationPromises);

		// eslint-disable-next-line no-console
		console.log("All translations saved successfully!");
	}

	translateAndSaveAll().catch((error) => {
		// eslint-disable-next-line no-console
		console.error(`Error translating and saving texts: ${error.message} \n`);
	});
}
