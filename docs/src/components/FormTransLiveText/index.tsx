"use client";

import { useState } from "react";
import { useFormState } from "react-dom";

import { makeLiveTranslation } from "@/actions";
import { useScopedI18n } from "@/locales/client";
import type { Locale } from "@/types/locales";
import type { LanguagesCode } from "@/types/translations";

import InputResult from "./InputResult";

export default function FormTransLiveText({ locale }: Readonly<Locale>) {
	const scopedT = useScopedI18n("FormComponent");

	const [textToTranslate, setTextToTranslate] = useState("");
	const [typing, setTyping] = useState(false);

	const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

	const initialState: {
		message: unknown;
	} = {
		message: scopedT("Translation"),
	};

	const [response, action] = useFormState(makeLiveTranslation, initialState);

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
	return (
		<form
			action={action}
			className="mx-auto flex w-full max-w-6xl flex-col gap-4 rounded-xl border bg-white p-4 shadow-md sm:p-6 md:flex-row"
		>
			<div className="flex w-full flex-col md:w-1/2">
				<select
					name="fromLang"
					className="mb-2 h-12 w-full rounded-md bg-gray-800 px-3 text-sm text-white"
					defaultValue={locale}
				>
					{languages.map((lang) => (
						<option key={lang.id} value={lang.id}>
							{lang.name}
						</option>
					))}
				</select>

				<textarea
					className="h-[250px] w-full resize-none rounded-md border px-3 py-2 text-sm text-gray-800 focus:outline-none"
					placeholder="Type here..."
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
				/>
				<p className="mt-1 text-right text-xs text-gray-500">
					<span className={textToTranslate.length > 999 ? "text-red-500" : ""}>
						{textToTranslate.length}
					</span>{" "}
					/ 1000
				</p>
			</div>

			<div className="flex w-full flex-col md:w-1/2">
				<select
					name="toLang"
					className="mb-2 h-12 w-full rounded-md bg-gray-800 px-3 text-sm text-white"
					defaultValue={locale === "en" ? "pt" : locale}
					onChange={(e) => {
						e.preventDefault();
						const form = e.currentTarget.form;
						form?.requestSubmit();
					}}
				>
					{languages.map((lang) => (
						<option key={lang.id} value={lang.id}>
							{lang.name}
						</option>
					))}
				</select>

				<div className="h-[250px] w-full overflow-y-auto rounded-md border bg-gray-50 px-3 py-2 text-sm text-gray-800">
					<InputResult typing={typing} response={response} />
				</div>
			</div>
		</form>
	);
}
