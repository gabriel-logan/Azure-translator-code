import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import type { TranslationType } from '../types';

async function translateText(
	text: string,
	from: string,
	to: string,
	endpoint: string,
	key: string,
	location: string,
) {
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

/**
 * Translates a JSON object from one language to another using the Azure Translator service.
 * @param key - The Azure Translator subscription key.
 * @param endpoint - The Azure Translator endpoint URL.
 * @param location - The Azure Translator subscription region.
 * @param fromLang - The language code of the source language.
 * @param toLang - The language code of the target language.
 * @param jsonFile - The JSON object to be translated.
 * @returns A Promise that resolves to the translated JSON object.
 */
export default async function translate(
	key: string,
	endpoint: string,
	location: string,
	fromLang: string,
	toLang: string,
	jsonFile: TranslationType,
): Promise<TranslationType> {
	const translatedJson: TranslationType = {};

	for (const [jsonKey, jsonValue] of Object.entries(jsonFile)) {
		if (typeof jsonValue === 'string') {
			const response = await translateText(jsonValue, fromLang, toLang, endpoint, key, location);
			translatedJson[jsonKey] = response.data[0].translations[0].text;
		} else {
			translatedJson[jsonKey] = await translate(
				key,
				endpoint,
				location,
				fromLang,
				toLang,
				jsonValue,
			);
		}
	}

	return translatedJson;
}
