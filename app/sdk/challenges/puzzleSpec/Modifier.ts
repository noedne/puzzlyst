const Card = require('app/sdk/cards/card');
import BaseCard from "./BaseCard";
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
    const array = getContextObjectData(baseCard.cardId, baseCard.version);
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

  toString(): string {
    const array = getContextObjectData(
      this.baseCard.cardId,
      this.baseCard.version,
    );    
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
    const { cardId, indexOfContextObject, version } = contextObject;
    if (cardId == null || indexOfContextObject == null) {
      return null;
    }
    const baseCard = BaseCard.fromCardId(cardId, version);
    if (baseCard === null) {
      return null;
    }
    return new Modifier(baseCard, indexOfContextObject, 1);
  }
}
