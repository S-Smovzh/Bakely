function toBinary(stringToEncode) {
  const codeUnits = new Uint16Array(stringToEncode.length);

  for (let i = 0; i < codeUnits.length; i++) {
    codeUnits[i] = stringToEncode.charCodeAt(i);
  }
  return String.fromCharCode(...new Uint8Array(codeUnits.buffer));
}

function fromBinary(binary) {
  const bytes = new Uint8Array(binary.length);

  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return String.fromCharCode(...new Uint16Array(bytes.buffer));
}

export { toBinary, fromBinary };
