export default class NumberInput {
  private readonly ui: {
    $numberInput: JQuery,
    $upArrow: JQuery,
    $downArrow: JQuery,
  };
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
    this.ui = {
      $upArrow: $groupElement.children('.up-arrow'),
      $numberInput: $groupElement.children('.number-input'),
      $downArrow: $groupElement.children('.down-arrow'),
    };
    this.max = max;
    this.min = min;
    this.placeholder = placeholder;
    this.ui.$numberInput.attr({ max, min, placeholder });
    this.ui.$numberInput.val(initial);
    this.setDisabled();
    if (select) {
      this.ui.$numberInput.trigger('select');
    }
    this.ui.$upArrow.on('click', this.onClickUpArrow.bind(this));
    this.ui.$downArrow.on('click', this.onClickDownArrow.bind(this));
    this.ui.$numberInput.on('input', this.onNumberChange.bind(this));
  }

  public getIsValid(): boolean {
    const value = this.getValue();
    return this.min <= value && value <= this.max;
  }

  public getValue(): number {
    const value = this.ui.$numberInput.val();
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
      this.ui.$numberInput.val(this.min);
    } else if (this.getValue() > this.max) {
      this.ui.$numberInput.val(this.max);
    }
    this.setDisabled();
  }

  private changeValue(delta: number): void {
    this.ui.$numberInput.val(
      Math.max(this.min, Math.min(this.getValue() + delta, this.max)),
    );
    this.onNumberChange();
  }

  private setDisabled(): void {
    this.ui.$upArrow.prop('disabled', this.getValue() === this.max);
    this.ui.$downArrow.prop('disabled', this.getValue() === this.min);
  }
}
