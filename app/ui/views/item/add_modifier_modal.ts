const Card = require('app/sdk/cards/card');
const NavigationManager = require('app/ui/managers/navigation_manager');
const SDK = require('app/sdk');
const Template = require('app/ui/templates/item/add_modifier_modal.hbs');
import TypeaheadModal from './typeahead_modal';
import getContextObjectData, { contextObjectCardIds, getDescription } from '../../../sdk/challenges/puzzleSpec/getContextObjectData';
import { matchSorter } from 'match-sorter';
import NumberInput from './number_input';

export default TypeaheadModal.extend({
  className: TypeaheadModal.prototype.className + ' number-input-view',
  id: 'app-add-modifier',
  template: Template,

  initialize: function (options: { card: typeof Card }) {
    this.card = options.card;
  },

  onShow: function () {
    TypeaheadModal.prototype.onShow.apply(this);
    this.numberInput = new NumberInput({
      $groupElement: this.$('.number-input-group'),
      initial: 1,
      max: Infinity,
      min: 1,
      placeholder: 1,
    });
  },

  onSubmit: function () {
    const count = this.numberInput.getValue();
    SDK.GameSession.current().applyModifierContextObjectToCard(
      this.card,
      this.getResult().contextObject,
      count,
    );
    NavigationManager.getInstance().destroyModalView();
    this.trigger('submit');
  },

  autocomplete: function (input: string): typeof Card[] {
    const gameSession = SDK.GameSession.current();
    return matchSorter(
      contextObjectCardIds.flatMap(cardId => {
        const name = gameSession.createCardForIdentifier(cardId).getName();
        return getContextObjectData(cardId).map(data => ({
          ...data,
          name,
          description: getDescription(data),
        }));
      }),
      input,
      { keys: ['name', 'description'] },
    );
  },

  createResult: function (item: { name: string, description: string }): JQuery {
    return $('<li>').text(`${item.name}: ${item.description}`);
  },

  updateValidState: function () {
    if (this.numberInput == null || !this.numberInput.getIsValid()) {
      this.isValid = false;
    } else {
      TypeaheadModal.prototype.updateValidState.apply(this);
    }
  },
});
