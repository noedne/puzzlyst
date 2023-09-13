export default function(Base: typeof Marionette.View) {
  return Base.extend({
    className: Base.prototype.className + ' number-input-view',

    ui: {
      $form: '.prompt-form',
      $submit: '.prompt-submit',
      $upArrow: '.up-arrow',
      $numberInput: '.number-input',
      $downArrow: '.down-arrow',
    },

    events: {
      'click @ui.$submit': 'onClickSubmit',
      'click .prompt-cancel': 'onCancel',
      'click @ui.$upArrow': 'onClickUpArrow',
      'click @ui.$downArrow': 'onClickDownArrow',
      'input @ui.$numberInput': 'onNumberChange',
    },

    initialize: function (options: {
      initial: number,
      max: number,
      min: number,
      placeholder: number,
      select: boolean,
    }) {
      Object.assign(this, options);
    },

    onShow: function () {
      Base.prototype.onShow.apply(this);
      const { initial, max, min, placeholder, select } = this;
      this.ui.$numberInput.attr({ max, min, placeholder });
      this.ui.$numberInput.val(initial);
      this.setDisabled();
      if (select) {
        this.ui.$numberInput.select();
      }
    },

    onSubmit: function () {
      this.onSubmitImpl(this.getValue());
    },

    updateValidState: function () {
      const value = this.getValue();
      this.isValid = this.min <= value && value <= this.max;
    },

    onClickUpArrow: function () {
      this.changeValue(1);
    },

    onClickDownArrow: function () {
      this.changeValue(-1);
    },

    changeValue: function (delta: number) {
      this.ui.$numberInput.val(
        Math.max(this.min, Math.min(this.getValue() + delta, this.max)),
      );
      this.onNumberChange();
    },

    onNumberChange: function () {
      if (this.getValue() < this.min) {
        this.ui.$numberInput.val(this.min);
      } else if (this.getValue() > this.max) {
        this.ui.$numberInput.val(this.max);
      }
      this.setDisabled();
    },

    setDisabled: function () {
      this.ui.$upArrow.prop('disabled', this.getValue() === this.max);
      this.ui.$downArrow.prop('disabled', this.getValue() === this.min);
    },

    getValue: function () {
      const value = parseInt(this.ui.$numberInput.val());
      return isNaN(value) ? this.placeholder : value;
    },
  });
}