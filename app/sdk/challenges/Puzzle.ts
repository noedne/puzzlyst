const Cards = require('app/sdk/cards/cardsLookupComplete');
const Challenge = require('app/sdk/challenges/challenge');
const ChallengeCategory = require('app/sdk/challenges/challengeCategory');
const CONFIG = require('app/common/config');
const ModifierCollectableBonusMana = require('app/sdk/modifiers/modifierCollectableBonusMana');
const RSX = require('app/data/resources');
import type Modifier from './puzzleSpec/Modifier';
import type Player from './puzzleSpec/Player';
import SpecPuzzle from './puzzleSpec/SpecPuzzle';
import SpecString from './puzzleSpec/SpecString';
import { base64StringToBinary, binaryToBase64String } from './puzzleSpec/base64';
import { getContextObjectDataForEditing } from './puzzleSpec/getContextObjectData';
import { TileState } from './puzzleSpec/StartingManaTiles';
import type Keywords from './puzzleSpec/Keywords';
import getCustomModifiers from './puzzleSpec/getCustomModifiers';
import type List from './puzzleSpec/List';

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
  usesResetTurn = false;

  userIsPlayer1: boolean = true;
  startingManaPlayer: number | null = null;
  startingManaOpponent: number | null = null;
  startingHandSizePlayer: number | null = null;
  startingHandSizeOpponent: number | null = null;

  snapshot = null;

  constructor(public puzzle: SpecPuzzle, private useArithmetic: boolean) {
    super();
  }

  static getStartingManaOpponent(
    userIsPlayer1: boolean,
    startingManaPlayer: number,
  ): number {
    return !userIsPlayer1 && startingManaPlayer < CONFIG.MAX_MANA
      ? startingManaPlayer - 1
      : Math.min(startingManaPlayer, CONFIG.MAX_MANA);
  }

  static fromParams(params: Params): Puzzle {
    if ('a' in params) {
      return this.fromBase64(params.a, true);
    }
    return this.fromBase64(params.p, false);
  }

  private static fromBase64(base64: string, useArithmetic: boolean): Puzzle {
    return new Puzzle(
      this.base64ToSpecPuzzle(base64, useArithmetic),
      useArithmetic,
    );
  }

  updateFromBase64(base64: string): Puzzle {
    this.puzzle = Puzzle.base64ToSpecPuzzle(base64, this.useArithmetic);
    return this;
  }

  private static base64ToSpecPuzzle(
    base64: string,
    useArithmetic: boolean,
  ): SpecPuzzle {
    const binary = base64StringToBinary(base64);
    if (binary === null) {
      throw Error('invalid');
    }
    const puzzle = useArithmetic
      ? SpecPuzzle.decode(binary)
      : SpecPuzzle.fromSpecString(new SpecString(binary));
    if (puzzle === null) {
      throw Error('invalid');
    }
    return puzzle;
  }

  getState(gameSession: GameSession): string {
    return Puzzle.getState(gameSession, this.useArithmetic);
  }

  private static getState(
    gameSession: GameSession,
    useArithmetic: boolean,
  ): string {
    const specPuzzle = SpecPuzzle.fromGameSession(gameSession);
    const encoded = useArithmetic ? specPuzzle.encode() : specPuzzle.toString();
    const base64 = binaryToBase64String(encoded);
    if (base64 === null) {
      throw Error('invalid');
    }
    return base64;
  }

  setupSession(gameSession: GameSession): GameSession {
    this.userIsPlayer1 = this.puzzle.isPlayer1;
    this.startingManaPlayer = this.puzzle.mana;
    this.startingManaOpponent = Puzzle.getStartingManaOpponent(
      this.userIsPlayer1,
      this.startingManaPlayer,
    );
    this.startingHandSizePlayer = this.puzzle.you.hand.list.length;
    this.startingHandSizeOpponent = this.puzzle.opponent.hand.list.length;
    const editingMode = gameSession.getEditingMode();
    gameSession.setIsSettingUp();
    if (this.snapshot === null) {
      this.snapshot = gameSession.generateGameSessionSnapshot();
    } else {
      gameSession.deserializeSessionFromFirebase(JSON.parse(this.snapshot));
    }
    super.setupSession(gameSession);
    gameSession.setEditingMode(editingMode);
    return gameSession;
  }

  getMyPlayerDeckData(gameSession: GameSession): DeckData {
    return Puzzle.getPlayerDeckData(gameSession, this.puzzle.you);
  }

  getOpponentPlayerDeckData(gameSession: GameSession): DeckData {
    return Puzzle.getPlayerDeckData(gameSession, this.puzzle.opponent);
  }

  setupBoard(gameSession: GameSession) {
    super.setupBoard(gameSession);
    gameSession.getOpponentPlayer().remainingMana = 0;
    this.setupStartingManaTiles();
    this.setupGenerals(gameSession);
    this.setupPlayers(gameSession);
  }

  setupOpponentAgent() {}

  applyCardToBoard(...args: any[]): Card {
    return super.applyCardToBoard(...args);
  }
  
  private static getPlayerDeckData(
    gameSession: GameSession,
    player: Player,
  ): DeckData {
    const generalCard = gameSession.createCard(player.generalCard.cardId);
    generalCard.setIsGeneral(true);
    return [
      { index: generalCard.getIndex() },
      ...player.hand.list
        .concat(player.deck.list)
        .map(card => ({
          index: gameSession
            .createCard(card.baseCard.cardId, card.isKeeper)
            .getIndex(),
        })),
    ];
  }

  private setupStartingManaTiles() {
    this.puzzle.startingManaTiles.tiles.forEach(
      ({ position: [x, y], state }) => {
        if (state === TileState.Missing) {
          return;
        }
        const tile = this.applyCardToBoard({ id: Cards.Tile.BonusMana }, x, y);
        if (state === TileState.Depleted) {
          tile.getActiveModifierByType(ModifierCollectableBonusMana.type)
            .onDepleted();
        }
      },
    );
  }

  private setupGenerals(gameSession: GameSession) {
    this.setupGeneral(
      gameSession,
      gameSession.getMyPlayerId(),
      this.puzzle.you,
    );
    this.setupGeneral(
      gameSession,
      gameSession.getOpponentPlayerId(),
      this.puzzle.opponent,
    );
  }

  private setupPlayers(gameSession: GameSession) {
    this.setupPlayer(gameSession, gameSession.getMyPlayerId(), this.puzzle.you);
    this.setupPlayer(
      gameSession,
      gameSession.getOpponentPlayerId(),
      this.puzzle.opponent,
    );
  }

  private setupGeneral(
    gameSession: GameSession,
    playerId: string,
    player: Player,
  ) {
    const general = gameSession.getGeneralForPlayerId(playerId);
    const { generalCard: { stats, modifiers, position: [x, y] } } = player;
    general.setPosition({ x, y });
    gameSession.setCardStats(general, stats.getCardStats(general));
    this.applyModifiers(gameSession, general, modifiers);
  }

  private setupPlayer(
    gameSession: GameSession,
    playerId: string,
    player: Player,
  ) {
    this.setupArtifacts(playerId, player);
    this.setupMinions(gameSession, playerId, player);
    this.setupTiles(playerId, player);
  }

  private setupArtifacts(playerId: string, player: Player) {
    player.artifacts.list.forEach(artifact => {
      const {
        baseCard: { card, cardId },
        customModifierValues,
        durability,
      } = artifact;
      card.durability = durability;
      this.applyCardToBoard(card, 0, 0, playerId);
      getCustomModifiers(cardId).forEach(({ setValue }, i) => {
        const value = customModifierValues[i];
        if (value !== undefined) {
          setValue(card, value);
        }
      });
    });
  }

  private setupMinions(
    gameSession: GameSession,
    playerId: string,
    player: Player,
  ) {
    player.minions.list.forEach(minion => {
      const {
        baseCard: { card },
        position: [x, y],
        stats,
        keywords,
        modifiers,
      } = minion;
      this.applyCardToBoard(card, x, y, playerId);
      gameSession.setCardStats(card, stats.getCardStats(card));
      this.applyKeywords(card, keywords);
      this.applyModifiers(gameSession, card, modifiers);
    });
  }

  private setupTiles(playerId: string, player: Player) {
    player.tiles.list.forEach(tile => {
      const {
        baseCard: { card },
        position: [x, y],
      } = tile;
      this.applyCardToBoard(card, x, y, playerId);
    });
  }

  private applyKeywords(card: Card, keywords: Keywords) {
    keywords.getKeywords().forEach(
      modifierClass => card.getGameSession()
        .applyCardModifier(card, modifierClass.createContextObject()),
    );
  }

  private applyModifiers(
    gameSession: GameSession,
    card: Card,
    modifiers: List<Modifier>,
  ) {
    modifiers.list.forEach(({
      baseCard: { cardId },
      indexOfContextObject,
      multiplicity,
    }) => {
      const contextObject = getContextObjectDataForEditing(cardId)
        [indexOfContextObject]?.contextObject;
      if (contextObject != null) {
        for (let i = 0; i < multiplicity; i++) {
          gameSession.applyCardModifier(
            card,
            contextObject,
          );
        }
      }
    });
  }
}

type Card = any;
type DeckData = { index: number }[];
type GameSession = any;
export type Params = { a: string } | { p: string };
