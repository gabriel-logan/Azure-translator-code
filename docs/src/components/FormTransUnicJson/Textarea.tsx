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
			<label
				htmlFor="jsonfile"
				className="mb-2 mt-1 block text-base font-medium text-gray-700"
			>
				{scopedT("Paste the json code here")}
				<p className="float-right text-black">
					{scopedT("Len")}:{" "}
					<span className={`${jsonFileText.length > 5000 && "text-red-500"}`}>
						{jsonFileText.length}
					</span>{" "}
					/ 5000
				</p>
			</label>

			<AceEditor
				placeholder={`{
  "key": "value"
}`}
				mode="json"
				theme="tomorrow"
				name="jsonfileAce"
				fontSize={14}
				lineHeight={19}
				showPrintMargin
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

			<input
				type="hidden"
				name="jsonfile"
				value={jsonFileText}
				maxLength={5000}
			/>
		</>
	);
}
