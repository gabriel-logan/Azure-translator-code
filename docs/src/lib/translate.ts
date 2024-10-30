import type { JSONValue, TranslationType } from "@/types/translations";

import { translateText } from "./translateText";

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

	const translations = response[0].translations;

	const translatedValues = translations.map((translation: any) => {
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
