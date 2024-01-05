import AddCardModal from '../item/add_card_modal';
const Animations = require('app/ui/views/animations');
const audio_engine = require('app/audio/audio_engine');
const Card = require('app/sdk/cards/card');
const CardsCollection = require("app/ui/collections/cards");
const CardModel = require('app/ui/models/card');
const CONFIG = require('app/common/config');
const Deck = require('app/sdk/cards/deck');
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
    $dialog: '.modal-dialog',
  },

  events: {
    'click @ui.$handAdd': 'onAdd',
    'click @ui.$handBack': 'onBack',
    'shown.bs.tab': 'onShowTab',
    'keydown @ui.$dialog': 'onKeyDown',
  },

  regions: {
    myHandRegion: '#my-hand-region',
    myDeckRegion: '#my-deck-region',
    enemyHandRegion: '#enemy-hand-region',
    enemyDeckRegion: '#enemy-deck-region',
  },
  
  myHandCollection: new CardsCollection(null, { sort: true }),
  myDeckCollection: new CardsCollection(),
  enemyHandCollection: new CardsCollection(null, { sort: true }),
  enemyDeckCollection: new CardsCollection(),

  initialize: function (options: {
    myHand?: boolean,
    myDeck?: boolean,
    enemyHand?: boolean,
    enemyDeck?: boolean,
  }) {
    this.templateHelpers = {
      myHand: options.myHand ?? false,
      myDeck: options.myDeck ?? false,
      enemyHand: options.enemyHand ?? false,
      enemyDeck: options.enemyDeck ?? false,
    };
  },

  onShow: function () {
    this.onShowTab();
    this.listenTo(
      NavigationManager.getInstance(),
      EVENTS.user_triggered_confirm,
      this.onAdd,
    );
    this.ui.$dialog.focus();
  },

  onShowTab: function() {
    const { deck, isHand, collection, region } = this.getTab();
    if (isHand) {
      collection.addCardsToCollection(
        deck.getCardsInHandExcludingMissing(),
        null,
        'name',
      );
    } else {
      collection.addCardsToCollection(
        deck.getCardsInDrawPileExcludingMissing(),
        null,
        'index',
      );
    }
    const cardsCompositeView = new DeckCardsCompositeView({ collection });
    cardsCompositeView.listenTo(
      cardsCompositeView,
      'childview:select',
      (cardView: Marionette.View<typeof CardModel>) => {
        this.ui.$dialog.focus();
        this.changeCardView(cardView, -1);
      },
    );
    cardsCompositeView.listenTo(
      cardsCompositeView,
      'childview:rightClick',
      (cardView: Marionette.View<typeof CardModel>) =>
        this.changeCardView(cardView, 1),
    );
    region.show(cardsCompositeView);
    this.setAddAbility(deck, isHand);
  },

  onKeyDown: function (event: JQuery.TriggeredEvent) {
    let offset;
    switch (event.which) {
      case 37: offset = -1; break;
      case 39: offset = 1; break;
      default: return;
    }
    const tabs = [
      this.$('#my-hand-tab'),
      this.$('#my-deck-tab'),
      this.$('#enemy-hand-tab'),
      this.$('#enemy-deck-tab'),
    ];
    const index = (this.getTab().index + offset + tabs.length) % tabs.length;
    tabs[index].tab('show');
  },

  onDestroy: function () {
    const gameSession = SDK.GameSession.current();
    [
      {
        deck: this.getMyDeck(),
        collection: this.myHandCollection,
      },
      {
        deck: this.getEnemyDeck(),
        collection: this.enemyHandCollection,
      },
    ].forEach(({ deck, collection }) =>
      deck.getHand().sort((a: number | null, b: number | null) => {
        if (a == null) {
          return 1;
        }
        if (b == null) {
          return -1;
        }
        const modelA = collection.getCardModelFromCard(
          gameSession.getCardByIndex(a),
        );
        const modelB = collection.getCardModelFromCard(
          gameSession.getCardByIndex(b),
        );
        return CardsCollection.comparator(modelA, modelB);
      }),
    );
  },

  changeCardView: function (
    cardView: Marionette.View<typeof CardModel>,
    deltaCount: -1 | 1,
  ) {
    const { deck, isHand, collection } = this.getTab();
    if (
      deltaCount === 1 && (
        isHand
          ? deck.getNumCardsInHand() >= CONFIG.MAX_HAND_SIZE
          : deck.getNumCardsInDrawPile() >= CONFIG.MAX_DECK_SIZE
      )
    ) {
      this.playErrorSFX();
      return;
    }
    const cardModel = cardView.model;
    const count = cardModel.get('deckCount') + deltaCount;
    const modelCard = cardModel.get('card');
    const cardIndex = modelCard.getIndex();
    if (count === 0) {
      collection.remove(cardModel);
    } else {
      if (deltaCount === -1) {
        const card = (
          isHand
            ? deck.getCardsInHandExcludingMissing()
            : deck.getCardsInDrawPileExcludingMissing()
        ).find(
          (card: typeof Card) => card.getId() === cardModel.get('id')
            && card.getIndex() !== cardIndex,
        );
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
    const gameSession = SDK.GameSession.current();
    if (deltaCount === -1) {
      if (isHand) {
        gameSession.removeCardByIndexFromHand(deck, cardIndex);
      } else {
        gameSession.removeCardByIndexFromDeck(deck, cardIndex);
      }
      gameSession.syncState();
    } else {
      this.addCard(
        deck,
        isHand,
        gameSession.copyCard(modelCard),
        deck.getDrawPile().indexOf(modelCard.getIndex()),
      );
    }
    this.setAddAbility(deck, isHand);
  },

  onAdd: function () {
    const { deck, isHand, options } = this.getTab();
    if (this.isFull(deck, isHand)) {
      this.playErrorSFX();
      return;
    }
    const navigationManager = NavigationManager.current();
    const modal = new AddCardModal({
      title: 'Add a Card',
      checkboxes: true,
    });
    navigationManager.showModalView(modal);
    this.listenToOnce(modal, 'submit', (card: typeof Card) =>
      this.addCard(deck, isHand, card));
    this.listenToOnce(modal, 'prepareForDestroy', () => {
      navigationManager.showModalView(new this.constructor(options));
    });
  },

  onBack: function () {
    NavigationManager.current().destroyModalView();
  },

  addCard: function (
    deck: typeof Deck,
    isHand: boolean,
    card: typeof Card,
    indexInDeck?: number,
  ) {
    const gameSession = SDK.GameSession.current();
    card.setOwnerId(gameSession.getMyPlayerId());
    if (isHand) {
      gameSession.applyCardToHand(deck, null, card);
    } else {
      gameSession.applyCardToDeck(deck, null, card, null, indexInDeck);
    }
  },

  playErrorSFX: function () {
    audio_engine.current().play_effect_for_interaction(
      RSX.sfx_ui_error.audio,
      CONFIG.ERROR_SFX_PRIORITY,
    );
  },

  setAddAbility: function (deck: typeof Deck, isHand: boolean) {
    const isFull = this.isFull(deck, isHand);
    if (this.ui.$handAdd.prop('disabled') !== isFull) {
      this.ui.$handAdd.prop('disabled', isFull);
    }
  },

  isFull: function (deck: typeof Deck, isHand: boolean) {
    if (isHand) {
      return deck.getNumCardsInHand() >= CONFIG.MAX_HAND_SIZE;
    }
    return deck.getNumCardsInDrawPile() >= CONFIG.MAX_DECK_SIZE;
  },

  getTab: function () {
    return this.getTabById(this.$('.tab-pane.active').attr('id'));
  },

  getTabById: function (id: string) {
    switch (id) {
      case 'my-hand': return {
        deck: this.getMyDeck(),
        isHand: true,
        collection: this.myHandCollection,
        region: this.myHandRegion,
        options: { myHand: true },
        index: 0,
      };
      case 'my-deck': return {
        deck: this.getMyDeck(),
        isHand: false,
        collection: this.myDeckCollection,
        region: this.myDeckRegion,
        options: { myDeck: true },
        index: 1,
      };
      case 'enemy-hand': return {
        deck: this.getEnemyDeck(),
        isHand: true,
        collection: this.enemyHandCollection,
        region: this.enemyHandRegion,
        options: { enemyHand: true },
        index: 2,
      };
      case 'enemy-deck': return {
        deck: this.getEnemyDeck(),
        isHand: false,
        collection: this.enemyDeckCollection,
        region: this.enemyDeckRegion,
        options: { enemyDeck: true },
        index: 3,
      };
      default: throw Error('invalid');
    }
  },

  getMyDeck: function () {
    return SDK.GameSession
      .current()
      .getMyPlayer()
      .getDeck();
  },

  getEnemyDeck: function () {
    return SDK.GameSession
      .current()
      .getOpponentPlayer()
      .getDeck();
  },
});
