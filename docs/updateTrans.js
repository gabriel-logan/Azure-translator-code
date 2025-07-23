const { loadEnvConfig } = require("@next/env");
const { translateToMultipleFolders } = require("azure-translator-code");

loadEnvConfig(process.cwd());

const jsonFile = require("./src/locales/en/en.json");

const key = process.env.KEY;
const endpoint = "https://api.cognitive.microsofttranslator.com/";
const location = process.env.LOCATION;
const fromLang = "en";
const toLangs = [
	"ar",
	"cs",
	"da",
	"de",
	"el",
	"es",
	"fi",
	"fr",
	"hu",
	"id",
	"it",
	"ja",
	"ko",
	"nl",
	"no",
	"pl",
	"ro",
	"ru",
	"sv",
	"tr",
	"zh",
];

translateToMultipleFolders(
	key,
	endpoint,
	location,
	fromLang,
	toLangs,
	jsonFile,
	"src/locales/",
);
