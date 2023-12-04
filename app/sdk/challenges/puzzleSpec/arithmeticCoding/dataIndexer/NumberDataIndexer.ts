import DataIndexer from "./DataIndexer";

export default class NumberDataIndexer extends DataIndexer<number> {
  constructor(private readonly offset: number = 0) {
    super();
  }

  public getIndex(data: number): number {
    return data - this.offset;
  }

  public getData(index: number): number {
    return index + this.offset;
  }
}
