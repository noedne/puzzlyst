const Card = require('app/sdk/cards/card');
const FormPromptModalItemView = require('./form_prompt_modal');
const NavigationManager = require('app/ui/managers/navigation_manager');
const Template = require('app/ui/templates/item/add_minion_modal.hbs');
const SDK = require('app/sdk');
import {matchSorter} from 'match-sorter';

export default FormPromptModalItemView.extend({
  id: 'app-add-minion',
  template: Template,

  ui: {
    $form: '.prompt-form',
    $minionName: '.minion-name',
    $results: '#results',
    $submit: '.prompt-submit',
  },

  events: {
    'input .minion-name': 'onNameChange',
  },

  onShow: function () {
    FormPromptModalItemView.prototype.onShow.apply(this);
    this.ui.$minionName.focus();
  },

  onSubmit: function () {
    const minionName = this.ui.$minionName.val();
    const card =
      SDK.GameSession.current().getCardCaches().getCards().find(
        (card: typeof Card) => card.getName() === minionName,
      );
    SDK.GameSession.current().addCardToBench(card);
    NavigationManager.getInstance().destroyModalView();
  },

  onNameChange: function () {
    this.ui.$results.html(
      $('<ul>').append(
        this.autocomplete(this.ui.$minionName.val())
          .slice(0, 3)
          .map((card: typeof Card) => this.createResult(card)),
      )
    );
  },

  autocomplete: function (minionName: string): typeof Card[] {
    const minionCards = SDK.GameSession.current().getMinionCards();
    return matchSorter(
      minionCards,
      minionName,
      { keys: [(card: typeof Card) => card.getName()] },
    );
  },

  createResult: function (card: typeof Card): JQuery {
    return $('<li>').text(card.getName());
  }

});