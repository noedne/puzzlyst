export default class CodingData {
  public static plus(data: Number, n: number): Number {
    return data === undefined ? undefined : data + n;
  }

  public static equals(data: Number, n: number): Boolean {
    return data === undefined ? undefined : data === n;
  }

  public static isNonnegative(data: Number): Boolean {
    return data === undefined ? undefined : data >= 0;
  }
}

type Boolean = boolean | undefined;
type Number = number | undefined;
