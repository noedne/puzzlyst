import ArithmeticCoder from "./ArithmeticCoder";
import type Range from "./Range";

export default class ArithmeticDecoder extends ArithmeticCoder {
  private static readonly LSB = Number.EPSILON;

  protected override readonly range: Range & { value: number; };
  private index = 0;

  public constructor(private compressed: string) {
    super();
    this.range = {
      ...ArithmeticDecoder.INIT_RANGE,
      value: this.initValue(),
    };
  }

  public getValue(): number {
    return (this.range.value - this.range.low)
      / (this.range.high - this.range.low);
  }

  protected override updateRange(offset: number): void {
    super.updateRange(offset);
    this.range.value = 2 * this.range.value - offset;
    if (this.read() === true) {
      this.range.value += ArithmeticDecoder.LSB;
    }
  }

  private initValue(): number {
    let value = 0;
    for (let weight = 0.5; weight >= ArithmeticDecoder.LSB; weight /= 2) {
      const bit = this.read();
      if (bit === null) {
        break;
      }
      if (bit) {
        value += weight;
      }
    }
    return value;
  }

  private read(): boolean | null {
    if (this.index >= this.compressed.length) {
      return null;
    }
    return this.compressed[this.index++] === this.getBitChar(true);
  }
}
