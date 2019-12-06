"use strict";
var readFile = function (url) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", url, false);
    console.log(rawFile);
    rawFile.onreadystatechange = function () {
        console.log(rawFile);
        if (rawFile.readyState === 4) {
            console.log(rawFile);
            if (rawFile.status === 200 || rawFile.status === 0) {
                console.log(rawFile);
                var allText = rawFile.responseText;
                console.log(allText);
            }
        }
    };
    rawFile.send(null);
};
var parseMIDIBytes = function () {
};
readFile('src/midi-files/fountain_fairy.mid');
//# sourceMappingURL=index.js.map