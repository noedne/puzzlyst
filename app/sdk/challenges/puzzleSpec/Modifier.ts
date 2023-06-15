import BaseCard from "./BaseCard";
import type SpecString from "./SpecString";

const getContextObjectData = require('./getContextObjectData');

export default class Modifier {
  baseCard;
  indexOfContextObject;
  multiplicity;

  constructor(
    baseCard: BaseCard,
    indexOfContextObject: number,
    multiplicity: number,
  ) {
    this.baseCard = baseCard;
    this.indexOfContextObject = indexOfContextObject;
    this.multiplicity = multiplicity;
  }

  static fromSpecString(specString: SpecString): Modifier | null {
    const baseCard = BaseCard.fromSpecString(specString);
    if (baseCard === null) {
      return null;
    }
    const cardId = baseCard.getCardId();
    const array = getContextObjectData(cardId, baseCard.version);
    if (array.length === 0) {
      return null;
    }
    const index = array.length === 1 ? 0 : specString.countZeroes();
    if (index === null) {
      return null;
    }
    const data = array[index];
    if (data === undefined) {
      return null;
    }
    const multiplicity = data.allowMultiple ? specString.countZeroes() : 0;
    if (multiplicity === null) {
      return null;
    }
    return new Modifier(baseCard, index, multiplicity);
  }
}
