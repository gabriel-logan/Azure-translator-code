"use client";

import { useState } from "react";
import { useFormState } from "react-dom";

import { makeTranslationMultilang } from "@/actions";
import { useScopedI18n } from "@/locales/client";
import { Locale } from "@/types/locales";

import ButtonSubmit from "../ButtonSubmit";

export default function FormTransMultiText({ locale }: Locale) {
	const scopedT = useScopedI18n("FormComponent");

	const initialState: {
		message: string | unknown;
	} = {
		message: scopedT("No result yet"),
	};
	const [response, action] = useFormState(
		makeTranslationMultilang,
		initialState,
	);

	const [textToTranslate, setTextToTranslate] = useState("");

	const languages = [
		{ id: "en", name: scopedT("Langs.English") },
		{ id: "pt", name: scopedT("Langs.Portuguese") },
		{ id: "es", name: scopedT("Langs.Spanish") },
		{ id: "fr", name: scopedT("Langs.French") },
		{ id: "de", name: scopedT("Langs.German") },
		{ id: "it", name: scopedT("Langs.Italian") },
		{ id: "ja", name: scopedT("Langs.Japanese") },
		{ id: "ko", name: scopedT("Langs.Korean") },
		{ id: "ru", name: scopedT("Langs.Russian") },
		{ id: "zh-Hans", name: scopedT("Langs.Chinese Simplified") },
		{ id: "zh-Hant", name: scopedT("Langs.Chinese Traditional") },
		{ id: "ar", name: scopedT("Langs.Arabic") },
		{ id: "tr", name: scopedT("Langs.Turkish") },
		{ id: "vi", name: scopedT("Langs.Vietnamese") },
		{ id: "th", name: scopedT("Langs.Thai") },
		{ id: "sv", name: scopedT("Langs.Swedish") },
		{ id: "pl", name: scopedT("Langs.Polish") },
		{ id: "nl", name: scopedT("Langs.Dutch") },
		{ id: "da", name: scopedT("Langs.Danish") },
		{ id: "fi", name: scopedT("Langs.Finnish") },
		{ id: "no", name: scopedT("Langs.Norwegian") },
		{ id: "cs", name: scopedT("Langs.Czech") },
		{ id: "hu", name: scopedT("Langs.Hungarian") },
		{ id: "el", name: scopedT("Langs.Greek") },
		{ id: "id", name: scopedT("Langs.Indonesian") },
		{ id: "ms", name: scopedT("Langs.Malay") },
	];

	return (
		<form action={action} className="w-full rounded bg-white p-6 shadow-md">
			<div className="mb-4">
				<div>
					<label
						htmlFor="fromLang"
						className="block text-sm font-medium text-gray-400"
					>
						{scopedT("From")}
					</label>
					<select
						name="fromLang"
						id="fromLang"
						className="w-full cursor-pointer rounded bg-gray-700 p-3 text-white"
						defaultValue={locale}
					>
						{languages.map((lang, index) => {
							return (
								<option key={index} value={lang.id}>
									{lang.name}
								</option>
							);
						})}
					</select>
				</div>
				<label
					htmlFor="toTranslate"
					className="mb-2 mt-4 block font-medium text-gray-700"
				>
					{scopedT("Text to Translate")}
				</label>
				<input
					type="text"
					id="toTranslate"
					name="toTranslate"
					value={textToTranslate}
					onChange={(e) => {
						setTextToTranslate(e.target.value);
					}}
					className="w-full rounded border border-gray-300 p-3 text-black"
				/>
				<p className="float-right text-black">
					{scopedT("Len")}:{" "}
					<span
						className={`${textToTranslate.length > 4999 && "text-red-500"}`}
					>
						{textToTranslate.length}
					</span>{" "}
					/ 5000
				</p>
			</div>

			<ButtonSubmit />

			<p className="mt-4 text-base text-black sm:text-lg">
				{scopedT("Select the languages you want to translate the text to:")}
			</p>

			<div className="mt-6 grid grid-cols-2 gap-4">
				{languages.map((lang) => (
					<div key={lang.id} className="flex cursor-pointer items-center">
						<input
							type="checkbox"
							name={lang.id}
							id={lang.id}
							maxLength={10}
							className="mr-2"
						/>
						<label
							htmlFor={lang.id}
							className="cursor-pointer text-sm text-gray-700 sm:text-base md:text-lg lg:text-2xl"
						>
							{lang.name}
						</label>
					</div>
				))}
			</div>
			<div className="mt-3 rounded-lg bg-white p-6 shadow">
				<h3 className="mb-4 text-xl font-bold text-black">
					{scopedT("Translations:")}{" "}
				</h3>
				{Array.isArray(response.message) ? (
					<>
						{response.message.map((msg: any, index: any) => {
							const language = languages.find((lang) => lang.id === msg.to);
							return (
								<div key={index} className="mb-2">
									<p className="text-lg text-black">
										{language ? language.name : msg.to}: {msg.text}
									</p>
								</div>
							);
						})}
					</>
				) : (
					<p className="text-lg text-black">
						{typeof response.message === "string"
							? response.message
							: scopedT("No result yet")}
					</p>
				)}
			</div>
		</form>
	);
}
