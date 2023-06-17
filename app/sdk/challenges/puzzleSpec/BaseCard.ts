const Card = require('app/sdk/cards/card');
const SDK = require('app/sdk');

import type SpecString from './SpecString';

import type { Group } from './CardGroup';
import { getIdMinBitLength, getIdOffset } from './CardGroup';

export default class BaseCard {
  card: typeof Card | null = null;

  constructor(public version: number, public group: Group, public id: number) {}

  static fromSpecString(specString: SpecString): BaseCard | null {
    const version = specString.countZeroes();
    if (version === null) {
      return null;
    }
    const group = specString.matchRegex(/^(0[01]{3}|1[01])/) as Group | null;
    if (group === null) {
      return null;
    }
    const id = specString.countZeroesAndReadNPlusBits(getIdMinBitLength(group));
    if (id === null) {
      return null;
    }
    return new BaseCard(version, group, id);
  }

  getCardId(): number {
    return this.id + getIdOffset(this.group);
  }

  getCard() {
    if (this.card === null) {
      this.card = SDK.GameSession.current().createCardForIdentifier(
        this.getCardId(),
      );
    }
    return this.card;
  }
}
