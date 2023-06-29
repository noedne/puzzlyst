const FormPromptModalItemView = require('./form_prompt_modal');

export default FormPromptModalItemView.extend({
  ui: {
    $form: '.prompt-form',
    $formControl: '.form-control',
    $results: '#results',
    $submit: '.prompt-submit',
  },

  events: {
    'click @ui.$submit': 'onClickSubmit',
    'click .prompt-cancel': 'onCancel',
    'keydown .modal-dialog': 'onKeyDown',
    'input @ui.$formControl': 'onInputChange',
    'mousemove li': 'onHoverResult',
    'click li': 'onClickResult',
  },

  focusedResult: null,

  onShow: function () {
    FormPromptModalItemView.prototype.onShow.apply(this);
    this.ui.$formControl.focus();
    this.ui.$submit.prop('disabled', true);
  },

  getResult: function () {
    return this.focusedResult.text();
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

  onInputChange: function () {
    const val = this.ui.$formControl.val();
    if (val === '') {
      this.clearResults();
      return;
    }
    const results = this.autocomplete(val).slice(0, 3);
    if (results.length === 0) {
      this.clearResults();
      return;
    }
    this.ui.$results.html($('<ul>').append(results.map(this.createResult)));
    this.updateFocusedResult($('li').first());
  },

  onHoverResult: function (event: JQuery.TriggeredEvent) {
    this.updateFocusedResult($(event.currentTarget));
  },

  onClickResult: function (event: JQuery.TriggeredEvent) {
    const result = $(event.currentTarget);
    this.ui.$formControl.val(result.text());
    this.ui.$results.html($('<ul>').append(result));
    this.ui.$formControl.focus();
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
