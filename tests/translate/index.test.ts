import translate, { translateText } from '../../src/translate';
import { TranslationType } from '../../src/types';
import dotenv from 'dotenv';

dotenv.config();

describe('translate', () => {
	const key = process.env.KEY as string;
	const endpoint = 'https://api.cognitive.microsofttranslator.com/';
	const location = process.env.LOCATION as string;

	const fromLang = 'en';
	const toLang = 'pt';

	it('should translate a string from one language to another', async () => {
		const result = await translateText("Welcome", fromLang, toLang, endpoint, key, location);

		expect(result.data[0].translations[0].text).toEqual("Bem-vindo")
	});

	it('should translate a JSON object from one language to another', async () => {
		const jsonFile = {
			"Welcome": "Welcome"
		};

		const result = await translate(key, endpoint, location, fromLang, toLang, jsonFile as unknown as TranslationType);

		expect(result).toEqual({
			"Welcome": "Bem-vindo"
		});
	});

	it('should translate a JSON object from one language to another with nested objects', async () => {
		const jsonFile = {
			"HomePage": {
				Nested: {
					"message": "Translate me",
					SubNested: {
						"message": "Translate me too"
					}
				},
			}
		};

		const result = await translate(key, endpoint, location, fromLang, toLang, jsonFile as unknown as TranslationType);

		expect(result).toEqual({
			"HomePage": {
				Nested: {
					"message": "Traduza-me",
					SubNested: {
						"message": "Traduza-me também"
					}
				},
			}
		});
	});

	it('should translate a JSON object from one language to another with booleans', async () => {
		const jsonFile = {
			"HomePage": {
				WithBooleans: {
					"true": true as unknown as string,
					"false": false as unknown as string
				},
			}
		};

		const result = await translate(key, endpoint, location, fromLang, toLang, jsonFile as unknown as TranslationType);

		expect(result).toEqual({
			"HomePage": {
				WithBooleans: {
					"true": true,
					"false": false
				},
			}
		});
	});

	it('should translate a JSON object from one language to another with fake booleans', async () => {
		const jsonFile = {
			"HomePage": {
				WithFakeBooleans: {
					"true": "true",
					"false": "false"
				},
			}
		};

		const result = await translate(key, endpoint, location, fromLang, toLang, jsonFile as unknown as TranslationType);

		expect(result).toEqual({
			"HomePage": {
				WithFakeBooleans: {
					"true": "verdadeiro",
					"false": "falso"
				},
			}
		});
	});

	it('should translate a JSON object from one language to another with arrays', async () => {
		const jsonFile = {
			"HomePage": {
				WithArrays: {
					"array": ["Translate me", "Translate me too"]
				},
			}
		};

		const result = await translate(key, endpoint, location, fromLang, toLang, jsonFile as unknown as TranslationType);

		expect(result).toEqual({
			"HomePage": {
				WithArrays: {
					"array": ["Traduza-me", "Traduza-me também"]
				},
			}
		});
	});

	it('should translate a JSON object from one language to another with numbers', async () => {
		const jsonFile = {
			"HomePage": {
				WithNumbers: {
					"number": 123
				},
			}
		};

		const result = await translate(key, endpoint, location, fromLang, toLang, jsonFile as unknown as TranslationType);

		expect(result).toEqual({
			"HomePage": {
				WithNumbers: {
					"number": 123
				},
			}
		});
	});

	it('should translate a JSON object from one language to another with null', async () => {
		const jsonFile = {
			"HomePage": {
				WithNull: {
					"null": null
				},
			}
		};

		const result = await translate(key, endpoint, location, fromLang, toLang, jsonFile as unknown as TranslationType);

		expect(result).toEqual({
			"HomePage": {
				WithNull: {
					"null": null
				},
			}
		});
	});
});

