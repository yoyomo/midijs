// @flow
"use strict";

import {parseMIDIBytes} from "./parser";

export const readFile /*: string => void */
  = url => {
  const rawFile = new XMLHttpRequest();
  rawFile.open("GET", url, false);

  rawFile.onreadystatechange = () => {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status === 0) {
        parseMIDIBytes(stringToBytes(rawFile.responseText));
      }
    }
  };
  rawFile.send(null);
};

const stringToBytes /*: string => Uint8Array */
  = midiString => {
  const u8 = new Uint8Array(midiString.length);
  for (let b = 0; b < midiString.length; b++) {
    u8[b] = midiString.charCodeAt(b);
  }

  return u8;
};