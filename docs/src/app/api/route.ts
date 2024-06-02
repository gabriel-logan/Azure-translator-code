import { translate } from "azure-translator-code";
import { TranslationType } from "azure-translator-code/types/translate";
import { type NextRequest, NextResponse } from "next/server";

export function GET() {
	return NextResponse.json("Pong!");
}

export function PUT() {
	return NextResponse.json("Pong!");
}

export function PATCH() {
	return NextResponse.json("Pong!");
}

export function DELETE() {
	return NextResponse.json("Pong!");
}

export function OPTIONS() {
	return NextResponse.json("Pong!");
}

export function HEAD() {
	return NextResponse.json("Pong!", {
		headers: {
			"X-Hello": "World",
			Response: "Pong!",
		},
	});
}

type RequestBody =
	| {
			fromLang: string;
			toLang: string;
			jsonFileText: string;
	  }
	| undefined;

export async function POST(request: NextRequest) {
	let data: RequestBody;

	try {
		data = await request.json();
	} catch {
		return NextResponse.json(
			{ status: 400, message: "Invalid or missing request body" },
			{ status: 400 },
		);
	}

	if (!data?.fromLang || !data.toLang) {
		return NextResponse.json(
			{ status: 400, message: "From lang and to Lang are required" },
			{ status: 400 },
		);
	}

	if (!data?.jsonFileText) {
		return NextResponse.json(
			{ status: 400, message: "Missing json file text" },
			{ status: 400 },
		);
	}

	const key = process.env.AZURE_API_KEY || ""; // REPLACE WITH YOUR OWN KEY HERE
	const endpoint = process.env.AZURE_ENDPOINT || "";
	const location = process.env.AZURE_LOCATION || "";
	const fromLang = data.fromLang;
	const toLang = data.toLang;

	let translatedValues: TranslationType;

	let valuesToTranslate: unknown;

	try {
		valuesToTranslate =
			typeof data.jsonFileText === "string"
				? JSON.parse(data.jsonFileText)
				: data.jsonFileText;
	} catch {
		await new Promise((resolve) => setTimeout(resolve, 1000));
		return NextResponse.json(
			{ status: 400, message: "Invalid json text passed" },
			{ status: 400 },
		);
	}

	try {
		translatedValues = await translate(
			key,
			endpoint,
			location,
			fromLang,
			toLang,
			valuesToTranslate as TranslationType,
		);
	} catch {
		return NextResponse.json(
			{ status: 500, message: "Translation failed" },
			{ status: 500 },
		);
	}

	return NextResponse.json(
		{
			translatedValues,
		},
		{
			status: 200,
		},
	);
}
