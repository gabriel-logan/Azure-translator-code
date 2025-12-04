"use client";

import { useState } from "react";
import { FaRegCopy, FaCheck } from "react-icons/fa6";

import { useScopedI18n } from "@/locales/client";

export default function ButtonCopy({
	state,
}: Readonly<{
	state: { message: unknown };
}>) {
	const scopedT = useScopedI18n("FormComponent");

	const [isCopied, setIsCopied] = useState(false);

	return (
		<button
			className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition-all duration-200 hover:border-slate-300 hover:bg-slate-50"
			onClick={() => {
				navigator.clipboard.writeText(
					typeof state.message === "string"
						? state.message
						: JSON.stringify(state.message, null, 2),
				);
				setIsCopied(true);
				setTimeout(() => {
					setIsCopied(false);
				}, 1500);
			}}
		>
			{isCopied ? (
				<>
					<FaCheck className="h-3 w-3 text-emerald-500" />
					<span className="text-emerald-600">{scopedT("Copied")}</span>
				</>
			) : (
				<>
					<FaRegCopy className="h-3 w-3" />
					<span>Copy</span>
				</>
			)}
		</button>
	);
}

export function ButtonCopyUnicText({ text }: Readonly<{ text: string }>) {
	const scopedT = useScopedI18n("FormComponent");

	const [isCopied, setIsCopied] = useState(false);

	return (
		<button
			className="inline-flex items-center gap-1 rounded-md p-1.5 text-slate-400 transition-colors duration-200 hover:bg-slate-100 hover:text-slate-600"
			onClick={() => {
				navigator.clipboard.writeText(text);
				setIsCopied(true);
				setTimeout(() => {
					setIsCopied(false);
				}, 1500);
			}}
			title={isCopied ? scopedT("Copied") : "Copy"}
		>
			{isCopied ? (
				<FaCheck className="h-3.5 w-3.5 text-emerald-500" />
			) : (
				<FaRegCopy className="h-3.5 w-3.5" />
			)}
		</button>
	);
}
