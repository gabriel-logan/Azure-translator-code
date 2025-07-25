const { loadEnvConfig } = require("@next/env");
const { updateTranslationsMulti } = require("azure-translator-code");

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

updateTranslationsMulti(
	key,
	endpoint,
	location,
	fromLang,
	toLangs,
	jsonFile,
	"src/locales/",
);

// Command:
// node ./updateTrans.js && yarn format
