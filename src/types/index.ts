/**
 * Represents the type of a translation object.
 */
export type TranslationType = {
	[key: string]: string | boolean | null | number | TranslationType | TranslationType[];
};
