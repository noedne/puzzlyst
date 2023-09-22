const Cards = require('app/sdk/cards/cardsLookupComplete');
const Challenge = require('app/sdk/challenges/challenge');
const ChallengeCategory = require('app/sdk/challenges/challengeCategory');
const RSX = require('app/data/resources');
import { CardInPlayType, Owner } from './puzzleSpec/CardInPlay';
import type Modifier from './puzzleSpec/Modifier';
import type Player from './puzzleSpec/Player';
import SpecPuzzle from './puzzleSpec/SpecPuzzle';
import SpecString from './puzzleSpec/SpecString';
import { base64StringToBinary } from './puzzleSpec/base64';
import getContextObjectData from './puzzleSpec/getContextObjectData';

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

  userIsPlayer1: boolean = true;
  startingManaPlayer: number | null = null;
  startingHandSizePlayer: number | null = null;
  startingHandSizeOpponent: number | null = null;

  constructor(public puzzle: SpecPuzzle) {
    super();
  }

  static fromBase64(base64: string): Puzzle {
    return new Puzzle(this.base64ToSpecPuzzle(base64));
  }

  updateFromBase64(base64: string): Puzzle {
    this.puzzle = Puzzle.base64ToSpecPuzzle(base64);
    return this;
  }

  private static base64ToSpecPuzzle(base64: string): SpecPuzzle {
    const binary = base64StringToBinary(base64);
    if (binary === null) {
      throw Error('invalid');
    }
    const specString = new SpecString(binary);
    const puzzle = SpecPuzzle.fromSpecString(specString);
    if (puzzle === null) {
      throw Error('invalid');
    }
    return puzzle;
  }

  setupSession(gameSession: GameSession): GameSession {
    this.userIsPlayer1 = this.puzzle.isPlayer1;
    this.startingManaPlayer = this.puzzle.mana;
    this.startingHandSizePlayer = this.puzzle.you.hand.length;
    this.startingHandSizeOpponent = this.puzzle.opponent.hand.length;
    const editingMode = gameSession.getEditingMode();
    gameSession.setIsSettingUp();
    super.setupSession(gameSession);
    gameSession.setEditingMode(editingMode);
    return gameSession;
  }

  getMyPlayerDeckData(_gameSession: GameSession): DeckData {
    return Puzzle.getPlayerDeckData(this.puzzle.you);
  }

  getOpponentPlayerDeckData(_gameSession: GameSession): DeckData {
    return Puzzle.getPlayerDeckData(this.puzzle.opponent);
  }

  setupBoard(gameSession: GameSession) {
    super.setupBoard(gameSession);
    gameSession.getOpponentPlayer().remainingMana = 0;
    this.setupManaTiles();
    this.setupGenerals(gameSession);
    this.setupCardsInPlay(gameSession);
  }

  setupOpponentAgent() {}
  
  static getPlayerDeckData(player: Player): DeckData {
    const {
      deck,
      generalCard: { cardId },
      hand,
    } = player;
    return [
      { id: cardId },
      ...hand
        .concat(deck)
        .map(({ baseCard: { cardId } }) => ({ id: cardId  }))
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
      const contextObject =
        getContextObjectData(cardId)[indexOfContextObject]?.contextObject;
      if (contextObject != null) {
        gameSession.applyModifierContextObject(
          contextObject,
          card,
        );
      }
    });
  }

  applyCardToBoard(...args: any[]): Card {
    return super.applyCardToBoard(...args);
  }
}

type Card = any;
type CustomModifier = any;
type DeckData = { id: number }[];
type GameSession = any;
