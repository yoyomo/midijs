// @flow
"use strict";

const getNBytes /*: (Uint8Array, number, number) => number */
  = (midiBytes, start, n) => {
    let nBytes = 0;
    for (let b = 0; b < n; b++) {
      const byte = midiBytes[start + b];
      // same as << 8 but handles numbers bigger than 32bit numbers
      nBytes = (nBytes * 256) + byte;
    }
    return nBytes;
  };

/* based on MIDI specs
For more info, please look at:
https://www.mobilefish.com/tutorials/midi/midi_quickguide_specification.html#figure_1
*/

/*::
type MidiTypes = "MThd" | "MTrk";
*/

/*::
type DivisionTypes = "metrical" | "time-code-based";
*/

/*::
type Division = {
  type: DivisionTypes,
  ticksPerQuarterNote: number,
  ticksPerFrame: number,
  framesPerSecond: number
};
*/

/*::
type Header = {
  format: number,
  numOfTracks: number,
  division: Division
};
*/

const getMidiType /*: Uint8Array => {type: MidiTypes, error: string} */
  = bytes => {
    const type = String.fromCharCode(...bytes);
    let error = "";
    switch (type) {
      case "MThd":
      case "MTrk":
        return { type, error };

      default:
        error = "Invalid Midi Type: " + type;
        return { type: "MThd", error };
    }
  };

const getDeltaTime /*: (Uint8Array, number) => {deltaTime: number, deltaTimeNBytes: number} */
  = (midiBytes, start) => {
    let deltaTime = 0;
    let deltaTimeNBytes = 0;
    let deltaTimeByte;
    do {
      deltaTimeByte = midiBytes[start + deltaTimeNBytes];
      deltaTime = (deltaTime << 7) + deltaTimeByte & 0x7F;
      deltaTimeNBytes++;
    } while (!!(deltaTimeByte & 0x80));

    return { deltaTime, deltaTimeNBytes };
  };

const getFramesPerSecond /*: number => number */
  = division => {
    const bit8_15 = (division & 0xFF00) >> 8;
    const flippedBit8_15 = bit8_15 ^ 0xFF;
    return flippedBit8_15 + 1;
  };

