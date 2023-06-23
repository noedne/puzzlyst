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
    'click .prompt-submit': 'onClickSubmit',
    'click .prompt-cancel': 'onCancel',
    'keydown .modal-dialog': 'onKeyDown',
    'input .minion-name': 'onNameChange',
    'mousemove li': 'onHoverResult',
    'click li': 'onClickResult',
  },

  focusedResult: null,

  onShow: function () {
    FormPromptModalItemView.prototype.onShow.apply(this);
    this.ui.$minionName.focus();
    this.ui.$submit.prop('disabled', true);
  },

  onSubmit: function () {
    const minionName = this.focusedResult.text();
    const card =
      SDK.GameSession.current().getCardCaches().getCards().find(
        (card: typeof Card) => card.getName() === minionName,
      );
    SDK.GameSession.current().addCardToBench(card);
    NavigationManager.getInstance().destroyModalView();
  },

  onKeyDown: function (event: JQuery.TriggeredEvent) {
    if (this.focusedResult === null) {
      return;
    }
    let newFocus = null;
    switch (event.which) {
      case 38:
        newFocus = this.focusedResult.prev();
        if (newFocus.length === 0) {
          newFocus = $('li').last();
        }
        break;
      case 40:
        newFocus = this.focusedResult.next();
        if (newFocus.length === 0) {
          newFocus = $('li').first();
        }
        break;
      default:
        return;
    }
    event.preventDefault();
    this.updateFocusedResult(newFocus);
  },

  onNameChange: function () {
    const minionName = this.ui.$minionName.val();
    if (minionName === '') {
      this.clearResults();
      return;
    }
    const cards = this.autocomplete(minionName).slice(0, 3);
    if (cards.length === 0) {
      this.clearResults();
      return;
    }
    this.ui.$results.html($('<ul>').append(cards.map(this.createResult)));
    this.updateFocusedResult($('li').first());
  },

  onHoverResult: function (event: JQuery.TriggeredEvent) {
    this.updateFocusedResult($(event.currentTarget));
  },

  onClickResult: function (event: JQuery.TriggeredEvent) {
    const result = $(event.currentTarget);
    this.ui.$minionName.val(result.text());
    this.ui.$results.html($('<ul>').append(result));
    this.ui.$minionName.focus();
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

  updateValidState: function () {
    this.isValid = this.focusedResult !== null;
  },

  updateFocusedResult: function (newFocus: JQuery) {
    this.focusedResult?.removeClass('focused');
    this.focusedResult = newFocus.addClass('focused');
    this.ui.$submit.prop('disabled', false);
  },

  clearResults: function () {
    this.ui.$results.empty();
    this.focusedResult = null;
    this.ui.$submit.prop('disabled', true);
  },

});