const Card = require('app/sdk/cards/card');
const NavigationManager = require('app/ui/managers/navigation_manager');
const Template = require('app/ui/templates/item/add_modifier_modal.hbs');
const SDK = require('app/sdk');
import TypeaheadModal from './typeahead_modal';
import getContextObjectData, { contextObjectCardIds, getDescription } from '../../../sdk/challenges/puzzleSpec/getContextObjectData';
import { matchSorter } from 'match-sorter';

export default TypeaheadModal.extend({
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
    'click .prompt-cancel': 'onCancel',
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
  },

  onSubmit: function () {
    SDK.GameSession.current().applyModifierContextObjectToCard(
      this.card,
      this.getResult(),
      this.ui.$numberInput.val(),
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

  onClickUpArrow: function () {
    this.ui.$numberInput[0].stepUp();
  },

  onClickDownArrow: function () {
    this.ui.$numberInput[0].stepDown();
  },

  onNumberChange: function () {
    this.ui.$downArrow.prop('disabled', this.ui.$numberInput.val() === '1');
  },

});
