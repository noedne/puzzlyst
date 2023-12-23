const Card = require('app/sdk/cards/card');
const Modifier = require('app/sdk/modifiers/modifier');
const NavigationManager = require('app/ui/managers/navigation_manager');
const Template = require('app/ui/templates/item/add_card_modal.hbs');
const SDK = require('app/sdk');
import TypeaheadModal from './typeahead_modal';
import { matchSorter } from 'match-sorter';
import { getKeywordData } from '../../../sdk/gameVersion';

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
      this.getResult().class.createContextObject(),
    );
    NavigationManager.getInstance().destroyModalView();
    this.trigger('submit');
  },

  autocomplete: function (name: string): typeof Modifier[] {
    return matchSorter(getKeywordData(), name, { keys: ['name'] });
  },

  createResult: function ({ name }: { name: string }): JQuery {
    return $('<li>').text(name);
  },
});
