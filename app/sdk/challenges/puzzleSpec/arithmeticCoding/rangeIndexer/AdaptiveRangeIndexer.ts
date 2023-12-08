import type Range from "../Range";
import RangeIndexer from "./RangeIndexer";

export default class AdaptiveRangeIndexer extends RangeIndexer {
  private highNums: number[];

  public constructor(length: number) {
    super();
    this.highNums = Array(length);
    for (let i = 0; i < length; i++) {
      this.highNums[i] = i + 1;
    }
  }

  public getIndex(value: number): number {
    const denom = this.highNums.at(-1);
    if (denom === undefined) {
      throw Error('invalid');
    }
    const num = value * denom;
    let low = 0;
    let high = this.highNums.length;
    while (high - low > 1) {
      const mid = (low + high) >>> 1;
      const midLowNum = this.highNums[mid - 1];
      if (midLowNum === undefined) {
        throw Error('invalid');
      }
      if (midLowNum <= num) {
        low = mid;
      } else {
        high = mid;
      }
    }
    return low;
  }

  public getRange(index: number): Range {
    const lowNum = this.highNums[index - 1] ?? 0;
    const highNum = this.highNums[index];
    const denom = this.highNums.at(-1);
    if (highNum === undefined || denom === undefined) {
      throw Error('invalid');
    }
    this.updateIndex(index);
    return { low: lowNum / denom, high: highNum / denom };
  }

  private updateIndex(index: number): void {
    for (let i = index; i < this.highNums.length; i++) {
      this.highNums[i]++;
    }
  }
}
