"use client";

import { useState } from "react";

export default function LiveTranslator() {
	const [textToTranslate, setTextToTranslate] = useState("");
	return (
		<main className="flex min-h-screen flex-col bg-gray-100 p-10">
			<h1 className="mb-10 text-4xl font-bold text-black">Live Translator</h1>
			<p className="text-black">NOT WORKING, DEV MODE</p>
			<div className="flex flex-col rounded bg-white p-10 shadow-lg">
				<form action="">
					<div className="mb-5">
						<label
							htmlFor="fromLang"
							className="block text-sm font-medium text-gray-700"
						>
							From
						</label>
						<select
							name="fromLang"
							id="fromLang"
							className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-black shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
						>
							<option value="en">English</option>
							<option value="fr">French</option>
							<option value="es">Spanish</option>
							<option value="de">German</option>
						</select>
						<textarea
							name="textFromLang"
							id="textFromLang"
							className="mt-1 block w-full resize-none rounded-md border border-gray-300 bg-white px-3 py-2 text-black shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
						/>
						<div className="mt-2 text-sm text-gray-500">
							Len{" "}
							<span
								className={`${textToTranslate.length > 4999 ? "text-red-500" : "text-gray-900"}`}
							>
								{textToTranslate.length}
							</span>{" "}
							/ 5000
						</div>
					</div>
					<div>
						<label
							htmlFor="toLang"
							className="block text-sm font-medium text-gray-700"
						>
							To
						</label>
						<select
							name="toLang"
							id="toLang"
							className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-black shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
						>
							<option value="en">English</option>
							<option value="fr">French</option>
							<option value="es">Spanish</option>
							<option value="de">German</option>
						</select>
						<input
							disabled
							name="textToLang"
							placeholder="Translation"
							id="textToLang"
							className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-black shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
						/>
					</div>
				</form>
			</div>
		</main>
	);
}
