const Artifact = require('app/sdk/artifacts/artifact');
const CONFIG = require('app/common/config');
const FormPromptModalItemView = require('./form_prompt_modal');
const NavigationManager = require('app/ui/managers/navigation_manager');
const SDK = require('app/sdk');
const Template = require('app/ui/templates/item/set_value_modal.hbs');
import withNumberInput from './with_number_input';

const NumberInputView = withNumberInput(FormPromptModalItemView);

export default NumberInputView.extend({
  id: 'app-set-durability',
  template: Template,

  initialize: function (options: { card: typeof Artifact }) {
    this.artifact = options.card;
    NumberInputView.prototype.initialize.apply(this, [{
      initial: this.artifact.durability,
      max: CONFIG.MAX_ARTIFACT_DURABILITY,
      min: 1,
      placeholder: CONFIG.MAX_ARTIFACT_DURABILITY,
      select: true,
    }]);
    this.model = new Backbone.Model({
      label: 'durability',
    });
  },

  onSubmitImpl: function (durability: number) {
    SDK.GameSession.current().setArtifactDurability(this.artifact, durability);
    NavigationManager.getInstance().destroyModalView();
    this.trigger('submit');
  },
});
