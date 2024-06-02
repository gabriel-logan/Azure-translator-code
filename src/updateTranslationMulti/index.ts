import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';
import type { TranslationType } from '../types';

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
	folderNamePath: string = 'multiFolderGeneratedTranslations', // Onde sera salvo os arquivos
): void {
	const traducoesDir: string = path.join(__dirname, '..', '..', '..', '..', folderNamePath);

	if (!fs.existsSync(traducoesDir)) {
		fs.mkdirSync(traducoesDir, { recursive: true });
	}

	function translateText(text: string, from: string, to: string) {
		return axios({
			baseURL: endpoint,
			url: '/translate',
			method: 'post',
			headers: {
				'Ocp-Apim-Subscription-Key': key,
				'Ocp-Apim-Subscription-Region': location,
				'Content-type': 'application/json',
				'X-ClientTraceId': uuidv4().toString(),
			},
			params: {
				'api-version': '3.0',
				from: from,
				to: to,
			},
			data: [
				{
					text: text,
				},
			],
			responseType: 'json',
		});
	}

	async function translateAndSave(
		lang: string,
		obj: TranslationType,
		existingTranslations: TranslationType,
		currentPath: string = '',
	) {
		const translations: Record<string, unknown> = existingTranslations;

		for (const key in obj) {
			const newPath = currentPath ? `${currentPath}.${key}` : key;

			if (typeof obj[key] === 'object' && obj[key] !== null) {
				const nestedTranslations = await translateAndSave(
					lang,
					obj[key] as TranslationType,
					(existingTranslations[key] || {}) as TranslationType,
					newPath,
				);
				translations[key] = nestedTranslations;
			} else {
				if (!translations[key]) {
					try {
						const response = await translateText(obj[key] as string, fromLang, lang);
						const translatedText = response.data[0].translations[0].text;
						translations[key] = translatedText;
						console.log(`Translating ${obj[key]} to ${lang} \n\n`);
					} catch (error) {
						if (error instanceof Error) {
							console.error(`Error translating "${newPath}" to ${lang}: ${error.message} \n`);
						} else {
							console.error(`An error occurred within the error (: \n`);
						}
					}
				}
			}
		}

		const langDir = path.join(traducoesDir, lang);

		if (!fs.existsSync(langDir)) {
			fs.mkdirSync(langDir);
		}

		const outputFileName = path.join(langDir, `${lang}.json`);
		fs.writeFileSync(outputFileName, JSON.stringify(translations, null, 4));
		console.log(`Translations for ${lang} saved in ${outputFileName} \n\n`);

		return translations;
	}

	async function translateAndSaveAll() {
		const translationPromises = toLangs.map(async (lang) => {
			const langDir = path.join(traducoesDir, lang);
			const outputFileName = path.join(langDir, `${lang}.json`);

			let existingTranslations: TranslationType = {};
			if (fs.existsSync(outputFileName)) {
				const rawData = fs.readFileSync(outputFileName, 'utf8');
				existingTranslations = JSON.parse(rawData);
			}

			return translateAndSave(lang, jsonFile, existingTranslations);
		});

		await Promise.all(translationPromises);
	}

	translateAndSaveAll().catch((error) => {
		console.error(`Error translating and saving texts: ${error.message} \n`);
	});
}
