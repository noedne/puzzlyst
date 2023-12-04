import type Range from "./Range";

export default class ArithmeticCoder {
  private static readonly WORD_SIZE = 6;
  protected static readonly INIT_RANGE: Range = {
    low: 0,
    high: 1,
  };

  protected readonly range = {
    ...ArithmeticCoder.INIT_RANGE,
  };
  protected pending = 0;
  protected encoded = "";

  public update(range: Range): void {
    const len = this.range.high - this.range.low;
    this.range.low += range.low * len;
    this.range.high -= (1 - range.high) * len;
    for (;;) {
      if (this.range.high <= 0.5) {
        this.write(false);
        this.updateRange(0)
      } else if (this.range.low >= 0.5) {
        this.write(true);
        this.updateRange(1);
      } else if (this.range.low >= 0.25 && this.range.high <= 0.75) {
        this.pending++;
        this.updateRange(0.5);
      } else {
        break;
      }
    }
  }

  protected constructor() {}

  protected write(bit: boolean): void {
    this.encoded += this.getBitChar(bit);
    if (this.pending > 0) {
      this.encoded += this.getBitChar(!bit).repeat(this.pending);
      this.pending = 0;
    }
  }

  protected updateRange(offset: number): void {
    this.range.low = 2 * this.range.low - offset;
    this.range.high = 2 * this.range.high - offset;
  }

  protected getBitChar(bit: boolean): string {
    return bit ? '1' : '0';
  }

  protected getFinalPending(): number {
    return this.pending + ArithmeticCoder.WORD_SIZE
      - this.getLengthWithPending(this.pending) % ArithmeticCoder.WORD_SIZE;
  }

  protected getLengthWithPending(pending: number): number {
    return this.encoded.length + 1 + pending;
  }
}
