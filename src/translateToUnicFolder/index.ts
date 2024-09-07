import axios from "axios";
import * as fs from "fs";
import * as path from "path";
import { v4 as uuidv4 } from "uuid";

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
		@param [folderNamePath='unicFolderGeneratedTranslations'] If it is undefined, it will be associated by default: unicFolderGeneratedTranslations
		You can use this like: 'myfoldername' or 'myfoldername/otherfolder' or './myfoldername/etcfolder'
		@IMPORTANT Saving always starts from the project root folder.
		@return {void} This function will return a folder called folder unicFolderGeneratedTranslations in root folder or YourChoice
 */
export default function translateToUnicFolder(
	key: string,
	endpoint: string,
	location: string,
	fromLang: string,
	toLangs: string[],
	jsonFile: TranslationType,
	folderNamePath: string = "unicFolderGeneratedTranslations", // Onde sera salvo os arquivos
): void {
	const traducoesDir: string = path.join(process.cwd(), folderNamePath);

	if (!fs.existsSync(traducoesDir)) {
		fs.mkdirSync(traducoesDir, { recursive: true }); // Use { recursive: true } para criar pastas recursivamente, se necessário
	}

	function translateText(text: string, from: string, to: string) {
		return axios({
			baseURL: endpoint,
			url: "/translate",
			method: "post",
			headers: {
				"Ocp-Apim-Subscription-Key": key,
				"Ocp-Apim-Subscription-Region": location,
				"Content-type": "application/json",
				"X-ClientTraceId": uuidv4().toString(),
			},
			params: {
				"api-version": "3.0",
				from,
				to,
			},
			data: [
				{
					text,
				},
			],
			responseType: "json",
		});
	}

	async function translateAndSave(lang: string, obj: TranslationType) {
		const translations: Record<string, unknown> = {};

		for (const key in obj) {
			if (typeof obj[key] === "object" && obj[key] !== null) {
				const nestedTranslations = await translateAndSave(
					lang,
					obj[key] as TranslationType,
				);
				translations[key] = nestedTranslations;
			} else {
				try {
					const response = await translateText(
						obj[key] as string,
						fromLang,
						lang,
					);
					const translatedText = response.data[0].translations[0].text;
					translations[key] = translatedText;
					console.log(`Translating ${obj[key]} to ${lang} \n\n`);
				} catch (error) {
					if (error instanceof Error) {
						console.error(
							`Error translating "${key}" to ${lang}: ${error.message} \n`,
						);
					} else {
						console.error(`An error occurred within the error (: \n`);
					}
				}
			}
		}

		const outputFileName = path.join(traducoesDir, `${lang}.json`);
		fs.writeFileSync(outputFileName, JSON.stringify(translations, null, 4));
		console.log(`Translations for ${lang} saved in ${outputFileName} \n\n`);

		return translations;
	}

	async function translateAndSaveAll() {
		const translationPromises = toLangs.map((lang) =>
			translateAndSave(lang, jsonFile),
		);

		await Promise.all(translationPromises);
	}

	translateAndSaveAll().catch((error) => {
		console.error(`Error translating and saving texts: ${error.message} \n`);
	});
}
