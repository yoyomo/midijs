export const onMidiEvent = tempo => {

  let lastDeltaTime;
  let microseconds;

  return (header, midiEvent) => {
    console.log(midiEvent.event)
    console.log(header);

    const deltaTime = midiEvent.event.deltaTime - lastDeltaTime
    lastDeltaTime = midiEvent.event.deltaTime;

    const deltaTimeMicroseconds = tempo * deltaTime / header.division.ticksPerQuarterNote;
    microseconds += deltaTimeMicroseconds;

    const handleEvent = () => {

      if (midiEvent.event.description === "Set Tempo in microseconds per quarter note") {
        tempo = 60000000 / midiEvent.event.data;
      }
    }

    setTimeout = (handleEvent, microseconds / 1000);
  }
}