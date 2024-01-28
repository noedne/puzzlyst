const Card = require('app/sdk/cards/card');
const Cards = require('app/sdk/cards/cardsLookupComplete');
const CardType = require('app/sdk/cards/cardType');
const CONFIG = require('app/common/config');
const FormPromptModalItemView = require('./form_prompt_modal');
const NavigationManager = require('app/ui/managers/navigation_manager');
const SDK = require('app/sdk');
const Template = require('app/ui/templates/item/edit_card_context_menu.hbs');
const UtilsEngine = require('app/common/utils/utils_engine');
const UtilsPointer = require('app/common/utils/utils_pointer');
import getCustomModifiers from '../../../sdk/challenges/puzzleSpec/getCustomModifiers';
import AddKeywordModal from './add_keyword_modal';
import AddModifierModal from './add_modifier_modal';
import SetStatsModal from './set_stats_modal';
import SetValueModal from './set_value_modal';

export default Marionette.ItemView.extend({
  id: 'app-edit-card-context-menu',
  template: Template,

  ui: {
    $dropdown: '.dropdown-menu',
    $setStatsItem: '.set-stats-item',
    $setDurabilityItem: '.set-durability-item',
    $addKeywordItem: '.add-keyword-item',
    $addModifierItem: '.add-modifier-item',
    $manaTileItem: '.mana-tile-item',
    $customModifierItem: '.custom-modifier-item',
    $deleteMinionItem: '.delete-minion-item',
    $deleteTileItem: '.delete-tile-item',
    $deleteArtifactItem: '.delete-artifact-item',
    $flipBattleLogItem: '.flip-battle-log-item',
    $deleteBattleLogItem: '.delete-battle-log-item',
  },

  events: {
    'click @ui.$setStatsItem': 'onSetStats',
    'click @ui.$setDurabilityItem': 'onSetDurability',
    'click @ui.$addKeywordItem': 'onAddKeyword',
    'click @ui.$addModifierItem': 'onAddModifier',
    'click @ui.$manaTileItem': 'onToggleManaSpring',
    'click @ui.$customModifierItem': 'onSetCustomModifier',
    'click @ui.$deleteMinionItem': 'onDeleteMinion',
    'click @ui.$deleteTileItem': 'onDeleteTile',
    'click @ui.$deleteArtifactItem': 'onDeleteArtifact',
    'click @ui.$flipBattleLogItem': 'onFlipBattleLog',
    'click @ui.$deleteBattleLogItem': 'onDeleteBattleLog',
    'contextmenu @ui.$dropdown': 'onRightClick',
    'mousedown @ui.$dropdown': 'onMouseDown',
  },

  initialize: function (options: { type: EditType, card: typeof Card }) {
    const card = options.card;
    this.card = card;
    if (options.type === EditType.BattleLog) {
      this.templateHelpers = {
        deleteBattleLog: true,
        flipBattleLog: true,
      };
      return;
    }
    const type = card.getType();
    this.tile = SDK.GameSession.current().getBoard().getTileAtPosition(
      card.getPosition(),
      true,
    );
    const isArtifact = CardType.getIsArtifactCardType(type);
    const isManaTile = card.getId() === Cards.Tile.BonusMana;
    const isUnit = CardType.getIsUnitCardType(type);
    this.isManaTileDepleted = isManaTile && card.getDepleted();
    this.templateHelpers = {
      addKeyword: isUnit,
      addModifier: isUnit,
      deleteArtifact: isArtifact,
      deleteMinion: isUnit && !card.getIsGeneral(),
      deleteTile: this.tile != null,
      isManaTile,
      isManaTileDepleted: this.isManaTileDepleted,
      setStats: isUnit,
      setDurability: isArtifact,
    };
    const customModifier = getCustomModifiers(card.getId())[0];
    if (customModifier !== undefined) {
      const { description, value } = customModifier.getData(card);
      Object.assign(this.templateHelpers, {
        hasCustomModifier: true,
        customModifierDescription: description,
      });
      this.customModifier = {
        description,
        value,
        setValue: (value: boolean | number) =>
          customModifier.setValue(card, value),
      };
    }
  },

  onShow: function () {
    const pointerEvent = UtilsPointer.getPointerEvent();
    const pointerLeft = pointerEvent.getLocationLeft();
    const pointerTop = pointerEvent.getLocationTop();
    const winTop = UtilsEngine.getGSIWinTop();
    const winRight = UtilsEngine.getGSIWinRight();
    const height = this.ui.$dropdown.height();
    const width = this.ui.$dropdown.width();
    const top = pointerTop + height < winTop
      ? pointerTop
      : pointerTop - height;
    const left = pointerLeft + width < winRight
      ? pointerLeft
      : winRight - width;
    this.ui.$dropdown.css({
      top,
      left
    });
  },

  onSetStats: function () {
    this.onOpenModal(SetStatsModal);
  },

  onSetDurability: function () {
    this.onOpenModal(SetValueModal, {
      initial: this.card.durability,
      label: 'Set durability',
      max: CONFIG.MAX_ARTIFACT_DURABILITY,
      min: 1,
      placeholder: CONFIG.MAX_ARTIFACT_DURABILITY,
      onSubmit: (durability: number) => this.card.getGameSession()
        .setArtifactDurability(this.card, durability),
    });
  },

  onAddKeyword: function () {
    this.onOpenModal(AddKeywordModal);
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

  onSetCustomModifier: function () {
    const { description, value, setValue } = this.customModifier;
    if (typeof value === 'boolean') {
      setValue(!value);
      this.trigger('close');
      return;
    }
    this.onOpenModal(SetValueModal, {
      initial: value,
      label: description,
      max: CONFIG.INFINITY,
      min: 0,
      placeholder: 0,
      onSubmit: setValue,
    });
  },

  onDeleteMinion: function () {
    SDK.GameSession.current().removeCardFromBoardWhileEditing(this.card);
    this.trigger('close');
  },

  onDeleteTile: function () {
    SDK.GameSession.current().removeCardFromBoardWhileEditing(this.tile);
    this.trigger('close');
  },

  onDeleteArtifact: function () {
    SDK.GameSession.current().removeArtifact(this.card);
    this.trigger('close');
  },

  onFlipBattleLog: function () {
    SDK.GameSession.current().flipCardInBattleLog(this.card);
    this.trigger('close');
  },

  onDeleteBattleLog: function () {
    SDK.GameSession.current().removeCardFromBattleLog(this.card);
    this.trigger('close');
  },

  onOpenModal: function (
    Modal: typeof FormPromptModalItemView,
    options?: Object,
  ) {
    const modal = new Modal(options ?? { card: this.card });
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

export enum EditType {
  Artifact,
  BattleLog,
  Entity,
}
