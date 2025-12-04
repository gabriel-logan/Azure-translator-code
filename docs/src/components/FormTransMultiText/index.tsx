"use client";

import { useState } from "react";
import { useFormState } from "react-dom";

import { makeTranslationMultilang } from "@/actions";
import optionsLangs from "@/lib/optionsLangs";
import { useScopedI18n } from "@/locales/client";
import type { Locale } from "@/types/locales";

import { ButtonCopyUnicText } from "../ButtonCopy";
import ButtonSubmit from "../ButtonSubmit";

export default function FormTransMultiText({ locale }: Readonly<Locale>) {
	const scopedT = useScopedI18n("FormComponent");

	const initialState: {
		message: unknown;
	} = {
		message: scopedT("No result yet"),
	};

	const [response, action] = useFormState(
		makeTranslationMultilang,
		initialState,
	);

	const [selectedLangs, setSelectedLangs] = useState<string[]>([]);

	const [textToTranslate, setTextToTranslate] = useState("");

	const languages = optionsLangs({ scopedT });

	const isAllSelected = selectedLangs.length === languages.length;

	const toggleSelectAll = () => {
		if (isAllSelected) {
			setSelectedLangs([]);
		} else {
			setSelectedLangs(languages.map((lang) => lang.id));
		}
	};

	const handleLangToggle = (id: string) => {
		setSelectedLangs((prev) =>
			prev.includes(id) ? prev.filter((lang) => lang !== id) : [...prev, id],
		);
	};

	return (
		<form action={action} className="card space-y-6 p-6">
			<div className="grid gap-5 sm:grid-cols-2">
				<div>
					<label
						htmlFor="fromLang"
						className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500"
					>
						{scopedT("From")}
					</label>
					<select
						name="fromLang"
						id="fromLang"
						className="select-field"
						defaultValue={locale}
					>
						{languages.map((lang) => {
							return (
								<option key={lang.id} value={lang.id}>
									{lang.name}
								</option>
							);
						})}
					</select>
				</div>

				<div>
					<label
						htmlFor="toTranslate"
						className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500"
					>
						{scopedT("Text to Translate")}
					</label>
					<input
						type="text"
						id="toTranslate"
						name="toTranslate"
						placeholder="Type the text you want to translate"
						value={textToTranslate}
						onChange={(e) => {
							setTextToTranslate(e.target.value);
						}}
						className="input-field"
					/>
					<p className="mt-1.5 text-right text-xs text-slate-500">
						<span
							className={`font-medium ${textToTranslate.length > 4999 ? "text-red-500" : "text-slate-700"}`}
						>
							{textToTranslate.length}
						</span>
						<span className="text-slate-400"> / 5000</span>
					</p>
				</div>
			</div>

			<div className="flex items-center justify-between border-t border-slate-100 pt-5">
				<p className="text-sm font-medium text-slate-700 sm:text-base">
					{scopedT("Select the languages you want to translate the text to:")}
				</p>
				<ButtonSubmit />
			</div>

			<div className="flex items-center gap-3 rounded-lg bg-slate-50 px-4 py-3">
				<input
					type="checkbox"
					id="selectAll"
					checked={isAllSelected}
					onChange={toggleSelectAll}
					className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
				/>
				<label
					htmlFor="selectAll"
					className="cursor-pointer text-sm font-medium text-slate-700"
				>
					{isAllSelected ? scopedT("Deselect All") : scopedT("Select All")}
				</label>
				<span className="ml-auto text-xs text-slate-500">
					{selectedLangs.length} / {languages.length} selected
				</span>
			</div>

			<div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
				{languages.map((lang) => (
					<label
						key={lang.id}
						className={`flex cursor-pointer items-center gap-2.5 rounded-lg border px-3 py-2.5 transition-all duration-150 ${
							selectedLangs.includes(lang.id)
								? "border-blue-200 bg-blue-50 text-blue-700"
								: "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
						}`}
					>
						<input
							type="checkbox"
							id={lang.id}
							name={lang.id}
							checked={selectedLangs.includes(lang.id)}
							onChange={() => handleLangToggle(lang.id)}
							className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
						/>
						<span className="text-sm font-medium">{lang.name}</span>
					</label>
				))}
			</div>

			<div className="rounded-xl border border-slate-200 bg-white p-5">
				<h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">
					{scopedT("Translations:")}
				</h3>
				{Array.isArray(response.message) ? (
					<div className="grid gap-3 sm:grid-cols-2">
						{response.message.map((msg: any, index: any) => {
							const language = languages.find((lang) => lang.id === msg.to);
							return (
								<div
									key={language?.id ?? index}
									className="group relative rounded-lg border border-slate-100 bg-slate-50 p-3 transition-colors hover:border-slate-200"
								>
									<div className="mb-1 flex items-center justify-between">
										<span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
											{language ? language.name : msg.to}
										</span>
										<ButtonCopyUnicText text={msg.text} />
									</div>
									<p className="break-words text-sm text-slate-700">
										{msg.text}
									</p>
								</div>
							);
						})}
					</div>
				) : (
					<p className="text-sm text-slate-500">
						{typeof response.message === "string"
							? response.message
							: scopedT("No result yet")}
					</p>
				)}
			</div>
		</form>
	);
}
