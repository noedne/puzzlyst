import NumberDataIndexer from "./NumberDataIndexer";

export default class NumberWithHoleDataIndexer extends NumberDataIndexer {
  constructor(
    private readonly hole: number,
    offset: number = 0,
  ) {
    super(offset);
  }

  public override getIndex(data: number): number {
    const index = super.getIndex(data);
    if (data < this.hole) {
      return index;
    }
    return index - 1;
  }

  public override getData(index: number): number {
    const data = super.getData(index);
    if (data < this.hole) {
      return data;
    }
    return data + 1;
  }
}
