interface TranslationType {
	translation: Record<string, string>;
}
/**
 * @param key Your key from azure translator, something like: 'sds12312a213aaaa9b2d0c37eds37b'
 * @param endpoint The endpoint: 'https://api.cognitive.microsofttranslator.com/'
 * @param location Ex. 'eastus'
 * @param fromLang Ex. 'en'
 * @param toLangs Ex. [
                                                'pt',
                                                'de',
                                                'es',
                                                'fr',
                                                'it',
                                                'ja',
                                                'ko',
                                                'nl',
                                                'ru',
                                                'zh',
                                                'pt-pt',
                                                'ar',
                                                'tlh-Latn'
                                            ];
 * @param jsonFile
 * It must follow the following structure:
 *
 * {
            "translation": {
                "welcome": "Welcome",
                "hello": "Hello",
                "good_morning": "Good morning",
                "good_afternoon": "Good afternoon",
                "good_evening": "Good evening",
                "thank_you": "Thank you",
                "please": "Please",
                "yes": "Yes",
                "no": "No",
                "error_message": "An error occurred"
            }
        }
 *
        If you need, copy this structure to get better then make your modification
 *
        @description This function will return a folder called folder multiFolderGeneratedTranslations
 */
export default function translateToMultipleFolders(
	key: string,
	endpoint: string,
	location: string,
	fromLang: string,
	toLangs: string[],
	jsonFile: TranslationType,
): void;
export {};
