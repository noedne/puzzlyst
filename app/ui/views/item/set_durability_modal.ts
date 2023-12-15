import NumberInput from "./number_input";

const Artifact = require('app/sdk/artifacts/artifact');
const CONFIG = require('app/common/config');
const FormPromptModalItemView = require('./form_prompt_modal');
const NavigationManager = require('app/ui/managers/navigation_manager');
const SDK = require('app/sdk');
const Template = require('app/ui/templates/item/set_value_modal.hbs');

export default FormPromptModalItemView.extend({
  className: FormPromptModalItemView.prototype.className + ' number-input-view',
  id: 'app-set-durability',
  template: Template,

  templateHelpers: {
    label: 'durability',
  },

  ui: {
    $form: '.prompt-form',
    $submit: '.prompt-submit',
    $numberInputGroup: '.number-input-group',
  },

  events: {
    'click @ui.$submit': 'onClickSubmit',
    'click .prompt-cancel': 'onCancel',
  },

  initialize: function (options: { card: typeof Artifact }) {
    this.artifact = options.card;
  },

  onShow: function () {
    FormPromptModalItemView.prototype.onShow.apply(this);
    this.numberInput = new NumberInput(
      this.ui.$numberInputGroup,
      {
        initial: this.artifact.durability,
        max: CONFIG.MAX_ARTIFACT_DURABILITY,
        min: 1,
        placeholder: CONFIG.MAX_ARTIFACT_DURABILITY,
        select: true,
      },
    );
  },

  onSubmit: function () {
    const durability = this.numberInput.getValue();
    SDK.GameSession.current().setArtifactDurability(this.artifact, durability);
    NavigationManager.getInstance().destroyModalView();
    this.trigger('submit');
  },

  updateValidState: function () {
    this.isValid = this.numberInput != null && this.numberInput.getIsValid();
  },
});
