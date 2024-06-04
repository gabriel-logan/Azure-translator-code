import { MetadataRoute } from "next";

import { getScopedI18n } from "@/locales/server";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
	const t = await getScopedI18n("Manifest");
	return {
		name: t("Name"),
		short_name: t("ShortName"),
		description: t("Description"),
		start_url: "/",
		display: "standalone",
		background_color: "white",
		lang: t("lang"),
		dir: t("Dir") as "ltr" | "rtl",
		categories: ["utilities", "translator", "code"],
	};
}
