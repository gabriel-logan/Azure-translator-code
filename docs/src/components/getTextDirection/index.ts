export default function getTextDirection(locale: string) {
	// Add the locales for your RTL languages here
	const rtlLocales = ["ar", "he", "fa", "ur"];
	return rtlLocales.includes(locale) ? "rtl" : "ltr";
}
