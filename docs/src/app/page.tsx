import { translate } from "azure-translator-code";
import Link from "next/link";

import Form from "@/components/Form";

export default function Home() {
	async function translateJson(formData: FormData) {
		"use server";

		const jsonFileText = formData.get("jsonfile");

		const key = process.env.AZURE_API_KEY || ""; // REPLACE WITH YOUR OWN KEY HERE
		const endpoint = process.env.AZURE_ENDPOINT || "";
		const location = process.env.AZURE_LOCATION || "";
		const fromLang = "en";
		const toLang = "pt";

		const result = await translate(
			key,
			endpoint,
			location,
			fromLang,
			toLang,
			jsonFileText as string,
		);
	}
	return (
		<main className="flex min-h-screen flex-col items-center p-24">
			<h1 className="mb-4 text-lg">In comming ...</h1>
			<Link
				className="text-blue-500 hover:underline"
				href={
					"https://github.com/gabriel-logan/Azure-translator-code/blob/main/README.md"
				}
			>
				For now read the README.md
			</Link>
			<div className="mt-5">
				<h2>Test the translator</h2>
				<div>
					<Form translateJson={translateJson} />
				</div>
			</div>
		</main>
	);
}

/**
 * const jsonFileText = {
	teste1: "teste1",
	teste2: {
		teste21: "teste21",
		teste22: "teste22",
		teste3: {
			teste31: "teste31",
			teste32: "teste32",
		},
	},
};

 */
