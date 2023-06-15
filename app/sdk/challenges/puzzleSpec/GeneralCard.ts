import BaseCard from "./BaseCard";
import Modifier from "./Modifier";
import { extractPosition, type Position } from "./Position";
import type SpecString from "./SpecString";

export default class GeneralCard {
  static damageMinBitLength = 5;
  baseCard;
  position;
  damage;
  modifiers;

  constructor(
    baseCard: BaseCard,
    position: Position,
    damage: number,
    modifiers: Modifier[],
  ) {
    this.baseCard = baseCard;
    this.position = position;
    this.damage = damage;
    this.modifiers = modifiers;
  }

  static fromSpecString(specString: SpecString): GeneralCard | null {
    const baseCard = BaseCard.fromSpecString(specString);
    if (baseCard === null) {
      return null;
    }
    const position = extractPosition(specString);
    if (position === null) {
      return null;
    }
    const damage = specString.countZeroesAndReadNPlusBits(this.damageMinBitLength);
    if (damage === null) {
      return null;
    }
    const modifiers = specString.extractList(Modifier.fromSpecString);
    if (modifiers === null) {
      return null;
    }
    return new GeneralCard(baseCard, position, damage, modifiers);
  }
}
