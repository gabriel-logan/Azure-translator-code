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
								<option value="tlh-Latn">{scopedT("Langs.Klingon")}</option>
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
							>
								<option value="pt">{scopedT("Langs.Portuguese")}</option>
								<option value="en">{scopedT("Langs.English")}</option>
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
								<option value="tlh-Latn">{scopedT("Langs.Klingon")}</option>
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
