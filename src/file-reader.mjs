// @flow
"use strict";

import { parseMIDIBytes } from "./parser";

export const readFile /*: string => void */
  = url => {
    const rawFile = new XMLHttpRequest();
    rawFile.open("GET", url, true);
    rawFile.responseType = "arraybuffer";

    rawFile.onload = () => {
      const arrayBuffer = rawFile.response;
      if (arrayBuffer) {
        const byteArray = new Uint8Array(arrayBuffer)
        parseMIDIBytes(byteArray);
      }

    };
    rawFile.send(null);
  };
