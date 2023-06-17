const Card = require('app/sdk/cards/card');
import BaseCard from "./BaseCard";
import Modifier from "./Modifier";
import type SpecString from "./SpecString";

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

  static fromCard(card: typeof Card): DeckCard {
    return new DeckCard(BaseCard.fromCard(card), []);
  }
}
