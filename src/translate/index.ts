import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import type { JSONValue, TranslationType } from "../types";

interface Translation {
	text: TranslationType;
	to: TranslationType;
}

interface TranslationResponse {
	translations: Translation[];
}

type TranslateResponseData = TranslationResponse[];

/**
 *
 * @param text
 * @param from
 * @param to
 * @param endpoint
 * @param key
 * @param location
 * @returns A Promise that resolves to the translated text.
 * @example
 * from: "en"
 * to: ["es", "fr"]
 *
 * translateText("Hello", "en", ["es", "fr"], "https://api.cognitive.microsofttranslator.com", "key", "location")
 *
 * Returns: [ { text: 'Hola', to: 'es' }, { text: 'Bonjour', to: 'fr' } ]
 */
export async function translateText(
	text: string,
	from: string,
	to: string[],
	endpoint: string,
	key: string,
	location: string,
) {
	const filteredEndpoint = endpoint.replace(/\/$/, "");

	const toDestructured = to.map((lang) => `to=${lang}`).join("&");

	const url = `${filteredEndpoint}/translate?api-version=3.0&from=${from}&${toDestructured}`;

	const response = await axios.post<TranslateResponseData>(
		url,
		[
			{
				text,
			},
		],
		{
			headers: {
				"Ocp-Apim-Subscription-Key": key,
				"Ocp-Apim-Subscription-Region": location,
				"Content-type": "application/json",
				"X-ClientTraceId": uuidv4().toString(),
			},
		},
	);

	return response;
}

/**
 * Translates a JSON object from one language to another using the Azure Translator service.
 * @param key - The Azure Translator subscription key.
 * @param endpoint - The Azure Translator endpoint URL.
 * @param location - The Azure Translator subscription region.
 * @param fromLang - The language code of the source language.
 * @param toLangs - The languages code of the target languages.
 * @param jsonFile - The JSON object to be translated.
 * @returns A Promise that resolves to the translated JSON object.
 *
 * @example
 * const json = {
    hello: "Hello",
   };
 *
 * translate("key", "https://api.cognitive.microsofttranslator.com", "location", "en", ["pt", "es"], json);
 *
 * Returns: { hello: [ 'Olá', 'Hola' ] }
 */
export default async function translate(
	key: string,
	endpoint: string,
	location: string,
	fromLang: string,
	toLangs: string[],
	jsonFile: TranslationType,
) {
	const translatedJson: TranslationType = {};
	const isArrayBigerThanOne = toLangs.length > 1;

	for (const [jsonKey, jsonValue] of Object.entries(jsonFile)) {
		translatedJson[jsonKey] = await translateValue(
			jsonValue,
			key,
			endpoint,
			location,
			fromLang,
			toLangs,
			isArrayBigerThanOne,
		);
	}

	return translatedJson;
}

async function translateValue(
	value: JSONValue,
	key: string,
	endpoint: string,
	location: string,
	fromLang: string,
	toLangs: string[],
	isArrayBigerThanOne: boolean,
): Promise<JSONValue> {
	if (isInvalidJSONValue(value)) {
		throw new Error("Invalid JSON value");
	}

	if (isNotNeedToTranslate(value)) {
		return value;
	} else if (isString(value)) {
		return await translateString(
			value,
			key,
			endpoint,
			location,
			fromLang,
			toLangs,
			isArrayBigerThanOne,
		);
	} else if (isArray(value)) {
		return await translateArray(
			value,
			key,
			endpoint,
			location,
			fromLang,
			toLangs,
			isArrayBigerThanOne,
		);
	} else if (isObjectNotNull(value)) {
		return await translate(
			key,
			endpoint,
			location,
			fromLang,
			toLangs,
			value as TranslationType,
		);
	} else {
		return null;
	}
}

async function translateString(
	value: string,
	key: string,
	endpoint: string,
	location: string,
	fromLang: string,
	toLangs: string[],
	isArrayBigerThanOne: boolean,
): Promise<JSONValue> {
	const response = await translateText(
		value,
		fromLang,
		toLangs,
		endpoint,
		key,
		location,
	);

	const translations = response.data[0].translations;

	const translatedValues = translations.map((translation) => {
		return translation.text;
	});

	return isArrayBigerThanOne ? translatedValues : translatedValues[0];
}

async function translateArray(
	array: JSONValue[],
	key: string,
	endpoint: string,
	location: string,
	fromLang: string,
	toLangs: string[],
	isArrayBigerThanOne: boolean,
): Promise<JSONValue[]> {
	const translatedArray: (TranslationType | TranslationType[])[] = [];
	for (const item of array) {
		if (typeof item === "string") {
			const translatedItem = await translateString(
				item,
				key,
				endpoint,
				location,
				fromLang,
				toLangs,
				isArrayBigerThanOne,
			);
			if (translatedItem !== null) {
				translatedArray.push(
					translatedItem as TranslationType | TranslationType[],
				);
			}
		} else {
			translatedArray.push(item as TranslationType);
		}
	}
	return translatedArray;
}

function isObjectNotNull(value: JSONValue): value is Record<string, JSONValue> {
	return typeof value === "object" && value !== null;
}

function isString(value: JSONValue): value is string {
	return typeof value === "string";
}

function isArray(value: JSONValue): value is JSONValue[] {
	return Array.isArray(value);
}

function isNotNeedToTranslate(value: JSONValue): boolean {
	const types = ["number", "boolean"];

	return types.includes(typeof value);
}

function isInvalidJSONValue(value: JSONValue): value is never {
	const invalidTypes = ["function", "symbol", "undefined"];

	return invalidTypes.includes(typeof value);
}
