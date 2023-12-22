const Card = require('app/sdk/cards/card');
const Modifier = require('app/sdk/modifiers/modifier');
const ModifierStunnedVanar = require('app/sdk/modifiers/modifierStunnedVanar');
const NavigationManager = require('app/ui/managers/navigation_manager');
const Template = require('app/ui/templates/item/add_card_modal.hbs');
const SDK = require('app/sdk');
import TypeaheadModal from './typeahead_modal';
import { matchSorter } from 'match-sorter';
import { getKeywords } from '../../../sdk/gameVersion';

export default TypeaheadModal.extend({
  id: 'app-add-keyword',
  template: Template,

  templateHelpers: {
    title: 'Add a keyword',
  },

  initialize: function (options: { card: typeof Card }) {
    this.card = options.card;
  },

  onSubmit: function () {
    SDK.GameSession.current().applyModifierContextObjectToCard(
      this.card,
      this.getResult().createContextObject(),
    );
    NavigationManager.getInstance().destroyModalView();
    this.trigger('submit');
  },

  autocomplete: function (name: string): typeof Modifier[] {
    return matchSorter(getKeywords(), name, { keys: [getKeywordName] });
  },

  createResult: function (keyword: typeof Modifier): JQuery {
    return $('<li>').text(getKeywordName(keyword));
  },
});

function getKeywordName(keyword: typeof Modifier): string {
  if (keyword === ModifierStunnedVanar) {
    return 'Stunned (Vanar)';
  }
  return keyword.getName();
}
