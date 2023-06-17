const Cards = require('app/sdk/cards/cardsLookupComplete');
const Challenge = require('app/sdk/challenges/challenge');
const ChallengeCategory = require('app/sdk/challenges/challengeCategory');
const RSX = require('app/data/resources');
const getContextObjectData = require('app/sdk/challenges/puzzleSpec/getContextObjectData');
import { CardInPlayType, Owner } from './puzzleSpec/CardInPlay';
import type Modifier from './puzzleSpec/Modifier';
import type Player from './puzzleSpec/Player';
import SpecPuzzle from './puzzleSpec/SpecPuzzle';
import SpecString from './puzzleSpec/SpecString';
import { base64StringToBinary } from './puzzleSpec/base64';

export default class Puzzle extends Challenge {

  static type = 'Puzzle';
  type = 'Puzzle';
  categoryType = ChallengeCategory.contest1.type;


  name = 'Name';
  description = 'Description';
  iconUrl = RSX.speech_portrait_vetruvian.img;

  _musicOverride = RSX.music_battlemap_vetruv.audio;

  otkChallengeStartMessage = 'Start message';
  otkChallengeFailureMessages = [
    'Failure message',
  ];

  battleMapTemplateIndex = 6;
  snapShotOnPlayerTurn = 0;
  startingManaOpponent = 9;
  usesResetTurn = false;

  userIsPlayer1;
  startingManaPlayer;
  startingHandSizePlayer;
  startingHandSizeOpponent;
  puzzle;

  constructor(p: string) {
    super();
    const binary = base64StringToBinary(p);
    if (binary === null) {
      throw Error('invalid');
    }
    const specString = new SpecString(binary);
    const puzzle = SpecPuzzle.fromSpecString(specString);
    if (puzzle === null) {
      throw Error('invalid');
    }
    this.userIsPlayer1 = puzzle.playerNum == 0;
    this.startingManaPlayer = puzzle.mana;
    this.startingHandSizePlayer = puzzle.you.hand.length;
    this.startingHandSizeOpponent = puzzle.opponent.hand.length;
    this.puzzle = puzzle;
  }

  getMyPlayerDeckData(_gameSession: GameSession): DeckData {
    return Puzzle.getPlayerDeckData(this.puzzle.you);
  }

  getOpponentPlayerDeckData(_gameSession: GameSession): DeckData {
    return Puzzle.getPlayerDeckData(this.puzzle.opponent);
  }

  setupBoard(gameSession: GameSession) {
    super.setupBoard(gameSession);
    this.setupManaTiles();
    this.setupGenerals(gameSession);
    this.setupCardsInPlay(gameSession);
  }

  setupOpponentAgent() {}
  
  static getPlayerDeckData(player: Player): DeckData {
    const {
      deck,
      generalCard: { cardId, version },
      hand,
    } = player;
    return [
      { id: cardId, version },
      ...hand
        .concat(deck)
        .map(({ baseCard: { cardId, version } }) => ({ id: cardId, version  }))
        .reverse(),
    ];
  }

  setupManaTiles() {
    if (this.puzzle.hasBottomManaTile)
      this.applyCardToBoard({ id: Cards.Tile.BonusMana }, 4, 0);
    if (this.puzzle.hasCenterManaTile)
      this.applyCardToBoard({ id: Cards.Tile.BonusMana }, 4, 4);
    if (this.puzzle.hasTopManaTile)
      this.applyCardToBoard({ id: Cards.Tile.BonusMana }, 5, 2);
  }

  setupGenerals(gameSession: GameSession) {
    this.setupGeneral(gameSession, gameSession.getMyPlayerId(), this.puzzle.you);
    this.setupGeneral(
      gameSession,
      gameSession.getOpponentPlayerId(),
      this.puzzle.opponent,
    );
  }

  setupCardsInPlay(gameSession: GameSession) {
    const myPlayerId = gameSession.getMyPlayerId();
    const opponentPlayerId = gameSession.getOpponentPlayerId();
    this.puzzle.cardsInPlay.forEach(cardInPlay => {
      const {
        baseCard: { card },
        customModifiers,
        owner,
        properties,
      } = cardInPlay;
      const playerId = owner == Owner.You ? myPlayerId : opponentPlayerId;
      switch (properties.type) {
        case CardInPlayType.Artifact:
          card.durability = properties.durability;
          this.applyCardToBoard(card, 0, 0, playerId);
          break;
        case CardInPlayType.Minion: {
          const { damage, modifiers, position: [x, y] } = properties;
          this.applyCardToBoard(card, x, y, playerId);
          card.damage = damage;
          this.applyModifiers(gameSession, card, modifiers);
          break;
        }
        case CardInPlayType.Tile: {
          const { position: [x, y] } = properties;
          this.applyCardToBoard(card, x, y, playerId);
          break;
        }
      }
      customModifiers.forEach((modifier: CustomModifier) => modifier(card));
    });
  }

  setupGeneral(gameSession: GameSession, playerId: string, player: Player) {
    const general = gameSession.getGeneralForPlayerId(playerId);
    const { generalCard: { damage, modifiers, position: [x, y] } } = player;
    general.setPosition({ x, y });
    general.setDamage(damage);
    this.applyModifiers(gameSession, general, modifiers);
  }

  applyModifiers(gameSession: GameSession, card: Card, modifiers: Modifier[]) {
    modifiers.forEach(({ baseCard: { cardId }, indexOfContextObject }) => {
      gameSession.applyModifierContextObject(
        getContextObjectData(cardId)[indexOfContextObject].contextObject,
        card,
      );
    });
  }

  applyCardToBoard(...args: any[]) {
    super.applyCardToBoard(...args);
  }
}

type Card = any;
type CustomModifier = any;
type DeckData = { id: number, version: number }[];
type GameSession = any;
