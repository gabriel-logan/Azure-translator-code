import { MetadataRoute } from "next";

import { Langs } from "@/types/locales";

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

const routes: MetadataRoute.Sitemap = langs.map((lang) => ({
	url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/${lang}`,
	lastModified: new Date(),
	changeFrequency: "monthly",
	priority: 1,
}));

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 1,
		},
		...routes,
	];
}
