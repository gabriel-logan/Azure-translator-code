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
			className="btn-primary min-w-[120px]"
		>
			{pending ? (
				<div className="mx-auto h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
			) : (
				scopedT("Translate")
			)}
		</button>
	);
}
