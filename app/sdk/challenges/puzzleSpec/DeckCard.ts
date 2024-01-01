const Card = require('app/sdk/cards/card');
const ModifierKeeper = require('app/sdk/modifiers/modifierKeeper');
import type ArithmeticCoder from "./arithmeticCoding/ArithmeticCoder";
import { getWeightedBooleanCoding } from "./arithmeticCoding/utils";
import BaseCard from "./BaseCard";
import SpecString from "./SpecString";

export default class DeckCard {
  constructor(public baseCard: BaseCard, public isKeeper: boolean) {}

  static fromSpecString(specString: SpecString): DeckCard | null {
    const baseCard = BaseCard.fromSpecString(specString);
    if (baseCard === null) {
      return null;
    }
    const isKeeper = baseCard.isUnit() && specString.readNBits(1) === 1;
    return new DeckCard(baseCard, isKeeper);
  }

  static updateCoder(
    coder: ArithmeticCoder,
    baseCard: BaseCard,
    deckCard: DeckCard | undefined,
  ): DeckCard {
    let isKeeper = false;
    if (baseCard.isUnit()) {
      isKeeper = getWeightedBooleanCoding(1/1024)
        .updateCoder(coder, deckCard?.isKeeper);
    }
    return deckCard ?? new DeckCard(baseCard, isKeeper);
  }

  static fromCard(card: typeof Card): DeckCard {
    const baseCard = BaseCard.fromCard(card);
    const isKeeper = card.hasModifierType(ModifierKeeper.type);
    return new DeckCard(baseCard, isKeeper);
  }

  toString(): string {
    let str = this.baseCard.toString();
    if (!this.baseCard.isUnit()) {
      return str;
    }
    return `${str}${SpecString.boolToBit(this.isKeeper)}`;
  }
}
