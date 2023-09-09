const Card = require('app/sdk/cards/card');
const CardType = require('app/sdk/cards/cardType');
const FormPromptModalItemView = require('./form_prompt_modal');
const NavigationManager = require('app/ui/managers/navigation_manager');
const SDK = require('app/sdk');
const Template = require('app/ui/templates/item/edit_card_context_menu.hbs');
const UtilsPointer = require('app/common/utils/utils_pointer');
import AddModifierModal from './add_modifier_modal';
import SetDamageModal from './set_damage_modal';

export default Marionette.ItemView.extend({
  id: 'app-edit-card-context-menu',
  template: Template,

  ui: {
    $dropdown: '.dropdown-menu',
    $setDamageItem: '.set-damage-item',
    $addModifierItem: '.add-modifier-item',
    $deleteItem: '.delete-item',
  },

  events: {
    'click @ui.$setDamageItem': 'onSetDamage',
    'click @ui.$addModifierItem': 'onAddModifier',
    'click @ui.$deleteItem': 'onDelete',
    'contextmenu @ui.$dropdown': 'onRightClick',
    'mousedown @ui.$dropdown': 'onMouseDown',
  },

  initialize: function (options: { card: typeof Card }) {
    const card = options.card;
    this.card = card;
    const type = card.getType();
    const isUnit = CardType.getIsUnitCardType(type);
    this.model = new Backbone.Model({
      deleteMinion: isUnit && !card.getIsGeneral(),
      deleteTile: CardType.getIsTileCardType(type),
    });
  },

  onRender: function () {
    const pointerEvent = UtilsPointer.getPointerEvent();
    this.ui.$dropdown.css({
      left: pointerEvent.getLocationLeft(),
      top: pointerEvent.getLocationTop(),
    });
  },

  onSetDamage: function () {
    this.onOpenModal(SetDamageModal);
  },

  onAddModifier: function () {
    this.onOpenModal(AddModifierModal);
  },

  onDelete: function () {
    SDK.GameSession.current().removeCardFromBoardWhileEditing(this.card);
    this.trigger('close');
  },

  onOpenModal: function (Modal: typeof FormPromptModalItemView) {
    const modal = new Modal({ card: this.card });
    NavigationManager.current().showModalView(modal);
    this.listenToOnce(modal, 'submit', () => this.trigger('close'));
  },

  onMouseDown: function (event: JQuery.TriggeredEvent) {
    event.stopPropagation();
  },

  onRightClick: function (event: JQuery.TriggeredEvent) {
    event.preventDefault();
  },

});
