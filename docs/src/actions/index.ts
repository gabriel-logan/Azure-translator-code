"use server";

import { translate } from "azure-translator-code";
import { TranslationType } from "azure-translator-code/types/translate";
import { v4 as uuidv4 } from "uuid";

import { getScopedI18n } from "@/locales/server";
import { Langs } from "@/types/locales";

// Cache to store translations
const translationCache: { [key: string]: TranslationType } = {};

export async function makeTranslation(prevState: any, formData: FormData) {
	const scopedT = await getScopedI18n("Actions");

	const data = {
		fromLang: formData.get("fromLang"),
		toLang: formData.get("toLang"),
		jsonFileText: formData.get("jsonfile"),
	};

	// Cache key
	const cacheKey = `${data.fromLang}-${data.toLang}-${data.jsonFileText}`;

	// Check if the translation is in the cache
	if (translationCache[cacheKey]) {
		return {
			message: translationCache[cacheKey],
		};
	}

	if (!data) {
		return {
			message: scopedT("MakeTranslations.Invalid or missing request body"),
		};
	}

	if ((data.jsonFileText as string).length > 4999) {
		return {
			message: scopedT(
				"MakeTranslations.Text must be less than 5000 characters",
			),
		};
	}

	if (!data?.fromLang || !data.toLang) {
		return {
			message: scopedT("MakeTranslations.From lang and to Lang are required"),
		};
	}

	if (!data?.jsonFileText) {
		return {
			message: scopedT("MakeTranslations.Missing json file text"),
		};
	}

	const key = process.env.AZURE_API_KEY || ""; // REPLACE WITH YOUR OWN KEY HERE
	const endpoint = process.env.AZURE_ENDPOINT || "";
	const location = process.env.AZURE_LOCATION || "";
	const fromLang = data.fromLang;
	const toLang = data.toLang;

	let translatedValues: TranslationType;

	const valuesToTranslate = data.jsonFileText;

	try {
		translatedValues = await translate(
			key,
			endpoint,
			location,
			fromLang as string,
			toLang as string,
			JSON.parse(valuesToTranslate as string) as TranslationType,
		);
	} catch {
		return {
			message: scopedT("MakeTranslations.Invalid json text passed"),
		};
	}

	// Save the translation in the cache
	translationCache[cacheKey] = translatedValues;

	return {
		message: translatedValues,
	};
}

export async function makeTranslationMultilang(
	prevState: any,
	formData: FormData,
) {
	const key = process.env.AZURE_API_KEY || "";
	const endpoint = process.env.AZURE_ENDPOINT || "";
	const location = process.env.AZURE_LOCATION || "";

	const toTranslate = formData.get("toTranslate") as string;

	if (!toTranslate) {
		return {
			message: "No text to translate",
		};
	}

	const fromLang = formData.get("fromLang") as string;

	const languageCodes: Langs[] = [
		"en",
		"pt",
		"es",
		"de",
		"fr",
		"it",
		"ja",
		"ko",
		"ru",
		"zh",
		"ar",
		"tr",
		"vi",
		"th",
		"sv",
		"pl",
		"nl",
		"da",
		"fi",
		"no",
		"cs",
		"hu",
		"el",
		"id",
		"ms",
	];

	const toLangs = languageCodes.filter((code) => formData.get(code) === "on");

	if (!toLangs.length) {
		return {
			message: "No languages selected",
		};
	}

	let url = `/translate?api-version=3.0&from=${fromLang ?? "en"}`;
	for (const lang of toLangs) {
		url += `&to=${lang}`;
	}

	const pega = await fetch(endpoint + url, {
		method: "POST",
		headers: {
			"Ocp-Apim-Subscription-Key": key,
			"Ocp-Apim-Subscription-Region": location,
			"Content-type": "application/json",
			"X-ClientTraceId": uuidv4().toString(),
		},
		body: JSON.stringify([
			{
				text: toTranslate,
			},
		]),
	});

	const data = await pega.json();

	return {
		message: data[0].translations,
	};
}
