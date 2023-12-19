import NumberInput from "./number_input";

const Card = require('app/sdk/cards/card');
const FormPromptModalItemView = require('./form_prompt_modal');
const NavigationManager = require('app/ui/managers/navigation_manager');
const SDK = require('app/sdk');
const Template = require('app/ui/templates/item/set_value_modal.hbs');

export default FormPromptModalItemView.extend({
  className: FormPromptModalItemView.prototype.className + ' number-input-view',
  id: 'app-set-damage',
  template: Template,

  templateHelpers: {
    label: 'damage',
  },

  ui: {
    $form: '.prompt-form',
    $submit: '.prompt-submit',
    $numberInputGroup: '.number-input-group',
  },

  events: {
    'click @ui.$submit': 'onClickSubmit',
    'click .prompt-cancel': 'onCancel',
  },

  initialize: function (options: { card: typeof Card }) {
    this.card = options.card;
  },

  onShow: function () {
    FormPromptModalItemView.prototype.onShow.apply(this);
    this.numberInput = new NumberInput({
      $groupElement: this.ui.$numberInputGroup,
      initial: this.card.getDamage(),
      max: this.card.getMaxHP() - 1,
      min: 0,
      placeholder: 0,
      select: true,
    });
  },

  onSubmit: function () {
    const damage = this.numberInput.getValue();
    SDK.GameSession.current().setCardDamage(this.card, damage);
    NavigationManager.getInstance().destroyModalView();
    this.trigger('submit');
  },

  updateValidState: function () {
    this.isValid = this.numberInput != null && this.numberInput.getIsValid();
  },
});
