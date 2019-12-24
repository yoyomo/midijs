// @flow
"use strict";

import { readFile } from "./file-reader";

import { onMidiEvent} from './player';

readFile('midi-files/fountain_fairy.mid', (midi) => {}, onMidiEvent());