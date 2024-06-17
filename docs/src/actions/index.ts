"use server";

import { translate } from "azure-translator-code";
import { TranslationType } from "azure-translator-code/types/types";
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
	const scopedT = await getScopedI18n("Actions");

	const key = process.env.AZURE_API_KEY || "";
	const endpoint = process.env.AZURE_ENDPOINT || "";
	const location = process.env.AZURE_LOCATION || "";

	const toTranslate = formData.get("toTranslate") as string;

	if (!toTranslate) {
		return {
			message: scopedT("makeTranslationMultilang.No text to translate"),
		};
	}

	if (toTranslate.length > 5000) {
		return {
			message: scopedT(
				"makeTranslationMultilang.Text must be less than 5000 characters",
			),
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
			message: scopedT("makeTranslationMultilang.No languages selected"),
		};
	}

	let url = `/translate?api-version=3.0&from=${fromLang ?? "en"}`;
	for (const lang of toLangs) {
		url += `&to=${lang}`;
	}

	let data: any;

	try {
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

		data = await pega.json();
	} catch {
		return {
			message: scopedT(
				"makeTranslationMultilang.Error while translating the text. Please try again.",
			),
		};
	}

	return {
		message: data[0].translations,
	};
}

export async function makeLiveTranslation(prevState: any, formData: FormData) {
	const scopedT = await getScopedI18n("Actions");

	const data = {
		fromLang: formData.get("fromLang"),
		toLang: formData.get("toLang"),
		text: formData.get("textToTranslate"),
	};

	if (!data) {
		return {
			message: scopedT("MakeTranslations.Invalid or missing request body"),
		};
	}

	if (!data?.fromLang || !data.toLang) {
		return {
			message: scopedT("MakeTranslations.From lang and to Lang are required"),
		};
	}

	if (!data?.text) {
		return {
			message: scopedT("MakeTranslations.Translation"),
		};
	}

	const key = process.env.AZURE_API_KEY || ""; // REPLACE WITH YOUR OWN KEY HERE
	const endpoint = process.env.AZURE_ENDPOINT || "";
	const location = process.env.AZURE_LOCATION || "";
	const fromLang = data.fromLang;
	const toLang = data.toLang;
	const text = data.text;

	let translatedText: string;

	try {
		const pega = await fetch(
			`${endpoint}/translate?api-version=3.0&from=${fromLang}&to=${toLang}`,
			{
				method: "POST",
				headers: {
					"Ocp-Apim-Subscription-Key": key,
					"Ocp-Apim-Subscription-Region": location,
					"Content-type": "application/json",
					"X-ClientTraceId": uuidv4().toString(),
				},
				body: JSON.stringify([
					{
						text,
					},
				]),
			},
		);

		const data = await pega.json();

		translatedText = data[0].translations[0].text;

		return {
			message: translatedText,
		};
	} catch {
		return {
			message: scopedT(
				"MakeTranslations.Error while translating the text. Please try again.",
			),
		};
	}
}
