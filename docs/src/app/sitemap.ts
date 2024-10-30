import { MetadataRoute } from "next";

import languageCodes from "@/lib/localesCode";

const routes: MetadataRoute.Sitemap = languageCodes.map((lang) => ({
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
