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
		<form action={action} className="w-full rounded bg-white p-4 shadow-md">
			<div className="mb-4">
				<div>
					<label
						htmlFor="fromLang"
						className="block text-sm font-medium text-gray-400"
					>
						{scopedT("From")}
					</label>
					<select
						name="fromLang"
						id="fromLang"
						className="w-full cursor-pointer rounded bg-gray-700 p-3 text-white"
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
				<label
					htmlFor="toTranslate"
					className="mb-2 mt-4 block font-medium text-gray-700"
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
					className="w-full rounded border border-gray-300 p-3 text-black"
				/>
				<p className="float-right text-black">
					{scopedT("Len")}:{" "}
					<span
						className={`${textToTranslate.length > 4999 && "text-red-500"}`}
					>
						{textToTranslate.length}
					</span>{" "}
					/ 5000
				</p>
			</div>

			<ButtonSubmit />

			<p className="mt-4 text-base text-black sm:text-lg">
				{scopedT("Select the languages you want to translate the text to:")}
			</p>

			<div className="mb-4 flex items-center justify-between">
				<div className="flex items-center">
					<input
						type="checkbox"
						id="selectAll"
						checked={isAllSelected}
						onChange={toggleSelectAll}
						className="mr-2"
					/>
					<label
						htmlFor="selectAll"
						className="cursor-pointer text-sm text-gray-700 sm:text-base md:text-lg lg:text-2xl"
					>
						{isAllSelected ? scopedT("Deselect All") : scopedT("Select All")}
					</label>
				</div>
			</div>

			<div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:mt-4 lg:grid-cols-4 xl:lg:grid-cols-5 xl:mt-2">
				{languages.map((lang) => (
					<div key={lang.id} className="flex cursor-pointer items-center">
						<input
							type="checkbox"
							id={lang.id}
							name={lang.id}
							checked={selectedLangs.includes(lang.id)}
							onChange={() => handleLangToggle(lang.id)}
							className="mr-2"
						/>
						<label
							htmlFor={lang.id}
							className="cursor-pointer text-sm text-gray-700 sm:text-base md:text-lg lg:text-2xl"
						>
							{lang.name}
						</label>
					</div>
				))}
			</div>
			<div className="mt-3 rounded-lg bg-white p-3 shadow">
				<h3 className="mb-4 text-xl font-bold text-black">
					{scopedT("Translations:")}{" "}
				</h3>
				{Array.isArray(response.message) ? (
					<>
						{response.message.map((msg: any, index: any) => {
							const language = languages.find((lang) => lang.id === msg.to);
							return (
								<div
									key={language?.id ?? index}
									className="relative mb-3 rounded border p-1"
								>
									<p className="text-lg text-black">
										<span className="font-bold">
											{language ? language.name : msg.to}
										</span>
										: <span className="break-words">{msg.text}</span>
										<div className="absolute right-1 top-1">
											<ButtonCopyUnicText text={msg.text} />
										</div>
									</p>
								</div>
							);
						})}
					</>
				) : (
					<p className="text-lg text-black">
						{typeof response.message === "string"
							? response.message
							: scopedT("No result yet")}
					</p>
				)}
			</div>
		</form>
	);
}
