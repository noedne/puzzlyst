import type ArithmeticCoder from "./arithmeticCoding/ArithmeticCoder";
import type Coding from "./arithmeticCoding/Coding";
import { getAdaptiveArrayCoding } from "./arithmeticCoding/utils";
import BaseCard from "./BaseCard";
import SpecString from "./SpecString";

interface SpecStringable<T> {
  fromSpecString: (specString: SpecString) => T | null;
}

interface CodeableInstance {
  baseCard: BaseCard,
}

interface CodeableClass<T, U extends unknown[]> {
  updateCoder: (
    coder: ArithmeticCoder,
    baseCard: BaseCard,
    data: T | undefined,
    ...rest: U
  ) => T;
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

  public static updateCoder<T extends CodeableInstance, U extends unknown[]>(
    Class: CodeableClass<T, U>,
    coder: ArithmeticCoder,
    ids: number[],
    lengthCoding: Coding<number>,
    encodedList: List<T> | undefined,
    ...rest: U
  ): List<T> {
    const idCoding = getAdaptiveArrayCoding(ids);
    const length = lengthCoding.updateCoder(coder, encodedList?.list.length);
    const decodedList = [];
    for (let i = 0; i < length; i++) {
      const item = encodedList?.list[i];
      const baseCard =
        this.updateCoderBaseCard(coder, idCoding, item?.baseCard);
      decodedList.push(Class.updateCoder(coder, baseCard, item, ...rest));
    }
    return encodedList ?? new List(decodedList);
  }

  public toString(handSizeInBits?: number): string {
    return SpecString.constructList(this.list, handSizeInBits);
  }

  private static updateCoderBaseCard(
    coder: ArithmeticCoder,
    idCoding: Coding<number>,
    baseCard: BaseCard | undefined,
  ): BaseCard {
    const cardId = idCoding.updateCoder(coder, baseCard?.cardId);
    return baseCard ?? new BaseCard(cardId);
  }
}
