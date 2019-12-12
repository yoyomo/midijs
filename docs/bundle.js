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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.mjs");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/file-reader.mjs":
/*!*****************************!*\
  !*** ./src/file-reader.mjs ***!
  \*****************************/
/*! exports provided: readFile */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"readFile\", function() { return readFile; });\n/* harmony import */ var _parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parser */ \"./src/parser.mjs\");\n// @flow\n\n\n\n\nconst readFile /*: string => void */\n  = url => {\n  const rawFile = new XMLHttpRequest();\n  rawFile.open(\"GET\", url, false);\n\n  rawFile.onreadystatechange = () => {\n    if (rawFile.readyState === 4) {\n      if (rawFile.status === 200 || rawFile.status === 0) {\n        Object(_parser__WEBPACK_IMPORTED_MODULE_0__[\"parseMIDIBytes\"])(stringToBytes(rawFile.responseText));\n      }\n    }\n  };\n  rawFile.send(null);\n};\n\nconst stringToBytes /*: string => Uint8Array */\n  = midiString => {\n  const u8 = new Uint8Array(midiString.length);\n  for (let b = 0; b < midiString.length; b++) {\n    u8[b] = midiString.charCodeAt(b);\n  }\n\n  return u8;\n};\n\n//# sourceURL=webpack:///./src/file-reader.mjs?");

/***/ }),

/***/ "./src/index.mjs":
/*!***********************!*\
  !*** ./src/index.mjs ***!
  \***********************/
/*! no exports provided */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _file_reader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./file-reader */ \"./src/file-reader.mjs\");\n// @flow\n\n\n\n\nObject(_file_reader__WEBPACK_IMPORTED_MODULE_0__[\"readFile\"])('midi-files/fountain_fairy.mid');\n\n//# sourceURL=webpack:///./src/index.mjs?");

/***/ }),

/***/ "./src/parser.mjs":
/*!************************!*\
  !*** ./src/parser.mjs ***!
  \************************/
