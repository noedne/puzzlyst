const Card = require('app/sdk/cards/card');
const NavigationManager = require('app/ui/managers/navigation_manager');
const Template = require('app/ui/templates/item/add_minion_modal.hbs');
const SDK = require('app/sdk');
import TypeaheadModal from './typeahead_modal';
import { matchSorter } from 'match-sorter';

export default TypeaheadModal.extend({
  id: 'app-add-minion',
  template: Template,

  onSubmit: function () {
    const minionName = this.getResult();
    const card =
      SDK.GameSession.current().getCardCaches().getCards().find(
        (card: typeof Card) => card.getName() === minionName,
      );
    SDK.GameSession.current().addCardToBench(card);
    NavigationManager.getInstance().destroyModalView();
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
  },

});
