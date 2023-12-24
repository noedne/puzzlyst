const Card = require('app/sdk/cards/card');
const Modifier = require('app/sdk/modifiers/modifier');
const SDKArtifact = require('app/sdk/artifacts/artifact');
const SDKPlayer = require('app/sdk/player');
const SDKTile = require('app/sdk/entities/tile');
const Unit = require('app/sdk/entities/unit');
import {
  getArtifactIds,
  getMinionIds,
  getSpellIds,
  getOwnedTileIds,
  getNeutralTileIds,
} from '../../gameVersion';
import type ArithmeticCoder from './arithmeticCoding/ArithmeticCoder';
import { getWeightedNumberCoding } from './arithmeticCoding/utils';
import Artifact from './Artifact';
import DeckCard from './DeckCard';
import GeneralCard from './GeneralCard';
import List from './List';
import Minion from './Minion';
import PositionableType from './PositionableType';
import type PositionCoder from "./PositionCoder";
import type SpecString from './SpecString';
import StartingManaTiles from './StartingManaTiles';
import Tile from './Tile';

export default class Player {
  private static readonly handSizeInBits = 3;

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

  public static fromPlayer(player: typeof SDKPlayer, isMe: boolean): Player {
    const general: typeof Unit | undefined =
      player.getGameSession().getGeneralForPlayer(player);
    if (general == null) {
      throw Error('invalid');
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
    const tiles = cardsToList(Tile, getTiles(player, isMe));
    return new Player(generalCard, hand, deck, artifacts, minions, tiles);
  }

  public static updateCoder(
    coder: ArithmeticCoder,
    player: Player | undefined,
    isMe: boolean,
    positionCoder: PositionCoder,
  ): Player {
    const generalCard = GeneralCard.updateCoder(
      coder,
      player?.generalCard,
      positionCoder,
    );
    const artifactIds = getArtifactIds();
    const minionIds = getMinionIds();
    const spellIds = getSpellIds();
    let tileIds = getOwnedTileIds();
    if (isMe) {
      tileIds = tileIds.concat(getNeutralTileIds());
    }
    const deckIds = artifactIds.concat(minionIds, spellIds);
    const hand = List.updateAdaptiveCoder(
      DeckCard,
      coder,
      deckIds,
      getWeightedNumberCoding(
        isMe
          ? [1/16, 1/16, 1/8, 1/8, 1/8, 1/8]
          : [29/32, 1/64, 1/64, 1/64, 1/64, 1/64],
      ),
      player?.hand,
    );
    const deck = List.updateAdaptiveCoder(
      DeckCard,
      coder,
      deckIds,
      getWeightedNumberCoding(getExponentialLengthWeights(1/32, 39)),
      player?.deck,
    );
    const artifacts = List.updateAdaptiveCoder(
      Artifact,
      coder,
      artifactIds,
      getWeightedNumberCoding([13/16, 1/16, 1/16]),
      player?.artifacts,
    );
    const minions = List.updateAdaptiveCoder(
      Minion,
      coder,
      minionIds,
      getWeightedNumberCoding(getMinionLengthWeights(
        positionCoder.getNumAvailable(PositionableType.Unit),
      )),
      player?.minions,
      positionCoder,
    );
    const tiles = List.updateAdaptiveCoder(
      Tile,
      coder,
      tileIds,
      getWeightedNumberCoding(getExponentialLengthWeights(
        1/32,
        positionCoder.getNumAvailable(PositionableType.Tile),
      )),
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

function getExponentialLengthWeights(
  nonzeroWeight: number,
  maxLength: number,
): number[] {
  if (maxLength === 0) {
    return [];
  }
  const weights = [1 - nonzeroWeight];
  let weight = nonzeroWeight;
  for (let i = 1; i < maxLength; i++) {
    weight /= 2;
    weights.push(weight);
  }
  return weights;
}

const minionLengthWeights = [
  1/32,
  1/16,
  1/8, 1/8, 1/8, 1/8,
  1/16, 1/16,
  1/32, 1/32, 1/32, 1/32,
  1/64, 1/64, 1/64, 1/64,
  1/128, 1/128, 1/128, 1/128,
  1/256, 1/256, 1/256, 1/256, 1/256, 1/256, 1/256, 1/256,
  1/512, 1/512, 1/512, 1/512, 1/512, 1/512, 1/512, 1/512, 1/512, 1/512, 1/512, 1/512, 1/512, 1/512, 1/512,
];

function getMinionLengthWeights(maxLength: number): number[] {
  if (maxLength === 0) {
    return [];
  }
  if (maxLength >= minionLengthWeights.length) {
    return minionLengthWeights;
  }
  let sum = 1/512;
  for (let i = maxLength + 1; i < minionLengthWeights.length; i++) {
    const weight = minionLengthWeights[i];
    if (weight === undefined) {
      throw Error('invalid');
    }
    sum += weight;
  }
  const average = sum / (maxLength + 1);
  return Array.from(Array(maxLength)).map((_, i) => {
    const weight = minionLengthWeights[i];
    if (weight === undefined) {
      throw Error('invalid');
    }
    return weight + average;
  });
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

function getTiles(player: typeof SDKPlayer, isMe: boolean): (typeof SDKTile)[] {
  return player
    .getGameSession()
    .getBoard()
    .getTiles(true)
    .filter((tile: typeof SDKTile) =>
      tile.isOwnedBy(player) || isMe && isUnownedTile(tile),
    );
}

function isUnownedTile(tile: typeof SDKTile): boolean {
  return tile.isOwnedByGameSession()
    && !StartingManaTiles.isStartingManaTile(tile);
}
