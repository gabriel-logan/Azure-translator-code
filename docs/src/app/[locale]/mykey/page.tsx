import { translateText } from "azure-translator-code";

import MyKeyForm from "./Form";

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
				};
			}

			const response = await translateText(
				data.text,
				data.fromLang,
				[data.toLang],
				data.endpoint,
				data.secretKey,
				data.location,
			);

			return {
				message: response[0].translations[0].text as unknown as string,
			};
		} catch {
			return {
				message: "An error occurred, check your secret key and try again",
			};
		}
	}
	return (
		<main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 p-4 sm:p-8">
			<div className="relative mx-auto mt-5 w-full max-w-3xl rounded-lg bg-white p-8 shadow-lg">
				<h1 className="mb-6 text-center text-3xl font-extrabold text-gray-800">
					Test your Secret Key
				</h1>
				<p className="mb-6 text-center text-lg text-gray-600">
					Enter your secret key, endpoint, location, text to translate, and
					translation languages to test your key. !!! IMPORTANT !!! We do not
					store your secret key, endpoint, location, or any other information
					you enter here. This is a test page to check if your key is working
					correctly.
				</p>
				<MyKeyForm translateLocal={translateLocal} />
			</div>
		</main>
	);
}
