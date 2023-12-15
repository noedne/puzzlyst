export default class NumberInput {
  private readonly $upArrow = $(`
    <button class="btn arrow up-arrow" tabindex="-1">
      <i class="fa fa-2x fa-caret-up" />
    </button>
  `);
  private readonly $numberInput = $(`
    <input class="form-control number-input" type="number">
  `);
  private readonly $downArrow = $(`
    <button class="btn arrow down-arrow" tabindex="-1">
      <i class="fa fa-2x fa-caret-down" />
    </button>
  `);
  private readonly max: number;
  private readonly min: number;
  private readonly placeholder: number;

  public constructor(
    $groupElement: JQuery,
    {
      initial,
      max,
      min,
      placeholder,
      select,
    }: {
      initial: number,
      max: number,
      min: number,
      placeholder: number,
      select: boolean,
    },
  ) {
    this.max = max;
    this.min = min;
    this.placeholder = placeholder;
    $groupElement.append(this.$upArrow, this.$numberInput, this.$downArrow);
    this.$numberInput.attr({ max, min, placeholder });
    this.$numberInput.val(initial);
    this.setDisabled();
    if (select) {
      this.$numberInput.trigger('select');
    }
    this.$upArrow.on('click', this.onClickUpArrow.bind(this));
    this.$downArrow.on('click', this.onClickDownArrow.bind(this));
    this.$numberInput.on('input', this.onNumberChange.bind(this));
  }

  public getIsValid(): boolean {
    const value = this.getValue();
    return this.min <= value && value <= this.max;
  }

  public getValue(): number {
    const value = this.$numberInput.val();
    if (typeof value !== 'string') {
      throw Error('invalid');
    }
    if (value === '') {
      return this.placeholder;
    }
    return parseInt(value, 10);
  }

  private onClickUpArrow(): void {
    this.changeValue(1);
  }

  private onClickDownArrow(): void {
    this.changeValue(-1);
  }

  private onNumberChange(): void {
    if (this.getValue() < this.min) {
      this.$numberInput.val(this.min);
    } else if (this.getValue() > this.max) {
      this.$numberInput.val(this.max);
    }
    this.setDisabled();
  }

  private changeValue(delta: number): void {
    this.$numberInput.val(
      Math.max(this.min, Math.min(this.getValue() + delta, this.max)),
    );
    this.onNumberChange();
  }

  private setDisabled(): void {
    this.$upArrow.prop('disabled', this.getValue() === this.max);
    this.$downArrow.prop('disabled', this.getValue() === this.min);
  }
}
