const Card = require('app/sdk/cards/card');
const CardType = require('app/sdk/cards/cardType');
const NavigationManager = require('app/ui/managers/navigation_manager');
const Template = require('app/ui/templates/item/add_card_modal.hbs');
const SDK = require('app/sdk');
import TypeaheadModal from './typeahead_modal';
import { matchSorter } from 'match-sorter';

export default TypeaheadModal.extend({
  id: 'app-add-card',
  template: Template,

  initialize: function () {
    this.types = this.options.types ?? [CardType.Card];
    this.model = new Backbone.Model({
      title: this.options.title,
    });
  },

  onSubmit: function () {
    this.trigger(
      'submit',
      SDK.GameSession.current().copyCard(this.getResult()),
    );
    NavigationManager.getInstance().destroyModalView();
  },

  autocomplete: function (name: string): typeof Card[] {
    const session = SDK.GameSession.current();
    const cards = this.types.flatMap((type: typeof CardType) =>
      session.getCardsByType(type));
    return matchSorter(
      cards,
      name,
      { keys: [(card: typeof Card) => card.getName()] },
    );
  },

  createResult: function (card: typeof Card): JQuery {
    return $('<li>').text(card.getName());
  },
});
