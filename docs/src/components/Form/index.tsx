"use client";

import { useState, useTransition } from "react";

export default function Form() {
	const [translationResult, setTranslationResult] = useState<string | null>(
		null,
	);
	const [jsonFileText, setJsonFileText] = useState("");
	const [isPending, startTransition] = useTransition();
	const [fromLang, setFromLang] = useState("en");
	const [toLang, setToLang] = useState("pt");

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!jsonFileText) {
			alert("The json file is empty");
			return;
		}

		if (fromLang === toLang) {
			alert("The languages must be different");
			return;
		}

		try {
			startTransition(async () => {
				const bodyToSend = {
					fromLang,
					toLang,
					jsonFileText,
				};

				const result = await fetch("/api", {
					body: JSON.stringify(bodyToSend),
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
				<div className="flex flex-col justify-between rounded bg-gray-800 p-5 text-white sm:flex-row">
					<div>
						<label
							htmlFor="fromLang"
							className="block text-sm font-medium text-gray-400"
						>
							From
						</label>
						<select
							name="fromLang"
							id="fromLang"
							className="cursor-pointer rounded bg-gray-700 p-2 text-white"
							value={fromLang}
							onChange={(event) => {
								setFromLang(event.target.value);
							}}
						>
							<option value="en">English</option>
							<option value="pt">Portuguese</option>
							<option value="es">Spanish</option>
							<option value="fr">French</option>
							<option value="de">German</option>
							<option value="it">Italian</option>
							<option value="ja">Japanese</option>
							<option value="ko">Korean</option>
							<option value="ru">Russian</option>
							<option value="zh-Hans">Chinese S</option>
							<option value="zh-Hant">Chinese T</option>
							<option value="ar">Arabic</option>
							<option value="tr">Turkish</option>
							<option value="vi">Vietnamese</option>
							<option value="th">Thai</option>
							<option value="sv">Swedish</option>
							<option value="pl">Polish</option>
							<option value="nl">Dutch</option>
							<option value="da">Danish</option>
							<option value="fi">Finnish</option>
							<option value="no">Norwegian</option>
							<option value="cs">Czech</option>
							<option value="hu">Hungarian</option>
							<option value="el">Greek</option>
							<option value="id">Indonesian</option>
							<option value="ms">Malay</option>
						</select>
					</div>
					<div className="mt-5 sm:mt-0">
						<label
							htmlFor="toLang"
							className="block text-sm font-medium text-gray-400"
						>
							To
						</label>
						<select
							name="toLang"
							id="toLang"
							className="cursor-pointer rounded bg-gray-700 p-2 text-white"
							value={toLang}
							onChange={(event) => {
								setToLang(event.target.value);
							}}
						>
							<option value="pt">Portuguese</option>
							<option value="en">English</option>
							<option value="es">Spanish</option>
							<option value="fr">French</option>
							<option value="de">German</option>
							<option value="it">Italian</option>
							<option value="ja">Japanese</option>
							<option value="ko">Korean</option>
							<option value="ru">Russian</option>
							<option value="zh-Hans">Chinese S</option>
							<option value="zh-Hant">Chinese T</option>
							<option value="ar">Arabic</option>
							<option value="tr">Turkish</option>
							<option value="vi">Vietnamese</option>
							<option value="th">Thai</option>
							<option value="sv">Swedish</option>
							<option value="pl">Polish</option>
							<option value="nl">Dutch</option>
							<option value="da">Danish</option>
							<option value="fi">Finnish</option>
							<option value="no">Norwegian</option>
							<option value="cs">Czech</option>
							<option value="hu">Hungarian</option>
							<option value="el">Greek</option>
							<option value="id">Indonesian</option>
							<option value="ms">Malay</option>
						</select>
					</div>
				</div>
				<label
					htmlFor="jsonfile"
					className="mb-2 block text-sm font-medium text-gray-700"
				>
					Paste the json code here
				</label>
				<textarea
					className="max-h-96 min-h-72 w-full rounded border p-3 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
					name="jsonfile"
					id="jsonfile"
					value={jsonFileText}
					maxLength={1000}
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
