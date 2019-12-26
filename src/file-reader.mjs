// @flow
"use strict";
/*::
import type {Midi, TrackEvent, Header} from './parser'
*/
import { parseMIDIBytes } from "./parser";

export const readFile /*: (string, Midi => void, () => (Header, TrackEvent) => void) => void */
  = (url, onSuccess, onMidiEvent) => {
    const rawFile = new XMLHttpRequest();
    rawFile.open("GET", url, true);
    rawFile.responseType = "arraybuffer";

    rawFile.onload = () => {
      const arrayBuffer = rawFile.response;
      if (arrayBuffer) {
        const byteArray = new Uint8Array(arrayBuffer)
        const midi = parseMIDIBytes(byteArray, onMidiEvent);
        if(onSuccess) onSuccess(midi);
      }

    };
    rawFile.send(null);
  };
