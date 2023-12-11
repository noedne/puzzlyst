import type Range from "./Range";

export default class ArithmeticCoder {
  protected static readonly INIT_RANGE: Range = {
    low: 0,
    high: 1,
  };

  protected readonly range = {
    ...ArithmeticCoder.INIT_RANGE,
  };

  public update(range: Range): void {
    const len = this.range.high - this.range.low;
    this.range.low += range.low * len;
    this.range.high -= (1 - range.high) * len;
    for (;;) {
      if (this.range.high <= 0.5) {
        this.updateRange(0)
      } else if (this.range.low >= 0.5) {
        this.updateRange(1);
      } else if (this.range.low >= 0.25 && this.range.high <= 0.75) {
        this.updateRange(0.5);
      } else {
        break;
      }
    }
  }

  protected constructor() {}

  protected updateRange(offset: number): void {
    this.range.low = 2 * this.range.low - offset;
    this.range.high = 2 * this.range.high - offset;
  }

  protected static getBitChar(bit: boolean): string {
    return bit ? '1' : '0';
  }
}
