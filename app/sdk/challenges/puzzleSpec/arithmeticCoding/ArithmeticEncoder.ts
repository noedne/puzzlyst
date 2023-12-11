import ArithmeticCoder from "./ArithmeticCoder";

export default class ArithmeticEncoder extends ArithmeticCoder {
  private pending = 0;
  private encoded = "";

  public constructor() {
    super();
  }

  public flush(): string {
    const one = ArithmeticCoder.getBitChar(true);
    return this.range.low > 0 || this.pending > 0
      ? this.encoded + one
      : this.encoded.slice(0, this.encoded.lastIndexOf(one) + 1);
  }

  protected override updateRange(offset: number): void {
    super.updateRange(offset);
    if (offset === 0) {
      this.write(false);
    } else if (offset === 1) {
      this.write(true);
    } else {
      this.pending++;
    }
  }

  private write(bit: boolean): void {
    this.encoded += ArithmeticCoder.getBitChar(bit);
    if (this.pending > 0) {
      this.encoded += ArithmeticCoder.getBitChar(!bit).repeat(this.pending);
      this.pending = 0;
    }
  }
}
