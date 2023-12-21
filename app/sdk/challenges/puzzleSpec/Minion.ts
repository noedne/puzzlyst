const Unit = require('app/sdk/entities/unit');

import BaseCard from "./BaseCard";
import Modifier from "./Modifier";
import {
  fromCard as getPositionFromCard,
  fromSpecString as extractPositionFromSpecString,
  type Position,
  toString as positionToString,
} from "./Position";
import type PositionCoder from "./PositionCoder";
import PositionableType from "./PositionableType";
import SpecString from "./SpecString";
import type ArithmeticCoder from "./arithmeticCoding/ArithmeticCoder";
import Stats from "./Stats";

export default class Minion {
  private constructor(
    public baseCard: BaseCard,
    public position: Position,
    public stats: Stats,
    public modifiers: Modifier[],
  ) {}

  public static fromSpecString(specString: SpecString): Minion | null {
    const baseCard = BaseCard.fromSpecString(specString);
    if (baseCard === null) {
      return null;
    }
    const position = extractPositionFromSpecString(specString);
    if (position === null) {
      return null;
    }
    const stats = Stats.fromSpecString(specString);
    if (stats === null) {
      return null;
    }
    const modifiers = specString.extractList(Modifier.fromSpecString);
    if (modifiers === null) {
      return null;
    }
    return new Minion(baseCard, position, stats, modifiers);
  }

  public static fromCard(minion: typeof Unit): Minion | null {
    const baseCard = BaseCard.fromCard(minion);
    if (baseCard === null) {
      return null;
    }
    const position = getPositionFromCard(minion);
    const stats = Stats.fromCard(minion);
    if (stats === null) {
      return null;
    }
    const modifiers = Modifier.fromCard(minion);
    return new Minion(baseCard, position, stats, modifiers);
  }

  public static updateCoder(
    coder: ArithmeticCoder,
    baseCard: BaseCard,
    minion: Minion | undefined,
    positionCoder: PositionCoder,
  ): Minion {
    const position = positionCoder.updateCoder(
      coder,
      minion?.position,
      PositionableType.Unit,
    );
    const stats = Stats.updateCoder(coder, baseCard, 3/4, minion?.stats);
    return minion ?? new Minion(baseCard, position, stats, []);
  }

  public toString(): string {
    const position = positionToString(this.position);
    const modifiers = SpecString.constructList(this.modifiers);
    return `${this.baseCard}${position}${this.stats}${modifiers}`;
  }
}
