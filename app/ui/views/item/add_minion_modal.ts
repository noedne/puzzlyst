const Card = require('app/sdk/cards/card');
const FormPromptModalItemView = require('./form_prompt_modal');
const NavigationManager = require('app/ui/managers/navigation_manager');
const Template = require('app/ui/templates/item/add_minion_modal.hbs');
const SDK = require('app/sdk');

export default FormPromptModalItemView.extend({
  id: 'app-add-minion',
  template: Template,
  ui: {
    $form: '.prompt-form',
    $minionName: '.minion-name',
    $submit: '.prompt-submit',
  },

  onShow: function() {
    FormPromptModalItemView.prototype.onShow.apply(this);
    this.ui.$minionName.focus();
  },

  onSubmit: function() {
    const minionName = this.ui.$minionName.val();
    const card =
      SDK.GameSession.current().getCardCaches().getCards().find(
        (card: typeof Card) => card.getName() === minionName,
      );
    SDK.GameSession.current().addCardToBench(card);
    NavigationManager.getInstance().destroyModalView();
  }
});