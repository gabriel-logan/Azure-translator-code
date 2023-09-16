"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const uuid_1 = require("uuid");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function translateToUnicFolder(key, endpoint, location, fromLang, toLangs, jsonFile) {
    const folderName = 'unicFolderGeneratedTranslations';
    const traducoesDir = path_1.default.join(__dirname, '..', '..', folderName);
    if (!fs_1.default.existsSync(traducoesDir)) {
        fs_1.default.mkdirSync(traducoesDir);
    }
    const { translation } = jsonFile;
    function translateText(text, from, to) {
        return (0, axios_1.default)({
            baseURL: endpoint,
            url: '/translate',
            method: 'post',
            headers: {
                'Ocp-Apim-Subscription-Key': key,
                'Ocp-Apim-Subscription-Region': location,
                'Content-type': 'application/json',
                'X-ClientTraceId': (0, uuid_1.v4)().toString(),
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
                console.log(`Traduzindo ${translation[key]} para ${lang} \n\n`);
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error(`Erro ao traduzir "${key}" para ${lang}: ${error.message} \n`);
                }
                else {
                    console.error(`Algum erro aconteceu no erro (: \n`);
                }
            }
        }
        outputData[lang] = translations;
    }
    async function translateAndSaveAll() {
        const translationPromises = toLangs.map((lang) => translateAndSave(lang));
        await Promise.all(translationPromises);
        for (const lang of toLangs) {
            const outputFileName = path_1.default.join(traducoesDir, `${lang}.json`);
            fs_1.default.writeFileSync(outputFileName, JSON.stringify({ translation: outputData[lang] }, null, 4));
            console.log(`Traduções para ${lang} salvas em ${outputFileName} \n\n`);
        }
    }
    translateAndSaveAll().catch((error) => {
        console.error(`Erro ao traduzir e salvar textos: ${error.message} \n`);
    });
}
exports.default = translateToUnicFolder;
