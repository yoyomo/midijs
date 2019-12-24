//@flow

export const NUMBER_OF_NOTES = 88;

export const recomputeAllNotes = () => {
  let notes = [];

  for (let n = 0; n < NUMBER_OF_NOTES; n++) {
    notes[n] = Math.pow(2, ((n + 1) - 49) / 12) * 442;
  }

  return notes;
};

/*::
export interface SynthResource {
  base_frequency: number,
  base_octave: number,
  vco_signal: "sine" | "square" | "sawtooth" | "triangle" | "custom",
  sound_on: boolean,
  cut_off_frequency: number,
  attack: string | number,
  release: string | number,

  id: number | void,
  user_id: number | void
}

*/
export const playSound /*: (number, number[], AudioContext, SynthResource) => OscillatorNode | void */
= (noteIndex,notes, audioContext, synth) => {
  if (!synth.sound_on) return undefined;
  if (noteIndex < 0 || noteIndex >= notes.length) {
    return undefined;
  }

  let noteFrequency = notes[noteIndex];

  let osc1 = audioContext.createOscillator();
  let biquadFilter = audioContext.createBiquadFilter();
  let gain = audioContext.createGain();

  osc1.connect(biquadFilter);
  biquadFilter.connect(gain);
  gain.connect(audioContext.destination);

  osc1.type = synth.vco_signal;
  osc1.frequency.value = noteFrequency;
  biquadFilter.type = "lowpass";
  biquadFilter.frequency.value = synth.cut_off_frequency;

  const now = audioContext.currentTime;
  const endTime = now + parseFloat(synth.release + "");
  const attackTime = now + parseFloat(synth.attack + "");
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.2, attackTime);
  gain.gain.exponentialRampToValueAtTime(0.000001, endTime);
  osc1.start(now);
  osc1.stop(endTime);
  return osc1;
};