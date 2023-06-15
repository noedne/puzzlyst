export function base64StringToBinary(str: string): string | null {
  let res = '';
  for (let i = 0; i < str.length; i++) {
    const uint6 = b64ToUint6(str.charCodeAt(i));
    if (uint6 === null) {
      return null;
    }
    res += uint6ToBinary(uint6);
  }
  return res;
}

export function binaryToBase64String(str: string): string | null {
  const regex = /[01]{1,6}/g;
  let res = '';
  let array;
  while ((array = regex.exec(str)) !== null) {
    const uint6 = binaryToUint6(array[0]);
    const b64 = uint6ToB64(uint6);
    if (b64 === null) {
      return null;
    }
    res += String.fromCharCode(b64);
  }
  return res;
}

function uint6ToBinary(num: number): string {
  let res = '';
  let n = num;
  for (let i = 0; i < 6; i++) {
    const bit = n % 2;
    res = (bit === 0 ? '0' : '1') + res;
    n = (n - bit) / 2;
  }
  return res;
}

function binaryToUint6(binary: string): number {
  let res = 0;
  for (let i = 0; i < 6; i++) {
    res *= 2;
    if (i < binary.length && binary[i] === '1') {
      res++;
    }
  }
  return res;
}

function b64ToUint6(charCode: number): number | null {
  if ('A'.charCodeAt(0) <= charCode && charCode <= 'Z'.charCodeAt(0)) {
    return charCode - 'A'.charCodeAt(0);
  }
  if ('a'.charCodeAt(0) <= charCode && charCode <= 'z'.charCodeAt(0)) {
    return charCode - 'a'.charCodeAt(0) + 26;
  }
  if ('0'.charCodeAt(0) <= charCode && charCode <= '9'.charCodeAt(0)) {
    return charCode - '0'.charCodeAt(0) + 52;
  }
  if (charCode === '-'.charCodeAt(0)) {
    return 62;
  }
  if (charCode === '_'.charCodeAt(0)) {
    return 63;
  }
  return null;
}

function uint6ToB64(num: number): number | null {
  if (0 <= num && num < 26) {
    return num + 'A'.charCodeAt(0);
  }
  if (26 <= num && num < 52) {
    return num - 26 + 'a'.charCodeAt(0);
  }
  if (52 <= num && num < 62) {
    return num - 52 + '0'.charCodeAt(0);
  }
  if (num === 62) {
    return '-'.charCodeAt(0);
  }
  if (num === 63) {
    return '_'.charCodeAt(0);
  }
  return null;
}
