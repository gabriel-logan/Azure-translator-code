"use client";

import { useState } from "react";
import { useFormState } from "react-dom";

import { makeLiveTranslation } from "@/actions";
import { useScopedI18n } from "@/locales/client";
import { Locale } from "@/types/locales";

import InputResult from "./InputResult";

export default function FormTransLiveText({ locale }: Locale) {
	const scopedT = useScopedI18n("FormComponent");

	const [textToTranslate, setTextToTranslate] = useState("");
	const [typing, setTyping] = useState(false);

	const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

	const initialState: {
		message: string | unknown;
	} = {
		message: scopedT("Translation"),
	};

	const [response, action] = useFormState(makeLiveTranslation, initialState);

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
		<form
			action={action}
			className="h-106 sm:max-w-1152px mx-auto flex w-full flex-col rounded border shadow sm:h-80 sm:flex-row sm:gap-1"
		>
			<div className="relative mb-3 h-1/2 border sm:mb-0 sm:h-full sm:w-1/2">
				<select
					name="fromLang"
					id="fromLang"
					className="h-1/4 w-full cursor-pointer bg-gray-700 p-3 text-white sm:h-1/5"
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
				<textarea
					className="h-85% w-full resize-none p-2 text-black outline-none sm:h-4/5"
					value={textToTranslate}
					name="textToTranslate"
					onChange={(e) => {
						setTyping(true);
						const form = e.currentTarget.form;
						setTextToTranslate(e.target.value);
						if (timeoutId) clearTimeout(timeoutId);
						setTimeoutId(
							setTimeout(() => {
								form?.requestSubmit();
								setTyping(false);
							}, 1000),
						);
					}}
					maxLength={1000}
					style={{ maxHeight: "80%", minHeight: "80%" }}
					onBlur={() => {
						setTyping(false);
					}}
				/>
				<p className="absolute bottom-2 right-3 text-black">
					<span className={`${textToTranslate.length > 999 && "text-red-500"}`}>
						{textToTranslate.length}
					</span>{" "}
					/ 1000
				</p>
			</div>
			<div className="relative h-1/2 border sm:h-full sm:w-1/2">
				<select
					name="toLang"
					id="toLang"
					className="h-1/4 w-full cursor-pointer bg-gray-700 p-3 text-white sm:h-1/5"
					defaultValue={locale === "en" ? "pt" : locale}
				>
					{languages.map((lang, index) => {
						return (
							<option key={index} value={lang.id}>
								{lang.name}
							</option>
						);
					})}
				</select>
				<InputResult typing={typing} response={response} />
			</div>
		</form>
	);
}
