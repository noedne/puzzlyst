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
import { getUniformNumberCoding } from "./arithmeticCoding/utils";

export default class Minion {
  private constructor(
    public baseCard: BaseCard,
    public position: Position,
    public damage: number,
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
    const damage = specString.countZeroes();
    if (damage === null) {
      return null;
    }
    const modifiers = specString.extractList(Modifier.fromSpecString);
    if (modifiers === null) {
      return null;
    }
    return new Minion(baseCard, position, damage, modifiers);
  }

  public static fromCard(minion: typeof Unit): Minion | null {
    const baseCard = BaseCard.fromCard(minion);
    if (baseCard === null) {
      return null;
    }
    const position = getPositionFromCard(minion);
    const damage = minion.getDamage();
    const modifiers = Modifier.fromCard(minion);
    return new Minion(baseCard, position, damage, modifiers);
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
    const damage = getDamageCoding().updateCoder(
      coder,
      minion?.damage,
    );
    return minion ?? new Minion(baseCard, position, damage, []);
  }

  public toString(): string {
    const position = positionToString(this.position);
    const damage = SpecString.writeNZeroes(this.damage);
    const modifiers = SpecString.constructList(this.modifiers);
    return `${this.baseCard}${position}${damage}${modifiers}`;
  }
}

function getDamageCoding() {
  return getUniformNumberCoding(6);
}
