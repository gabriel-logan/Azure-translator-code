"use client";

import { useState, useTransition } from "react";

export default function Form() {
	const [translationResult, setTranslationResult] = useState<string | null>(
		null,
	);
	const [jsonFileText, setJsonFileText] = useState("");
	const [isPending, startTransition] = useTransition();

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			startTransition(async () => {
				const result = await fetch("/api", {
					body: JSON.stringify(jsonFileText),
					method: "POST",
				});

				const data = await result.json();

				setTranslationResult(data.translatedValues);
			});
		} catch {
			setTranslationResult("invalid json file");
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<label
					htmlFor="jsonfile"
					className="mb-2 block text-sm font-medium text-gray-700"
				>
					Paste the json code here
				</label>
				<textarea
					className="h-72 w-full rounded border p-3 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
					name="jsonfile"
					id="jsonfile"
					value={jsonFileText}
					onChange={(event) => {
						setJsonFileText(event.target.value);
					}}
				></textarea>
				<button
					type="submit"
					disabled={isPending}
					className="mt-5 rounded bg-blue-500 px-5 py-2 text-white hover:bg-blue-600"
				>
					Translate
				</button>
			</form>
			<div className="mt-5 rounded border p-3">
				<p className="font-medium text-gray-700">Result: </p>
				<pre className="overflow-x-auto text-black">
					{JSON.stringify(translationResult, null, 2)}
				</pre>
			</div>
		</>
	);
}
