"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { FaRegCopy } from "react-icons/fa6";

import { useScopedI18n } from "@/locales/client";

export default function InputResult({
	typing,
	response,
}: {
	typing: boolean;
	response: { message: string | unknown };
}) {
	const scopedT = useScopedI18n("FormComponent");
	const [isCopied, setIsCopied] = useState(false);

	const { pending } = useFormStatus();

	return (
		<>
			<textarea
				className="h-85% w-full resize-none bg-white p-2 text-black sm:h-4/5"
				placeholder="Translation"
				disabled
				value={
					typing || pending
						? scopedT("Translating...")
						: (response.message as string)
				}
				style={{ maxHeight: "80%", minHeight: "80%" }}
			/>
			{!typing && !pending && (
				<div
					className="absolute bottom-2 right-3 text-black"
					onClick={() => {
						navigator.clipboard.writeText(response.message as string);
						setIsCopied(true);
						setTimeout(() => {
							setIsCopied(false);
						}, 1000);
					}}
				>
					<FaRegCopy
						className="cursor-pointer text-black transition-colors duration-75 active:text-gray-300"
						size={18}
					/>
					<span className="text-gray-500">
						{isCopied ? scopedT("Copied") : ""}
					</span>
				</div>
			)}
		</>
	);
}
