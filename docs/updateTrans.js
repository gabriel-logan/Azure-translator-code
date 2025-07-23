const { loadEnvConfig } = require("@next/env");
const { translateToMultipleFolders } = require("azure-translator-code");

loadEnvConfig(process.cwd());

// ar cs  da  de  el  en  es  fi  fr  hu  id  it  ja  ko  ms  nl  no  pl  pt  ro  ru sv  th  tr  vi  zh

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
	"en",
	"es",
	"fi",
	"fr",
	"hu",
	"id",
	"it",
	"ja",
	"ko",
	"ms",
	"nl",
	"no",
	"pl",
	"pt",
	"ro",
	"ru",
	"sv",
	"th",
	"tr",
	"vi",
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
