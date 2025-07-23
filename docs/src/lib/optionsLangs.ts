import type { useScopedI18n } from "@/locales/client";
import type { LanguagesCode } from "@/types/translations";

export default function optionsLangs({
	scopedT,
}: {
	scopedT: ReturnType<typeof useScopedI18n>;
}): {
	id: LanguagesCode;
	name: string;
}[] {
	return [
		{ id: "en", name: scopedT("Langs.English") },
		{ id: "pt", name: scopedT("Langs.Portuguese") },
		{ id: "es", name: scopedT("Langs.Spanish") },
		{ id: "fr", name: scopedT("Langs.French") },
		{ id: "de", name: scopedT("Langs.German") },
		{ id: "it", name: scopedT("Langs.Italian") },
		{ id: "ja", name: scopedT("Langs.Japanese") },
		{ id: "ko", name: scopedT("Langs.Korean") },
		{ id: "ru", name: scopedT("Langs.Russian") },
		{ id: "zh-Hans", name: scopedT("Langs.Chinese Simplified") },
		{ id: "zh-Hant", name: scopedT("Langs.Chinese Traditional") },
		{ id: "ar", name: scopedT("Langs.Arabic") },
		{ id: "tr", name: scopedT("Langs.Turkish") },
		{ id: "vi", name: scopedT("Langs.Vietnamese") },
		{ id: "th", name: scopedT("Langs.Thai") },
		{ id: "sv", name: scopedT("Langs.Swedish") },
		{ id: "pl", name: scopedT("Langs.Polish") },
		{ id: "nl", name: scopedT("Langs.Dutch") },
		{ id: "da", name: scopedT("Langs.Danish") },
		{ id: "fi", name: scopedT("Langs.Finnish") },
		{ id: "no", name: scopedT("Langs.Norwegian") },
		{ id: "cs", name: scopedT("Langs.Czech") },
		{ id: "hu", name: scopedT("Langs.Hungarian") },
		{ id: "el", name: scopedT("Langs.Greek") },
		{ id: "id", name: scopedT("Langs.Indonesian") },
		{ id: "ms", name: scopedT("Langs.Malay") },
		{ id: "tlh-Latn", name: scopedT("Langs.Klingon") },
	];
}
