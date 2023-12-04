import ArithmeticCoder from "./ArithmeticCoder";

export default class ArithmeticEncoder extends ArithmeticCoder {
  public constructor() {
    super();
  }

  public flush(): string {
    this.pending = this.getFinalPending();
    this.write(this.range.low >= 0.25);
    return this.encoded;
  }
}
