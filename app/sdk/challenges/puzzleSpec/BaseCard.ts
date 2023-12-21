const Card = require('app/sdk/cards/card');
const GameSession = require('app/sdk/gameSession');

import { getCardIds } from '../../gameVersion';
import SpecString from './SpecString';

export default class BaseCard {
  private static readonly indexMinBitLength = 8;

  public constructor(
    public cardId: number,
    private _card: typeof Card | null = null,
  ) {}

  public static fromSpecString(specString: SpecString): BaseCard | null {
    const index =
      specString.countZeroesAndReadNPlusBits(this.indexMinBitLength);
    if (index === null) {
      return null;
    }
    const cardId = getCardIds()[index];
    if (cardId === undefined) {
      return null;
    }
    return new BaseCard(cardId);
  }

  public static fromCard(card: typeof Card): BaseCard {
    return new BaseCard(card.getId(), card);
  }

  public static fromCardId(cardId: number): BaseCard {
    return BaseCard.fromCard(BaseCard.getCard(cardId));
  }

  public get card(): typeof Card {
    this._card ??= BaseCard.getCard(this.cardId);
    return this._card;
  }

  public toString(): string {
    return SpecString.padNumWithZeroesForCountingPastNMinBits(
      getCardIds().indexOf(this.cardId),
      BaseCard.indexMinBitLength,
    );
  }

  private static getCard(cardId: number): typeof Card {
    return GameSession.current().createCardForIdentifier(cardId);
  }
}
