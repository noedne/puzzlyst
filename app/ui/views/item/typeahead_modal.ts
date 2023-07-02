const FormPromptModalItemView = require('./form_prompt_modal');

export default FormPromptModalItemView.extend({
  ui: {
    $form: '.prompt-form',
    $typeahead: '.typeahead',
    $results: '#results',
    $submit: '.prompt-submit',
  },

  events: {
    'click @ui.$submit': 'onClickSubmit',
    'click .prompt-cancel': 'onCancel',
    'keydown .modal-dialog': 'onKeyDown',
    'input @ui.$typeahead': 'onInputChange',
    'mousemove li': 'onHoverResult',
    'click li': 'onClickResult',
  },

  focusedResult: null,
  results: [],
  focusedIndex: 0,

  onShow: function () {
    FormPromptModalItemView.prototype.onShow.apply(this);
    this.ui.$typeahead.focus();
    this.ui.$submit.prop('disabled', true);
  },

  getResult: function () {
    return this.results[this.focusedIndex];
  },

  onKeyDown: function (event: JQuery.TriggeredEvent) {
    if (!this.ui.$typeahead.is(':focus') || this.focusedResult === null) {
      return;
    }
    let newFocus = null;
    switch (event.which) {
      case 9:
        this.ui.$typeahead.val(this.getResult());
        return;
      case 38:
        newFocus = this.focusedResult.prev();
        if (newFocus.length === 0) {
          newFocus = this.$result().last();
        }
        break;
      case 40:
        newFocus = this.focusedResult.next();
        if (newFocus.length === 0) {
          newFocus = this.$result().first();
        }
        break;
      default:
        return;
    }
    event.preventDefault();
    this.updateFocusedResult(newFocus);
  },

  onInputChange: function () {
    const val = this.ui.$typeahead.val();
    if (val === '') {
      this.clearResults();
      return;
    }
    this.results = this.autocomplete(val).slice(0, 3);
    if (this.results.length === 0) {
      this.clearResults();
      return;
    }
    this.ui.$results.html(
      $('<ul>').append(this.results.map(this.createResult)),
    );
    this.updateFocusedResult(this.$result().first());
  },

  onHoverResult: function (event: JQuery.TriggeredEvent) {
    this.updateFocusedResult($(event.currentTarget));
  },

  onClickResult: function (event: JQuery.TriggeredEvent) {
    const result = $(event.currentTarget);
    this.ui.$typeahead.val(result.text());
    this.ui.$results.html($('<ul>').append(result));
    this.ui.$typeahead.focus();
  },

  updateValidState: function () {
    this.isValid = this.focusedResult !== null;
  },

  updateFocusedResult: function (newFocus: JQuery) {
    this.focusedResult?.removeClass('focused');
    this.focusedResult = newFocus.addClass('focused');
    this.ui.$submit.prop('disabled', false);
    this.focusedIndex = this.$result().index(newFocus);
  },

  clearResults: function () {
    this.ui.$results.empty();
    this.focusedResult = null;
    this.ui.$submit.prop('disabled', true);
  },

  $result: function () {
    return $('#results li');
  },

});
