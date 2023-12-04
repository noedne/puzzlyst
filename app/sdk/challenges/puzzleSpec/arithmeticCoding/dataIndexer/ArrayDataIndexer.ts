import DataIndexer from "./DataIndexer";

export default class ArrayDataIndexer<T> extends DataIndexer<T> {
  constructor(private readonly values: T[]) {
    super();
  }

  public getIndex(data: T): number {
    return this.values.indexOf(data);
  }

  public getData(index: number): T {
    const data = this.values[index];
    if (data == null) {
      throw new Error('invalid');
    }
    return data;
  }
}
