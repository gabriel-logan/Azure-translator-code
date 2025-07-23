"use client";

import { useScopedI18n } from "@/locales/client";
import type { LanguagesCode } from "@/types/translations";

export default function SelectOptionsLangs() {
	const scopedT = useScopedI18n("FormComponent");

	const optionsLangs: {
		lang: LanguagesCode;
		name: string;
	}[] = [
		{ lang: "en", name: scopedT("Langs.English") },
		{ lang: "pt", name: scopedT("Langs.Portuguese") },
		{ lang: "es", name: scopedT("Langs.Spanish") },
		{ lang: "fr", name: scopedT("Langs.French") },
		{ lang: "de", name: scopedT("Langs.German") },
		{ lang: "it", name: scopedT("Langs.Italian") },
		{ lang: "ja", name: scopedT("Langs.Japanese") },
		{ lang: "ko", name: scopedT("Langs.Korean") },
		{ lang: "ru", name: scopedT("Langs.Russian") },
		{ lang: "zh-Hans", name: scopedT("Langs.Chinese Simplified") },
		{ lang: "zh-Hant", name: scopedT("Langs.Chinese Traditional") },
		{ lang: "ar", name: scopedT("Langs.Arabic") },
		{ lang: "tr", name: scopedT("Langs.Turkish") },
		{ lang: "vi", name: scopedT("Langs.Vietnamese") },
		{ lang: "th", name: scopedT("Langs.Thai") },
		{ lang: "sv", name: scopedT("Langs.Swedish") },
		{ lang: "pl", name: scopedT("Langs.Polish") },
		{ lang: "nl", name: scopedT("Langs.Dutch") },
		{ lang: "da", name: scopedT("Langs.Danish") },
		{ lang: "fi", name: scopedT("Langs.Finnish") },
		{ lang: "no", name: scopedT("Langs.Norwegian") },
		{ lang: "cs", name: scopedT("Langs.Czech") },
		{ lang: "hu", name: scopedT("Langs.Hungarian") },
		{ lang: "el", name: scopedT("Langs.Greek") },
		{ lang: "id", name: scopedT("Langs.Indonesian") },
		{ lang: "ms", name: scopedT("Langs.Malay") },
		{ lang: "tlh-Latn", name: scopedT("Langs.Klingon") },
	];

	return optionsLangs.map((option) => (
		<option key={option.lang} value={option.lang}>
			{option.name}
		</option>
	));
}
