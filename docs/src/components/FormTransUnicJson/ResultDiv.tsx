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
			<p className="font-medium text-gray-700">{scopedT("Result: ")}</p>

			{pending ? (
				<div className="animate-pulse overflow-x-auto rounded bg-gray-100 p-2">
					<div className="mb-2 h-4 w-3/4 animate-pulse bg-gray-400"></div>
					<div className="mb-2 ml-4 h-4 w-1/2 animate-pulse bg-gray-400"></div>
					<div className="mb-2 ml-8 h-4 w-2/3 animate-pulse bg-gray-400"></div>
					<div className="mb-2 ml-8 h-4 w-1/2 animate-pulse bg-gray-400"></div>
					<div className="mb-2 ml-12 h-4 w-2/3 animate-pulse bg-gray-400"></div>
					<div className="mb-2 ml-12 h-4 w-1/2 animate-pulse bg-gray-400"></div>
					<div className="h-4 w-3/4 animate-pulse bg-gray-400"></div>
				</div>
			) : (
				<pre className="overflow-x-auto text-black">
					{typeof state.message === "string" ? (
						state.message
					) : (
						<SyntaxHighlighter language="json" style={oneLight}>
							{JSON.stringify(state.message, null, 2)}
						</SyntaxHighlighter>
					)}
				</pre>
			)}
		</>
	);
}
