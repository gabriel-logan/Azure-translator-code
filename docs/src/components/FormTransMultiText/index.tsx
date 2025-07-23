"use client";

import { useState } from "react";
import { useFormState } from "react-dom";

import { makeTranslationMultilang } from "@/actions";
import { useScopedI18n } from "@/locales/client";
import type { Locale } from "@/types/locales";
import type { LanguagesCode } from "@/types/translations";

import { ButtonCopyUnicText } from "../ButtonCopy";
import ButtonSubmit from "../ButtonSubmit";

export default function FormTransMultiText({ locale }: Readonly<Locale>) {
	const scopedT = useScopedI18n("FormComponent");

	const initialState: {
		message: unknown;
	} = {
		message: scopedT("No result yet"),
	};

	const [response, action] = useFormState(
		makeTranslationMultilang,
		initialState,
	);

	const [textToTranslate, setTextToTranslate] = useState("");
	const [selectedLangs, setSelectedLangs] = useState<string[]>([]);

	const languages: {
		id: LanguagesCode;
		name: string;
	}[] = [
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
		{ id: "tlh-Latn", name: scopedT("Langs.Klingon") },
	];

	const allLanguageIds = languages.map((lang) => lang.id);
	const isAllSelected = selectedLangs.length === allLanguageIds.length;

	const toggleSelectAll = () => {
		setSelectedLangs(isAllSelected ? [] : allLanguageIds);
	};

	const handleCheckboxChange = (id: string) => {
		setSelectedLangs((prev) =>
			prev.includes(id) ? prev.filter((l) => l !== id) : [...prev, id],
		);
	};

	return (
		<form action={action} className="w-full rounded bg-white p-4 shadow-md">
			<div className="mb-4">
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
					{languages.map((lang) => (
						<option key={lang.id} value={lang.id}>
							{lang.name}
						</option>
					))}
				</select>

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
					placeholder="Type the text you want to translate"
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

			<div className="mb-2 mt-4 flex items-center gap-2">
				<input
					type="checkbox"
					id="selectAll"
					checked={isAllSelected}
					onChange={toggleSelectAll}
					className="cursor-pointer"
				/>
				<label
					htmlFor="selectAll"
					className="text-sm text-gray-700 sm:text-base"
				>
					{isAllSelected ? "Deselect all" : "Select all"}
				</label>
			</div>

			<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:mt-4 lg:grid-cols-4 xl:lg:grid-cols-5 xl:mt-2">
				{languages.map((lang) => (
					<div key={lang.id} className="flex cursor-pointer items-center">
						<input
							type="checkbox"
							name="languages"
							id={lang.id}
							checked={selectedLangs.includes(lang.id)}
							onChange={() => handleCheckboxChange(lang.id)}
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

			{selectedLangs.map((lang) => (
				<input key={lang} type="hidden" name="languages" value={lang} />
			))}

			<div className="mt-3 rounded-lg bg-white p-3 shadow">
				<h3 className="mb-4 text-xl font-bold text-black">
					{scopedT("Translations:")}
				</h3>
				{Array.isArray(response.message) ? (
					response.message.map((msg: any, index: number) => {
						const language = languages.find((lang) => lang.id === msg.to);
						return (
							<div
								key={language?.id ?? index}
								className="relative mb-3 rounded border p-1"
							>
								<p className="text-lg text-black">
									<span className="font-bold">
										{language ? language.name : msg.to}
									</span>
									: <span className="break-words">{msg.text}</span>
									<div className="absolute right-1 top-1">
										<ButtonCopyUnicText text={msg.text} />
									</div>
								</p>
							</div>
						);
					})
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
