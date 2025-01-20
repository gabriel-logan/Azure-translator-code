# Azure Translator Code

<p align="center">
  <img src="https://badge.fury.io/js/azure-translator-code.svg" alt="npm version" />
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT" /></a>
  <img src="https://img.shields.io/npm/dm/azure-translator-code.svg?style=flat-square" alt="npm downloads" />
</p>

**Azure Translator Code** is a powerful library for translating JSON files into multiple languages using the Azure Cognitive Translator service. This library supports translating JSON files located in multiple folders or within a single folder, depending on your needs.

**Supports:** `Node.js 18.x` and above

---

### Important Links

- **[NPM Page](https://www.npmjs.com/package/azure-translator-code)**
- **[GitHub Repository](https://github.com/gabriel-logan/Azure-translator-code)**
- **[Try the Library Here](https://azuretranslatorcode.vercel.app)**

---

## Installation

Install the library using npm or yarn:

### As Development Dependency

```bash
npm install -D azure-translator-code
```

or

```bash
yarn add -D azure-translator-code
```

### As Production Dependency

```bash
npm install azure-translator-code
```

or

```bash
yarn add azure-translator-code
```

---

## Usage

You can import the JSON file you want to translate in two ways:

### Importing a JSON File

```javascript
const jsonFile = require("./jsonFileToTranslate/en.json");

// or

const jsonFile = {
	HomePage: {
		welcome: "Welcome",
		hello: "Hello",
		SubText: {
			subText: "This is a subtext",
		},
	},
};
```

### Translating JSON to Multiple Languages

After importing the JSON file, you can use the library to translate it:

#### Importing the Functions

```javascript
const {
	translate,
	translateText,
	translateToMultipleFolders,
	translateToUnicFolder,
	updateTranslationsMulti,
	updateTranslationsUnic,
} = require("azure-translator-code");
// or
import {
	translate,
	translateText,
	translateToMultipleFolders,
	translateToUnicFolder,
	updateTranslationsMulti,
	updateTranslationsUnic,
} from "azure-translator-code";

import type { TranslationType } from "azure-translator-code";
```

Define your Azure API details and languages:

```javascript
const key = "YOUR_AZURE_KEY"; // Replace with your Azure API key
const endpoint = "https://api.cognitive.microsofttranslator.com/";
const location = "eastus";
const fromLang = "en";
const toLangs = [
	"pt",
	"de",
	"es",
	"fr",
	"it",
	"ja",
	"ko",
	"nl",
	"ru",
	"zh",
	"pt-pt",
	"ar",
	"tlh-Latn",
];

const jsonFile = {
	translation: {
		welcome: "Welcome",
		hello: "Hello",
	},
};

// Translate to multiple folders
translateToMultipleFolders(key, endpoint, location, fromLang, toLangs, jsonFile); 
// This will create a folder called multiFolderGeneratedTranslations

// Translate to a single folder
translateToUnicFolder(key, endpoint, location, fromLang, toLangs, jsonFile); 
// This will create a folder called unicFolderGeneratedTranslations

// Update translations in multiple folders
updateTranslationsMulti(key, endpoint, location, fromLang, toLangs, jsonFile); 
// Only new keys will be translated in the multiFolderGeneratedTranslations folder

// Update translations in a single folder
updateTranslationsUnic(key, endpoint, location, fromLang, toLangs, jsonFile); 
// Only new keys will be translated in the unicFolderGeneratedTranslations folder
```

### Customizing Folder Structure

You can specify the folder name or location where translations will be saved. Saving always starts from the project root folder.

```javascript
const key = "YOUR_AZURE_KEY";
const endpoint = "https://api.cognitive.microsofttranslator.com/";
const location = "eastus";
const fromLang = "en";
const toLangs = ["pt", "de"];

const jsonFile = {
	translation: {
		welcome: "Welcome",
		hello: "Hello",
	},
};

// Save translations in custom folder
translateToMultipleFolders(
	key,
	endpoint,
	location,
	fromLang,
	toLangs,
	jsonFile,
	"myFolder",
);
// This will create a folder called myFolder

translateToUnicFolder(
	key,
	endpoint,
	location,
	fromLang,
	toLangs,
	jsonFile,
	"./myFolder/OtherFolder/etc",
);
// This will create a folder at ./myFolder/OtherFolder/etc

// If you just want to update the file for new keys, use the update functions to avoid unnecessary requests.
```

---

## Translating and Logging Results

You can also log the translation results to the console for verification.

```javascript
const { translate, translateText } = require("azure-translator-code");

const key = "YOUR_AZURE_KEY"; 
const endpoint = "https://api.cognitive.microsofttranslator.com/";
const location = "eastus";
const fromLang = "en";
const toLangs = ["pt"];
const jsonFile = {
	HomePage: {
		Welcome: "Welcome",
		Hello: "Hello",
	},
};

translate(key, endpoint, location, fromLang, toLangs, jsonFile).then((res) => {
	console.log(res);
});

// Output
/**
{
	HomePage: {
		Welcome: "Bem-vindo",
		Hello: "Olá",
	},
};
 */

// or

translateText("Hello World!", fromLang, toLangs, endpoint, key, location).then(
	(res) => {
		console.log(res[0].translations);
	},
);

// Output -> [{ text: "Olá, mundo!", to: "pt" }]
```

Make sure to replace the `key`, `location` and `endpoint` with your actual Azure access credentials.

---

## Contributing

If you would like to contribute to this project, feel free to open an issue or submit a pull request on our [GitHub repository](https://github.com/gabriel-logan/Azure-translator-code).

---

<p align="center">
  <a href="https://www.buymeacoffee.com/gabriellogan" target="_blank">
    <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px;width: 217px;" >
  </a>
</p>
