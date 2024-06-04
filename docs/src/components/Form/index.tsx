"use client";

import { useState, useTransition } from "react";
import AceEditor from "react-ace";
import { useFormState } from "react-dom";
import { FaRegCopy } from "react-icons/fa6";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

import { makeTranslation } from "@/actions";
import { useScopedI18n } from "@/locales/client";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/ext-language_tools";

export default function Form() {
	const scopedT = useScopedI18n("FormComponent");

	const initialState = {
		message: scopedT("No result yet"),
	};

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
								{scopedT("From")}
							</label>
							<select
								name="fromLang"
								id="fromLang"
								className="w-full cursor-pointer rounded bg-gray-700 p-2 text-white sm:w-40"
							>
								<option value="en">{scopedT("Langs.English")}</option>
								<option value="pt">{scopedT("Langs.Portuguese")}</option>
								<option value="es">{scopedT("Langs.Spanish")}</option>
								<option value="fr">{scopedT("Langs.French")}</option>
								<option value="de">{scopedT("Langs.German")}</option>
								<option value="it">{scopedT("Langs.Italian")}</option>
								<option value="ja">{scopedT("Langs.Japanese")}</option>
								<option value="ko">{scopedT("Langs.Korean")}</option>
								<option value="ru">{scopedT("Langs.Russian")}</option>
								<option value="zh-Hans">
									{scopedT("Langs.Chinese Simplified")}
								</option>
								<option value="zh-Hant">
									{scopedT("Langs.Chinese Traditional")}
								</option>
								<option value="ar">{scopedT("Langs.Arabic")}</option>
								<option value="tr">{scopedT("Langs.Turkish")}</option>
								<option value="vi">{scopedT("Langs.Vietnamese")}</option>
								<option value="th">{scopedT("Langs.Thai")}</option>
								<option value="sv">{scopedT("Langs.Swedish")}</option>
								<option value="pl">{scopedT("Langs.Polish")}</option>
								<option value="nl">{scopedT("Langs.Dutch")}</option>
								<option value="da">{scopedT("Langs.Danish")}</option>
								<option value="fi">{scopedT("Langs.Finnish")}</option>
								<option value="no">{scopedT("Langs.Norwegian")}</option>
								<option value="cs">{scopedT("Langs.Czech")}</option>
								<option value="hu">{scopedT("Langs.Hungarian")}</option>
								<option value="el">{scopedT("Langs.Greek")}</option>
								<option value="id">{scopedT("Langs.Indonesian")}</option>
								<option value="ms">{scopedT("Langs.Malay")}</option>
							</select>
						</div>
					</div>
					<div className="mb-4 mt-5 w-full sm:mb-0 sm:mt-0">
						<div className="flex flex-col sm:mr-10 sm:items-end">
							<label
								htmlFor="toLang"
								className="block text-sm font-medium text-gray-400"
							>
								{scopedT("To")}
							</label>
							<select
								name="toLang"
								id="toLang"
								className="w-full cursor-pointer rounded bg-gray-700 p-2 text-white sm:w-40"
							>
								<option value="pt">{scopedT("Langs.Portuguese")}</option>
								<option value="en">{scopedT("Langs.English")}</option>
								<option value="es">{scopedT("Langs.Spanish")}</option>
								<option value="fr">{scopedT("Langs.French")}</option>
								<option value="de">{scopedT("Langs.German")}</option>
								<option value="it">{scopedT("Langs.Italian")}</option>
								<option value="ja">{scopedT("Langs.Japanese")}</option>
								<option value="ko">{scopedT("Langs.Korean")}</option>
								<option value="ru">{scopedT("Langs.Russian")}</option>
								<option value="zh-Hans">
									{scopedT("Langs.Chinese Simplified")}
								</option>
								<option value="zh-Hant">
									{scopedT("Langs.Chinese Traditional")}
								</option>
								<option value="ar">{scopedT("Langs.Arabic")}</option>
								<option value="tr">{scopedT("Langs.Turkish")}</option>
								<option value="vi">{scopedT("Langs.Vietnamese")}</option>
								<option value="th">{scopedT("Langs.Thai")}</option>
								<option value="sv">{scopedT("Langs.Swedish")}</option>
								<option value="pl">{scopedT("Langs.Polish")}</option>
								<option value="nl">{scopedT("Langs.Dutch")}</option>
								<option value="da">{scopedT("Langs.Danish")}</option>
								<option value="fi">{scopedT("Langs.Finnish")}</option>
								<option value="no">{scopedT("Langs.Norwegian")}</option>
								<option value="cs">{scopedT("Langs.Czech")}</option>
								<option value="hu">{scopedT("Langs.Hungarian")}</option>
								<option value="el">{scopedT("Langs.Greek")}</option>
								<option value="id">{scopedT("Langs.Indonesian")}</option>
								<option value="ms">{scopedT("Langs.Malay")}</option>
							</select>
						</div>
					</div>
				</div>
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
					className={`flex flex-col items-end ltr:float-right`}
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
					<span className="text-gray-500">
						{isCopied ? scopedT("Copied") : ""}
					</span>
				</div>
				<p className="font-medium text-gray-700">{scopedT("Result: ")}</p>

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
