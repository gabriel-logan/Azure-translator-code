import { translateText, TranslationType } from "azure-translator-code";
import Link from "next/link";
import { FaGithub, FaArrowLeft } from "react-icons/fa";

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
		<main className="min-h-screen bg-gradient-to-b from-slate-50 to-white px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
			<div className="mx-auto max-w-4xl">
				<div className="mb-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
					<Link href="/" className="btn-secondary order-2 sm:order-1">
						<FaArrowLeft className="mr-2 h-3.5 w-3.5" />
						Back
					</Link>

					<h1 className="section-title gradient-text order-1 text-center sm:order-2">
						Test Your Azure Key
					</h1>

					<div className="order-3 hidden w-[100px] sm:block" />
				</div>

				<div className="animate-fade-in">
					<div className="card p-6 sm:p-8">
						<div className="mb-6 rounded-lg border border-blue-100 bg-blue-50/50 p-4 text-center">
							<p className="text-sm text-slate-600">
								Enter your Azure credentials below. We do{" "}
								<strong className="text-slate-800">not</strong> store any of
								your data.
							</p>
							<Link
								href="https://github.com/gabriel-logan/Azure-translator-code/tree/main/docs/src/app/%5Blocale%5D/mykey"
								target="_blank"
								className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
							>
								<FaGithub className="h-4 w-4" />
								View source code
							</Link>
						</div>

						<MyKeyForm translateLocal={translateLocal} />
					</div>
				</div>
			</div>
		</main>
	);
}
