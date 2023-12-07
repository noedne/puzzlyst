const Card = require('app/sdk/cards/card');
const GameSession = require('app/sdk/gameSession');

import { getArtifacts, getMinions, getSpells, getTiles } from '../../gameVersion';
import type ArithmeticCoder from './arithmeticCoding/ArithmeticCoder';
import { getUniformArrayCoding } from "./arithmeticCoding/utils";
import SpecString from './SpecString';

export default class BaseCard {
  private static readonly indexMinBitLength = 8;

  private constructor(
    public cardId: number,
    private _card: typeof Card | null = null,
  ) {}

  public static fromSpecString(specString: SpecString): BaseCard | null {
    const index =
      specString.countZeroesAndReadNPlusBits(this.indexMinBitLength);
    if (index === null) {
      return null;
    }
    const cardId = getIds()[index];
    if (cardId === undefined) {
      return null;
    }
    return new BaseCard(cardId);
  }

  public static fromCard(card: typeof Card): BaseCard | null {
    return new BaseCard(card.getId(), card);
  }

  static fromCardId(cardId: number): BaseCard | null {
    return BaseCard.fromCard(BaseCard.getCard(cardId));
  }

  public get card(): typeof Card {
    this._card ??= BaseCard.getCard(this.cardId);
    return this._card;
  }

  public static updateCoder(
    coder: ArithmeticCoder,
    baseCard: BaseCard | undefined,
  ): BaseCard {
    const cardId = getIdCoding().updateCoder(coder, baseCard?.cardId);
    return baseCard ?? new BaseCard(cardId);
  }

  public toString(): string {
    return SpecString.padNumWithZeroesForCountingPastNMinBits(
      getIds().indexOf(this.cardId),
      BaseCard.indexMinBitLength,
    );
  }

  private static getCard(cardId: number): typeof Card {
    return GameSession.current().createCardForIdentifier(cardId);
  }
}

function getIds(): number[] {
  return getArtifacts()
    .concat(getMinions())
    .concat(getSpells())
    .concat(getTiles());
}

function getIdCoding() {
  return getUniformArrayCoding(getIds());
}
