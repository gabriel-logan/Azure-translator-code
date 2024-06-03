"use client";

import { useState, useTransition } from "react";
import AceEditor from "react-ace";
import { useFormState } from "react-dom";
import { FaRegCopy } from "react-icons/fa6";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

import { makeTranslation } from "@/actions";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/ext-language_tools";

const initialState = {
	message: "No result yet",
};

export default function Form() {
	const [isCopied, setIsCopied] = useState(false);

	const [jsonFileText, setJsonFileText] = useState("");

	const [isPedding, startTransition] = useTransition();

	const [state, formAction] = useFormState(makeTranslation, initialState);

	return (
		<>
			<form
				action={(formData: FormData) => {
					startTransition(() => {
						formAction(formData);
					});
				}}
			>
				<div className="flex flex-col rounded bg-gray-800 p-5 text-white sm:flex-row">
					<div className="w-full">
						<div className="sm:ml-10">
							<label
								htmlFor="fromLang"
								className="block text-sm font-medium text-gray-400"
							>
								From
							</label>
							<select
								name="fromLang"
								id="fromLang"
								className="w-full cursor-pointer rounded bg-gray-700 p-2 text-white sm:w-40"
							>
								<option value="en">English</option>
								<option value="pt">Portuguese</option>
								<option value="es">Spanish</option>
								<option value="fr">French</option>
								<option value="de">German</option>
								<option value="it">Italian</option>
								<option value="ja">Japanese</option>
								<option value="ko">Korean</option>
								<option value="ru">Russian</option>
								<option value="zh-Hans">Chinese Simplified</option>
								<option value="zh-Hant">Chinese Traditional</option>
								<option value="ar">Arabic</option>
								<option value="tr">Turkish</option>
								<option value="vi">Vietnamese</option>
								<option value="th">Thai</option>
								<option value="sv">Swedish</option>
								<option value="pl">Polish</option>
								<option value="nl">Dutch</option>
								<option value="da">Danish</option>
								<option value="fi">Finnish</option>
								<option value="no">Norwegian</option>
								<option value="cs">Czech</option>
								<option value="hu">Hungarian</option>
								<option value="el">Greek</option>
								<option value="id">Indonesian</option>
								<option value="ms">Malay</option>
							</select>
						</div>
					</div>
					<div className="mb-4 mt-5 w-full sm:mb-0 sm:mt-0">
						<div className="flex flex-col sm:mr-10 sm:items-end">
							<label
								htmlFor="toLang"
								className="block text-sm font-medium text-gray-400"
							>
								To
							</label>
							<select
								name="toLang"
								id="toLang"
								className="w-full cursor-pointer rounded bg-gray-700 p-2 text-white sm:w-40"
							>
								<option value="pt">Portuguese</option>
								<option value="en">English</option>
								<option value="es">Spanish</option>
								<option value="fr">French</option>
								<option value="de">German</option>
								<option value="it">Italian</option>
								<option value="ja">Japanese</option>
								<option value="ko">Korean</option>
								<option value="ru">Russian</option>
								<option value="zh-Hans">Chinese Simplified</option>
								<option value="zh-Hant">Chinese Traditional</option>
								<option value="ar">Arabic</option>
								<option value="tr">Turkish</option>
								<option value="vi">Vietnamese</option>
								<option value="th">Thai</option>
								<option value="sv">Swedish</option>
								<option value="pl">Polish</option>
								<option value="nl">Dutch</option>
								<option value="da">Danish</option>
								<option value="fi">Finnish</option>
								<option value="no">Norwegian</option>
								<option value="cs">Czech</option>
								<option value="hu">Hungarian</option>
								<option value="el">Greek</option>
								<option value="id">Indonesian</option>
								<option value="ms">Malay</option>
							</select>
						</div>
					</div>
				</div>
				<label
					htmlFor="jsonfile"
					className="mb-2 mt-1 block text-base font-medium text-gray-700"
				>
					Paste the json code here
					<p className="float-right text-black">
						Len:{" "}
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
					showPrintMargin={true}
					showGutter={true}
					width="100%"
					highlightActiveLine={true}
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

				<button
					type="submit"
					disabled={isPedding}
					className="mt-5 w-28 rounded bg-blue-500 px-5 py-2 text-white hover:bg-blue-600"
				>
					{isPedding ? (
						<div className="mx-auto h-5 w-5 animate-spin rounded-full border-b-2 border-white" />
					) : (
						"Translate"
					)}
				</button>
			</form>
			<div className="mt-5 rounded border p-3">
				<div
					className="float-right flex flex-col items-end"
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
					<span className="text-gray-500">{isCopied ? "Copied" : ""}</span>
				</div>
				<p className="font-medium text-gray-700">Result: </p>

				{isPedding ? (
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
			</div>
		</>
	);
}
