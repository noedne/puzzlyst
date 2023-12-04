import { getUniformRange } from "../utils";
import type Range from "../Range";
import RangeIndexer from "./RangeIndexer";

export default class UniformRangeIndexer extends RangeIndexer {
  constructor(private readonly count: number) {
    super();
  }

  public getIndex(value: number): number {
    return Math.floor(value * this.getCount());
  }

  public getRange(index: number): Range {
    return getUniformRange(index, this.getCount());
  }

  protected getCount(): number {
    return this.count;
  }
}
