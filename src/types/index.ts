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
