const Card = require('app/sdk/cards/card');
import type ArithmeticCoder from "./arithmeticCoding/ArithmeticCoder";
import BaseCard from "./BaseCard";
import Modifier from "./Modifier";
import SpecString from "./SpecString";

export default class DeckCard {
  constructor(public baseCard: BaseCard, public modifiers: Modifier[]) {}

  static fromSpecString(specString: SpecString): DeckCard | null {
    const baseCard = BaseCard.fromSpecString(specString);
    if (baseCard === null) {
      return null;
    }
    const modifiers = specString.extractList(Modifier.fromSpecString);
    if (modifiers === null) {
      return null;
    }
    return new DeckCard(baseCard, modifiers);
  }

  static updateCoder(coder: ArithmeticCoder, deckCard?: DeckCard): DeckCard {
    const baseCard = BaseCard.updateCoder(coder, deckCard?.baseCard);
    return deckCard ?? new DeckCard(baseCard, []);
  }

  static fromCard(card: typeof Card): DeckCard | null {
    const baseCard = BaseCard.fromCard(card);
    if (baseCard === null) {
      return null;
    }
    return new DeckCard(baseCard, Modifier.fromCard(card));
  }

  toString(): string {
    return `${this.baseCard}${SpecString.constructList(this.modifiers)}`;
  }
}
