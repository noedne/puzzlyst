const Card = require('app/sdk/cards/card');
const NavigationManager = require('app/ui/managers/navigation_manager');
const Template = require('app/ui/templates/item/edit_card_context_menu.hbs');
const UtilsPointer = require('app/common/utils/utils_pointer');
import AddModifierModal from './add_modifier_modal';

export default Marionette.ItemView.extend({
  id: 'app-edit-card-context-menu',
  template: Template,

  ui: {
    $dropdown: '.dropdown-menu',
    $addModifierItem: '.add-modifier-item',
  },

  events: {
    'click @ui.$addModifierItem': 'onAddModifier',
    'contextmenu @ui.$dropdown': 'onRightClick',
    'mousedown @ui.$dropdown': 'onMouseDown',
  },

  initialize: function (options: { card: typeof Card }) {
    this.card = options.card;
  },

  onRender: function () {
    const pointerEvent = UtilsPointer.getPointerEvent();
    this.ui.$dropdown.css({
      left: pointerEvent.getLocationLeft(),
      top: pointerEvent.getLocationTop(),
    });
  },

  onAddModifier: function () {
    const addModifierModal = new AddModifierModal({ card: this.card });
    NavigationManager.current().showModalView(addModifierModal);
    this.listenToOnce(addModifierModal, 'submit', () => this.trigger('close'));
  },

  onMouseDown: function (event: JQuery.TriggeredEvent) {
    event.stopPropagation();
  },

  onRightClick: function (event: JQuery.TriggeredEvent) {
    event.preventDefault();
  },

});
