"use client";

import { useFormState } from "react-dom";

import { makeTranslation } from "@/actions";
import { useScopedI18n } from "@/locales/client";

import ResultDiv from "./ResultDiv";
import Textarea from "./Textarea";
import ButtonCopy from "../ButtonCopy";
import ButtonSubmit from "../ButtonSubmit";

export default function FormTransUnicJson() {
	const scopedT = useScopedI18n("FormComponent");

	const initialState: {
		message: unknown;
	} = {
		message: scopedT("No result yet"),
	};

	const [state, formAction] = useFormState(makeTranslation, initialState);

	const optionsLangs = [
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
		<div className="flex flex-col justify-between lg:flex-row">
			<form className="w-full lg:w-[48%]" action={formAction}>
				<div className="flex flex-col rounded bg-gray-800 p-5 text-white sm:flex-row">
					<div className="w-full">
						<div className="sm:ml-10">
							<label
								htmlFor="fromLang"
								className="block text-sm font-medium text-gray-400"
							>
								{scopedT("From")}
							</label>
							<select
								name="fromLang"
								id="fromLang"
								className="w-full cursor-pointer rounded bg-gray-700 p-2 text-white sm:w-40"
								defaultValue="en"
							>
								{optionsLangs.map((option) => (
									<option key={option.lang} value={option.lang}>
										{option.name}
									</option>
								))}
							</select>
						</div>
					</div>
					<div className="mb-4 mt-5 w-full sm:mb-0 sm:mt-0">
						<div className="flex flex-col sm:mr-10 sm:items-end">
							<label
								htmlFor="toLang"
								className="block text-sm font-medium text-gray-400"
							>
								{scopedT("To")}
							</label>
							<select
								name="toLang"
								id="toLang"
								className="w-full cursor-pointer rounded bg-gray-700 p-2 text-white sm:w-40"
								defaultValue="pt"
							>
								{optionsLangs.map((option) => (
									<option key={option.lang} value={option.lang}>
										{option.name}
									</option>
								))}
							</select>
						</div>
					</div>
				</div>

				<Textarea />

				<ButtonSubmit />
			</form>
			<div className="mt-5 w-full rounded border p-3 lg:mt-0 lg:w-[46%]">
				<ButtonCopy state={state} />

				<ResultDiv state={state} />
			</div>
		</div>
	);
}
