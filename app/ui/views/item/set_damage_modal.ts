const Card = require('app/sdk/cards/card');
const FormPromptModalItemView = require('./form_prompt_modal');
const NavigationManager = require('app/ui/managers/navigation_manager');
const SDK = require('app/sdk');
const Template = require('app/ui/templates/item/set_value_modal.hbs');
import withNumberInput from './with_number_input';

const NumberInputView = withNumberInput(FormPromptModalItemView);

export default NumberInputView.extend({
  id: 'app-set-damage',
  template: Template,

  templateHelpers: {
    label: 'damage',
  },

  initialize: function (options: { card: typeof Card }) {
    this.card = options.card;
    NumberInputView.prototype.initialize.apply(this, [{
      initial: this.card.getDamage(),
      max: this.card.getMaxHP() - 1,
      min: 0,
      placeholder: 0,
      select: true,
    }]);
  },

  onSubmitImpl: function (damage: number) {
    SDK.GameSession.current().setCardDamage(this.card, damage);
    NavigationManager.getInstance().destroyModalView();
    this.trigger('submit');
  },
});
