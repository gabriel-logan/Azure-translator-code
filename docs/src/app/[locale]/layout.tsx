import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";

import getTextDirection from "@/components/getTextDirection";
import { I18nProviderClient } from "@/locales/client";
import { getScopedI18n } from "@/locales/server";
import { Locale } from "@/types/locales";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
	const scopedT = await getScopedI18n("HomeLayout");
	return {
		metadataBase: new URL(
			process.env.NEXT_PUBLIC_WEBSITE_URL ||
				"https://azuretranslatorcode.vercel.app",
		),

		title: scopedT("Title"),
		description: scopedT("Description"),
		authors: { name: "Gabriel Logan" },
		classification: scopedT("Classification"),
		generator: "Next.js",
		publisher: "Gabriel Logan",
		creator: "Gabriel Logan",

		openGraph: {
			title: scopedT("OpenGraph.Title"),
			description: scopedT("OpenGraph.Description"),
			url: process.env.NEXT_PUBLIC_WEBSITE_URL,
			siteName: scopedT("OpenGraph.SiteName"),
			type: "website",
		},

		keywords: [
			"translator",
			"code",
			"azure",
			"microsoft",
			"tradutor",
			"traductor", // Spanish
			"traducteur", // French
			"Übersetzer", // German
			"traduttore", // Italian
			"翻訳者", // Japanese
			"번역가", // Korean
			"переводчик", // Russian
			"翻译", // Chinese Simplified
			"翻譯", // Chinese Traditional
			"مترجم", // Arabic
			"çevirmen", // Turkish
			"dịch giả", // Vietnamese
			"แปล", // Thai
			"översättare", // Swedish
			"tłumacz", // Polish
			"vertaler", // Dutch
			"oversætter", // Danish
			"kääntäjä", // Finnish
			"oversetter", // Norwegian
			"překladatel", // Czech
			"fordító", // Hungarian
			"μεταφραστής", // Greek
			"penerjemah", // Indonesian
			"penterjemah", // Malay
		],

		manifest: "/manifest.webmanifest",

		category: scopedT("Category"),

		verification: {
			google: process.env.NEXT_PUBLIC_GOOGLE_SEARCH_CONSOLE_API_KEY,
		},
	};
}

type RootLayoutProps = Readonly<{
	children: React.ReactNode;
	params: Locale;
}>;

export default async function RootLayout({
	children,
	params: { locale },
}: RootLayoutProps) {
	const scopedT = await getScopedI18n("HomeLayout");
	return (
		<html lang={locale} dir={getTextDirection(locale)}>
			<body className={inter.className}>
				<I18nProviderClient locale={locale}>
					{children}
					<footer>
						<p className="p-1 text-center text-gray-600">
							{scopedT("Created by")}{" "}
							<Link
								className="text-blue-500 hover:underline"
								href="https://github.com/gabriel-logan"
								target="_blank"
							>
								Gabriel Logan &copy; 2024
							</Link>
						</p>
					</footer>
				</I18nProviderClient>
				<Analytics />
			</body>
		</html>
	);
}
