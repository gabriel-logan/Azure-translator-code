"use client";

import optionsLangs from "@/lib/optionsLangs";
import { useScopedI18n } from "@/locales/client";

export default function SelectOptionsLangs() {
	const scopedT = useScopedI18n("FormComponent");

	const optionsLangsC = optionsLangs({ scopedT });

	return optionsLangsC.map((option) => (
		<option key={option.id} value={option.id}>
			{option.name}
		</option>
	));
}
