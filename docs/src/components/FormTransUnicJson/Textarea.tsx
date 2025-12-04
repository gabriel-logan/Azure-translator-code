"use client";

import { useState } from "react";
import AceEditor from "react-ace";

import { useScopedI18n } from "@/locales/client";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/ext-language_tools";

export default function Textarea() {
	const scopedT = useScopedI18n("FormComponent");

	const [jsonFileText, setJsonFileText] = useState("");

	return (
		<>
			<div className="flex items-center justify-between">
				<label
					className="text-sm font-semibold text-slate-700"
					htmlFor="jsonfile"
				>
					{scopedT("Paste the json code here")}
				</label>
				<span className="text-xs text-slate-500">
					<span
						className={`font-medium ${jsonFileText.length > 5000 ? "text-red-500" : "text-slate-700"}`}
					>
						{jsonFileText.length}
					</span>
					<span className="text-slate-400"> / 5000</span>
				</span>
			</div>

			<div className="mt-2 overflow-hidden rounded-xl border border-slate-200 shadow-sm transition-shadow focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-100">
				<AceEditor
					placeholder={`{
  "key": "value"
}`}
					mode="json"
					theme="tomorrow"
					name="jsonfileAce"
					fontSize={14}
					lineHeight={20}
					showPrintMargin={false}
					showGutter
					width="100%"
					highlightActiveLine
					value={jsonFileText}
					onChange={(value) => {
						setJsonFileText(value);
					}}
					editorProps={{ $blockScrolling: true }}
					setOptions={{
						enableBasicAutocompletion: true,
						enableLiveAutocompletion: true,
						enableSnippets: false,
						showLineNumbers: true,
						tabSize: 2,
						useWorker: false,
					}}
				/>
			</div>

			<input
				type="hidden"
				name="jsonfile"
				value={jsonFileText}
				maxLength={5000}
			/>
		</>
	);
}