const getControllerDescription /*: number => string */
  = dataByte1 => {
    switch (dataByte1 & 0xFF) {
      case 0x00:
        return "Bank Select";
      case 0x01:
        return "Modulation Wheel";
      case 0x02:
        return "Breath Controller";
      case 0x04:
        return "Foot Controller";
      case 0x05:
        return "Portamento Time";
      case 0x06:
        return "Data Entry Slider (MSB)";
      case 0x07:
        return "Main Volume";
      case 0x08:
        return "Balance";
      case 0x0A:
        return "Pan";
      case 0x0B:
        return "Expression Controller";
      case 0x0C:
        return "Effect Control 1";
      case 0x0D:
        return "Effect Control 2";
      case 0x10:
        return "General-Purpose Controllers 1";
      case 0x11:
        return "General-Purpose Controllers 2";
      case 0x12:
        return "General-Purpose Controllers 3";
      case 0x13:
        return "General-Purpose Controllers 4";
      case 0x20:
        return "LSB for controllers 0";
      case 0x21:
        return "LSB for controllers 1";
      case 0x22:
        return "LSB for controllers 2";
      case 0x23:
        return "LSB for controllers 3";
      case 0x24:
        return "LSB for controllers 4";
      case 0x25:
        return "LSB for controllers 5";
      case 0x26:
        return "LSB for controllers 6";
      case 0x27:
        return "LSB for controllers 7";
      case 0x28:
        return "LSB for controllers 8";
      case 0x29:
        return "LSB for controllers 9";
      case 0x2A:
        return "LSB for controllers 10";
      case 0x2B:
        return "LSB for controllers 11";
      case 0x2C:
        return "LSB for controllers 12";
      case 0x2D:
        return "LSB for controllers 13";
      case 0x2E:
        return "LSB for controllers 14";
      case 0x2F:
        return "LSB for controllers 15";
      case 0x30:
        return "LSB for controllers 16";
      case 0x31:
        return "LSB for controllers 17";
      case 0x32:
        return "LSB for controllers 18";
      case 0x33:
        return "LSB for controllers 19";
      case 0x34:
        return "LSB for controllers 20";
      case 0x35:
        return "LSB for controllers 21";
      case 0x36:
        return "LSB for controllers 22";
      case 0x37:
        return "LSB for controllers 23";
      case 0x38:
        return "LSB for controllers 24";
      case 0x39:
        return "LSB for controllers 25";
      case 0x3A:
        return "LSB for controllers 26";
      case 0x3B:
        return "LSB for controllers 27";
      case 0x3C:
        return "LSB for controllers 28";
      case 0x3D:
        return "LSB for controllers 29";
      case 0x3E:
        return "LSB for controllers 30";
      case 0x3F:
        return "LSB for controllers 31";
      case 0x40:
        return "Damper Pedal (Sustain Pedal)";
      case 0x41:
        return "Portamento";
      case 0x42:
        return "Sostenato Pedal";
      case 0x43:
        return "Soft Pedal";
      case 0x44:
        return "Legato Footswitch";
      case 0x45:
        return "Hold 2";
      case 0x46:
        return "Sound Controller 1 (default: Timber Variation)";
      case 0x47:
        return "Sound Controller 2 (default: Timber/Harmonic Content)";
      case 0x48:
        return "Sound Controller 3 (default: Release Time)";
      case 0x49:
        return "Sound Controller 4 (default: Attack Time)";
      case 0x4A:
        return "Sound Controller 5";
      case 0x4B:
        return "Sound Controller 6";
      case 0x4C:
        return "Sound Controller 7";
      case 0x4D:
        return "Sound Controller 8";
      case 0x4E:
        return "Sound Controller 9";
      case 0x4F:
        return "Sound Controller 10";
      case 0x50:
        return "General-Purpose Controllers 5";
      case 0x51:
        return "General-Purpose Controllers 6";
      case 0x52:
        return "General-Purpose Controllers 7";
      case 0x53:
        return "General-Purpose Controllers 8";
      case 0x54:
        return "Portamento Control";
      case 0x5B:
        return "Effects 1 Depth (formerly External Effects Depth)";
      case 0x5C:
        return "Effects 2 Depth (formerly Tremolo Depth)";
      case 0x5D:
        return "Effects 3 Depth (formerly Chorus Depth)";
      case 0x5E:
        return "Effects 4 Depth (formerly Celeste Detune)";
      case 0x5F:
        return "Effects 5 Depth (formerly Phaser Depth)";
      case 0x60:
        return "Data Increment";
      case 0x61:
        return "Data Increment";
      case 0x62:
        return "Non-Registered Parameter Number (LSB)";
      case 0x63:
        return "Non-Registered Parameter Number (MSB)";
      case 0x64:
        return "Registered Parameter Number (LSB)";
      case 0x65:
        return "Registered Parameter Number (MSB)";
      case 0x79:
        return "Mode Messages";
      case 0x7A:
        return "Mode Messages";
      case 0x7B:
        return "Mode Messages";
      case 0x7C:
        return "Mode Messages";
      case 0x7D:
        return "Mode Messages";
      case 0x7E:
        return "Mode Messages";
      case 0x7F:
        return "Mode Messages";

      default:
        return "Unknown";
    }
  };

/*::
interface EventDetails {
  description: string,
  status: number,
};
 */

/*::
interface MidiEvent extends EventDetails {
  channel: number,
  key: number,
  velocity: number,
  controllerType: number,
  programNumber: number,
  channelPressure: number,
  pitchValue: number
};
 */

/*::
interface SysExEvent extends EventDetails {
  sysExData: number
};
 */

/*::
interface MetaEvent extends EventDetails {
  data: number,
  text?: string,
  channel?: number
};
 */

