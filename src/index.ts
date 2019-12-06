"use strict";

const readFile = (url: string) => {
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

const stringToBytes = (midiString: string): Uint8Array => {
  const u8 = new Uint8Array(midiString.length);
  for(let b = 0; b < midiString.length; b++){
    u8[b] = midiString.charCodeAt(b);
  }

  return u8;
};

const getNBytes = (midi: Uint8Array, c: number, n: number): number => {
  let nBytes = 0;
  for (let b = 0; b < n; b++) {
    const byte = midi[c];
    nBytes = nBytes << (8 * b) + byte;
  }
  return nBytes;
};

type MidiTypes = "MThd" | "MTrk";

const parseMIDIBytes = (midi: Uint8Array) => {

  const header = {
    format: 0,
    tracks: 0,
    division: {
      type: 0,
      ticksPerQuarterNote: 0,
      ticksPerFrame: 0,
      framesPerSecond: 0
    }
  };

  let c = 0;
  while (!isNaN(midi[c])) {
    const type = String.fromCharCode(getNBytes(midi, c, 4)) as MidiTypes;
    c += 4;
    const length = getNBytes(midi, c, 4);
    c += 4;

    switch (type) {
      case "MThd":
        header.format = getNBytes(midi, c, 2);
        header.tracks = getNBytes(midi, c + 2, 2);
        const division = getNBytes(midi, c + 4, 2);

        header.division.type = division & 0x8000;

        if(header.division.type) {
          header.division.ticksPerFrame = division & 0x00FF;
          header.division.framesPerSecond = (division & 0x7F00) >> 8;
        } else {
          header.division.ticksPerQuarterNote = division & 0x7FFF;
        }

        // TODO fire HeaderEvent

        break;
      case "MTrk":
        // TODO handle Track

        break;

    }

    c += length;

  }
};

readFile('midi-files/fountain_fairy.mid');