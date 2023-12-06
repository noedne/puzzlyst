const Card = require('app/sdk/cards/card');
const Modifier = require('app/sdk/modifiers/modifier');
const SDKArtifact = require('app/sdk/artifacts/artifact');
const SDKPlayer = require('app/sdk/player');
const SDKTile = require('app/sdk/entities/tile');
const Unit = require('app/sdk/entities/unit');
import type ArithmeticCoder from './arithmeticCoding/ArithmeticCoder';
import Artifact from './Artifact';
import DeckCard from './DeckCard';
import GeneralCard from './GeneralCard';
import List from './List';
import Minion from './Minion';
import type PositionCoder from "./PositionCoder";
import type SpecString from './SpecString';
import Tile from './Tile';

export default class Player {
  private static readonly handSizeInBits = 3;
  private static readonly handLengthDenominator = 7;
  private static readonly artifactsLengthDenominator = 3;
  private static readonly minionsLengthDenominator = 45;
  private static readonly tilesLengthDenominator = 45;

  private constructor(
    public generalCard: GeneralCard,
    public hand: List<DeckCard>,
    public deck: List<DeckCard>,
    public artifacts: List<Artifact>,
    public minions: List<Minion>,
    public tiles: List<Tile>,
  ) {}

  public static fromSpecString(specString: SpecString): Player | null {
    const generalCard = GeneralCard.fromSpecString(specString);
    if (generalCard === null) {
      return null;
    }
    const hand = List.fromSpecString(
      DeckCard,
      specString,
      Player.handSizeInBits,
    );
    if (hand === null) {
      return null;
    }
    const deck = List.fromSpecString(DeckCard, specString);
    if (deck === null) {
      return null;
    }
    const artifacts = List.fromSpecString(Artifact, specString);
    if (artifacts === null) {
      return null;
    }
    const minions = List.fromSpecString(Minion, specString);
    if (minions === null) {
      return null;
    }
    const tiles = List.fromSpecString(Tile, specString);
    if (tiles === null) {
      return null;
    }
    return new Player(generalCard, hand, deck, artifacts, minions, tiles);
  }

  public static fromPlayer(player: typeof SDKPlayer): Player | null {
    const general: typeof Unit | undefined =
      player.getGameSession().getGeneralForPlayer(player);
    if (general == null) {
      return null;
    }
    const generalCard = GeneralCard.fromUnit(general);
    const cardsInHand = player
      .getDeck()
      .getCardsInHandExcludingMissing()
    const hand = cardsToList(DeckCard, cardsInHand);
    const cardsInDeck = player
      .getDeck()
      .getCardsInDrawPileExcludingMissing()
    const deck = cardsToList(DeckCard, cardsInDeck);
    const artifacts = cardsToList(Artifact, getArtifacts(general));
    const minions = cardsToList(Minion, getMinions(player));
    const tiles = cardsToList(Tile, getTiles(player));
    return new Player(generalCard, hand, deck, artifacts, minions, tiles);
  }

  public static updateCoder(
    coder: ArithmeticCoder,
    positionCoder: PositionCoder,
    player?: Player,
  ): Player {
    const generalCard = GeneralCard.updateCoder(
      coder,
      positionCoder,
      player?.generalCard,
    );
    const hand = List.updateCoder(
      DeckCard,
      coder,
      this.handLengthDenominator,
      player?.hand,
    );
    const deck = List.updateCoder(
      DeckCard,
      coder,
      this.handLengthDenominator,
      player?.deck,
    );
    const artifacts = List.updateCoder(
      Artifact,
      coder,
      this.artifactsLengthDenominator,
      player?.artifacts,
    );
    const minions = List.updateCoder(
      Minion,
      coder,
      this.minionsLengthDenominator,
      player?.minions,
      positionCoder,
    );
    const tiles = List.updateCoder(
      Tile,
      coder,
      this.tilesLengthDenominator,
      player?.tiles,
      positionCoder,
    );
    return player
      ?? new Player(generalCard, hand, deck, artifacts, minions, tiles);
  }

  public toString(): string {
    const hand = this.hand.toString(Player.handSizeInBits);
    const deck = this.deck.toString();
    const artifacts = this.artifacts.toString();
    const minions = this.minions.toString();
    const tiles = this.tiles.toString();
    return `${this.generalCard}${hand}${deck}${artifacts}${minions}${tiles}`;
  }
}

interface CardClass<T> {
  fromCard: (card: typeof Card) => T | null;
}

function cardsToList<T>(Class: CardClass<T>, cards: (typeof Card)[]): List<T> {
  const list = cards
    .map(card => Class.fromCard(card))
    .reduce<T[]>((acc, val) => val === null ? acc : acc.concat([val]), []);
  return new List(list);
}

function getArtifacts(general: typeof Unit): (typeof SDKArtifact)[] {
  const artifactIndices: number[] = general
    .getArtifactModifiers()
    .map((modifier: typeof Modifier) => modifier.getSourceCardIndex());
  const gameSession = general.getGameSession();
  return [...new Set(artifactIndices)]
    .map((index: number) => gameSession.getCardByIndex(index));
}

function getMinions(player: typeof SDKPlayer): (typeof Unit)[] {
  return player
    .getGameSession()
    .getBoard()
    .getUnits(true)
    .filter((unit: typeof Unit) =>
      unit.isOwnedBy(player) && !unit.getIsGeneral());
}

function getTiles(player: typeof SDKPlayer): (typeof SDKTile)[] {
  return player
    .getGameSession()
    .getBoard()
    .getTiles(true)
    .filter((tile: typeof SDKTile) => tile.isOwnedBy(player));
}
