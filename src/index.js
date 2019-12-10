// @flow
"use strict";

const readFile = (url /*: string */) => {
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

const stringToBytes = (midiString /*: string */) /*: Uint8Array */ => {
  const u8 = new Uint8Array(midiString.length);
  for(let b = 0; b < midiString.length; b++){
    u8[b] = midiString.charCodeAt(b);
  }

  return u8;
};

const getNBytes = (midi /*: Uint8Array */, start /*: number */, n /*: number */) /*: number */ => {
  let nBytes = 0;
  for (let b = 0; b < n; b++) {
    const byte = midi[start + b];
    nBytes = nBytes << (8 * b) + byte;
  }
  return nBytes;
};

const getDeltaTime = (midi /*: Uint8Array */, start /*: number */) => {
  let deltaTime = 0;
  let deltaTimeNBytes = 0;
  let deltaTimeByte;
  do{
    deltaTimeByte = midi[start + deltaTimeNBytes];
    deltaTime = (deltaTime << 7) + deltaTimeByte & 0x7F;
    deltaTimeNBytes++;
  } while(deltaTimeByte & 0x80);

  return deltaTime;
};

/*::
type MidiTypes = "MThd" | "MTrk";
*/

 /*::
type DivisionTypes = "metrical" | "time-code-based";
*/

/*::
type Division = {
  type: DivisionTypes,
  ticksPerQuarterNote: number,
  ticksPerFrame: number,
  framesPerSecond: number
};
*/

/*::
type Header = {
  format: number,
  tracks: number,
  division: Division
};
*/

const getMidiType = (bytes /*: number */) /*: MidiTypes */ => {
  return String.fromCharCode(bytes);
}

const parseMIDIBytes = (midi /*: Uint8Array */) => {

  const header /*: Header */ = {
    format: 0,
    tracks: 0,
    division: {
      type: "metrical", 
      ticksPerQuarterNote: 0,
      ticksPerFrame: 0,
      framesPerSecond: 0
    }
  };

  let c = 0;
  while (!isNaN(midi[c])) {
    const type /*: MidiTypes */ = getMidiType(getNBytes(midi, c, 4)) ;
    c += 4;
    const length = getNBytes(midi, c, 4);
    c += 4;

    switch (type) {
      case "MThd":
      const twoBytes = 2;
      let headerBytePosition = c;
      const format = getNBytes(midi, headerBytePosition, twoBytes);
      const tracks = getNBytes(midi, headerBytePosition += twoBytes, twoBytes);
      const division = getNBytes(midi, headerBytePosition += twoBytes, twoBytes);

      header.format = format;
      header.tracks = tracks;
      header.division.type = division & 0x8000 ? "time-code-based" : "metrical";

      if(header.division.type === "time-code-based") {
        header.division.ticksPerFrame = division & 0x00FF;

        const bit8_15 = (division & 0xFF00) >> 8;
        const flippedBit8_15 = bit8_15 ^ 0xFF;
        const addOneFlippedBit8_15 = flippedBit8_15 + 1;

        header.division.framesPerSecond = addOneFlippedBit8_15;
      } else {
        header.division.ticksPerQuarterNote = division & 0x7FFF;
      }

        // TODO fire HeaderEvent

        break;
        case "MTrk":
        // TODO handle Track

        const deltaTime = getDeltaTime(midi, c);
        let event;




        // TODO save track object

        // TODO fire TrackEvent



        break;

      }

      c += length;

    }
  };

  readFile('midi-files/fountain_fairy.mid');