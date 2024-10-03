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

/**
 * Translates a JSON object from one language to another using the Azure Translator service.
 * @param key - The Azure Translator subscription key.
 * @param endpoint - The Azure Translator endpoint URL.
 * @param location - The Azure Translator subscription region.
 * @param fromLang - The language code of the source language.
 * @param toLang - The languages code of the target languages.
 * @param jsonFile - The JSON object to be translated.
 * @returns A Promise that resolves to the translated JSON object.
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
		if (isInvalidJSONValue(jsonValue)) {
			throw new Error("Invalid JSON value");
		}

		if (isNotNeedToTranslate(jsonValue)) {
			translatedJson[jsonKey] = jsonValue;
		} else if (isString(jsonValue)) {
			const response = await translateText(
				jsonValue,
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

			translatedJson[jsonKey] = isArrayBigerThanOne
				? translatedValues
				: translatedValues[0];
		} else if (isArray(jsonValue)) {
			const translatedArray: (TranslationType | TranslationType[])[] = [];
			for (const item of jsonValue) {
				if (typeof item === "string") {
					const response = await translateText(
						item,
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

					translatedArray.push(
						isArrayBigerThanOne ? translatedValues : translatedValues[0],
					);
				} else {
					translatedArray.push(item as TranslationType);
				}
			}

			translatedJson[jsonKey] = translatedArray;
		} else if (isObjectNotNull(jsonValue)) {
			const response = await translate(
				key,
				endpoint,
				location,
				fromLang,
				toLangs,
				jsonValue as TranslationType,
			);

			translatedJson[jsonKey] = response;
		} else {
			translatedJson[jsonKey] = null;
		}
	}

	return translatedJson;
}
