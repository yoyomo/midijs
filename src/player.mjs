import { playSound, recomputeAllNotes } from "./sound.mjs";
const TEMPO = 500000; // 60000000 / 500000 => 120bpm

export const onMidiEvent = () => {

  let tempo = TEMPO;
  let lastDeltaTime = 0;
  let microseconds = 0;

  let audioContext = new AudioContext();

  let playingMIDINotes /*: {[k:number]: OscillatoryNode} */ = {};
  const notes = recomputeAllNotes();

  return (header, midiTrackEvent) => {
    console.log(midiTrackEvent.event)
    console.log(header);

    const deltaTime = midiTrackEvent.deltaTime - lastDeltaTime
    lastDeltaTime = midiTrackEvent.deltaTime;

    const deltaTimeMicroseconds = tempo * deltaTime / header.division.ticksPerQuarterNote;
    microseconds += deltaTimeMicroseconds;

    const handleEvent = (time) => {
      console.log(time)
      debugger

      switch (midiTrackEvent.event.description) {
        case "Set Tempo in microseconds per quarter note":
          tempo = 60000000 / midiTrackEvent.event.data;
          break;

        case "Note On":

          /*
            export interface SynthResource {
              base_frequency: number
              base_octave: number
              vco_signal: "sine" | "square" | "sawtooth" | "triangle" | "custom"
              sound_on: boolean
              cut_off_frequency: number
              attack: string | number
              release: string | number
            
              id: number | void
              user_id: number | void
            
            */
           debugger
           playingMIDINotes[midiTrackEvent.event.key] = playSound(midiTrackEvent.event.key + 21, notes, audioContext,
            {
              sound_on: true,
              vco_signal: "sawtooth",
              cut_off_frequency: 3000,
              release: 1000,
              attack: 0,
            }
          )

          break;
        case "Note Off":
          debugger
          if (playingMIDINotes[midiTrackEvent.event.key]) {
            stopSound(playingMIDINotes[midiTrackEvent.event.key])
            delete playingMIDINotes[midiTrackEvent.event.key];
          }
          break;

      }
    }

    setTimeout(handleEvent, microseconds / 1000);
  }
}