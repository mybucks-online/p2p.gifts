const CHUNK_OVERHEAD = 12; // 4 length + 4 type + 4 crc
const IEND_CHUNK_LENGTH = CHUNK_OVERHEAD;

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = (c >>> 8) ^ crc32Table[(c ^ buf[i]) & 0xff];
  }
  return (c ^ 0xffffffff) >>> 0;
}

const crc32Table = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  }
  crc32Table[n] = c;
}

function buildTextChunk(keyword, text) {
  const encoder = new TextEncoder();
  const keyBytes = encoder.encode(keyword);
  const textBytes = encoder.encode(text);
  const dataLen = keyBytes.length + 1 + textBytes.length; // +1 for null separator
  const chunk = new Uint8Array(CHUNK_OVERHEAD + dataLen);
  const view = new DataView(chunk.buffer);

  view.setUint32(0, dataLen);
  chunk.set([0x74, 0x45, 0x58, 0x74], 4); // "tEXt"
  chunk.set(keyBytes, 8);
  chunk[8 + keyBytes.length] = 0; // null separator
  chunk.set(textBytes, 8 + keyBytes.length + 1);

  const crcData = chunk.subarray(4, 8 + dataLen);
  view.setUint32(8 + dataLen, crc32(crcData));

  return chunk;
}

/**
 * Inject PNG tEXt metadata into a data URL.
 * @param {string} dataUrl - PNG data URL
 * @param {Record<string, string>} metadata - key/value pairs (e.g. Author, Source)
 * @returns {string} PNG data URL with metadata
 */
export function injectPngMetadata(dataUrl, metadata) {
  const base64 = dataUrl.split(",")[1];
  const binary = atob(base64);
  const original = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    original[i] = binary.charCodeAt(i);
  }

  const chunks = [];
  for (const [keyword, text] of Object.entries(metadata)) {
    if (text) chunks.push(buildTextChunk(keyword, text));
  }

  if (chunks.length === 0) return dataUrl;

  const insertPos = original.length - IEND_CHUNK_LENGTH;
  const totalExtra = chunks.reduce((sum, c) => sum + c.length, 0);
  const result = new Uint8Array(original.length + totalExtra);

  result.set(original.subarray(0, insertPos));
  let offset = insertPos;
  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.length;
  }
  result.set(original.subarray(insertPos), offset);

  let binaryStr = "";
  for (let i = 0; i < result.length; i++) {
    binaryStr += String.fromCharCode(result[i]);
  }
  return "data:image/png;base64," + btoa(binaryStr);
}
