"use server";

import { translate, translateText } from "azure-translator-code";

import { getScopedI18n } from "@/locales/server";

const key = process.env.AZURE_API_KEY ?? "";
const endpoint = process.env.AZURE_ENDPOINT ?? "";
const location = process.env.AZURE_LOCATION ?? "";

export async function makeTranslation(prevState: any, formData: FormData) {
	const scopedT = await getScopedI18n("Actions");

	const data = {
		fromLang: formData.get("fromLang"),
		toLang: formData.get("toLang"),
		jsonFileText: formData.get("jsonfile"),
	};

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

	const fromLang = data.fromLang as string;
	const toLang = data.toLang as string;
	const toLangs = [toLang];
	const valuesToTranslate = data.jsonFileText;

	try {
		const translatedValues = await translate(
			key,
			endpoint,
			location,
			fromLang,
			toLangs,
			JSON.parse(valuesToTranslate as string),
		);

		return {
			message: translatedValues,
		};
	} catch {
		return {
			message: scopedT("MakeTranslations.Invalid json text passed"),
		};
	}
}

export async function makeTranslationMultilang(
	prevState: any,
	formData: FormData,
) {
	const scopedT = await getScopedI18n("Actions");

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
	const toLangs: string[] = [];

	formData.forEach((value, key) => {
		if (value === "on" && key !== "fromLang" && key !== "toTranslate") {
			toLangs.push(key);
		}
	});

	if (!toLangs.length) {
		return {
			message: scopedT("makeTranslationMultilang.No languages selected"),
		};
	}

	try {
		const data = await translateText(
			toTranslate,
			fromLang,
			toLangs,
			endpoint,
			key,
			location,
		);

		return {
			message: data[0].translations,
		};
	} catch {
		return {
			message: scopedT(
				"makeTranslationMultilang.Error while translating the text. Please try again.",
			),
		};
	}
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

	if (typeof data.text === "string" && data.text.length > 1000) {
		return {
			message: scopedT(
				"MakeTranslations.Text must be less than 1000 characters",
			),
		};
	}

	const fromLang = data.fromLang as string;
	const toLang = data.toLang as string;
	const text = data.text as string;

	try {
		const data = await translateText(
			text,
			fromLang,
			[toLang],
			endpoint,
			key,
			location,
		);

		const translatedText = data[0].translations[0].text;

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
