import ArithmeticCoder from "./ArithmeticCoder";

export default class ArithmeticEncoder extends ArithmeticCoder {
  private pending = 0;
  private encoded = "";

  public constructor() {
    super();
  }

  public flush(): string {
    return this.encoded + '1';
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
    this.encoded += this.getBitChar(bit);
    if (this.pending > 0) {
      this.encoded += this.getBitChar(!bit).repeat(this.pending);
      this.pending = 0;
    }
  }
}
