// @flow
"use strict";

import { readFile } from "./file-reader";

import { onMidiEvent} from './player';
import {muv} from 'muvjs/muv';
import {button} from 'muvjs/muv-dom';


const model = {
  playing: false,
};

const readMIDIFile = () => {
  return {
    type: 'read-midi-file'
  }
}

const update = model => action => {
  switch(action.type){
    case "read-midi-file":
      model = {...model};
      model.playing = true;
      readFile('midi-files/fountain_fairy.mid', (midi) => {}, onMidiEvent());
    break;
  }

  return {model};
}

const view = dispatch => {
  const dispatcher = {
    readMIDIFile: () => dispatch(readMIDIFile())
  }
  return model => 
    button({onclick: dispatcher.readMIDIFile})(model.playing ? "Stop" : "Play")
  
}

muv({model,update,view})('root');