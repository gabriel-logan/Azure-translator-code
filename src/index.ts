import translate from "./translate";
import translateText from "./translate/translateText";
import translateToMultipleFolders from "./translateToMultipleFolders";
import translateToUnicFolder from "./translateToUnicFolder";
import updateTranslationsMulti from "./updateTranslationMulti";
import updateTranslationsUnic from "./updateTranslationUnic";

export type { TranslationType, JSONValue, JSONArray } from "./types";
export {
	translateToMultipleFolders,
	translateToUnicFolder,
	updateTranslationsMulti,
	updateTranslationsUnic,
	translate,
	translateText,
};
