const Card = require('app/sdk/cards/card');
import type ArithmeticCoder from "./arithmeticCoding/ArithmeticCoder";
import BaseCard from "./BaseCard";
import { getUniformNumberCoding } from "./arithmeticCoding/utils";
import SpecString from "./SpecString";
import getContextObjectData from "./getContextObjectData";

export default class Modifier {
  constructor(
    public baseCard: BaseCard,
    public indexOfContextObject: number,
    public multiplicity: number,
  ) {}

  static fromSpecString(specString: SpecString): Modifier | null {
    const baseCard = BaseCard.fromSpecString(specString);
    if (baseCard === null) {
      return null;
    }
    const array = getContextObjectData(baseCard.cardId);
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

  static fromCard(card: typeof Card): Modifier[] {
    return card.getModifiers().reduce(
      (acc: Modifier[], { contextObject }: any) => {
        const last = acc.at(-1);
        if (
          last != null
          && contextObject.cardId === last.baseCard.cardId
          && contextObject.indexOfContextObject === last.indexOfContextObject
        ) {
          last.multiplicity++;
          return acc;
        }
        const modifier = Modifier.fromContextObject(contextObject);
        if (modifier === null) {
          return acc;
        }
        return acc.concat([modifier]);
      },
      [],
    );
  }

  static updateCoder(coder: ArithmeticCoder, modifier?: Modifier): Modifier {
    const baseCard = BaseCard.updateCoder(coder, modifier?.baseCard);
    const array = getContextObjectData(baseCard.cardId);
    const index = getIndexOfContextObjectCoding(array.length)
      .updateCoder(coder, modifier?.indexOfContextObject);
    const data = array[index];
    if (data === undefined) {
      throw Error('invalid');
    }
    const multiplicity = data.allowMultiple
      ? getMultiplicityCoding().updateCoder(coder, modifier?.multiplicity)
      : 0;
    return modifier ?? new Modifier(baseCard, index, multiplicity);
  }

  toString(): string {
    const array = getContextObjectData(this.baseCard.cardId);
    const indexOfContextObject = array.length === 1
      ? ''
      : SpecString.writeNZeroes(this.indexOfContextObject);
    const data = array[this.indexOfContextObject];
    const multiplicity = (data?.allowMultiple === true)
      ? SpecString.writeNZeroes(this.multiplicity)
      : '';
    return `${this.baseCard}${indexOfContextObject}${multiplicity}`;
  }

  private static fromContextObject(contextObject: any): Modifier | null { 
    const { cardId, indexOfContextObject } = contextObject;
    if (cardId == null || indexOfContextObject == null) {
      return null;
    }
    const baseCard = BaseCard.fromCardId(cardId);
    if (baseCard === null) {
      return null;
    }
    return new Modifier(baseCard, indexOfContextObject, 1);
  }
}

function getIndexOfContextObjectCoding(numberOfContextObjects: number) {
  return getUniformNumberCoding(numberOfContextObjects);
}

function getMultiplicityCoding() {
  return getUniformNumberCoding(2, 1);
}
