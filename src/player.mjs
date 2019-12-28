//@flow
import { playSound, recomputeAllNotes, stopSound } from "./sound.mjs";
const TEMPO = 500000; // 60000 / 500 => 120bpm

/*::
import type {Header, TrackEvent} from './parser.mjs';
import { MetaEvent, MidiEvent} from './parser.mjs';
*/

export const onMidiEvent /*: ()=> () => (Header, TrackEvent) => void*/
  = () => {

    let tempo = TEMPO;

    const notes = recomputeAllNotes();
    let audioContext = new AudioContext();
    let milliseconds = 0;

    return () => {
      let playingMIDINotes = {};

      return (header, midiTrackEvent) => {
        console.log("deltaTime", midiTrackEvent.deltaTime)
        console.log("trackEvent", midiTrackEvent.event)
        console.log("header", header);
        console.log("division", header.division);

        const deltaTimeMilliseconds = tempo * midiTrackEvent.deltaTime / header.division.ticksPerQuarterNote;
        milliseconds += deltaTimeMilliseconds;

        console.log("deltaTimeMilliseconds", deltaTimeMilliseconds);
        console.log("milliseconds", milliseconds);

        const handleTimedEvent = () => {

          switch (midiTrackEvent.event.description) {

            case "Note On": {
              const midiEvent /*: MidiEvent */ = (midiTrackEvent.event /*: any */);
              debugger
              playingMIDINotes[midiEvent.key] = playSound(midiEvent.key - 21, notes, audioContext,
                {
                  sound_on: true,
                  vco_signal: "sawtooth",
                  cut_off_frequency: 350,
                  release: 5,
                  attack: 0.0001,
                }
              )

              break;
            }
            case "Note Off": {
              const midiEvent /*: MidiEvent */ = (midiTrackEvent.event /*: any */);
              debugger
              if (playingMIDINotes[midiEvent.key]) {
              stopSound(playingMIDINotes[midiEvent.key])
              delete playingMIDINotes[midiEvent.key];
              }
              break;
            }

          }
        }

        switch (midiTrackEvent.event.description) {
          case "Set Tempo in microseconds per quarter note":
            const metaEvent /*: MetaEvent */ = (midiTrackEvent.event /*: any */);
            tempo = metaEvent.data;
            break;
        }

        setTimeout(handleTimedEvent,audioContext.currentTime + 2 * milliseconds / 1000);
      }
    }
  }