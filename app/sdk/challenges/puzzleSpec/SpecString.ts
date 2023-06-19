export default class SpecString {
  index: number = 0;

  constructor(public str: string) {}

  matchRegex(regex: RegExp): string | null {
    const res = regex.exec(this.str.slice(this.index));
    if (res === null) {
      return null;
    }
    const match = res[0];
    this.index += match.length;
    return match;
  }

  countZeroes(): number | null {
    const match = this.matchRegex(/^0*1/);
    if (match === null) {
      return null;
    }
    return match.length - 1;
  }

  static writeNZeroes(n: number): string {
    return `${'0'.repeat(n)}1`;
  }

  readNBits(n: number): number | null {
    const match = this.matchRegex(new RegExp(`^[01]{${n}}`));
    if (match === null) {
      return null;
    }
    return parseInt(match, 2);
  }

  static writeNumWithNBits(num: number, n: number): string {
    return num.toString(2).padStart(n, '0');
  }

  countZeroesAndReadNPlusBits(n: number): number | null {
    const zeroes = this.countZeroes();
    if (zeroes === null) {
      return null;
    }
    if (zeroes > 0) {
      // include the leading 1 in the return value
      this.index--;
    }
    return this.readNBits(n + zeroes);
  }

  static padNumWithZeroesForCountingPastNMinBits(num: number, n: number): string {
    const str = num.toString(2).padStart(n, '0');
    const prefix = str.length === n ? '1' : '0'.repeat(str.length - n);
    return `${prefix}${str}`;
  }
  
  extractList<T>(
    fromSpecString: (specString: SpecString) => T | null,
    listSizeBitLength: number | null = null,
  ): T[] | null {
    const count = listSizeBitLength === null
      ? this.countZeroes()
      : this.readNBits(listSizeBitLength);
    if (count === null) {
      return null;
    }
    const list = [];
    for (let i = 0; i < count; i++) {
      const entity = fromSpecString(this);
      if (entity === null) {
        return null;
      }
      list.push(entity);
    }
    return list;
  }

  static constructList<T>(
    list: T[],
    listSizeBitLength: number | null = null,
  ): string {
    return list.reduce((acc, val) => `${acc}${val}`,
      listSizeBitLength === null
        ? SpecString.writeNZeroes(list.length)
        : SpecString.writeNumWithNBits(list.length, listSizeBitLength));
  }

  static boolToBit(bool: boolean): string {
    return bool ? '1' : '0';
  }
}
