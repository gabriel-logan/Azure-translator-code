import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: "*",
			allow: "/",
			disallow: ["/_next", "/api"],
		},
		sitemap: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/sitemap.xml`,
	};
}
