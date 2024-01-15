const CONFIG = require('app/common/config');
const SDKArtifact = require('app/sdk/artifacts/artifact');

import BaseCard from "./BaseCard";
import SpecString from "./SpecString";
import type ArithmeticCoder from "./arithmeticCoding/ArithmeticCoder";
import { getWeightedNumberCoding } from "./arithmeticCoding/utils";
import getCustomModifiers, { CustomModifierValue } from "./getCustomModifiers";

export default class Artifact {
  private constructor(
    public baseCard: BaseCard,
    public durability: number,
    public customModifierValues: CustomModifierValue[],
  ) {}

  public static fromSpecString(specString: SpecString): Artifact | null {
    const baseCard = BaseCard.fromSpecString(specString);
    if (baseCard === null) {
      return null;
    }
    const { card, cardId } = baseCard;
    if (card == null) {
      return null;
    }
    const damage = specString.countZeroes();
    if (damage === null) {
      return null;
    }
    const durability = CONFIG.MAX_ARTIFACT_DURABILITY - damage;
    const customModifierValues = getCustomModifiers(cardId).map(
      ({ fromSpecString }) => fromSpecString(specString),
    );
    return new Artifact(baseCard, durability, customModifierValues);
  }

  public static fromCard(artifact: typeof SDKArtifact): Artifact {
    const baseCard = BaseCard.fromCard(artifact);
    const customModifierValues = getCustomModifiers(baseCard.cardId)
      .map(({ getData }) => getData(artifact).value);
    return new Artifact(baseCard, artifact.durability, customModifierValues);
  }

  public static updateCoder(
    coder: ArithmeticCoder,
    baseCard: BaseCard,
    artifact: Artifact | undefined,
  ): Artifact {
    const durability = getWeightedNumberCoding([1/8, 1/8], 1).updateCoder(
      coder,
      artifact?.durability,
    );
    return artifact ?? new Artifact(baseCard, durability, []);
  }

  public toString(): string {
    const durability = SpecString.writeNZeroes(
      CONFIG.MAX_ARTIFACT_DURABILITY - this.durability,
    );
    const customModifierValues = getCustomModifiers(this.baseCard.cardId)
      .map(({ toString }, i) => {
        const value = this.customModifierValues[i];
        if (value === undefined) {
          throw Error('invalid');
        }
        return toString(value);
      })
      .join('');
    return `${this.baseCard}${durability}${customModifierValues}`;
  }
}
