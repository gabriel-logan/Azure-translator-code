"use client";

import { useFormStatus } from "react-dom";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function ResultDiv({
	state,
}: Readonly<{
	state: {
		message: unknown;
	};
}>) {
	const { pending } = useFormStatus();

	return (
		<>
			{pending ? (
				<div className="animate-pulse space-y-2.5 rounded-xl bg-slate-50 p-4">
					<div className="h-4 w-3/4 rounded bg-slate-200" />
					<div className="ml-4 h-4 w-1/2 rounded bg-slate-200" />
					<div className="ml-8 h-4 w-2/3 rounded bg-slate-200" />
					<div className="ml-8 h-4 w-1/2 rounded bg-slate-200" />
					<div className="ml-4 h-4 w-2/3 rounded bg-slate-200" />
					<div className="h-4 w-1/3 rounded bg-slate-200" />
				</div>
			) : (
				<div className="max-h-[400px] overflow-auto rounded-xl bg-slate-50 p-4 text-sm">
					{typeof state.message === "string" ? (
						<p className="whitespace-pre-wrap break-words font-mono text-slate-700">
							{state.message}
						</p>
					) : (
						<SyntaxHighlighter
							language="json"
							style={oneLight}
							customStyle={{
								margin: 0,
								padding: 0,
								background: "transparent",
								fontSize: "0.875rem",
							}}
						>
							{JSON.stringify(state.message, null, 2)}
						</SyntaxHighlighter>
					)}
				</div>
			)}
		</>
	);
}
