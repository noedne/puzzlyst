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
