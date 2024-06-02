"use client";

import { useState, useTransition } from "react";
import { FaRegCopy } from "react-icons/fa6";

export default function Form() {
	const [translationResult, setTranslationResult] = useState("");
	const [jsonFileText, setJsonFileText] = useState("");
	const [fromLang, setFromLang] = useState("en");
	const [toLang, setToLang] = useState("pt");

	const [isPedding, startTransition] = useTransition();

	const [isCopied, setIsCopied] = useState(false);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!jsonFileText) {
			alert("The json file is empty");
			return;
		}

		if (jsonFileText.length > 5000) {
			alert("The json file must have a maximum of 5000 characters");
			return;
		}

		if (fromLang === toLang) {
			alert("The languages must be different");
			return;
		}

		const bodyToSend = {
			fromLang,
			toLang,
			jsonFileText,
		};

		startTransition(async () => {
			try {
				const result = await fetch("/api", {
					body: JSON.stringify(bodyToSend),
					method: "POST",
				});

				const data: any = await result.json();

				if (data.status === 400) {
					setTranslationResult(data.message);
					return;
				}

				if (data.status === 500) {
					setTranslationResult(data.message);
					return;
				}

				setTranslationResult(data.translatedValues);
			} catch {
				setTranslationResult("An error occurred");
			}
		});
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<div className="flex flex-col rounded bg-gray-800 p-5 text-white sm:flex-row">
					<div className="w-full">
						<div className="sm:ml-10">
							<label
								htmlFor="fromLang"
								className="block text-sm font-medium text-gray-400"
							>
								From
							</label>
							<select
								name="fromLang"
								id="fromLang"
								className="w-full cursor-pointer rounded bg-gray-700 p-2 text-white sm:w-40"
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
								<option value="zh-Hans">Chinese Simplified</option>
								<option value="zh-Hant">Chinese Traditional</option>
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
					<div className="mb-4 mt-5 w-full sm:mb-0 sm:mt-0">
						<div className="flex flex-col sm:mr-10 sm:items-end">
							<label
								htmlFor="toLang"
								className="block text-sm font-medium text-gray-400"
							>
								To
							</label>
							<select
								name="toLang"
								id="toLang"
								className="w-full cursor-pointer rounded bg-gray-700 p-2 text-white sm:w-40"
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
								<option value="zh-Hans">Chinese Simplified</option>
								<option value="zh-Hant">Chinese Traditional</option>
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
				</div>
				<label
					htmlFor="jsonfile"
					className="mb-2 mt-1 block text-base font-medium text-gray-700"
				>
					Paste the json code here
					<p className="float-right text-black">
						Len:{" "}
						<span
							className={`${jsonFileText.length === 5000 && "text-red-800"}`}
						>
							{jsonFileText.length === 5000 ? "Max" : jsonFileText.length}
						</span>{" "}
						/ 5000
					</p>
				</label>
				<textarea
					className="max-h-96 min-h-72 w-full rounded border p-3 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
					name="jsonfile"
					id="jsonfile"
					value={jsonFileText}
					maxLength={5000}
					onChange={(event) => {
						setJsonFileText(event.target.value);
					}}
				></textarea>
				<button
					type="submit"
					disabled={isPedding}
					className="mt-5 rounded bg-blue-500 px-5 py-2 text-white hover:bg-blue-600"
				>
					Translate
				</button>
			</form>
			<div className="mt-5 rounded border p-3">
				<div
					className="float-right flex flex-col items-end"
					onClick={() => {
						navigator.clipboard.writeText(
							JSON.stringify(translationResult, null, 2),
						);
						setIsCopied(true);
						setTimeout(() => {
							setIsCopied(false);
						}, 1000);
					}}
				>
					<FaRegCopy
						className="cursor-pointer text-black transition-colors duration-75 active:text-gray-300"
						size={22}
					/>
					<span className="text-gray-500">{isCopied ? "Copied" : ""}</span>
				</div>
				<p className="font-medium text-gray-700">Result: </p>

				{isPedding ? (
					<div className="animate-pulse overflow-x-auto rounded bg-gray-100 p-2">
						<div className="mb-2 h-4 w-3/4 animate-pulse bg-gray-400"></div>
						<div className="mb-2 ml-4 h-4 w-1/2 animate-pulse bg-gray-400"></div>
						<div className="mb-2 ml-8 h-4 w-2/3 animate-pulse bg-gray-400"></div>
						<div className="mb-2 ml-8 h-4 w-1/2 animate-pulse bg-gray-400"></div>
						<div className="mb-2 ml-12 h-4 w-2/3 animate-pulse bg-gray-400"></div>
						<div className="mb-2 ml-12 h-4 w-1/2 animate-pulse bg-gray-400"></div>
						<div className="h-4 w-3/4 animate-pulse bg-gray-400"></div>
					</div>
				) : (
					<pre className="overflow-x-auto text-black">
						{translationResult === ""
							? "No result yet"
							: JSON.stringify(translationResult, null, 2)}
					</pre>
				)}
			</div>
		</>
	);
}
