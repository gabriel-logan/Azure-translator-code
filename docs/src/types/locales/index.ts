export type LocalesCodes =
	| "en"
	| "pt"
	| "es"
	| "de"
	| "fr"
	| "it"
	| "ja"
	| "ko"
	| "ro"
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
	| "ms"
	| "pp"; // "pp" is used for the placeholder locale

export interface Locale {
	locale: Readonly<LocalesCodes>;
}