/*! exports provided: parseMIDIBytes */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"parseMIDIBytes\", function() { return parseMIDIBytes; });\n// @flow\n\n\nconst getNBytes /*: (Uint8Array, number, number) => number */\n  = (midiBytes, start, n) => {\n  let nBytes = 0;\n  for (let b = 0; b < n; b++) {\n    const byte = midiBytes[start + b];\n    nBytes = nBytes << (8 * b) + byte;\n  }\n  return nBytes;\n};\n\n/*::\ntype MidiTypes = \"MThd\" | \"MTrk\";\n*/\n\n/*::\ntype DivisionTypes = \"metrical\" | \"time-code-based\";\n*/\n\n/*::\ntype Division = {\n  type: DivisionTypes,\n  ticksPerQuarterNote: number,\n  ticksPerFrame: number,\n  framesPerSecond: number\n};\n*/\n\n/*::\ntype Header = {\n  format: number,\n  numOfTracks: number,\n  division: Division\n};\n*/\n\nconst getMidiType /*: number => {type: MidiTypes, error: string} */\n  = bytes => {\n  const type = String.fromCharCode(bytes);\n  let error = \"\";\n  switch (type) {\n    case \"MThd\":\n    case \"MTrk\":\n      return {type, error};\n\n    default:\n      error = \"Invalid Midi Type: \" + type;\n      return {type: \"MThd\", error};\n  }\n};\n\nconst getDeltaTime /*: (Uint8Array, number) => {deltaTime: number, deltaTimeNBytes: number} */\n  = (midiBytes, start) => {\n  let deltaTime = 0;\n  let deltaTimeNBytes = 0;\n  let deltaTimeByte;\n  do {\n    deltaTimeByte = midiBytes[start + deltaTimeNBytes];\n    deltaTime = (deltaTime << 7) + deltaTimeByte & 0x7F;\n    deltaTimeNBytes++;\n  } while (!!(deltaTimeByte & 0x80));\n\n  return {deltaTime, deltaTimeNBytes};\n};\n\nconst getFramesPerSecond /*: number => number */\n  = division => {\n  const bit8_15 = (division & 0xFF00) >> 8;\n  const flippedBit8_15 = bit8_15 ^ 0xFF;\n  return flippedBit8_15 + 1;\n};\n\nconst getControllerDescription /*: number => string */\n  = dataByte1 => {\n  switch (dataByte1 & 0xFF) {\n    case 0x00:\n      return \"Bank Select\";\n    case 0x01:\n      return \"Modulation Wheel\";\n    case 0x02:\n      return \"Breath Controller\";\n    case 0x04:\n      return \"Foot Controller\";\n    case 0x05:\n      return \"Portamento Time\";\n    case 0x06:\n      return \"Data Entry Slider (MSB)\";\n    case 0x07:\n      return \"Main Volume\";\n    case 0x08:\n      return \"Balance\";\n    case 0x0A:\n      return \"Pan\";\n    case 0x0B:\n      return \"Expression Controller\";\n    case 0x0C:\n      return \"Effect Control 1\";\n    case 0x0D:\n      return \"Effect Control 2\";\n    case 0x10:\n      return \"General-Purpose Controllers 1\";\n    case 0x11:\n      return \"General-Purpose Controllers 2\";\n    case 0x12:\n      return \"General-Purpose Controllers 3\";\n    case 0x13:\n      return \"General-Purpose Controllers 4\";\n    case 0x20:\n      return \"LSB for controllers 0\";\n    case 0x21:\n      return \"LSB for controllers 1\";\n    case 0x22:\n      return \"LSB for controllers 2\";\n    case 0x23:\n      return \"LSB for controllers 3\";\n    case 0x24:\n      return \"LSB for controllers 4\";\n    case 0x25:\n      return \"LSB for controllers 5\";\n    case 0x26:\n      return \"LSB for controllers 6\";\n    case 0x27:\n      return \"LSB for controllers 7\";\n    case 0x28:\n      return \"LSB for controllers 8\";\n    case 0x29:\n      return \"LSB for controllers 9\";\n    case 0x2A:\n      return \"LSB for controllers 10\";\n    case 0x2B:\n      return \"LSB for controllers 11\";\n    case 0x2C:\n      return \"LSB for controllers 12\";\n    case 0x2D:\n      return \"LSB for controllers 13\";\n    case 0x2E:\n      return \"LSB for controllers 14\";\n    case 0x2F:\n      return \"LSB for controllers 15\";\n    case 0x30:\n      return \"LSB for controllers 16\";\n    case 0x31:\n      return \"LSB for controllers 17\";\n    case 0x32:\n      return \"LSB for controllers 18\";\n    case 0x33:\n      return \"LSB for controllers 19\";\n    case 0x34:\n      return \"LSB for controllers 20\";\n    case 0x35:\n      return \"LSB for controllers 21\";\n    case 0x36:\n      return \"LSB for controllers 22\";\n    case 0x37:\n      return \"LSB for controllers 23\";\n    case 0x38:\n      return \"LSB for controllers 24\";\n    case 0x39:\n      return \"LSB for controllers 25\";\n    case 0x3A:\n      return \"LSB for controllers 26\";\n    case 0x3B:\n      return \"LSB for controllers 27\";\n    case 0x3C:\n      return \"LSB for controllers 28\";\n    case 0x3D:\n      return \"LSB for controllers 29\";\n    case 0x3E:\n      return \"LSB for controllers 30\";\n    case 0x3F:\n      return \"LSB for controllers 31\";\n    case 0x40:\n      return \"Damper Pedal (Sustain Pedal)\";\n    case 0x41:\n      return \"Portamento\";\n    case 0x42:\n      return \"Sostenato Pedal\";\n    case 0x43:\n      return \"Soft Pedal\";\n    case 0x44:\n      return \"Legato Footswitch\";\n    case 0x45:\n      return \"Hold 2\";\n    case 0x46:\n      return \"Sound Controller 1 (default: Timber Variation)\";\n    case 0x47:\n      return \"Sound Controller 2 (default: Timber/Harmonic Content)\";\n    case 0x48:\n      return \"Sound Controller 3 (default: Release Time)\";\n    case 0x49:\n      return \"Sound Controller 4 (default: Attack Time)\";\n    case 0x4A:\n      return \"Sound Controller 5\";\n    case 0x4B:\n      return \"Sound Controller 6\";\n    case 0x4C:\n      return \"Sound Controller 7\";\n    case 0x4D:\n      return \"Sound Controller 8\";\n    case 0x4E:\n      return \"Sound Controller 9\";\n    case 0x4F:\n      return \"Sound Controller 10\";\n    case 0x50:\n      return \"General-Purpose Controllers 5\";\n    case 0x51:\n      return \"General-Purpose Controllers 6\";\n    case 0x52:\n      return \"General-Purpose Controllers 7\";\n    case 0x53:\n      return \"General-Purpose Controllers 8\";\n    case 0x54:\n      return \"Portamento Control\";\n    case 0x5B:\n      return \"Effects 1 Depth (formerly External Effects Depth)\";\n    case 0x5C:\n      return \"Effects 2 Depth (formerly Tremolo Depth)\";\n    case 0x5D:\n      return \"Effects 3 Depth (formerly Chorus Depth)\";\n    case 0x5E:\n      return \"Effects 4 Depth (formerly Celeste Detune)\";\n    case 0x5F:\n      return \"Effects 5 Depth (formerly Phaser Depth)\";\n    case 0x60:\n      return \"Data Increment\";\n    case 0x61:\n      return \"Data Increment\";\n    case 0x62:\n      return \"Non-Registered Parameter Number (LSB)\";\n    case 0x63:\n      return \"Non-Registered Parameter Number (MSB)\";\n    case 0x64:\n      return \"Registered Parameter Number (LSB)\";\n    case 0x65:\n      return \"Registered Parameter Number (MSB)\";\n    case 0x79:\n      return \"Mode Messages\";\n    case 0x7A:\n      return \"Mode Messages\";\n    case 0x7B:\n      return \"Mode Messages\";\n    case 0x7C:\n      return \"Mode Messages\";\n    case 0x7D:\n      return \"Mode Messages\";\n    case 0x7E:\n      return \"Mode Messages\";\n    case 0x7F:\n      return \"Mode Messages\";\n\n    default:\n      return \"Unknown\";\n  }\n};\n\n/*::\ninterface EventDetails {\n  description: string,\n  status: number,\n};\n */\n\n/*::\ninterface MidiEvent extends EventDetails {\n  channel: number,\n  key: number,\n  velocity: number,\n  controllerType: number,\n  programNumber: number,\n  channelPressure: number,\n  pitchValue: number\n};\n */\n\n/*::\ninterface SysExEvent extends EventDetails {\n  sysExData: number\n};\n */\n\n/*::\ninterface MetaEvent extends EventDetails {\n  data: number,\n  text?: string,\n  channel?: number\n};\n */\n\nconst readMidiEvent /*: (Uint8Array, number, number) => {midiEvent: MidiEvent, displacement: number} */\n  = (midiBytes, statusByte, start) => {\n\n  const channel = statusByte & 0x0F;\n\n  let displacement = 0;\n  const dataByte1 = getNBytes(midiBytes, start + displacement, 1) & 0x7F;\n  displacement += 1;\n  const dataByte2 = getNBytes(midiBytes, start + displacement, 1) & 0x7F;\n  displacement += 1;\n\n  const midiEvent /*: MidiEvent */ = {\n    description: \"\",\n    status: statusByte,\n    channel: channel,\n    key: 0,\n    velocity: 0,\n    controllerType: 0,\n    programNumber: 0,\n    channelPressure: 0,\n    pitchValue: 0\n  };\n\n  switch (statusByte & 0xF0) {\n    case 0x80:\n      midiEvent.description = \"Note Off\";\n      midiEvent.key = dataByte1;\n      midiEvent.velocity = dataByte2;\n      break;\n\n    case 0x90:\n      midiEvent.description = \"Note On\";\n      midiEvent.key = dataByte1;\n      midiEvent.velocity = dataByte2;\n      break;\n\n    case 0xA0:\n      midiEvent.description = \"Key Pressure or Aftertouch\";\n      midiEvent.key = dataByte1;\n      midiEvent.velocity = dataByte2;\n      break;\n\n    case 0xB0:\n      midiEvent.description = getControllerDescription(dataByte1);\n      midiEvent.controllerType = dataByte2;\n      break;\n\n    case 0xC0:\n      midiEvent.description = \"Program Change (=select instrument)\";\n      midiEvent.programNumber = dataByte1;\n      displacement -= 1;\n      break;\n\n    case 0xD0:\n      midiEvent.description = \"Channel Aftertouch or Channel Pressure\";\n      midiEvent.channelPressure = dataByte1;\n      displacement -= 1;\n      break;\n\n    case 0xE0:\n      midiEvent.description = \"Pitch Bend\";\n      midiEvent.pitchValue = dataByte2 << 8 + dataByte1;\n      break;\n  }\n\n  return {midiEvent, displacement};\n\n};\n\nconst readSysExEvent /*: (Uint8Array, number, number) => {sysExEvent: SysExEvent, displacement: number} */\n  = (midiBytes, statusByte, start) => {\n\n  let displacement = 0;\n  const lengthByte = getNBytes(midiBytes, start + displacement, 1);\n  displacement += 1;\n  const sysExData = getNBytes(midiBytes, start + displacement, lengthByte);\n  displacement += lengthByte;\n\n  let description = \"Unknown SysEx Event\";\n  switch (statusByte & 0xFF) {\n    case 0xF0:\n      description = \"Normal SysEx Event\";\n      break;\n    case 0xF7:\n      description = \"Divided SysEx Events\";\n      break;\n  }\n\n  const sysExEvent = {description, status: statusByte, sysExData};\n\n  return {sysExEvent, displacement};\n\n};\n\n\nconst readMetaEvent /*: (Uint8Array, number, number) => {metaEvent: MetaEvent, displacement: number} */\n  = (midiBytes, statusByte, start) => {\n  let displacement = 0;\n  const typeByte = getNBytes(midiBytes, start + displacement, 1);\n  displacement += 1;\n  const lengthByte = getNBytes(midiBytes, start + displacement, 1);\n  displacement += 1;\n\n  const data = getNBytes(midiBytes, start + displacement, lengthByte);\n  let channel = 0;\n\n  let description = \"Unknown Meta Event\";\n  let text = \"\";\n  switch (typeByte) {\n    case 0x00:\n      if (lengthByte === 0x02) {\n        description = \"Sequence Number\";\n      }\n      break;\n    case 0x01:\n      description = \"Text Event\";\n      text = String.fromCharCode(data);\n      break;\n    case 0x02:\n      description = \"Copyright Notice\";\n      text = String.fromCharCode(data);\n      break;\n    case 0x03:\n      description = \"Sequence/Track Name\";\n      text = String.fromCharCode(data);\n      break;\n    case 0x04:\n      description = \"Instrument Name\";\n      text = String.fromCharCode(data);\n      break;\n    case 0x05:\n      description = \"Lyric\";\n      text = String.fromCharCode(data);\n      break;\n    case 0x06:\n      description = \"Marker\";\n      text = String.fromCharCode(data);\n      break;\n    case 0x07:\n      description = \"Cue Point\";\n      text = String.fromCharCode(data);\n      break;\n    case 0x20:\n      if (lengthByte === 0x01) {\n        description = \"MIDI Channel Prefix\";\n        channel = data & 0x0F;\n      }\n      break;\n    case 0x2F:\n      if (lengthByte === 0x00) {\n        description = \"End Of Track\";\n        displacement -= 1;\n      }\n      break;\n\n    case 0x51:\n      if (lengthByte === 0x03) {\n        description = \"Set Tempo in microseconds per quarter note\";\n      }\n      break;\n\n    case 0x54:\n      if (lengthByte === 0x05) {\n        description = \"SMPTE Offset\";\n      }\n      break;\n\n    case 0x58:\n      if (lengthByte === 0x04) {\n        description = \"Time Signature\";\n      }\n      break;\n\n    case 0x59:\n      if (lengthByte === 0x02) {\n        description = \"Time Signature\";\n      }\n      break;\n\n    case 0x7F:\n      description = \"Sequencer Specific Meta Event\";\n      break;\n  }\n\n  const metaEvent = {\n    description, text, status: statusByte, data, channel\n  };\n\n  return {metaEvent, displacement};\n};\n\n/*::\ninterface EmptyEvent extends EventDetails {}\n */\n\n/*::\ntype Event = MidiEvent | SysExEvent | EmptyEvent\n */\n\n/*::\ntype TrackEvent = {\n  deltaTime: number,\n  event: Event\n};\n */\n\n/*::\ntype Track = TrackEvent[]\n*/\n\n/*::\ntype Midi = {\n  header: Header,\n  tracks: Track[]\n};\n */\n\nconst parseMIDIBytes /*: Uint8Array => Midi */\n  = midiBytes => {\n\n  const header /*: Header */ = {\n    format: 0,\n    numOfTracks: 0,\n    division: {\n      type: \"metrical\",\n      ticksPerQuarterNote: 0,\n      ticksPerFrame: 0,\n      framesPerSecond: 0\n    }\n  };\n\n  let tracks /*: Track[] */ = [];\n\n  let c = 0;\n  while (!isNaN(midiBytes[c])) {\n    const {type, error} = getMidiType(getNBytes(midiBytes, c, 4));\n\n    if (error) {\n      console.error(error);\n      return {header, tracks};\n    }\n\n    c += 4;\n    const length = getNBytes(midiBytes, c, 4);\n    c += 4;\n\n    switch (type) {\n      case \"MThd\":\n        const twoBytes = 2;\n        let headerBytePosition = c;\n        const format = getNBytes(midiBytes, headerBytePosition, twoBytes);\n        const numOfTracks = getNBytes(midiBytes, headerBytePosition += twoBytes, twoBytes);\n        const division = getNBytes(midiBytes, headerBytePosition += twoBytes, twoBytes);\n\n        header.format = format;\n        header.numOfTracks = numOfTracks;\n        header.division.type = division & 0x8000 ? \"time-code-based\" : \"metrical\";\n\n        if (header.division.type === \"time-code-based\") {\n          header.division.ticksPerFrame = division & 0x00FF;\n          header.division.framesPerSecond = getFramesPerSecond(division);\n        } else {\n          header.division.ticksPerQuarterNote = division & 0x7FFF;\n        }\n\n        // TODO fire HeaderEvent\n\n        break;\n      case \"MTrk\":\n        let trackPos = c;\n        let track /*: Track */ = [];\n\n        while (trackPos < length) {\n\n          const {deltaTime, deltaTimeNBytes} = getDeltaTime(midiBytes, trackPos);\n          trackPos += deltaTimeNBytes;\n\n          const statusByte = getNBytes(midiBytes, trackPos, 1);\n          trackPos += 1;\n\n          let event /*: Event */ = {description: \"\", status: statusByte};\n\n          switch (statusByte & 0xF0) {\n            case 0x80:\n            case 0x90:\n            case 0xA0:\n            case 0xB0:\n            case 0xC0:\n            case 0xD0:\n            case 0xE0:\n              const {midiEvent, displacement} = readMidiEvent(midiBytes, statusByte, trackPos);\n              event = midiEvent;\n              trackPos += displacement;\n              break;\n\n            case 0xF0:\n              switch (statusByte & 0xFF) {\n                case 0xF0:\n                case 0xF7: {\n                  const {sysExEvent, displacement} = readSysExEvent(midiBytes, statusByte, trackPos);\n                  event = sysExEvent;\n                  trackPos += displacement;\n                  break;\n                }\n\n                case 0xFF: {\n                  const {metaEvent, displacement} = readMetaEvent(midiBytes, statusByte, trackPos);\n                  event = metaEvent;\n                  trackPos += displacement;\n                  break;\n                }\n              }\n              break;\n\n          }\n\n          track.push({deltaTime, event});\n\n        }\n\n        tracks.push(track);\n\n        // TODO fire TrackEvent\n\n\n        break;\n\n    }\n\n    c += length;\n\n  }\n\n  const midi = {header, tracks};\n  console.log(midi);\n\n  return {header, tracks};\n};\n\n\n\n//# sourceURL=webpack:///./src/parser.mjs?");

/***/ })

/******/ });