export default abstract class DataIndexer<T> {
  public abstract getIndex(data: T): number;
  public abstract getData(index: number): T;
}
