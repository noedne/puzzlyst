const CardType = require('app/sdk/cards/cardType');
const CONFIG = require('app/common/config');

import BaseCard from "./BaseCard";
import Modifier from './Modifier';
import { extractPosition, type Position } from "./Position";
import type SpecString from "./SpecString";

const getCustomModifiers = require('app/sdk/challenges/puzzleSpec/getCustomModifiers');

export default class CardInPlay {
  baseCard;
  owner;
  properties;
  customModifiers;

  constructor(
    baseCard: BaseCard,
    owner: Owner,
    properties: CardInPlayProperties,
    customModifiers: any,
  ) {
    this.baseCard = baseCard;
    this.owner = owner;
    this.properties = properties;
    this.customModifiers = customModifiers;
  }

  static fromSpecString(specString: SpecString): CardInPlay | null {
    const baseCard = BaseCard.fromSpecString(specString);
    if (baseCard === null) {
      return null;
    }
    const card = baseCard.getCard();
    if (card == null) {
      return null;
    }
    const owner = extractOwner(specString);
    if (owner === null) {
      return null;
    }
    const properties = CardInPlay.extractProperties(specString, card.getType());
    if (properties === null) {
      return null;
    }
    const customModifiers =
      getCustomModifiers(baseCard.getCardId(), baseCard.version)
        .map(({ modifier }: {
          modifier: (specString: SpecString) => any,
        }) => modifier(specString));
    return new CardInPlay(baseCard, owner, properties, customModifiers);
  }

  static extractProperties(specString: SpecString, cardType: typeof CardType): CardInPlayProperties | null {
    switch (cardType) {
      case CardType.Artifact:
        return ArtifactProperties.fromSpecString(specString);
      case CardType.Tile:
        return TileProperties.fromSpecString(specString);
      case CardType.Unit:
        return MinionProperties.fromSpecString(specString);
      default:
        return null;
    }
  }
}

type Owner = 0 | 1;

function extractOwner(specString: SpecString): Owner | null {
  return specString.readNBits(1) as Owner | null;
}

type CardInPlayProperties =
  | ArtifactProperties
  | MinionProperties
  | TileProperties;

class ArtifactProperties {
  durability;

  constructor(durability: number) {
    this.durability = durability;
  }

  static fromSpecString(specString: SpecString): ArtifactProperties | null {
    const damage = specString.countZeroes();
    if (damage === null) {
      return null;
    }
    const durability = CONFIG.MAX_ARTIFACT_DURABILITY - damage;
    return new ArtifactProperties(durability);
  }
}

class MinionProperties {
  position;
  damage;
  modifiers;

  constructor(position: Position, damage: number, modifiers: Modifier[]) {
    this.position = position;
    this.damage = damage;
    this.modifiers = modifiers;
  }

  static fromSpecString(specString: SpecString): MinionProperties | null {
    const position = extractPosition(specString);
    if (position === null) {
      return null;
    }
    const damage = specString.countZeroes();
    if (damage === null) {
      return null;
    }
    const modifiers = specString.extractList(Modifier.fromSpecString);
    if (modifiers === null) {
      return null;
    }
    return new MinionProperties(position, damage, modifiers);
  }
}

class TileProperties {
  static fromSpecString(_specString: SpecString): TileProperties | null {
    return new TileProperties();
  }
}
