/**
 * Represents the type of a translation object.
 */
export interface TranslationType {
	[key: string]: JSONValue;
}

export type JSONValue =
	| string
	| number
	| boolean
	| null
	| JSONArray
	| TranslationType
	| object;
export interface JSONArray extends Array<JSONValue> {}

export type TranslationTextFetch = {
	translations: { text: string; to: string }[];
}[];

export type LanguagesCode =
	| "en"
	| "pt"
	| "es"
	| "de"
	| "fr"
	| "it"
	| "ja"
	| "ko"
	| "ru"
	| "zh-Hans"
	| "zh-Hant"
	| "ar"
	| "tr"
	| "vi"
	| "th"
	| "sv"
	| "pl"
	| "nl"
	| "da"
	| "fi"
	| "no"
	| "cs"
	| "hu"
	| "el"
	| "id"
	| "ms";
