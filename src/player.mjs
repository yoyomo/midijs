//@flow
import { playSound, recomputeAllNotes, stopSound } from "./sound.mjs";
const TEMPO = 500000; // 60000000 / 500000 => 120bpm

/*::
import type {Header, TrackEvent} from './parser.mjs';
import { MetaEvent, MidiEvent} from './parser.mjs';
*/

export const onMidiEvent /*: ()=> () => (Header, TrackEvent) => void*/
  = () => {

    let tempo = TEMPO;

    let audioContext = new AudioContext();
    let sampleRate = audioContext.sampleRate;

    return () => {
      let lastDeltaTime = 0;
      let microseconds = 0;

      let playingMIDINotes /*: {[k:number]: {osc: OscillatorNode | void, endTime: number}} */ = {};
      const notes = recomputeAllNotes();

      return (header, midiTrackEvent) => {
        console.log("deltaTime", midiTrackEvent.deltaTime)
        console.log("trackEvent", midiTrackEvent.event)
        console.log("header", header);
        console.log("division", header.division);

        // const deltaTime = midiTrackEvent.deltaTime - lastDeltaTime
        // lastDeltaTime = midiTrackEvent.deltaTime;

        const deltaTimeMicroseconds = tempo * midiTrackEvent.deltaTime / header.division.ticksPerQuarterNote;
        microseconds += deltaTimeMicroseconds;

        const handleEvent = () => {

          switch (midiTrackEvent.event.description) {

            case "Note On": {
              const midiEvent /*: MidiEvent */ = (midiTrackEvent.event /*: any */);
              playingMIDINotes[midiEvent.key] = playSound(midiEvent.key + 21, notes, audioContext,
                {
                  sound_on: true,
                  vco_signal: "sawtooth",
                  cut_off_frequency: 350,
                  release: 1.5,
                  attack: 0.0001,
                }
              )

              break;
            }
            case "Note Off": {
              const midiEvent /*: MidiEvent */ = (midiTrackEvent.event /*: any */);
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

        console.log(microseconds / 1000);
        setTimeout(handleEvent, microseconds / 1000);
      }
    }
  }