export default class SpecString {
  str: string;
  index: number = 0;

  constructor(str: string) {
    this.str = str;
  }

  matchRegex(regex: RegExp): string | null {
    const res = regex.exec(this.str);
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

  readNBits(n: number): number | null {
    const match = this.matchRegex(new RegExp(`^[01]{${n}}`));
    if (match === null) {
      return null;
    }
    return parseInt(match, 2);
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
  
  extractList<T>(
    fromSpecString: (specString: SpecString) => T | null,
    listSizeMinBitLength: number | null = null,
  ): T[] | null {
    const count = listSizeMinBitLength === null
      ? this.countZeroes()
      : this.countZeroesAndReadNPlusBits(listSizeMinBitLength);
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
}
