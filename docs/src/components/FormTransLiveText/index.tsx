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
		lang: LanguagesCode;
		name: string;
	}[] = [
		{ lang: "en", name: scopedT("Langs.English") },
		{ lang: "pt", name: scopedT("Langs.Portuguese") },
		{ lang: "es", name: scopedT("Langs.Spanish") },
		{ lang: "fr", name: scopedT("Langs.French") },
		{ lang: "de", name: scopedT("Langs.German") },
		{ lang: "it", name: scopedT("Langs.Italian") },
		{ lang: "ja", name: scopedT("Langs.Japanese") },
		{ lang: "ko", name: scopedT("Langs.Korean") },
		{ lang: "ru", name: scopedT("Langs.Russian") },
		{ lang: "zh-Hans", name: scopedT("Langs.Chinese Simplified") },
		{ lang: "zh-Hant", name: scopedT("Langs.Chinese Traditional") },
		{ lang: "ar", name: scopedT("Langs.Arabic") },
		{ lang: "tr", name: scopedT("Langs.Turkish") },
		{ lang: "vi", name: scopedT("Langs.Vietnamese") },
		{ lang: "th", name: scopedT("Langs.Thai") },
		{ lang: "sv", name: scopedT("Langs.Swedish") },
		{ lang: "pl", name: scopedT("Langs.Polish") },
		{ lang: "nl", name: scopedT("Langs.Dutch") },
		{ lang: "da", name: scopedT("Langs.Danish") },
		{ lang: "fi", name: scopedT("Langs.Finnish") },
		{ lang: "no", name: scopedT("Langs.Norwegian") },
		{ lang: "cs", name: scopedT("Langs.Czech") },
		{ lang: "hu", name: scopedT("Langs.Hungarian") },
		{ lang: "el", name: scopedT("Langs.Greek") },
		{ lang: "id", name: scopedT("Langs.Indonesian") },
		{ lang: "ms", name: scopedT("Langs.Malay") },
		{ lang: "tlh-Latn", name: scopedT("Langs.Klingon") },
	];

	return (
		<form
			action={action}
			className="mx-auto flex w-full max-w-7xl flex-col gap-4 rounded-xl border bg-white p-4 shadow-md sm:p-6 md:flex-row"
		>
			<div className="flex w-full flex-col md:w-1/2">
				<select
					name="fromLang"
					className="mb-2 h-12 w-full rounded-md bg-gray-800 px-3 text-sm text-white"
					defaultValue={locale}
				>
					{languages.map((lang) => (
						<option key={lang.lang} value={lang.lang}>
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
						<option key={lang.lang} value={lang.lang}>
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
