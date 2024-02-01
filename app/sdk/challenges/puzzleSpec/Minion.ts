const ModifierSilence = require('app/sdk/modifiers/modifierSilence');
const Unit = require('app/sdk/entities/unit');

import BaseCard from "./BaseCard";
import Modifier from "./Modifier";
import {
  fromCard as getPositionFromCard,
  fromSpecString as extractPositionFromSpecString,
  type Position,
  toString as positionToString,
} from "./Position";
import type PositionCoder from "./PositionCoder";
import PositionableType from "./PositionableType";
import SpecString from "./SpecString";
import type ArithmeticCoder from "./arithmeticCoding/ArithmeticCoder";
import Stats from "./Stats";
import Keywords from "./Keywords";
import List from "./List";
import { getWeightedBooleanCoding } from "./arithmeticCoding/utils";

export default class Minion {
  private constructor(
    public baseCard: BaseCard,
    public position: Position,
    public isDispelled: boolean,
    public stats: Stats,
    public keywords: Keywords,
    public modifiers: List<Modifier>,
  ) {}

  public static fromSpecString(specString: SpecString): Minion | null {
    const baseCard = BaseCard.fromSpecString(specString);
    if (baseCard === null) {
      return null;
    }
    const position = extractPositionFromSpecString(specString);
    if (position === null) {
      return null;
    }
    const isDispelled = specString.readNBits(1) === 1;
    const stats = Stats.fromSpecString(specString);
    if (stats === null) {
      return null;
    }
    const keywords = Keywords.fromSpecString(specString);
    if (keywords === null) {
      return null;
    }
    const modifiers = List.fromSpecString(Modifier, specString);
    if (modifiers === null) {
      return null;
    }
    return new
      Minion(baseCard, position, isDispelled, stats, keywords, modifiers);
  }

  public static fromCard(minion: typeof Unit): Minion {
    const baseCard = BaseCard.fromCard(minion);
    const position = getPositionFromCard(minion);
    const isDispelled = minion.hasModifierType(ModifierSilence.type);
    const stats = Stats.fromCard(minion);
    const keywords = Keywords.fromCard(minion);
    const modifiers = Modifier.fromCard(minion);
    return new
      Minion(baseCard, position, isDispelled, stats, keywords, modifiers);
  }

  public static updateCoder(
    coder: ArithmeticCoder,
    baseCard: BaseCard,
    minion: Minion | undefined,
    positionCoder: PositionCoder,
  ): Minion {
    const position = positionCoder.updateCoder(
      coder,
      minion?.position,
      PositionableType.Unit,
    );
    const probs = {
      isHealthyProb: 7/8,
      hasNoBuffsProb: 127/128,
      hasBaseStatsProb: 1023/1024,
    };
    const isDispelled = getWeightedBooleanCoding(1/256)
      .updateCoder(coder, minion?.isDispelled);
    const stats = Stats.updateCoder(coder, baseCard, probs, minion?.stats);
    const keywords = Keywords.updateCoder(coder, minion?.keywords);
    const modifiers = Modifier.updateListCoder(coder, minion?.modifiers, false);
    return minion ?? new
      Minion(baseCard, position, isDispelled, stats, keywords, modifiers);
  }

  public toString(): string {
    const position = positionToString(this.position);
    return `\
${this.baseCard}\
${position}\
${SpecString.boolToBit(this.isDispelled)}\
${this.stats}\
${this.keywords}\
${this.modifiers}\
`;
  }
}
