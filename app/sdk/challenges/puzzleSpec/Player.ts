const Card = require('app/sdk/cards/card');
const SDKPlayer = require('app/sdk/player');
const Unit = require('app/sdk/entities/unit');
import type ArithmeticCoder from './arithmeticCoding/ArithmeticCoder';
import DeckCard from './DeckCard';
import GeneralCard from './GeneralCard';
import List from './List';
import type PositionCoder from "./PositionCoder";
import type SpecString from './SpecString';

export default class Player {
  static handSizeInBits = 3;
  constructor(
    public generalCard: GeneralCard,
    public hand: List<DeckCard>,
    public deck: List<DeckCard>,
  ) {}

  static fromSpecString(specString: SpecString): Player | null {
    const generalCard = GeneralCard.fromSpecString(specString);
    if (generalCard === null) {
      return null;
    }
    const hand = List.fromSpecString(
      DeckCard,
      specString,
      Player.handSizeInBits,
    );
    if (hand === null) {
      return null;
    }
    const deck = List.fromSpecString(DeckCard, specString);
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
    const hand = new List(Player.cardsToDeckCards(cardsInHand));
    const cardsInDeck = player
      .getDeck()
      .getCardsInDrawPileExcludingMissing()
    const deck = new List(Player.cardsToDeckCards(cardsInDeck));
    return new Player(generalCard, hand, deck);
  }

  static updateCoder(
    coder: ArithmeticCoder,
    positionCoder: PositionCoder,
    player?: Player,
  ): Player {
    const generalCard = GeneralCard.updateCoder(
      coder,
      positionCoder,
      player?.generalCard,
    );
    const hand = List.updateCoder(
      DeckCard,
      coder,
      this.handLengthDenominator,
      player?.hand,
    );
    const deck = List.updateCoder(
      DeckCard,
      coder,
      this.handLengthDenominator,
      player?.deck,
    );
    return player ?? new Player(generalCard, hand, deck);
  }

  toString(): string {
    const hand = this.hand.toString(Player.handSizeInBits);
    const deck = this.deck.toString();
    return `${this.generalCard}${hand}${deck}`;
  }

  private static handLengthDenominator = 7;

  private static cardsToDeckCards(cards: (typeof Card)[]): DeckCard[] {
    return cards
    .map(card => DeckCard.fromCard(card))
    .reduce<DeckCard[]>(
      (acc, val) => val === null ? acc : acc.concat([val]),
      [],
    );
  }
}
