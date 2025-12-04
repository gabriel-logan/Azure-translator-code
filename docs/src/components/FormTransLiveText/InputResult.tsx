"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { FaRegCopy, FaCheck } from "react-icons/fa6";

import { useScopedI18n } from "@/locales/client";

export default function InputResult({
	typing,
	response,
}: Readonly<{
	typing: boolean;
	response: { message: unknown };
}>) {
	const scopedT = useScopedI18n("FormComponent");
	const [isCopied, setIsCopied] = useState(false);
	const { pending } = useFormStatus();

	const isTranslating = typing || pending;
	const result = response.message as string;

	const handleCopy = () => {
		navigator.clipboard.writeText(result);
		setIsCopied(true);
		setTimeout(() => setIsCopied(false), 1500);
	};

	return (
		<div className="relative h-full w-full">
			{isTranslating ? (
				<div className="flex h-full items-center justify-center">
					<div className="flex items-center gap-2 text-sm text-slate-500">
						<div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-blue-500" />
						{scopedT("Translating...")}
					</div>
				</div>
			) : (
				<>
					<p className="whitespace-pre-wrap text-slate-700">
						{result || scopedT("Translation")}
					</p>
					{result?.length > 0 && result !== scopedT("Translation") && (
						<button
							type="button"
							onClick={handleCopy}
							className="absolute bottom-0 right-0 inline-flex items-center gap-1 rounded-md p-1.5 text-slate-400 transition-colors duration-200 hover:bg-white hover:text-slate-600"
							title={isCopied ? scopedT("Copied") : "Copy"}
						>
							{isCopied ? (
								<FaCheck className="h-3.5 w-3.5 text-emerald-500" />
							) : (
								<FaRegCopy className="h-3.5 w-3.5" />
							)}
						</button>
					)}
				</>
			)}
		</div>
	);
}
