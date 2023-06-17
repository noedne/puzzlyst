const Card = require('app/sdk/cards/card');
const SDK = require('app/sdk');

import type SpecString from './SpecString';

import type { Group } from './CardGroup';
import { getIdMinBitLength, getIdOffset } from './CardGroup';

export default class BaseCard {
  constructor(
    public version: number,
    public cardId: number,
    private _card: typeof Card | null = null,
  ) {}

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
    const cardId = id + getIdOffset(group);
    return new BaseCard(version, cardId);
  }

  get card(): typeof Card {
    this._card ??= SDK.GameSession.current().createCardForIdentifier(this.cardId);
    return this._card;
  }
}
