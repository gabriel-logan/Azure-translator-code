// middleware.ts
import { NextRequest } from "next/server";
import { createI18nMiddleware } from "next-international/middleware";

import localesCodes from "./lib/localesCode";

const I18nMiddleware = createI18nMiddleware({
	locales: localesCodes,
	defaultLocale: "en",
	urlMappingStrategy: "rewriteDefault",
});

export function middleware(request: NextRequest) {
	return I18nMiddleware(request);
}

export const config = {
	matcher: ["/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)"],
};
