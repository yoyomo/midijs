// @flow
"use strict";

import { readFile } from "./file-reader";

import { onMidiEvent} from './player';

const TEMPO = 500000; // 60000000 / 500000 => 120bpm

readFile('midi-files/fountain_fairy.mid', (midi) => {}, onMidiEvent(TEMPO));