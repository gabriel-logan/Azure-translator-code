import { MetadataRoute } from "next";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
	return {
		name: "Azure Translator Code",
		short_name: "Azure Translator",
		description: "Translate your json file directly in the page",
		start_url: "/",
		display: "standalone",
		background_color: "white",
		lang: "en",
		dir: "ltr",
		categories: ["utilities", "translator", "code"],
	};
}
