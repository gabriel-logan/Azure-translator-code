import randomString from "../randomString";
import type { TranslationType } from "../types";

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
 * @param text - The text to translate.
 * @param from - The language code of the source language.
 * @param to - The languages code of the target languages.
 * @param endpoint - The Azure Translator endpoint URL.
 * @param key - The Azure Translator subscription key.
 * @param location - The Azure Translator subscription region.
 * @returns A Promise that resolves to the translated text.
 * @example
 * from: "en"
 * to: ["es", "fr"]
 *
 * translateText("Hello", "en", ["es", "fr"], "https://api.cognitive.microsofttranslator.com", "key", "location")
 *
 * Returns example:
[
    {
        translations: [
            { text: "Hola", to: "es" },
            { text: "Bonjour", to: "fr" }
        ]
    }
]
 */
export default async function translateText(
	text: string,
	from: string,
	to: string[],
	endpoint: string,
	key: string,
	location: string,
): Promise<TranslateResponseData> {
	const filteredEndpoint = endpoint.replace(/\/$/, "");
	const toDestructured = to.map((lang) => `to=${lang}`).join("&");
	const url = `${filteredEndpoint}/translate?api-version=3.0&from=${from}&${toDestructured}`;

	const headers = {
		"Ocp-Apim-Subscription-Key": key,
		"Ocp-Apim-Subscription-Region": location,
		"Content-type": "application/json",
		"X-ClientTraceId": randomString(),
	};

	const response = await fetch(url, {
		method: "POST",
		headers,
		body: JSON.stringify([{ text }]),
	});

	return await response.json();
}
