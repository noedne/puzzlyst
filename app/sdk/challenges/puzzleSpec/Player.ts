const Card = require('app/sdk/cards/card');
const SDKPlayer = require('app/sdk/player');
const Unit = require('app/sdk/entities/unit');
import DeckCard from './DeckCard';
import GeneralCard from './GeneralCard';
import type SpecString from './SpecString';

export default class Player {
  constructor(
    public generalCard: GeneralCard,
    public hand: DeckCard[],
    public deck: DeckCard[],
  ) {}

  static fromSpecString(specString: SpecString): Player | null {
    const generalCard = GeneralCard.fromSpecString(specString);
    if (generalCard === null) {
      return null;
    }
    const hand = specString.extractList(DeckCard.fromSpecString, 3);
    if (hand === null) {
      return null;
    }
    const deck = specString.extractList(DeckCard.fromSpecString);
    if (deck === null) {
      return null;
    }
    return new Player(generalCard, hand, deck);
  }

  static fromPlayer(player: typeof SDKPlayer): Player | null {
    const general: typeof Unit | undefined =
      player.getGameSession().getGeneralForPlayer(player);
    if (general == null) {
      return null;
    }
    const generalCard = GeneralCard.fromUnit(general);
    const cardsInHand = player
      .getDeck()
      .getCardsInHandExcludingMissing()
    const hand = Player.cardsToDeckCards(cardsInHand);
    const cardsInDeck = player
      .getDeck()
      .getCardsInDrawPileExcludingMissing()
    const deck = Player.cardsToDeckCards(cardsInDeck);
    return new Player(generalCard, hand, deck);
  }

  private static cardsToDeckCards(cards: (typeof Card)[]): DeckCard[] {
    return cards
    .map(card => DeckCard.fromCard(card))
    .reduce<DeckCard[]>(
      (acc, val) => val === null ? acc : acc.concat([val]),
      [],
    );
  }
}
