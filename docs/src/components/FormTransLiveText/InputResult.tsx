"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { FaRegCopy } from "react-icons/fa6";

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
		setTimeout(() => setIsCopied(false), 1000);
	};

	return (
		<div className="relative h-full w-full">
			<textarea
				className="h-full w-full resize-none rounded-md bg-gray-50 p-3 text-sm text-gray-800 outline-none"
				placeholder={scopedT("Translation")}
				disabled
				value={isTranslating ? scopedT("Translating...") : result}
			/>
			{!isTranslating && result?.length > 0 && (
				<button
					type="button"
					onClick={handleCopy}
					className="absolute bottom-3 right-3 flex items-center gap-1 text-xs text-gray-600 hover:text-black"
				>
					<FaRegCopy size={16} />
					{isCopied ? scopedT("Copied") : ""}
				</button>
			)}
		</div>
	);
}
