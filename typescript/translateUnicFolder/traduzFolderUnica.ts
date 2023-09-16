import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';

const traducoesDir = path.join(__dirname, 'traducoes');

if (!fs.existsSync(traducoesDir)) {
	fs.mkdirSync(traducoesDir);
}

import { translation } from '../../jsonFiles/en.json'; // Carrega os valores diretamente do arquivo en.json

const key = 'YOURKEYHERE';
const endpoint = 'https://api.cognitive.microsofttranslator.com/';
const location = 'eastus';
const fromLang = 'en';
const toLangs = [
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
	'tlh-Latn',
]; // Defina os idiomas de destino aqui

function translateText(text, from, to) {
	return axios({
		baseURL: endpoint,
		url: '/translate',
		method: 'post',
		headers: {
			'Ocp-Apim-Subscription-Key': key,
			'Ocp-Apim-Subscription-Region': location,
			'Content-type': 'application/json',
			'X-ClientTraceId': uuidv4().toString(),
		},
		params: {
			'api-version': '3.0',
			from: from,
			to: to,
		},
		data: [
			{
				text: text,
			},
		],
		responseType: 'json',
	});
}

const outputData = {};

async function translateAndSave(lang) {
	const translations = {};

	for (const key in translation) {
		try {
			const response = await translateText(translation[key], fromLang, lang);
			const translatedText = response.data[0].translations[0].text;
			translations[key] = translatedText;
			console.log(`Traduzindo ${translation[key]} para ${lang}`);
		} catch (error) {
			console.error(`Erro ao traduzir "${key}" para ${lang}: ${error.message}`);
		}
	}

	outputData[lang] = translations;
}

async function translateAndSaveAll() {
	const translationPromises = toLangs.map((lang) => translateAndSave(lang));

	await Promise.all(translationPromises);

	for (const lang of toLangs) {
		const outputFileName = path.join(traducoesDir, `${lang}.json`);
		fs.writeFileSync(outputFileName, JSON.stringify({ translation: outputData[lang] }, null, 4));
		console.log(`Traduções para ${lang} salvas em ${outputFileName}`);
	}
}

translateAndSaveAll().catch((error) => {
	console.error(`Erro ao traduzir e salvar textos: ${error.message}`);
});
