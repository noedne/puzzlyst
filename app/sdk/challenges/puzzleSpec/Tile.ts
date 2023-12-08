const SDKTile = require('app/sdk/entities/tile');

import BaseCard from "./BaseCard";
import {
  fromCard as getPositionFromCard,
  fromSpecString as extractPositionFromSpecString,
  type Position,
  toString as positionToString,
} from "./Position";
import type PositionCoder from "./PositionCoder";
import PositionableType from "./PositionableType";
import type SpecString from "./SpecString";
import type ArithmeticCoder from "./arithmeticCoding/ArithmeticCoder";

export default class Tile {
  private constructor(
    public baseCard: BaseCard,
    public position: Position,
  ) {}

  public static fromSpecString(specString: SpecString): Tile | null {
    const baseCard = BaseCard.fromSpecString(specString);
    if (baseCard === null) {
      return null;
    }
    const position = extractPositionFromSpecString(specString);
    if (position === null) {
      return null;
    }
    return new Tile(baseCard, position);
  }

  public static fromCard(tile: typeof SDKTile): Tile | null {
    const baseCard = BaseCard.fromCard(tile);
    if (baseCard === null) {
      return null;
    }
    const position = getPositionFromCard(tile);
    return new Tile(baseCard, position);
  }

  public static updateCoder(
    coder: ArithmeticCoder,
    baseCard: BaseCard,
    tile: Tile | undefined,
    positionCoder: PositionCoder,
  ): Tile {
    const position = positionCoder.updateCoder(
      coder,
      tile?.position,
      PositionableType.Tile,
    );
    return tile ?? new Tile(baseCard, position);
  }

  public toString(): string {
    const position = positionToString(this.position);
    return `${this.baseCard}${position}`;
  }
}
