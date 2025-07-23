"use client";

import { useState } from "react";
import { useFormState } from "react-dom";

import { makeLiveTranslation } from "@/actions";
import { useScopedI18n } from "@/locales/client";
import type { Locale } from "@/types/locales";

import InputResult from "./InputResult";
import SelectOptionsLangs from "../selectOptionsLangs";

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
					<SelectOptionsLangs />
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
					defaultValue={locale === "en" ? "pt" : "en"}
					onChange={(e) => {
						e.preventDefault();
						const form = e.currentTarget.form;
						form?.requestSubmit();
					}}
				>
					<SelectOptionsLangs />
				</select>

				<div className="h-[250px] w-full overflow-y-auto rounded-md border bg-gray-50 px-3 py-2 text-sm text-gray-800">
					<InputResult typing={typing} response={response} />
				</div>
			</div>
		</form>
	);
}
