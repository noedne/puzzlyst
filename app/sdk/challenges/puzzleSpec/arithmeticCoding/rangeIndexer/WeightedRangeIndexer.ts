import { getProbsIndex, getProbsRange } from "../utils";
import type Range from "../Range";
import RangeIndexer from "./RangeIndexer";

export default class WeightedRangeIndexer extends RangeIndexer {
  constructor(private readonly weights: number[]) {
    super();
  }

  public getIndex(value: number): number {
    return getProbsIndex(this.weights, value);
  }

  public getRange(index: number): Range {
    return getProbsRange(this.weights, index);
  }
}
