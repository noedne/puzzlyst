const Card = require('app/sdk/cards/card');
const Cards = require('app/sdk/cards/cardsLookupComplete');
const CardType = require('app/sdk/cards/cardType');
const Factions = require('app/sdk/cards/factionsLookup');
const SDK = require('app/sdk');

import SpecString from './SpecString';

export default class BaseCard {
  constructor(
    public version: number,
    public cardId: number,
    private group: Group,
    private id: number,
    private _card: typeof Card | null = null,
  ) {}

  static fromSpecString(specString: SpecString): BaseCard | null {
    const version = specString.countZeroes();
    if (version === null) {
      return null;
    }
    const group = specString.matchRegex(/^(0[01]{3}|1[01])/) as Group | null;
    if (group === null) {
      return null;
    }
    const id = specString.countZeroesAndReadNPlusBits(getIdMinBitLength(group));
    if (id === null) {
      return null;
    }
    const cardId = id + getIdOffset(group);
    return new BaseCard(version, cardId, group, id);
  }

  static fromCard(card: typeof Card): BaseCard | null {
    const group = getGroup(card);
    if (group === null) {
      return null;
    }
    const id = card.getId() - getIdOffset(group);
    return new BaseCard(card.version, card.getId(), group, id, card);
  }

  static fromCardId(cardId: number, version: number = 0): BaseCard | null {
    return BaseCard.fromCard(BaseCard.getCard(cardId, version));
  }

  get card(): typeof Card {
    this._card ??= BaseCard.getCard(this.cardId, this.version);
    return this._card;
  }

  toString(): string {
    const version = SpecString.writeNZeroes(this.version);
    const group = this.group;
    const id = SpecString.padNumWithZeroesForCountingPastNMinBits(
      this.id,
      getIdMinBitLength(group),
    )
    return `${version}${group}${id}`;
  }

  private static getCard(cardId: number, version: number): typeof Card {
    return SDK.GameSession.current().createCardForIdentifier(
      cardId,
      version,
    )
  }
}

const enum Group {
  Faction1 = '0000',
  Faction2 = '0001',
  Faction3 = '0010',
  Faction4 = '0011',
  Faction5 = '0100',
  Faction6 = '0101',
  Neutral = '10',
  Spell = '11',
  Artifact = '0110',
  Tile = '0111',
}

function getIdMinBitLength(group: Group): number {
  switch (group) {
    case Group.Tile:
      return 0;
    case Group.Faction1:
    case Group.Faction2:
    case Group.Faction3:
    case Group.Faction4:
    case Group.Faction5:
    case Group.Artifact:
      return 3;
    case Group.Faction6:
      return 4;
    case Group.Neutral:
    case Group.Spell:
      return 6;
  }
}

function getIdOffset(group: Group): number {
  switch (group) {
    case Group.Faction1:
      return Cards.Faction1.SilverguardSquire;
    case Group.Faction2:
      return Cards.Faction2.HeartSeeker;
    case Group.Faction3:
      return Cards.Faction3.WindShrike;
    case Group.Faction4:
      return Cards.Faction4.AbyssalCrawler;
    case Group.Faction5:
      return Cards.Faction5.EarthWalker;
    case Group.Faction6:
      return Cards.Faction6.FenrirWarmaster;
    case Group.Neutral:
      return Cards.Neutral.SpottedDragonlark;
    case Group.Spell:
      return Cards.Spell.SundropElixir;
    case Group.Artifact:
      return Cards.Artifact.IndomitableWill;
    case Group.Tile:
      return Cards.Tile.BonusMana;
  }
}

function getGroup(card: typeof Card): Group | null {
  switch (card.getType()) {
    case CardType.Unit:
      switch (card.getFactionId()) {
        case Factions.Faction1:
          return Group.Faction1;
        case Factions.Faction2:
          return Group.Faction2;
        case Factions.Faction3:
          return Group.Faction3;
        case Factions.Faction4:
          return Group.Faction4;
        case Factions.Faction5:
          return Group.Faction5;
        case Factions.Faction6:
          return Group.Faction6;
        case Factions.Neutral:
          return Group.Neutral;
        default:
          return null;
      }
    case CardType.Spell:
      return Group.Spell;
    case CardType.Artifact:
      return Group.Artifact;
    case CardType.Tile:
      return Group.Tile;
    default:
      return null;
  }
}
