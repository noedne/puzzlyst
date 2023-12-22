import type Range from "../Range";
import RangeIndexer from "./RangeIndexer";

export default class MultiRangeIndexer extends RangeIndexer {
  constructor(
    private readonly rangeA: RangeIndexer,
    private readonly rangeB: RangeIndexer,
    private readonly countA: number,
    private readonly probA: number,
  ) {
    super();
  }

  public getIndex(value: number): number {
    if (value < this.probA) {
      return this.rangeA.getIndex(value / this.probA);
    }
    value = (value - this.probA) / (1 - this.probA);
    return this.countA + this.rangeB.getIndex(value);
  }

  public getRange(index: number): Range {
    if (index < this.countA) {
      const { low, high } = this.rangeA.getRange(index);
      return {
        low: low * this.probA,
        high: this.probA - (1 - high) * this.probA,
      };
    }
    const { low, high } = this.rangeB.getRange(index - this.countA);
    return {
      low: this.probA + low * (1 - this.probA),
      high: 1 - (1 - high) * (1 - this.probA),
    };
  }
}
