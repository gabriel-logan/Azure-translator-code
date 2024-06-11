"use client";

import { useFormState } from "react-dom";

import { makeTranslationMultilang } from "@/actions";
import { useScopedI18n } from "@/locales/client";

import ButtonSubmit from "../ButtonSubmit";

export default function FormTransMultiText() {
	const initialState = {
		message: "",
	};
	const [response, action] = useFormState(
		makeTranslationMultilang,
		initialState,
	);

	const scopedT = useScopedI18n("FormComponent");

	const languages = [
		{ id: "en", name: "English" },
		{ id: "pt", name: "Portuguese" },
		{ id: "es", name: "Spanish" },
		{ id: "fr", name: "French" },
		{ id: "de", name: "German" },
		{ id: "it", name: "Italian" },
		{ id: "ja", name: "Japanese" },
		{ id: "ko", name: "Korean" },
		{ id: "ru", name: "Russian" },
		{ id: "zh-Hans", name: "Chinese Simplified" },
		{ id: "zh-Hant", name: "Chinese Traditional" },
		{ id: "ar", name: "Arabic" },
		{ id: "tr", name: "Turkish" },
		{ id: "vi", name: "Vietnamese" },
		{ id: "th", name: "Thai" },
		{ id: "sv", name: "Swedish" },
		{ id: "pl", name: "Polish" },
		{ id: "nl", name: "Dutch" },
		{ id: "da", name: "Danish" },
		{ id: "fi", name: "Finnish" },
		{ id: "no", name: "Norwegian" },
		{ id: "cs", name: "Czech" },
		{ id: "hu", name: "Hungarian" },
		{ id: "el", name: "Greek" },
		{ id: "id", name: "Indonesian" },
		{ id: "ms", name: "Malay" },
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
					>
						<option value="en">{scopedT("Langs.English")}</option>
						<option value="pt">{scopedT("Langs.Portuguese")}</option>
						<option value="es">{scopedT("Langs.Spanish")}</option>
						<option value="fr">{scopedT("Langs.French")}</option>
						<option value="de">{scopedT("Langs.German")}</option>
						<option value="it">{scopedT("Langs.Italian")}</option>
						<option value="ja">{scopedT("Langs.Japanese")}</option>
						<option value="ko">{scopedT("Langs.Korean")}</option>
						<option value="ru">{scopedT("Langs.Russian")}</option>
						<option value="zh-Hans">
							{scopedT("Langs.Chinese Simplified")}
						</option>
						<option value="zh-Hant">
							{scopedT("Langs.Chinese Traditional")}
						</option>
						<option value="ar">{scopedT("Langs.Arabic")}</option>
						<option value="tr">{scopedT("Langs.Turkish")}</option>
						<option value="vi">{scopedT("Langs.Vietnamese")}</option>
						<option value="th">{scopedT("Langs.Thai")}</option>
						<option value="sv">{scopedT("Langs.Swedish")}</option>
						<option value="pl">{scopedT("Langs.Polish")}</option>
						<option value="nl">{scopedT("Langs.Dutch")}</option>
						<option value="da">{scopedT("Langs.Danish")}</option>
						<option value="fi">{scopedT("Langs.Finnish")}</option>
						<option value="no">{scopedT("Langs.Norwegian")}</option>
						<option value="cs">{scopedT("Langs.Czech")}</option>
						<option value="hu">{scopedT("Langs.Hungarian")}</option>
						<option value="el">{scopedT("Langs.Greek")}</option>
						<option value="id">{scopedT("Langs.Indonesian")}</option>
						<option value="ms">{scopedT("Langs.Malay")}</option>
					</select>
				</div>
				<label
					htmlFor="toTranslate"
					className="mb-2 mt-2 block font-medium text-gray-700"
				>
					Text to Translate
				</label>
				<input
					type="text"
					id="toTranslate"
					name="toTranslate"
					className="w-full rounded border border-gray-300 p-3 text-black"
				/>
			</div>

			<ButtonSubmit />

			<p className="mt-4 text-base text-black sm:text-lg">
				Select the languages you want to translate the text to:
			</p>

			<div className="mt-6 grid grid-cols-2 gap-4">
				{languages.map((lang) => (
					<div key={lang.id} className="flex cursor-pointer items-center">
						<input
							type="checkbox"
							name={lang.id}
							id={lang.id}
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
				<h3 className="mb-4 text-xl font-bold text-black">Translations: </h3>
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
					<p className="text-lg text-black">{response.message}</p>
				)}
			</div>
		</form>
	);
}
