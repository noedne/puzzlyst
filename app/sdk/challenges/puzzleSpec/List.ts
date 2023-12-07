import type ArithmeticCoder from "./arithmeticCoding/ArithmeticCoder";
import { getUniformNumberCoding } from "./arithmeticCoding/utils";
import SpecString from "./SpecString";

interface SpecStringable<T> {
  fromSpecString: (specString: SpecString) => T | null;
}

interface Codeable<T, U extends unknown[]> {
  updateCoder: (coder: ArithmeticCoder, data: T | undefined, ...rest: U) => T;
}

export default class List<T> {
  public constructor(public list: T[]) {}

  public static fromSpecString<T>(
    Class: SpecStringable<T>,
    specString: SpecString,
    listSizeBitLength: number | null = null,
  ): List<T> | null {
    const list = specString.extractList(
      Class.fromSpecString,
      listSizeBitLength,
    );
    if (list === null) {
      return null;
    }
    return new List(list);
  }

  public static updateCoder<T, U extends unknown[]>(
    Class: Codeable<T, U>,
    coder: ArithmeticCoder,
    lengthDenominator: number,
    encodedList: List<T> | undefined,
    ...rest: U
  ): List<T> {
    const length = getUniformNumberCoding(lengthDenominator)
      .updateCoder(coder, encodedList?.list.length);
    const decodedList = [];
    for (let i = 0; i < length; i++) {
      decodedList.push(Class.updateCoder(coder, encodedList?.list[i], ...rest));
    }
    return encodedList ?? new List(decodedList);
  }

  public toString(handSizeInBits?: number): string {
    return SpecString.constructList(this.list, handSizeInBits);
  }
}
