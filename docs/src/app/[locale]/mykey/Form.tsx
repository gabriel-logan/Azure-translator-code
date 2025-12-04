"use client";

import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import SelectOptionsLangs from "@/components/selectOptionsLangs";

const initialState = { message: "", error: null };

export default function MyKeyForm({
	translateLocal,
}: {
	translateLocal: (
		prevState: any,
		formData: FormData,
	) => Promise<{ message: string; error: string | null }>;
}) {
	const [showSecret, setShowSecret] = useState(false);
	const [state, formAction] = useFormState(translateLocal, initialState);

	return (
		<form action={formAction} method="POST" className="space-y-5">
			{/* Secret Key */}
			<div>
				<label
					htmlFor="ownkey"
					className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500"
				>
					Secret Key
				</label>
				<div className="relative">
					<input
						type={showSecret ? "text" : "password"}
						name="ownkey"
						id="ownkey"
						className="input-field pr-10"
						placeholder="Enter your Azure secret key"
					/>
					<button
						type="button"
						className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-600"
						onClick={() => setShowSecret(!showSecret)}
					>
						{showSecret ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
					</button>
				</div>
			</div>

			{/* Endpoint & Location */}
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
				<div>
					<label
						htmlFor="ownendpoint"
						className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500"
					>
						Endpoint
					</label>
					<input
						type="text"
						name="ownendpoint"
						id="ownendpoint"
						defaultValue="https://api.cognitive.microsofttranslator.com"
						className="input-field"
					/>
				</div>
				<div>
					<label
						htmlFor="ownlocation"
						className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500"
					>
						Location
					</label>
					<input
						type="text"
						name="ownlocation"
						id="ownlocation"
						placeholder="e.g. westus"
						className="input-field"
					/>
				</div>
			</div>

			{/* Languages */}
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
				<div>
					<label
						htmlFor="ownfromlang"
						className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500"
					>
						From Language
					</label>
					<select
						name="ownfromlang"
						id="ownfromlang"
						defaultValue="en"
						className="select-field"
					>
						<SelectOptionsLangs />
					</select>
				</div>
				<div>
					<label
						htmlFor="owntolang"
						className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500"
					>
						To Language
					</label>
					<select
						name="owntolang"
						id="owntolang"
						defaultValue="pt"
						className="select-field"
					>
						<SelectOptionsLangs />
					</select>
				</div>
			</div>

			{/* Text to translate */}
			<div>
				<label
					htmlFor="owntexttotranslate"
					className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500"
				>
					Text to Translate
				</label>
				<textarea
					name="owntexttotranslate"
					id="owntexttotranslate"
					className="input-field min-h-[100px] resize-none"
					placeholder="Write text you want to translate"
				/>
			</div>

			{/* Translated Result */}
			<div>
				<label
					htmlFor="owntexttranslated"
					className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500"
				>
					Translated Result
				</label>
				<div className="min-h-[100px] rounded-lg border border-slate-200 bg-slate-50 p-4">
					<p className="whitespace-pre-wrap text-sm text-slate-700">
						{state.message || "The translated result will appear here"}
					</p>
				</div>
			</div>

			{/* Submit */}
			<div className="flex justify-center pt-2">
				<Button />
			</div>
		</form>
	);
}

function Button() {
	const { pending } = useFormStatus();

	return (
		<button
			type="submit"
			disabled={pending}
			className="btn-primary min-w-[140px]"
		>
			{pending ? (
				<div className="mx-auto h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
			) : (
				"Test Key"
			)}
		</button>
	);
}
