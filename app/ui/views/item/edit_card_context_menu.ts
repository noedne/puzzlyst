const Card = require('app/sdk/cards/card');
const Cards = require('app/sdk/cards/cardsLookupComplete');
const CardType = require('app/sdk/cards/cardType');
const FormPromptModalItemView = require('./form_prompt_modal');
const NavigationManager = require('app/ui/managers/navigation_manager');
const SDK = require('app/sdk');
const Template = require('app/ui/templates/item/edit_card_context_menu.hbs');
const UtilsPointer = require('app/common/utils/utils_pointer');
import AddModifierModal from './add_modifier_modal';
import SetDamageModal from './set_damage_modal';
import SetDurabilityModal from './set_durability_modal';

export default Marionette.ItemView.extend({
  id: 'app-edit-card-context-menu',
  template: Template,

  ui: {
    $dropdown: '.dropdown-menu',
    $setDamageItem: '.set-damage-item',
    $setDurabilityItem: '.set-durability-item',
    $addModifierItem: '.add-modifier-item',
    $manaTileItem: '.mana-tile-item',
    $deleteMinionItem: '.delete-minion-item',
    $deleteTileItem: '.delete-tile-item',
  },

  events: {
    'click @ui.$setDamageItem': 'onSetDamage',
    'click @ui.$setDurabilityItem': 'onSetDurability',
    'click @ui.$addModifierItem': 'onAddModifier',
    'click @ui.$manaTileItem': 'onToggleManaSpring',
    'click @ui.$deleteMinionItem': 'onDeleteMinion',
    'click @ui.$deleteTileItem': 'onDeleteTile',
    'contextmenu @ui.$dropdown': 'onRightClick',
    'mousedown @ui.$dropdown': 'onMouseDown',
  },

  initialize: function (options: { card: typeof Card }) {
    const card = options.card;
    this.card = card;
    const type = card.getType();
    this.tile = SDK.GameSession.current().getBoard().getTileAtPosition(
      card.getPosition(),
      true,
    );
    const isArtifact = CardType.getIsArtifactCardType(type);
    const isManaTile = card.getId() === Cards.Tile.BonusMana;
    const isUnit = CardType.getIsUnitCardType(type);
    this.isManaTileDepleted = isManaTile && card.getDepleted();
    this.model = new Backbone.Model({
      addModifier: isUnit,
      deleteMinion: isUnit && !card.getIsGeneral(),
      deleteTile: this.tile != null,
      isManaTile,
      isManaTileDepleted: this.isManaTileDepleted,
      setDamage: isUnit,
      setDurability: isArtifact,
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

  onSetDurability: function () {
    this.onOpenModal(SetDurabilityModal);
  },

  onAddModifier: function () {
    this.onOpenModal(AddModifierModal);
  },

  onToggleManaSpring: function () {
    const gameSession = SDK.GameSession.current();
    const modifierClass = SDK.ModifierCollectableBonusMana;
    if (this.isManaTileDepleted) {
      gameSession.applyModifierContextObjectToCard(
        this.card,
        modifierClass.createContextObject(),
      );
      this.card.setDepleted(false);
    } else {
      const modifier = this.card.getActiveModifierByType(modifierClass.type);
      modifier.onDepleted();
    }
    this.trigger('close');
  },

  onDeleteMinion: function () {
    SDK.GameSession.current().removeCardFromBoardWhileEditing(this.card);
    this.trigger('close');
  },

  onDeleteTile: function () {
    SDK.GameSession.current().removeCardFromBoardWhileEditing(this.tile);
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
