/**
 * import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';

interface TranslationType {
	translation: Record<string, string>;
}

export default function updateTranslations(
	key: string,
	endpoint: string,
	location: string,
	fromLang: string,
	toLangs: string[],
	jsonFile: TranslationType,
	folderName: string = 'unicFolderGeneratedTranslations',
) {
	const traducoesDir: string = path.join(__dirname, '..', '..', folderName);

	if (!fs.existsSync(traducoesDir)) {
		fs.mkdirSync(traducoesDir, { recursive: true });
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

	async function translateAndSave(lang: string, existingTranslations: Record<string, string> = {}) {
		const translations: Record<string, string> = {};

		for (const key in translation) {
			// Verifique se a tradução já existe no idioma de destino
			if (!existingTranslations[key]) {
				try {
					console.log('TO FAZENDO UMA REQUISICAO');
					const response = await translateText(translation[key], fromLang, lang);
					const translatedText: string = response.data[0].translations[0].text;
					translations[key] = translatedText;
					console.log(`Translating ${translation[key]} to ${lang} \n\n`);
				} catch (error) {
					if (error instanceof Error) {
						console.error(`Error translating "${key}" to ${lang}: ${error.message} \n`);
					} else {
						console.error(`An error occurred within the error (: \n`);
					}
				}
			} else {
				// A tradução já existe, use a tradução existente
				translations[key] = existingTranslations[key];
			}
		}

		const mergedTranslations = { ...existingTranslations, ...translations };
		return mergedTranslations;
	}

	async function translateAndSaveAll() {
		let existingTranslations: Record<string, string> = {};

		// Load existing translations if the files exist
		for (const lang of toLangs) {
			const filePath = path.join(traducoesDir, `${lang}.json`);
			if (fs.existsSync(filePath)) {
				const fileContent = fs.readFileSync(filePath, 'utf-8');
				const jsonData = JSON.parse(fileContent);
				existingTranslations = { ...existingTranslations, ...jsonData.translation };
			}
		}

		const translationPromises = toLangs.map((lang) => translateAndSave(lang, existingTranslations));

		const mergedTranslations = await Promise.all(translationPromises);

		for (const [index, lang] of toLangs.entries()) {
			const outputFileName = path.join(traducoesDir, `${lang}.json`);
			fs.writeFileSync(
				outputFileName,
				JSON.stringify({ translation: mergedTranslations[index] }, null, 4),
			);
			console.log(`Translations for ${lang} saved in ${outputFileName} \n\n`);
		}
	}

	translateAndSaveAll().catch((error) => {
		console.error(`Error translating and saving texts: ${error.message} \n`);
	});
}

const jsonFile = {
	translation: {
		AAAaddwd: 'AWdD',
		AAAdaad: 'AWjkldD',
		AAasdAawd: 'Hi friend',
		AAasdasd: 'AasdWD',
		AAAasasadwd: 'AasdWD',
		'EAI GAY': 'HELLO GAY',
		haha: 'Hi bro',
	},
};
const key = '50ee9953ce4b4c0cab5e00f08518fe9f'; // THIS CODE NOT WORK, REPLACE YOURS HERE
const endpoint = 'https://api.cognitive.microsofttranslator.com/';
const location = 'eastus2';
const fromLang = 'en';
const toLangs = ['pt', 'es', 'de'];

updateTranslations(key, endpoint, location, fromLang, toLangs, jsonFile);

 */
