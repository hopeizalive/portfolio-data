export const float32ToPCM16 = (float32Array: Float32Array): Uint8Array => {
  const buffer = new ArrayBuffer(float32Array.length * 2);
  const view = new DataView(buffer);
  for (let i = 0; i < float32Array.length; i++) {
    let s = Math.max(-1, Math.min(1, float32Array[i]));
    s = s < 0 ? s * 0x8000 : s * 0x7fff;
    view.setInt16(i * 2, s, true); // Little-endian
  }
  return new Uint8Array(buffer);
};

export const base64ToUint8Array = (base64: string): Uint8Array => {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
};

export const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
};

export const decodeAudioData = async (
  base64Data: string,
  audioContext: AudioContext
): Promise<AudioBuffer> => {
  const uint8Array = base64ToUint8Array(base64Data);
  
  // Create an Int16Array from the Uint8Array (assuming PCM16 little-endian)
  const int16Array = new Int16Array(uint8Array.buffer);
  
  // Convert Int16 to Float32
  const float32Array = new Float32Array(int16Array.length);
  for (let i = 0; i < int16Array.length; i++) {
    float32Array[i] = int16Array[i] / 32768.0;
  }

  // Create an AudioBuffer
  const buffer = audioContext.createBuffer(1, float32Array.length, 24000); // Model output is usually 24kHz
  buffer.copyToChannel(float32Array, 0);
  
  return buffer;
};