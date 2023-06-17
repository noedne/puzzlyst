const CardType = require('app/sdk/cards/cardType');
const CONFIG = require('app/common/config');

import BaseCard from "./BaseCard";
import Modifier from './Modifier';
import { extractPosition, type Position } from "./Position";
import type SpecString from "./SpecString";

const getCustomModifiers = require('app/sdk/challenges/puzzleSpec/getCustomModifiers');

export enum Owner {
  You,
  Opponent,
}

export enum CardInPlayType {
  Artifact,
  Minion,
  Tile,
}

export default class CardInPlay {
  constructor(
    public baseCard: BaseCard,
    public owner: Owner,
    public properties: CardInPlayProperties,
    public customModifiers: any,
  ) {}

  static fromSpecString(specString: SpecString): CardInPlay | null {
    const baseCard = BaseCard.fromSpecString(specString);
    if (baseCard === null) {
      return null;
    }
    const card = baseCard.getCard();
    if (card == null) {
      return null;
    }
    const owner = specString.readNBits(1) === 0 ? Owner.You : Owner.Opponent;
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

  static extractProperties(
    specString: SpecString,
    cardType: typeof CardType,
  ): CardInPlayProperties | null {
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

type CardInPlayProperties =
  | ArtifactProperties
  | MinionProperties
  | TileProperties;

class ArtifactProperties {
  type = CardInPlayType.Artifact as const;

  constructor(public durability: number) {}

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
  type = CardInPlayType.Minion as const;

  constructor(
    public position: Position,
    public damage: number,
    public modifiers: Modifier[],
  ) {}

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
  type = CardInPlayType.Tile as const;

  constructor(public position: Position) {}

  static fromSpecString(specString: SpecString): TileProperties | null {
    const position = extractPosition(specString);
    if (position === null) {
      return null;
    }
    return new TileProperties(position);
  }
}
