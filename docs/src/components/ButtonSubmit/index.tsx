"use client";

import { useFormStatus } from "react-dom";

import { useScopedI18n } from "@/locales/client";

export default function ButtonSubmit() {
	const { pending } = useFormStatus();
	const scopedT = useScopedI18n("FormComponent");

	return (
		<button
			type="submit"
			disabled={pending}
			className="mt-5 w-28 rounded bg-blue-500 px-5 py-2 text-white hover:bg-blue-600"
		>
			{pending ? (
				<div className="mx-auto h-5 w-5 animate-spin rounded-full border-b-2 border-white" />
			) : (
				scopedT("Translate")
			)}
		</button>
	);
}
