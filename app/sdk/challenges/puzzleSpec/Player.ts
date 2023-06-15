import DeckCard from './DeckCard';
import GeneralCard from './GeneralCard';
import type SpecString from './SpecString';

export default class Player {
  static handSizeMinBitLength = 3;
  generalCard;
  hand;
  deck;

  constructor(generalCard: GeneralCard, hand: DeckCard[], deck: DeckCard[]) {
    this.generalCard = generalCard;
    this.hand = hand;
    this.deck = deck;
  }

  static fromSpecString(specString: SpecString): Player | null {
    const generalCard = GeneralCard.fromSpecString(specString);
    if (generalCard === null) {
      return null;
    }
    const hand = specString.extractList(
      DeckCard.fromSpecString,
      this.handSizeMinBitLength,
    );
    if (hand === null) {
      return null;
    }
    const deck = specString.extractList(DeckCard.fromSpecString);
    if (deck === null) {
      return null;
    }
    return new Player(generalCard, hand, deck);
  }
}
