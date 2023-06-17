const Artifact = require('app/sdk/artifacts/artifact');
const Card = require('app/sdk/cards/card');
const CardType = require('app/sdk/cards/cardType');
const CONFIG = require('app/common/config');
const Tile = require('app/sdk/entities/tile');
const Unit = require('app/sdk/entities/unit');

import BaseCard from "./BaseCard";
import Modifier from './Modifier';
import {
  fromCard as getPositionFromCard,
  fromSpecString as extractPositionFromSpecString,
  type Position,
} from "./Position";
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
    const { card, cardId, version } = baseCard;
    const owner = specString.readNBits(1) === 0 ? Owner.You : Owner.Opponent;
    if (owner === null) {
      return null;
    }
    const properties = CardInPlay.extractPropertiesFromSpecString(
      specString,
      card.getType(),
    );
    if (properties === null) {
      return null;
    }
    const customModifiers = getCustomModifiers(cardId, version).map(
      (customModifier: { modifier: (specString: SpecString) => any }) =>
        customModifier.modifier(specString));
    return new CardInPlay(baseCard, owner, properties, customModifiers);
  }

  static fromCard(card: typeof Card): CardInPlay | null {
    const owner = card.isOwnedByMyPlayer() ? Owner.You : Owner.Opponent;
    const properties = CardInPlay.extractPropertiesFromCard(card);
    if (properties === null) {
      return null;
    }
    return new CardInPlay(BaseCard.fromCard(card), owner, properties, []);
  }

  private static extractPropertiesFromSpecString(
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

  private static extractPropertiesFromCard(
    card: typeof Card,
  ): CardInPlayProperties | null {
    switch (card.getType()) {
      case CardType.Artifact:
        return ArtifactProperties.fromArtifact(card);
      case CardType.Tile:
        return TileProperties.fromTile(card);
      case CardType.Unit:
        return MinionProperties.fromUnit(card);
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

  static fromArtifact(artifact: typeof Artifact): ArtifactProperties {
    return new ArtifactProperties(artifact.durability);
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
    const position = extractPositionFromSpecString(specString);
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

  static fromUnit(unit: typeof Unit): MinionProperties {
    return new MinionProperties(
      getPositionFromCard(unit),
      unit.getDamage(),
      [],
    );
  }
}

class TileProperties {
  type = CardInPlayType.Tile as const;

  constructor(public position: Position) {}

  static fromSpecString(specString: SpecString): TileProperties | null {
    const position = extractPositionFromSpecString(specString);
    if (position === null) {
      return null;
    }
    return new TileProperties(position);
  }

  static fromTile(tile: typeof Tile): TileProperties {
    return new TileProperties(getPositionFromCard(tile));
  }
}