const readMidiEvent /*: (Uint8Array, number, number) => {midiEvent: MidiEvent, displacement: number} */
  = (midiBytes, statusByte, start) => {

    const channel = statusByte & 0x0F;

    let displacement = 0;
    const dataByte1 = getNBytes(midiBytes, start + displacement, 1) & 0x7F;
    displacement += 1;
    const dataByte2 = getNBytes(midiBytes, start + displacement, 1) & 0x7F;
    displacement += 1;

    const midiEvent /*: MidiEvent */ = {
      description: "Unknown Midi Event",
      status: statusByte,
      channel: channel,
      key: 0,
      velocity: 0,
      controllerType: 0,
      programNumber: 0,
      channelPressure: 0,
      pitchValue: 0
    };

    switch (statusByte & 0xF0) {
      case 0x80:
        midiEvent.description = "Note Off";
        midiEvent.key = dataByte1;
        midiEvent.velocity = dataByte2;
        break;

      case 0x90:
        midiEvent.description = "Note On";
        midiEvent.key = dataByte1;
        midiEvent.velocity = dataByte2;
        break;

      case 0xA0:
        midiEvent.description = "Key Pressure or Aftertouch";
        midiEvent.key = dataByte1;
        midiEvent.velocity = dataByte2;
        break;

      case 0xB0:
        midiEvent.description = getControllerDescription(dataByte1);
        midiEvent.controllerType = dataByte2;
        break;

      case 0xC0:
        midiEvent.description = "Program Change (=select instrument)";
        midiEvent.programNumber = dataByte1;
        displacement -= 1;
        break;

      case 0xD0:
        midiEvent.description = "Channel Aftertouch or Channel Pressure";
        midiEvent.channelPressure = dataByte1;
        displacement -= 1;
        break;

      case 0xE0:
        midiEvent.description = "Pitch Bend";
        midiEvent.pitchValue = dataByte2 << 8 + dataByte1;
        break;
    }

    return { midiEvent, displacement };

  };

const readSysExEvent /*: (Uint8Array, number, number) => {sysExEvent: SysExEvent, displacement: number} */
  = (midiBytes, statusByte, start) => {

    let displacement = 0;
    const lengthByte = getNBytes(midiBytes, start + displacement, 1);
    displacement += 1;
    const sysExData = getNBytes(midiBytes, start + displacement, lengthByte);
    displacement += lengthByte;

    let description = "Unknown SysEx Event";
    switch (statusByte & 0xFF) {
      case 0xF0:
        description = "Normal SysEx Event";
        break;
      case 0xF7:
        description = "Divided SysEx Events";
        break;
    }

    const sysExEvent = { description, status: statusByte, sysExData };

    return { sysExEvent, displacement };

  };


const readMetaEvent /*: (Uint8Array, number, number) => {metaEvent: MetaEvent, displacement: number} */
  = (midiBytes, statusByte, start) => {
    let displacement = 0;
    const typeByte = getNBytes(midiBytes, start + displacement, 1);
    displacement += 1;
    const lengthByte = getNBytes(midiBytes, start + displacement, 1);
    displacement += 1;

    const data = getNBytes(midiBytes, start + displacement, lengthByte);
    displacement += lengthByte;
    let channel = 0;

    let description = "Unknown Meta Event";
    let text = "";
    switch (typeByte) {
      case 0x00:
        if (lengthByte === 0x02) {
          description = "Sequence Number";
        }
        break;
      case 0x01:
        description = "Text Event";
        text = String.fromCharCode(data);
        break;
      case 0x02:
        description = "Copyright Notice";
        text = String.fromCharCode(data);
        break;
      case 0x03:
        description = "Sequence/Track Name";
        text = String.fromCharCode(data);
        break;
      case 0x04:
        description = "Instrument Name";
        text = String.fromCharCode(data);
        break;
      case 0x05:
        description = "Lyric";
        text = String.fromCharCode(data);
        break;
      case 0x06:
        description = "Marker";
        text = String.fromCharCode(data);
        break;
      case 0x07:
        description = "Cue Point";
        text = String.fromCharCode(data);
        break;
      case 0x20:
        if (lengthByte === 0x01) {
          description = "MIDI Channel Prefix";
          channel = data & 0x0F;
        }
        break;
      case 0x2F:
        if (lengthByte === 0x00) {
          description = "End Of Track";
        }
        break;

      case 0x51:
        if (lengthByte === 0x03) {
          description = "Set Tempo in microseconds per quarter note";
        }
        break;

      case 0x54:
        if (lengthByte === 0x05) {
          description = "SMPTE Offset";
        }
        break;

      case 0x58:
        if (lengthByte === 0x04) {
          description = "Time Signature";
        }
        break;

      case 0x59:
        if (lengthByte === 0x02) {
          description = "Time Signature";
        }
        break;

      case 0x7F:
        description = "Sequencer Specific Meta Event";
        break;
    }

    const metaEvent = {
      description, text, status: statusByte, data, channel
    };

    return { metaEvent, displacement };
  };

