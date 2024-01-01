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

  initialize: function (options: {
    title: string,
    types?: typeof CardType[],
    checkboxes?: boolean,
  }) {
    this.types = options.types ?? [CardType.Card];
    this.templateHelpers = {
      title: options.title,
      checkboxes: options.checkboxes ?? false,
    };
  },

  onSubmit: function () {
    const card = SDK.GameSession.current().copyCard(
      this.getResult(),
      this.$('#keeper').prop('checked'),
    );
    this.trigger('submit', card);
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
