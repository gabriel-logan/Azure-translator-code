"use client";

import { useFormStatus } from "react-dom";

export default function ButtonSubmit() {
	const { pending } = useFormStatus();

	return (
		<button
			type="submit"
			disabled={pending}
			className="mt-5 w-28 rounded bg-blue-500 px-5 py-2 text-white hover:bg-blue-600"
		>
			{pending ? (
				<div className="mx-auto h-5 w-5 animate-spin rounded-full border-b-2 border-white" />
			) : (
				"Translate"
			)}
		</button>
	);
}
