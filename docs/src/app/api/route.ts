import { translate } from "azure-translator-code";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	try {
		const data = await request.json();

		const jsonFileText = JSON.parse(data);
		const key = process.env.AZURE_API_KEY || ""; // REPLACE WITH YOUR OWN KEY HERE
		const endpoint = process.env.AZURE_ENDPOINT || "";
		const location = process.env.AZURE_LOCATION || "";
		const fromLang = "en";
		const toLang = "pt";

		const translatedValues = await translate(
			key,
			endpoint,
			location,
			fromLang,
			toLang,
			jsonFileText,
		);

		return NextResponse.json({ translatedValues });
	} catch {
		return NextResponse.json({ error: "invalid json file" });
	}
}