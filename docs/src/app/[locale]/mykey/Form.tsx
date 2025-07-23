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
		<form action={formAction} method="POST" className="space-y-6">
			{/* Secret Key */}
			<div className="relative">
				<label
					htmlFor="ownkey"
					className="block text-sm font-medium text-gray-700"
				>
					Secret Key
				</label>
				<input
					type={showSecret ? "text" : "password"}
					name="ownkey"
					id="ownkey"
					className="mt-1 w-full rounded-md border border-gray-300 p-3 text-gray-700 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
					placeholder="Enter your Azure secret key"
				/>
				<button
					type="button"
					className="absolute right-3 top-10 text-gray-500"
					onClick={() => setShowSecret(!showSecret)}
				>
					{showSecret ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
				</button>
			</div>

			{/* Endpoint & Location */}
			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
				<div>
					<label
						htmlFor="ownendpoint"
						className="block text-sm font-medium text-gray-700"
					>
						Endpoint
					</label>
					<input
						type="text"
						name="ownendpoint"
						id="ownendpoint"
						defaultValue="https://api.cognitive.microsofttranslator.com"
						className="mt-1 w-full rounded-md border border-gray-300 p-3 text-gray-700 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
					/>
				</div>
				<div>
					<label
						htmlFor="ownlocation"
						className="block text-sm font-medium text-gray-700"
					>
						Location
					</label>
					<input
						type="text"
						name="ownlocation"
						id="ownlocation"
						placeholder="e.g. westus"
						className="mt-1 w-full rounded-md border border-gray-300 p-3 text-gray-700 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
					/>
				</div>
			</div>

			{/* Languages */}
			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
				<div>
					<label
						htmlFor="ownfromlang"
						className="block text-sm font-medium text-gray-700"
					>
						From Language
					</label>
					<select
						name="ownfromlang"
						id="ownfromlang"
						defaultValue="en"
						className="mt-1 w-full rounded-md border border-gray-300 p-3 text-gray-700 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
					>
						<SelectOptionsLangs />
					</select>
				</div>
				<div>
					<label
						htmlFor="owntolang"
						className="block text-sm font-medium text-gray-700"
					>
						To Language
					</label>
					<select
						name="owntolang"
						id="owntolang"
						defaultValue="pt"
						className="mt-1 w-full rounded-md border border-gray-300 p-3 text-gray-700 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
					>
						<SelectOptionsLangs />
					</select>
				</div>
			</div>

			{/* Text to translate */}
			<div>
				<label
					htmlFor="owntexttotranslate"
					className="block text-sm font-medium text-gray-700"
				>
					Text to Translate
				</label>
				<textarea
					name="owntexttotranslate"
					id="owntexttotranslate"
					className="mt-1 min-h-[80px] w-full rounded-md border border-gray-300 p-3 text-gray-700 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
					placeholder="Write text you want to translate"
				/>
			</div>

			{/* Translated Result */}
			<div>
				<label
					htmlFor="owntexttranslated"
					className="block text-sm font-medium text-gray-700"
				>
					Translated Result
				</label>
				<textarea
					id="owntexttranslated"
					disabled
					value={state.message}
					className="mt-1 min-h-[80px] w-full rounded-md border border-gray-200 bg-gray-100 p-3 text-gray-700"
					placeholder="The translated result will appear here"
				/>
			</div>

			{/* Submit */}
			<div className="text-center">
				<Button />
			</div>
		</form>
	);
}

function Button() {
	const { pending } = useFormStatus();

	return pending ? (
		<div className="flex justify-center">
			<div className="h-6 w-6 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
		</div>
	) : (
		<button
			type="submit"
			className="mt-6 inline-block rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
		>
			Test Key
		</button>
	);
}
