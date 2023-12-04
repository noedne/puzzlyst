import type ArithmeticCoder from "./arithmeticCoding/ArithmeticCoder";
import { getUniformNumberCoding } from "./arithmeticCoding/utils";
import SpecString from "./SpecString";

interface Codeable<T> {
  fromSpecString: (specString: SpecString) => T | null;
  updateCoder: (coder: ArithmeticCoder, ...rest: any[]) => T;
}

export default class List<T> {
  public constructor(public list: T[]) {}

  public static fromSpecString<T>(
    Class: Codeable<T>,
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

  public static updateCoder<T>(
    Class: Codeable<T>,
    coder: ArithmeticCoder,
    lengthDenominator: number,
    encodedList?: List<T>,
    ...rest: any[]
  ): List<T> {
    const length = getUniformNumberCoding(lengthDenominator)
      .updateCoder(coder, encodedList?.list.length);
    const decodedList = [];
    for (let i = 0; i < length; i++) {
      decodedList.push(Class.updateCoder(coder, ...rest, encodedList?.list[i]));
    }
    return encodedList ?? new List(decodedList);
  }

  public toString(handSizeInBits?: number): string {
    return SpecString.constructList(this.list, handSizeInBits);
  }
}
