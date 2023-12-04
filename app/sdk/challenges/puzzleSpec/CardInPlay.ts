const Artifact = require('app/sdk/artifacts/artifact');
const Card = require('app/sdk/cards/card');
const CardType = require('app/sdk/cards/cardType');
const CONFIG = require('app/common/config');
const Tile = require('app/sdk/entities/tile');
const Unit = require('app/sdk/entities/unit');

import type ArithmeticCoder from "./arithmeticCoding/ArithmeticCoder";
import BaseCard from "./BaseCard";
import { getUniformArrayCoding, getUniformNumberCoding } from "./arithmeticCoding/utils";
import Modifier from './Modifier';
import {
  fromCard as getPositionFromCard,
  fromSpecString as extractPositionFromSpecString,
  type Position,
  toString as positionToString,
} from "./Position";
import PositionableType from "./PositionableType";
import type PositionCoder from "./PositionCoder";
import SpecString from "./SpecString";
import getCustomModifiers from "./getCustomModifiers";

export enum Owner {
  You = '0',
  Opponent = '1',
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
    public customModifiers: ((card: typeof Card) => void)[] = [],
  ) {}

  static fromSpecString(specString: SpecString): CardInPlay | null {
    const baseCard = BaseCard.fromSpecString(specString);
    if (baseCard === null) {
      return null;
    }
    const { card, cardId } = baseCard;
    if (card == null) {
      return null;
    }
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
    const customModifiers = getCustomModifiers(cardId).map(
      ({ fromSpecString }) => fromSpecString(specString));
    return new CardInPlay(baseCard, owner, properties, customModifiers);
  }

  static fromCard(card: typeof Card): CardInPlay | null {
    const baseCard = BaseCard.fromCard(card);
    if (baseCard === null) {
      return null;
    }
    const owner = card.isOwnedByMyPlayer() ? Owner.You : Owner.Opponent;
    const properties = CardInPlay.extractPropertiesFromCard(card);
    if (properties === null) {
      return null;
    }
    return new CardInPlay(baseCard, owner, properties);
  }

  static updateCoder(
    coder: ArithmeticCoder,
    positionCoder: PositionCoder,
    cardInPlay?: CardInPlay,
  ): CardInPlay {
    const baseCard = BaseCard.updateCoder(coder, cardInPlay?.baseCard);
    const owner = this.getOwnerCoding().updateCoder(coder, cardInPlay?.owner);
    const properties = cardInPlay != null
      ? this.encodeProperties(coder, positionCoder, cardInPlay.properties)
      : this.decodeProperties(coder, positionCoder, baseCard.card.getType());
    return cardInPlay ?? new CardInPlay(baseCard, owner, properties, []);
  }

  toString(): string {
    const { card, cardId } = this.baseCard;
    const customModifiers = getCustomModifiers(cardId)
      .map(({ toString }) => toString(card)).join('');
    return `${this.baseCard}${this.owner}${this.properties}${customModifiers}`;
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

  private static getOwnerCoding() {
    return getUniformArrayCoding([Owner.You, Owner.Opponent]);
  }

  private static encodeProperties(
    coder: ArithmeticCoder,
    positionCoder: PositionCoder,
    properties: CardInPlayProperties
  ): CardInPlayProperties {
    switch (properties.type) {
      case CardInPlayType.Artifact:
        return ArtifactProperties.updateCoder(coder, properties);
      case CardInPlayType.Minion:
        return MinionProperties.updateCoder(coder, positionCoder, properties);
      case CardInPlayType.Tile:
        return TileProperties.updateCoder(coder, positionCoder, properties);
    }
  }

  private static decodeProperties(
    coder: ArithmeticCoder,
    positionCoder: PositionCoder,
    cardType: typeof CardType,
  ): CardInPlayProperties {
    switch (cardType) {
      case CardType.Artifact:
        return ArtifactProperties.updateCoder(coder);
      case CardType.Tile:
        return TileProperties.updateCoder(coder, positionCoder);
      case CardType.Unit:
        return MinionProperties.updateCoder(coder, positionCoder);
      default:
        throw Error('invalid');
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

  static updateCoder(
    coder: ArithmeticCoder,
    artifactProperties?: ArtifactProperties,
  ): ArtifactProperties {
    const durability = this.getDurabilityCoding().updateCoder(
      coder,
      artifactProperties?.durability,
    );
    return artifactProperties ?? new ArtifactProperties(durability);
  }

  toString(): string {
    return SpecString.writeNZeroes(
      CONFIG.MAX_ARTIFACT_DURABILITY - this.durability,
    );
  }

  private static getDurabilityCoding() {
    return getUniformNumberCoding(3, 1);
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
      Modifier.fromCard(unit),
    );
  }

  static updateCoder(
    coder: ArithmeticCoder, 
    positionCoder: PositionCoder, 
    minionProperties?: MinionProperties,
  ): MinionProperties {
    const position = positionCoder.updateCoder(
      coder,
      PositionableType.Unit,
      minionProperties?.position,
    );
    const damage = this.getDamageCoding().updateCoder(
      coder,
      minionProperties?.damage,
    );
    return minionProperties ?? new MinionProperties(position, damage, []);
  }

  toString(): string {
    const position = positionToString(this.position);
    const damage = SpecString.writeNZeroes(this.damage);
    const modifiers = SpecString.constructList(this.modifiers);
    return `${position}${damage}${modifiers}`;
  }

  private static getDamageCoding() {
    return getUniformNumberCoding(6);
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

  static updateCoder(
    coder: ArithmeticCoder,
    positionCoder: PositionCoder,
    tileProperties?: TileProperties,
  ): TileProperties {
    const position = positionCoder.updateCoder(
      coder, 
      PositionableType.Tile, 
      tileProperties?.position,
    );
    return tileProperties ?? new TileProperties(position);
  }

  toString(): string {
    return positionToString(this.position);
  }
}
