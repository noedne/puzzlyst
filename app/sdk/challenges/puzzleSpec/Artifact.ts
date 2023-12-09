const Card = require('app/sdk/cards/card');
const CONFIG = require('app/common/config');
const SDKArtifact = require('app/sdk/artifacts/artifact');

import BaseCard from "./BaseCard";
import SpecString from "./SpecString";
import type ArithmeticCoder from "./arithmeticCoding/ArithmeticCoder";
import { getUniformNumberCoding } from "./arithmeticCoding/utils";
import getCustomModifiers from "./getCustomModifiers";

export default class Artifact {
  private constructor(
    public baseCard: BaseCard,
    public durability: number,
    public customModifiers: ((card: typeof Card) => void)[] = [],
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
    const customModifiers = getCustomModifiers(cardId).map(
      ({ fromSpecString }) => fromSpecString(specString));
    return new Artifact(baseCard, durability, customModifiers);
  }

  public static fromCard(artifact: typeof SDKArtifact): Artifact | null {
    const baseCard = BaseCard.fromCard(artifact);
    if (baseCard === null) {
      return null;
    }
    return new Artifact(baseCard, artifact.durability);
  }

  public static updateCoder(
    coder: ArithmeticCoder,
    baseCard: BaseCard,
    artifact: Artifact | undefined,
  ): Artifact {
    const durability = getDurabilityCoding().updateCoder(
      coder,
      artifact?.durability,
    );
    return artifact ?? new Artifact(baseCard, durability, []);
  }

  public toString(): string {
    const durability = SpecString.writeNZeroes(
      CONFIG.MAX_ARTIFACT_DURABILITY - this.durability,
    );
    const { card, cardId } = this.baseCard;
    const customModifiers = getCustomModifiers(cardId)
      .map(({ toString }) => toString(card)).join('');
    return `${this.baseCard}${durability}${customModifiers}`;
  }
}

function getDurabilityCoding() {
  return getUniformNumberCoding(3, 1);
}