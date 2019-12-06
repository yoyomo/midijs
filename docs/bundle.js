/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar readFile = function (url) {\n    var rawFile = new XMLHttpRequest();\n    rawFile.open(\"GET\", url, false);\n    rawFile.onreadystatechange = function () {\n        if (rawFile.readyState === 4) {\n            if (rawFile.status === 200 || rawFile.status === 0) {\n                parseMIDIBytes(stringToBytes(rawFile.responseText));\n            }\n        }\n    };\n    rawFile.send(null);\n};\nvar stringToBytes = function (midiString) {\n    var u8 = new Uint8Array(midiString.length);\n    for (var b = 0; b < midiString.length; b++) {\n        u8[b] = midiString.charCodeAt(b);\n    }\n    return u8;\n};\nvar getNBytes = function (midi, c, n) {\n    var nBytes = 0;\n    for (var b = 0; b < n; b++) {\n        var byte = midi[c];\n        nBytes = nBytes << (8 * b) + byte;\n    }\n    return nBytes;\n};\nvar parseMIDIBytes = function (midi) {\n    var header = {\n        format: 0,\n        tracks: 0,\n        division: {\n            type: 0,\n            ticksPerQuarterNote: 0,\n            ticksPerFrame: 0,\n            framesPerSecond: 0\n        }\n    };\n    var c = 0;\n    while (!isNaN(midi[c])) {\n        var type = String.fromCharCode(getNBytes(midi, c, 4));\n        c += 4;\n        var length_1 = getNBytes(midi, c, 4);\n        c += 4;\n        switch (type) {\n            case \"MThd\":\n                header.format = getNBytes(midi, c, 2);\n                header.tracks = getNBytes(midi, c + 2, 2);\n                var division = getNBytes(midi, c + 4, 2);\n                header.division.type = division & 0x8000;\n                if (header.division.type) {\n                    header.division.ticksPerFrame = division & 0x00FF;\n                    header.division.framesPerSecond = (division & 0x7F00) >> 8;\n                }\n                else {\n                    header.division.ticksPerQuarterNote = division & 0x7FFF;\n                }\n                // TODO fire HeaderEvent\n                break;\n            case \"MTrk\":\n                // TODO handle Track\n                break;\n        }\n        c += length_1;\n    }\n};\nreadFile('midi-files/fountain_fairy.mid');\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ })

/******/ });