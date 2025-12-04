"use client";

import { useFormStatus } from "react-dom";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

import { useScopedI18n } from "@/locales/client";

export default function ResultDiv({
	state,
}: Readonly<{
	state: {
		message: unknown;
	};
}>) {
	const scopedT = useScopedI18n("FormComponent");

	const { pending } = useFormStatus();

	return (
		<>
			<p className="mb-2 text-sm font-semibold text-gray-600">
				{scopedT("Result: ")}
			</p>

			{pending ? (
				<div className="animate-pulse overflow-x-auto rounded bg-gray-100 p-2">
					<div className="mb-2 h-4 w-3/4 animate-pulse bg-gray-400" />
					<div className="mb-2 ml-4 h-4 w-1/2 animate-pulse bg-gray-400" />
					<div className="mb-2 ml-8 h-4 w-2/3 animate-pulse bg-gray-400" />
					<div className="mb-2 ml-8 h-4 w-1/2 animate-pulse bg-gray-400" />
					<div className="mb-2 ml-12 h-4 w-2/3 animate-pulse bg-gray-400" />
					<div className="mb-2 ml-12 h-4 w-1/2 animate-pulse bg-gray-400" />
					<div className="h-4 w-3/4 animate-pulse bg-gray-400" />
				</div>
			) : (
				<div className="overflow-x-auto rounded-md bg-gray-50 p-4 text-sm text-black shadow-inner">
					{typeof state.message === "string" ? (
						<p className="whitespace-pre-wrap break-words font-mono">
							{state.message}
						</p>
					) : (
						<SyntaxHighlighter
							language="json"
							style={oneLight}
							customStyle={{ margin: 0 }}
						>
							{JSON.stringify(state.message, null, 2)}
						</SyntaxHighlighter>
					)}
				</div>
			)}
		</>
	);
}
