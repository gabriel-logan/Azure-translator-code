// middleware.ts
import { NextRequest } from "next/server";
import { createI18nMiddleware } from "next-international/middleware";

import { Langs } from "./types/locales";

const langs: Langs[] = [
	"en",
	"pt",
	"es",
	"de",
	"fr",
	"it",
	"ja",
	"ko",
	"ru",
	"zh",
	"ar",
	"tr",
	"vi",
	"th",
	"sv",
	"pl",
	"nl",
	"da",
	"fi",
	"no",
	"cs",
	"hu",
	"el",
	"id",
	"ms",
];

const I18nMiddleware = createI18nMiddleware({
	locales: langs,
	defaultLocale: "en",
	urlMappingStrategy: "rewriteDefault",
});

export function middleware(request: NextRequest) {
	return I18nMiddleware(request);
}

export const config = {
	matcher: ["/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)"],
};
