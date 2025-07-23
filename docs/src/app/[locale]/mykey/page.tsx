import { translateText, TranslationType } from "azure-translator-code";
import Link from "next/link";

import MyKeyForm from "./Form";

interface Translation {
	text: TranslationType;
	to: TranslationType;
}

interface TranslationResponse {
	translations: Translation[];
}

type TranslateResponseData = TranslationResponse[];

export default async function MyKeyPage() {
	async function translateLocal(prevState: any, formData: FormData) {
		"use server";

		const data = {
			secretKey: formData.get("ownkey") as string,
			endpoint: formData.get("ownendpoint") as string,
			location: formData.get("ownlocation") as string,
			text: formData.get("owntexttotranslate") as string,
			fromLang: formData.get("ownfromlang") as string,
			toLang: formData.get("owntolang") as string,
		};

		try {
			if (
				!data.secretKey.trim() ||
				!data.endpoint.trim() ||
				!data.location.trim() ||
				!data.text.trim() ||
				!data.fromLang.trim() ||
				!data.toLang.trim()
			) {
				return {
					message: "Please fill in all fields",
					error: null,
				};
			}

			const response = (await translateText(
				data.text,
				data.fromLang,
				[data.toLang],
				data.endpoint,
				data.secretKey,
				data.location,
			)) as TranslateResponseData | { error: string };

			if ("error" in response) {
				return {
					message: "An error occurred",
					error: response.error,
				};
			}

			return {
				message: response[0].translations[0].text as unknown as string,
				error: null,
			};
		} catch (error) {
			return {
				message: "An error occurred, check your secret key and try again",
				error: JSON.stringify(error),
			};
		}
	}

	return (
		<main className="mx-auto w-full bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 py-12">
			<div className="m-auto max-w-7xl rounded-xl bg-white p-6 shadow-lg sm:p-10">
				<h1 className="mb-4 text-center text-3xl font-bold text-gray-800">
					Test Your Azure Translator Key
				</h1>
				<p className="mb-4 text-center text-gray-600">
					Enter your Azure credentials and translation text below. This is a
					test environment — we do <strong>not</strong> store any of your data.
				</p>
				<p className="mb-6 text-center text-sm text-gray-500">
					View the source on{" "}
					<Link
						href="https://github.com/gabriel-logan/Azure-translator-code/tree/main/docs/src/app/%5Blocale%5D/mykey"
						target="_blank"
						className="font-medium text-blue-600 hover:underline"
					>
						GitHub
					</Link>
				</p>

				<MyKeyForm translateLocal={translateLocal} />
			</div>
		</main>
	);
}
