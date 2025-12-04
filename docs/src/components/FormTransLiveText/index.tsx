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
			className="card mx-auto flex w-full max-w-6xl flex-col gap-5 p-5 sm:p-6 md:flex-row"
		>
			<div className="flex w-full flex-col md:w-1/2">
				<label className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
					{scopedT("From")}
				</label>
				<select
					name="fromLang"
					className="mb-4 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 shadow-sm transition-all focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
					defaultValue={locale}
				>
					<SelectOptionsLangs />
				</select>

				<textarea
					className="h-[280px] w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm transition-all placeholder:text-slate-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
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
				<p className="mt-2 text-right text-xs text-slate-500">
					<span
						className={`font-medium ${textToTranslate.length > 999 ? "text-red-500" : "text-slate-700"}`}
					>
						{textToTranslate.length}
					</span>
					<span className="text-slate-400"> / 1000</span>
				</p>
			</div>

			<div className="hidden items-center justify-center text-slate-300 md:flex">
				<svg
					className="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M17 8l4 4m0 0l-4 4m4-4H3"
					/>
				</svg>
			</div>

			<div className="flex w-full flex-col md:w-1/2">
				<label className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
					{scopedT("To")}
				</label>
				<select
					name="toLang"
					className="mb-4 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 shadow-sm transition-all focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
					defaultValue={locale === "en" ? "pt" : "en"}
					onChange={(e) => {
						e.preventDefault();
						const form = e.currentTarget.form;
						form?.requestSubmit();
					}}
				>
					<SelectOptionsLangs />
				</select>

				<div className="h-[280px] w-full overflow-y-auto rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800">
					<InputResult typing={typing} response={response} />
				</div>
			</div>
		</form>
	);
}
