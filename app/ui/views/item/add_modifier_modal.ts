const Card = require('app/sdk/cards/card');
const NavigationManager = require('app/ui/managers/navigation_manager');
const SDK = require('app/sdk');
const Template = require('app/ui/templates/item/add_modifier_modal.hbs');
import TypeaheadModal from './typeahead_modal';
import getContextObjectData, { contextObjectCardIds, getDescription } from '../../../sdk/challenges/puzzleSpec/getContextObjectData';
import { matchSorter } from 'match-sorter';
import withNumberInput from './with_number_input';

const NumberInputView = withNumberInput(TypeaheadModal);

export default NumberInputView.extend({
  id: 'app-add-modifier',
  template: Template,

  ui: {
    $form: '.prompt-form',
    $typeahead: '.typeahead',
    $results: '#results',
    $submit: '.prompt-submit',
    $upArrow: '.up-arrow',
    $numberInput: '.number-input',
    $downArrow: '.down-arrow',
  },

  events: {
    'click @ui.$submit': 'onClickSubmit',
    'keydown .modal-dialog': 'onKeyDown',
    'input @ui.$typeahead': 'onInputChange',
    'mousemove li': 'onHoverResult',
    'click li': 'onClickResult',
    'click @ui.$upArrow': 'onClickUpArrow',
    'click @ui.$downArrow': 'onClickDownArrow',
    'input @ui.$numberInput': 'onNumberChange',
  },

  initialize: function (options: { card: typeof Card }) {
    this.card = options.card;
    NumberInputView.prototype.initialize.apply(this, [{
      initial: 1,
      max: Infinity,
      min: 1,
      placeholder: 1,
      select: false,
    }]);
  },

  onSubmitImpl: function (count: number) {
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
});
