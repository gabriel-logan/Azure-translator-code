"use server";

import { translate } from "azure-translator-code";
import { TranslationType } from "azure-translator-code/types/translate";

const fakeNewPromise = new Promise<void>((resolve) => {
	setTimeout(() => {
		resolve();
	}, 400);
});

export async function makeTranslation(prevState: any, formData: FormData) {
	const data = {
		fromLang: formData.get("fromLang"),
		toLang: formData.get("toLang"),
		jsonFileText: formData.get("jsonfile"),
	};

	if (!data) {
		await fakeNewPromise;
		return {
			message: "Invalid or missing request body",
		};
	}

	if ((data.jsonFileText as string).length > 4999) {
		await fakeNewPromise;
		return {
			message: "Text must be less than 5000 characters",
		};
	}

	if (!data?.fromLang || !data.toLang) {
		await fakeNewPromise;
		return {
			message: "From lang and to Lang are required",
		};
	}

	if (!data?.jsonFileText) {
		await fakeNewPromise;
		return {
			message: "Missing json file text",
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
		await fakeNewPromise;
		return {
			message: "Invalid json text passed",
		};
	}

	return {
		message: translatedValues,
	};
}
