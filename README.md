# Azure Translator Code

The Azure Translator Code library is a powerful tool for translating JSON files into multiple languages using the Azure Cognitive Translator service. This library supports translation of JSON files in multiple folders or within a single folder, depending on your needs.

[![npm version](https://badge.fury.io/js/azure-translator-code.svg)](https://badge.fury.io/js/azure-translator-code)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm downloads](https://img.shields.io/npm/dm/azure-translator-code.svg?style=flat-square)](https://npm-stat.com/charts.html?package=azure-translator-code)

<p align="center">
	<a href="https://www.buymeacoffee.com/gabriellogan" target="_blank">
		<img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" >
	</a>
</p>

NPM PAGE: https://www.npmjs.com/package/azure-translator-code

GITHUB PAGE: https://github.com/gabriel-logan/Azure-translator-code

## Installation

To get started, you can install the library via npm:

As devDependencies
```bash
npm install -D azure-translator-code
```
or

As dependencies
```bash
npm install azure-translator-code
```

You also can use yarn

```bash
yarn add install azure-translator-code
```

## Usage

You can import the JSON file you want to translate in two different ways:

### Importing a JSON File

```javascript
const jsonFile = require('./jsonFileToTranslate/en.json');

// or

// IMPORTANT
// The file must follow this structure.
const jsonFile = {
  "translation": {
    "welcome": "Welcome",
    "hello": "Hello",
  }
};
```

Now, you can use the library to translate the JSON file into multiple languages:

```javascript
const { translateToMultipleFolders, translateToUnicFolder } = require('azure-translator-code');
```
or
```javascript
import { translateToMultipleFolders, translateToUnicFolder } from 'azure-translator-code';
```

```javascript
const key = 'sds12312a213aaaa9b2d0c37eds37b'; // REPLACE WITH YOUR OWN KEY HERE
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
  'tlh-Latn'
];

const jsonFile = {
  "translation": {
    "welcome": "Welcome",
    "hello": "Hello"
  }
};

// Translation to multiple folders
translateToMultipleFolders(key, endpoint, location, fromLang, toLangs, jsonFile);
// This function will return a folder called multiFolderGeneratedTranslations



// Translation to a single folder
translateToUnicFolder(key, endpoint, location, fromLang, toLangs, jsonFile);
// This function will return a folder called unicFolderGeneratedTranslations
```

#### You can also choose the folder or folder name where you will save the files.
##### Saving always starts from the project root folder.

```javascript
const { translateToMultipleFolders, translateToUnicFolder } = require('azure-translator-code');

const key = 'sds12312a213aaaa9b2d0c37eds37b'; // REPLACE WITH YOUR OWN KEY HERE
const endpoint = 'https://api.cognitive.microsofttranslator.com/';
const location = 'eastus';
const fromLang = 'en';
const toLangs = ['pt', 'de'];

const jsonFile = {
  "translation": {
    "welcome": "Welcome",
    "hello": "Hello",
  }
};

// IMPORTANT: If you use '../../' it will try to save to a location before the root folder

// Translation to multiple folders
translateToMultipleFolders(key, endpoint, location, fromLang, toLangs, jsonFile, 'myFolder');
// This function will return a folder called myFolder


// Translation to a single folder
translateToUnicFolder(key, endpoint, location, fromLang, toLangs, jsonFile, 'myFolder/OtherFolder/etc');
// This function will return a folder called ./myFolder/OtherFolder/etc


// Translation to a single folder
translateToUnicFolder(key, endpoint, location, fromLang, toLangs, jsonFile, './myFolder/OtherFolder/etc');
// This function will return a folder called ./myFolder/OtherFolder/etc
```

Make sure to replace the key and endpoint information with your own Azure access credentials. Ensure that the JSON file and settings are correctly defined according to your needs.

Contributing
If you wish to contribute to this project, feel free to open an issue or submit a pull request on our GitHub repository.

<p align="center">
	<a href="https://www.buymeacoffee.com/gabriellogan" target="_blank">
		<img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" >
	</a>
</p>
