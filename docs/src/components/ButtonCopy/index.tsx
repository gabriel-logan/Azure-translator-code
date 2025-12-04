"use client";

import { useState } from "react";
import { FaRegCopy } from "react-icons/fa6";

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
			className="flex flex-col items-end ltr:float-right"
			onClick={() => {
				navigator.clipboard.writeText(
					typeof state.message === "string"
						? state.message
						: JSON.stringify(state.message, null, 2),
				);
				setIsCopied(true);
				setTimeout(() => {
					setIsCopied(false);
				}, 1000);
			}}
		>
			<FaRegCopy
				className="cursor-pointer text-black transition-colors duration-75 active:text-gray-300"
				size={22}
			/>
			<span className="text-gray-500">{isCopied ? scopedT("Copied") : ""}</span>
		</button>
	);
}

export function ButtonCopyUnicText({ text }: Readonly<{ text: string }>) {
	const scopedT = useScopedI18n("FormComponent");

	const [isCopied, setIsCopied] = useState(false);

	return (
		<button
			className="flex items-center justify-center"
			onClick={() => {
				navigator.clipboard.writeText(text);
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
			<span className="text-gray-500">{isCopied ? scopedT("Copied") : ""}</span>
		</button>
	);
}
