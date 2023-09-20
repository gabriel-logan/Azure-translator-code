"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var uuid_1 = require("uuid");
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
function updateTranslationsMulti(key, endpoint, location, fromLang, toLangs, jsonFile, folderNamePath) {
    if (folderNamePath === void 0) { folderNamePath = 'multiFolderGeneratedTranslations'; }
    var rootDir = path_1.default.join(__dirname, '..', '..', '..', '..');
    var traducoesDir = path_1.default.join(rootDir, folderNamePath);
    if (!fs_1.default.existsSync(traducoesDir)) {
        fs_1.default.mkdirSync(traducoesDir, { recursive: true });
    }
    function translateText(text, from, to) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, (0, axios_1.default)({
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
                    })];
            });
        });
    }
    function translateAndSave(lang) {
        return __awaiter(this, void 0, void 0, function () {
            var langDir, outputFileName, translations, existingData, newTranslations, _a, _b, _c, _i, key_1, response, translatedText, error_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        langDir = path_1.default.join(traducoesDir, lang);
                        if (!fs_1.default.existsSync(langDir)) {
                            fs_1.default.mkdirSync(langDir);
                        }
                        outputFileName = path_1.default.join(langDir, "".concat(lang, ".json"));
                        translations = {};
                        if (fs_1.default.existsSync(outputFileName)) {
                            existingData = JSON.parse(fs_1.default.readFileSync(outputFileName, 'utf8'));
                            translations = existingData.translation;
                        }
                        newTranslations = {};
                        _a = jsonFile.translation;
                        _b = [];
                        for (_c in _a)
                            _b.push(_c);
                        _i = 0;
                        _d.label = 1;
                    case 1:
                        if (!(_i < _b.length)) return [3, 6];
                        _c = _b[_i];
                        if (!(_c in _a)) return [3, 5];
                        key_1 = _c;
                        if (!!translations[key_1]) return [3, 5];
                        _d.label = 2;
                    case 2:
                        _d.trys.push([2, 4, , 5]);
                        console.log('TO FAZENDO UMA REQUISICAO');
                        return [4, translateText(jsonFile.translation[key_1], fromLang, lang)];
                    case 3:
                        response = _d.sent();
                        translatedText = response.data[0].translations[0].text;
                        newTranslations[key_1] = translatedText;
                        console.log("Translating \"".concat(jsonFile.translation[key_1], "\" to ").concat(lang, " \n\n"));
                        return [3, 5];
                    case 4:
                        error_1 = _d.sent();
                        if (error_1 instanceof Error) {
                            console.error("Error translating \"".concat(key_1, "\" to ").concat(lang, ": ").concat(error_1.message, " \n"));
                        }
                        else {
                            console.error("An error occurred within the error (: \n");
                        }
                        return [3, 5];
                    case 5:
                        _i++;
                        return [3, 1];
                    case 6:
                        translations = __assign(__assign({}, translations), newTranslations);
                        fs_1.default.writeFileSync(outputFileName, JSON.stringify({ translation: translations }, null, 4));
                        console.log("Translations for ".concat(lang, " saved in ").concat(outputFileName, " \n\n"));
                        return [2];
                }
            });
        });
    }
    function translateAndSaveAll() {
        return __awaiter(this, void 0, void 0, function () {
            var translationPromises;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        translationPromises = toLangs.map(function (lang) { return translateAndSave(lang); });
                        return [4, Promise.all(translationPromises)];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    }
    translateAndSaveAll().catch(function (error) {
        console.error("Error translating and saving texts: ".concat(error.message, " \n"));
    });
}
exports.default = updateTranslationsMulti;
