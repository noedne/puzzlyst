import type Range from "../Range";

export default abstract class RangeIndexer {
  public abstract getIndex(value: number): number;
  public abstract getRange(index: number): Range;
}
