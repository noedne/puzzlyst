import NumberInput from "./number_input";

const FormPromptModalItemView = require('./form_prompt_modal');
const NavigationManager = require('app/ui/managers/navigation_manager');
const Template = require('app/ui/templates/item/set_value_modal.hbs');

export default FormPromptModalItemView.extend({
  className: FormPromptModalItemView.prototype.className + ' number-input-view',
  id: 'app-set-value',
  template: Template,

  ui: {
    $form: '.prompt-form',
    $submit: '.prompt-submit',
    $numberInputGroup: '.number-input-group',
  },

  events: {
    'click @ui.$submit': 'onClickSubmit',
    'click .prompt-cancel': 'onCancel',
  },

  initialize: function (options: {
    initial: number,
    label: string,
    max: number,
    min: number,
    placeholder: number,
    onSubmit: Function,
  }) {
    this.initial = options.initial;
    this.max = options.max;
    this.min = options.min;
    this.placeholder = options.placeholder;
    this.onSubmitValue = options.onSubmit;
    this.templateHelpers = {
      label: options.label,
    };
  },

  onShow: function () {
    FormPromptModalItemView.prototype.onShow.apply(this);
    this.numberInput = new NumberInput({
      $groupElement: this.ui.$numberInputGroup,
      initial: this.initial,
      max: this.max,
      min: this.min,
      placeholder: this.placeholder,
      select: true,
    });
  },

  onSubmit: function () {
    this.onSubmitValue(this.numberInput.getValue());
    NavigationManager.getInstance().destroyModalView();
    this.trigger('submit');
  },

  updateValidState: function () {
    this.isValid = this.numberInput != null && this.numberInput.getIsValid();
  },
});
