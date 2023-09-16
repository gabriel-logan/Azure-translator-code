import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';

interface TranslationType {
	translation: Record<string, string>;
}

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
 * It must follow the following structure:
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
		If you need, copy this structure to get better then make your modification
 *
		@param [folderNamePath='multiFolderGeneratedTranslations'] If it is undefined, it will be associated by default: multiFolderGeneratedTranslations
		You can use this like: 'myfoldername' or 'myfoldername/otherfolder' or './myfoldername/etcfolder'
		@IMPORTANT Saving always starts from the project root folder.
		@description This function will return a folder called folder multiFolderGeneratedTranslations in root folder or YourChoice
 */
export default function translateToMultipleFolders(
	key: string,
	endpoint: string,
	location: string,
	fromLang: string,
	toLangs: string[],
	jsonFile: TranslationType,
	folderNamePath: string = 'multiFolderGeneratedTranslations', // Onde sera salvo os arquivos
) {
	const traducoesDir: string = path.join(__dirname, '..', '..', '..', '..', folderNamePath);

	if (!fs.existsSync(traducoesDir)) {
		fs.mkdirSync(traducoesDir, { recursive: true }); // Use { recursive: true } para criar pastas recursivamente, se necessário
	}

	const { translation } = jsonFile;

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

	async function translateAndSave(lang: string) {
		const translations: Record<string, string> = {};

		for (const key in translation) {
			try {
				const response = await translateText(translation[key], fromLang, lang);
				const translatedText = response.data[0].translations[0].text;
				translations[key] = translatedText;
				console.log(`Translating ${translation[key]} to ${lang} \n\n`);
			} catch (error) {
				if (error instanceof Error) {
					console.error(`Error translating "${key}" to ${lang}: ${error.message} \n`);
				} else {
					console.error(`An error occurred within the error (: \n`);
				}
			}
		}

		const langDir = path.join(traducoesDir, lang);

		if (!fs.existsSync(langDir)) {
			fs.mkdirSync(langDir);
		}

		const outputFileName = path.join(langDir, `${lang}.json`);
		fs.writeFileSync(outputFileName, JSON.stringify({ translation: translations }, null, 4));
		console.log(`Translations for ${lang} saved in ${outputFileName} \n\n`);
	}

	async function translateAndSaveAll() {
		const translationPromises = toLangs.map((lang) => translateAndSave(lang));

		await Promise.all(translationPromises);
	}

	translateAndSaveAll().catch((error) => {
		console.error(`Error translating and saving texts: ${error.message} \n`);
	});
}
