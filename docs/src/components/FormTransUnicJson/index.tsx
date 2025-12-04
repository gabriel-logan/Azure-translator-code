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
		<div className="flex flex-col gap-6 lg:flex-row lg:items-start">
			<form
				action={formAction}
				className="w-full space-y-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:w-1/2"
			>
				<div className="flex flex-col gap-4 rounded bg-gray-800 p-5 text-white sm:flex-row sm:justify-between">
					<div className="flex w-full flex-col sm:w-2/5">
						<label
							htmlFor="fromLang"
							className="mb-1 text-sm font-medium text-gray-300"
						>
							{scopedT("From")}
						</label>
						<select
							name="fromLang"
							id="fromLang"
							className="w-full rounded-md border border-gray-600 bg-gray-700 p-2 text-sm text-white shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
							defaultValue="en"
						>
							<SelectOptionsLangs />
						</select>
					</div>

					<div className="flex w-full flex-col sm:w-2/5">
						<label
							htmlFor="toLang"
							className="mb-1 text-sm font-medium text-gray-300"
						>
							{scopedT("To")}
						</label>
						<select
							name="toLang"
							id="toLang"
							className="w-full rounded-md border border-gray-600 bg-gray-700 p-2 text-sm text-white shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
							defaultValue="pt"
						>
							<SelectOptionsLangs />
						</select>
					</div>
				</div>

				<Textarea />

				<div className="pt-2">
					<ButtonSubmit />
				</div>
			</form>

			<div className="w-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:w-1/2">
				<div className="mb-4 flex justify-end">
					<ButtonCopy state={state} />
				</div>
				<ResultDiv state={state} />
			</div>
		</div>
	);
}
