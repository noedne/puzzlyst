import _ from 'underscore';
import AddCardModal from '../item/add_card_modal';
const Animations = require('app/ui/views/animations');
const audio_engine = require('app/audio/audio_engine');
const Card = require('app/sdk/cards/card');
const CardsCollection = require("app/ui/collections/cards");
const CardModel = require('app/ui/models/card');
const CONFIG = require('app/common/config');
const DeckCardsCompositeView = require('app/ui/views2/collection/deck_cards');
const EVENTS = require('app/common/event_types');
const NavigationManager = require('app/ui/managers/navigation_manager');
const RSX = require('app/data/resources');
const SDK = require('app/sdk');
const Template = require('app/ui/templates/layouts/edit_hand_modal.hbs');

export default Marionette.LayoutView.extend({
  id: 'app-edit-hand',
  className: 'modal prompt-modal',
  template: Template,

  ui: {
    $handAdd: '.hand-add',
    $handBack: '.hand-back',
  },

  events: {
    'click @ui.$handAdd': 'onHandAdd',
    'click @ui.$handBack': 'onHandBack',
  },

  regions: {
    handRegion: '.hand-region',
  },

  collection: new CardsCollection(),

  onShow: function () {
    const cards = this.getDeck()
      .getCardsInHandExcludingMissing();
    const cardCounts = _.countBy(
      cards,
      (card: typeof Card) => card.getId(),
    );
    this.collection.addCardsToCollection(cards);
    this.collection.each((cardModel: typeof CardModel) => {
      cardModel.set(
        'deckCount',
        cardCounts[cardModel.get('id')],
      );
    })
    this.cardsCompositeView = new DeckCardsCompositeView({
      collection: this.collection,
    });
    this.cardsCompositeView.listenTo(
      this.cardsCompositeView,
      'childview:select',
      this.onSelectCardView.bind(this),
    );
    this.cardsCompositeView.listenTo(
      this.cardsCompositeView,
      'childview:rightClick',
      this.onRightClickCardView.bind(this),
    );
    this.handRegion.show(this.cardsCompositeView);
    this.maybeDisableAdd();
    this.listenTo(
      NavigationManager.getInstance(),
      EVENTS.user_triggered_confirm,
      this.onHandAdd,
    );
  },

  onDestroy: function () {
    const getModel = (index: number) => this.collection.get(
      SDK.GameSession.current().getCardByIndex(index).getId(),
    );
    this.getDeck().getHand().sort((a: number | null, b: number | null) =>
      a == null ? 1 : b == null ? -1 :
        this.collection.comparator(getModel(a), getModel(b)),
    );
  },

  onSelectCardView: function (cardView: Marionette.View<typeof CardModel>) {
    this.changeCardView(cardView, -1);
  },

  onRightClickCardView: function (cardView: Marionette.View<typeof CardModel>) {
    if (this.getDeck().getNumCardsInHand() < CONFIG.MAX_HAND_SIZE) {
      this.changeCardView(cardView, 1);
    } else {
      this.playErrorSFX();
    }
  },

  changeCardView: function (
    cardView: Marionette.View<typeof CardModel>,
    deltaCount: -1 | 1,
  ) {
    const deck = this.getDeck();
    const cardModel = cardView.model;
    const count = cardModel.get('deckCount') + deltaCount;
    const modelCard = cardModel.get('card');
    const cardIndex = modelCard.getIndex();
    if (count === 0) {
      this.collection.remove(cardModel);
    } else {
      if (deltaCount === -1) {
        const card = deck
          .getCardsInHandExcludingMissing()
          .find((card: typeof Card) =>
            card.getId() === cardModel.get('id')
            && card.getIndex() !== cardIndex);
        cardModel.set('card', card);
      }
      cardModel.set('deckCount', count);
      Animations.cssClassAnimation.call(
        cardView,
        'flash-brightness',
      );
    }
    const sfx = deltaCount === -1
      ? RSX.sfx_ui_cardburn
      : RSX.sfx_collection_next;
    audio_engine.current().play_effect_for_interaction(
      sfx.audio,
      CONFIG.SELECT_SFX_PRIORITY,
    );
    if (deltaCount === -1) {
      deck.removeCardIndexFromHand(cardIndex);
      if (this.ui.$handAdd.prop('disabled')) {
        this.ui.$handAdd.prop('disabled', false);
      }
    } else {
      this.addCard(SDK.GameSession.current().copyCard(modelCard));
      this.maybeDisableAdd();
    }
  },

  onHandAdd: function () {
    if (this.isHandFull()) {
      this.playErrorSFX();
      return;
    }
    const navigationManager = NavigationManager.current();
    const modal = new AddCardModal({
      title: 'Add a Card',
    });
    navigationManager.showModalView(modal);
    this.listenToOnce(modal, 'submit', this.addCard);
    this.listenToOnce(modal, 'prepareForDestroy', () => {
      navigationManager.showModalView(new this.constructor());
    });
  },

  onHandBack: function () {
    NavigationManager.current().destroyModalView();
  },

  addCard: function (card: typeof Card) {
    const gameSession = SDK.GameSession.current();
    card.setOwnerId(gameSession.getMyPlayerId());
    gameSession.applyCardToHand(this.getDeck(), null, card);
  },

  playErrorSFX: function () {
    audio_engine.current().play_effect_for_interaction(
      RSX.sfx_ui_error.audio,
      CONFIG.ERROR_SFX_PRIORITY,
    );
  },

  maybeDisableAdd: function () {
    if (this.isHandFull()) {
      this.ui.$handAdd.prop('disabled', true);
    }
  },

  isHandFull: function () {
    return this.getDeck().getNumCardsInHand() >= CONFIG.MAX_HAND_SIZE;
  },

  getDeck: function () {
    return SDK.GameSession
      .current()
      .getMyPlayer()
      .getDeck();
  },
});
