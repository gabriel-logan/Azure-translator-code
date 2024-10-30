export type LocalesCodes =
	| "en"
	| "pt"
	| "es"
	| "de"
	| "fr"
	| "it"
	| "ja"
	| "ko"
	| "ru"
	| "zh"
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

export interface Locale {
	locale: Readonly<LocalesCodes>;
}
