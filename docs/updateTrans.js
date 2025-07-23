const { loadEnvConfig } = require("@next/env");
const { translateToMultipleFolders } = require("azure-translator-code");

loadEnvConfig(process.cwd());

const jsonFile = require("./src/locales/en/en.json");

const key = process.env.KEY;
const endpoint = "https://api.cognitive.microsofttranslator.com/";
const location = process.env.LOCATION;
const fromLang = "en";
const toLangs = ["pt"];

translateToMultipleFolders(
	key,
	endpoint,
	location,
	fromLang,
	toLangs,
	jsonFile,
	"src/locales/",
);
