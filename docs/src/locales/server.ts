// locales/server.ts
import { createI18nServer } from "next-international/server";

export const { getI18n, getScopedI18n, getStaticParams } = createI18nServer({
	en: () => import("./en/en.json"),
	pt: () => import("./pt/pt.json"),

	ar: () => import("./ar/ar.json"),
	cs: () => import("./cs/cs.json"),
	da: () => import("./da/da.json"),
	de: () => import("./de/de.json"),
	el: () => import("./el/el.json"),
	es: () => import("./es/es.json"),
	fi: () => import("./fi/fi.json"),
	fr: () => import("./fr/fr.json"),
	hu: () => import("./hu/hu.json"),
	id: () => import("./id/id.json"),
	it: () => import("./it/it.json"),
	ja: () => import("./ja/ja.json"),
	ko: () => import("./ko/ko.json"),
	ms: () => import("./ms/ms.json"),
	nl: () => import("./nl/nl.json"),
	no: () => import("./no/no.json"),
	pl: () => import("./pl/pl.json"),
	ro: () => import("./ro/ro.json"),
	ru: () => import("./ru/ru.json"),
	sv: () => import("./sv/sv.json"),
	th: () => import("./th/th.json"),
	tr: () => import("./tr/tr.json"),
	vi: () => import("./vi/vi.json"),
	zh: () => import("./zh/zh.json"),

	nn: () => import("./none/none.json"),
});
