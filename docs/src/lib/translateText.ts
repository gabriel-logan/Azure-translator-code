import { v4 as uuidv4 } from "uuid";

import type { TranslationTextFetch } from "@/types/translations";

export async function translateText(
	text: string,
	from: string,
	to: string[],
	endpoint: string,
	key: string,
	location: string,
): Promise<TranslationTextFetch> {
	const filteredEndpoint = endpoint.replace(/\/$/, "");

	const toDestructured = to.map((lang) => `to=${lang}`).join("&");

	const url = `${filteredEndpoint}/translate?api-version=3.0&from=${from}&${toDestructured}`;

	const response = await fetch(url, {
		method: "POST",
		body: JSON.stringify([{ text }]),
		headers: {
			"Ocp-Apim-Subscription-Key": key,
			"Ocp-Apim-Subscription-Region": location,
			"Content-type": "application/json",
			"X-ClientTraceId": uuidv4().toString(),
		},
	});

	const data = await response.json();

	return data;
}
