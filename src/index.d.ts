declare const readFile: (url: string) => void;
declare const stringToBytes: (midiString: string) => Uint8Array;
declare const getNBytes: (midi: Uint8Array, c: number, n: number) => number;
declare type MidiTypes = "MThd" | "MTrk";
declare const parseMIDIBytes: (midi: Uint8Array) => void;
