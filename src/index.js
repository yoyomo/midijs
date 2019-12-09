"use strict";
var readFile = function (url) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", url, false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status === 0) {
                parseMIDIBytes(stringToBytes(rawFile.responseText));
            }
        }
    };
    rawFile.send(null);
};
var stringToBytes = function (midiString) {
    var u8 = new Uint8Array(midiString.length);
    for (var b = 0; b < midiString.length; b++) {
        u8[b] = midiString.charCodeAt(b);
    }
    return u8;
};
var getNBytes = function (midi, c, n) {
    var nBytes = 0;
    for (var b = 0; b < n; b++) {
        var byte = midi[c];
        nBytes = nBytes << (8 * b) + byte;
    }
    return nBytes;
};
var parseMIDIBytes = function (midi) {
    var header = {
        format: 0,
        tracks: 0,
        division: {
            type: 0,
            ticksPerQuarterNote: 0,
            ticksPerFrame: 0,
            framesPerSecond: 0
        }
    };
    var c = 0;
    while (!isNaN(midi[c])) {
        var type = String.fromCharCode(getNBytes(midi, c, 4));
        c += 4;
        var length_1 = getNBytes(midi, c, 4);
        c += 4;
        switch (type) {
            case "MThd":
                header.format = getNBytes(midi, c, 2);
                header.tracks = getNBytes(midi, c + 2, 2);
                var division = getNBytes(midi, c + 4, 2);
                header.division.type = division & 0x8000;
                if (header.division.type) {
                    header.division.ticksPerFrame = division & 0x00FF;
                    header.division.framesPerSecond = (division & 0x7F00) >> 8;
                }
                else {
                    header.division.ticksPerQuarterNote = division & 0x7FFF;
                }
                // TODO fire HeaderEvent
                break;
            case "MTrk":
                // TODO handle Track
                break;
        }
        c += length_1;
    }
};
readFile('midi-files/fountain_fairy.mid');
//# sourceMappingURL=index.js.map