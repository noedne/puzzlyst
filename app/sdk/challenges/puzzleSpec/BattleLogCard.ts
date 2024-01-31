import type ArithmeticCoder from "./arithmeticCoding/ArithmeticCoder";
import { getUniformBooleanCoding } from "./arithmeticCoding/utils";
import BaseCard from "./BaseCard";
import SpecString from "./SpecString";
const Card = require('app/sdk/cards/card');

export default class BattleLogCard {
  constructor(public baseCard: BaseCard, public isMine: boolean) {}

  static fromSpecString(specString: SpecString): BattleLogCard | null {
    const baseCard = BaseCard.fromSpecString(specString);
    if (baseCard === null) {
      return null;
    }
    const isMine = specString.readNBits(1) === 1;
    return new BattleLogCard(baseCard, isMine);
  }

  static updateCoder(
    coder: ArithmeticCoder,
    baseCard: BaseCard,
    battleLogCard: BattleLogCard | undefined,
  ): BattleLogCard {
    const isMine = getUniformBooleanCoding()
      .updateCoder(coder, battleLogCard?.isMine);
    return battleLogCard ?? new BattleLogCard(baseCard, isMine);
  }

  static fromCard(card: typeof Card): BattleLogCard {
    const baseCard = BaseCard.fromCard(card);
    const isMine = card.isOwnedByMyPlayer();
    return new BattleLogCard(baseCard, isMine);
  }

  toString(): string {
    return `${this.baseCard.toString()}${SpecString.boolToBit(this.isMine)}`;
  }
}
