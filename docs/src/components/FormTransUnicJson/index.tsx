"use client";

import { useFormState } from "react-dom";

import { makeTranslation } from "@/actions";
import { useScopedI18n } from "@/locales/client";

import ResultDiv from "./ResultDiv";
import Textarea from "./Textarea";
import ButtonCopy from "../ButtonCopy";
import ButtonSubmit from "../ButtonSubmit";
import SelectOptionsLangs from "../selectOptionsLangs";

export default function FormTransUnicJson() {
	const scopedT = useScopedI18n("FormComponent");

	const initialState: {
		message: unknown;
	} = {
		message: scopedT("No result yet"),
	};

	const [state, formAction] = useFormState(makeTranslation, initialState);

	return (
		<div className="flex flex-col gap-6 lg:flex-row lg:items-stretch">
			<form action={formAction} className="card w-full space-y-5 p-6 lg:w-1/2">
				<div className="flex flex-col gap-4 rounded-xl bg-gradient-to-r from-slate-800 to-slate-900 p-5 shadow-soft sm:flex-row sm:justify-between">
					<div className="flex w-full flex-col sm:w-2/5">
						<label
							htmlFor="fromLang"
							className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400"
						>
							{scopedT("From")}
						</label>
						<select
							name="fromLang"
							id="fromLang"
							className="w-full rounded-lg border border-slate-600 bg-slate-700/50 px-3 py-2.5 text-sm text-white shadow-sm transition-all focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/30"
							defaultValue="en"
						>
							<SelectOptionsLangs />
						</select>
					</div>

					<div className="hidden items-center text-slate-500 sm:flex">
						<svg
							className="h-5 w-5"
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

					<div className="flex w-full flex-col sm:w-2/5">
						<label
							htmlFor="toLang"
							className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400"
						>
							{scopedT("To")}
						</label>
						<select
							name="toLang"
							id="toLang"
							className="w-full rounded-lg border border-slate-600 bg-slate-700/50 px-3 py-2.5 text-sm text-white shadow-sm transition-all focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/30"
							defaultValue="pt"
						>
							<SelectOptionsLangs />
						</select>
					</div>
				</div>

				<Textarea />

				<div className="flex justify-end pt-2">
					<ButtonSubmit />
				</div>
			</form>

			<div className="card flex w-full flex-col p-6 lg:w-1/2">
				<div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
					<h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
						{scopedT("Result")}
					</h3>
					<ButtonCopy state={state} />
				</div>
				<div className="flex-1">
					<ResultDiv state={state} />
				</div>
			</div>
		</div>
	);
}
