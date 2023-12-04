import type ArithmeticCoder from "./ArithmeticCoder";
import type ArithmeticDecoder from "./ArithmeticDecoder";
import type ArithmeticEncoder from "./ArithmeticEncoder";
import type DataIndexer from "./dataIndexer/DataIndexer";
import type RangeIndexer from "./rangeIndexer/RangeIndexer";

export default class Coding<T> {
  constructor(
    private readonly dataIndexer: DataIndexer<T>,
    private readonly rangeIndexer: RangeIndexer,
  ) {}

  public updateCoder(coder: ArithmeticCoder, data?: T): T {
    if (data != null) {
      this.encode(coder as ArithmeticEncoder, data);
      return data;
    }
    return this.decode(coder as ArithmeticDecoder);
  }

  public encode(encoder: ArithmeticEncoder, data: T): void {
    const index = this.dataIndexer.getIndex(data);
    encoder.update(this.rangeIndexer.getRange(index));
  }

  public decode(decoder: ArithmeticDecoder): T {
    const index = this.rangeIndexer.getIndex(decoder.getValue());
    decoder.update(this.rangeIndexer.getRange(index));
    return this.dataIndexer.getData(index);
  }
}
