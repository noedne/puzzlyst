import BaseCard from "./BaseCard";
import Modifier from "./Modifier";
import type SpecString from "./SpecString";

export default class DeckCard {
  baseCard;
  modifiers;

  constructor(baseCard: BaseCard, modifiers: Modifier[]) {
    this.baseCard = baseCard;
    this.modifiers = modifiers;
  }

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
}