/*::
interface EmptyEvent extends EventDetails {}
 */

/*::
type Event = MidiEvent | SysExEvent | EmptyEvent
 */

/*::
type TrackEvent = {
  deltaTime: number,
  event: Event
};
 */

/*::
type Track = TrackEvent[]
*/

/*::
type Midi = {
  header: Header,
  tracks: Track[]
};
 */

export const parseMIDIBytes /*: Uint8Array => Midi */
  = midiBytes => {

    const header /*: Header */ = {
      format: 0,
      numOfTracks: 0,
      division: {
        type: "metrical",
        ticksPerQuarterNote: 0,
        ticksPerFrame: 0,
        framesPerSecond: 0
      }
    };

    let tracks /*: Track[] */ = [];

    let c = 0;
    while (!isNaN(midiBytes[c])) {
      const { type, error } = getMidiType(midiBytes.slice(c, c + 4));

      if (error) {
        console.error(error);
        return { header, tracks };
      }

      c += 4;
      const length = getNBytes(midiBytes, c, 4);
      c += 4;

      switch (type) {
        case "MThd":
          const twoBytes = 2;
          let headerBytePosition = c;
          const format = getNBytes(midiBytes, headerBytePosition, twoBytes);
          const numOfTracks = getNBytes(midiBytes, headerBytePosition += twoBytes, twoBytes);
          const division = getNBytes(midiBytes, headerBytePosition += twoBytes, twoBytes);

          header.format = format;
          header.numOfTracks = numOfTracks;
          header.division.type = division & 0x8000 ? "time-code-based" : "metrical";

          if (header.division.type === "time-code-based") {
            header.division.ticksPerFrame = division & 0x00FF;
            header.division.framesPerSecond = getFramesPerSecond(division);
          } else {
            header.division.ticksPerQuarterNote = division & 0x7FFF;
          }

          // TODO fire HeaderEvent

          break;
        case "MTrk":
          let trackPos = c;
          let track /*: Track */ = [];

          while (trackPos < c + length) {

            const { deltaTime, deltaTimeNBytes } = getDeltaTime(midiBytes, trackPos);
            trackPos += deltaTimeNBytes;

            const statusByte = getNBytes(midiBytes, trackPos, 1);
            trackPos += 1;

            let event /*: Event */ = { description: "Unknown Event", status: statusByte };

            switch (statusByte & 0xF0) {
              case 0x80:
              case 0x90:
              case 0xA0:
              case 0xB0:
              case 0xC0:
              case 0xD0:
              case 0xE0:
                const { midiEvent, displacement } = readMidiEvent(midiBytes, statusByte, trackPos);
                event = midiEvent;
                trackPos += displacement;
                break;

              case 0xF0:
                switch (statusByte & 0xFF) {
                  case 0xF0:
                  case 0xF7: {
                    const { sysExEvent, displacement } = readSysExEvent(midiBytes, statusByte, trackPos);
                    event = sysExEvent;
                    trackPos += displacement;
                    break;
                  }

                  case 0xFF: {
                    const { metaEvent, displacement } = readMetaEvent(midiBytes, statusByte, trackPos);
                    event = metaEvent;
                    trackPos += displacement;
                    break;
                  }
                }
                break;

            }

            if (event.description.indexOf("Unknown") !== -1) {
              console.error(event.description, "at byte", `from byte #${c} to byte #${trackPos}`);
              let errorBytes = "";
              midiBytes.slice(c, trackPos).map(b => {
                errorBytes += b.toString(16).padStart(2, '0') + ' ';
              });
              console.error(errorBytes);
              // return;
            }

            const trackEvent = { deltaTime, event };

            // TODO fire TrackEvent

            track.push(trackEvent);

          }

          tracks.push(track);

          break;

      }

      c += length;

    }

    const midi = { header, tracks };
    console.log(midi);

    return { header, tracks };
  };

