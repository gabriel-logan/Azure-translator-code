"use client";

import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const initialState = {
	message: "",
	error: null,
};

export default function MyKeyForm({
	translateLocal,
}: Readonly<{
	translateLocal: (
		prevState: any,
		formData: FormData,
	) => Promise<{
		message: string;
		error: string | null;
	}>;
}>) {
	const [showSecret, setShowSecret] = useState(true);

	const [state, formAction] = useFormState(translateLocal, initialState);

	// eslint-disable-next-line no-console
	console.log(state);

	return (
		<form action={formAction} method="POST" className="space-y-5">
			<div className="relative">
				<label
					htmlFor="ownkey"
					className="mb-1 block text-sm font-medium text-gray-700"
				>
					Secret Key
				</label>
				<input
					type={showSecret ? "password" : "text"}
					name="ownkey"
					id="ownkey"
					className="w-full rounded-md border border-gray-300 p-3 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200"
					placeholder="Enter your secret key"
					autoComplete="off"
					autoSave="off"
				/>
				<button
					type="button"
					className="absolute right-3 top-9 cursor-pointer"
					onClick={() => setShowSecret(!showSecret)}
				>
					{showSecret ? (
						<FaEyeSlash color="black" size={24} />
					) : (
						<FaEye color="black" size={24} />
					)}
				</button>
			</div>
			<div>
				<label
					htmlFor="ownendpoint"
					className="mb-1 block text-sm font-medium text-gray-700"
				>
					Azure Endpoint
				</label>
				<input
					type="text"
					name="ownendpoint"
					id="ownendpoint"
					className="w-full rounded-md border border-gray-300 p-3 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200"
					placeholder="Enter your Azure endpoint"
					defaultValue="https://api.cognitive.microsofttranslator.com"
				/>
			</div>
			<div>
				<label
					htmlFor="ownlocation"
					className="mb-1 block text-sm font-medium text-gray-700"
				>
					Location
				</label>
				<input
					type="text"
					name="ownlocation"
					id="ownlocation"
					className="w-full rounded-md border border-gray-300 p-3 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200"
					placeholder="Enter your location: e.g. westus"
				/>
			</div>

			<div className="space-y-2">
				<label
					htmlFor="ownfromlang"
					className="mb-1 block text-sm font-medium text-gray-700"
				>
					From Language
				</label>
				<select
					name="ownfromlang"
					id="ownfromlang"
					className="w-full rounded-md border border-gray-300 p-3 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200"
					defaultValue="en"
				>
					<option value="en">English</option>
					<option value="pt">Portuguese</option>
					<option value="fr">French</option>
					<option value="de">German</option>
					<option value="it">Italian</option>
					<option value="es">Spanish</option>
				</select>

				<label
					htmlFor="owntolang"
					className="mb-1 block text-sm font-medium text-gray-700"
				>
					To Languages
				</label>

				<select
					name="owntolang"
					id="owntolang"
					className="w-full rounded-md border border-gray-300 p-3 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200"
					defaultValue="pt"
				>
					<option value="en">English</option>
					<option value="pt">Portuguese</option>
					<option value="fr">French</option>
					<option value="de">German</option>
					<option value="it">Italian</option>
					<option value="es">Spanish</option>
				</select>
			</div>

			<div>
				<label
					htmlFor="owntexttotranslate"
					className="mb-1 block text-sm font-medium text-gray-700"
				>
					Text to translate
				</label>
				<textarea
					name="owntexttotranslate"
					id="owntexttotranslate"
					className="max-h-60 min-h-20 w-full rounded-md border border-gray-300 p-3 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200"
					placeholder="Enter text to translate"
				/>
			</div>
			<div>
				<label
					htmlFor="owntexttranslated"
					className="mb-1 block text-sm font-medium text-gray-700"
				>
					Translated text (if any)
				</label>
				<textarea
					name="owntexttranslated"
					id="owntexttranslated"
					disabled
					className="max-h-40 min-h-32 w-full rounded-md border border-gray-300 p-3 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200"
					placeholder="Translated text will appear here"
					value={state.message}
				/>
			</div>
			<div className="text-center">
				<Button />
			</div>
		</form>
	);
}

function Button() {
	const { pending } = useFormStatus();

	return (
		<>
			{pending ? (
				<LoadingSpinner />
			) : (
				<button
					type="submit"
					disabled={pending}
					className="mt-6 inline-flex items-center justify-center rounded-md bg-blue-600 px-5 py-3 font-semibold text-white transition duration-150 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
				>
					Test Key
				</button>
			)}
		</>
	);
}

function LoadingSpinner() {
	return (
		<div className="flex items-center justify-center">
			<div className="h-16 w-16 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
		</div>
	);
}
