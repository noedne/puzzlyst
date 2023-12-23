import { getKeywordData } from "../../gameVersion";
import type ArithmeticCoder from "./arithmeticCoding/ArithmeticCoder";
import { getWeightedBooleanCoding } from "./arithmeticCoding/utils";
import SpecString from "./SpecString";

const Modifier = require('app/sdk/modifiers/modifier');
const Unit = require('app/sdk/entities/unit');

export default class Keywords {
  private hasKeywords: boolean[];

  private constructor(hasKeywords?: boolean[]) {
    this.hasKeywords = hasKeywords ?? getKeywordData().map(() => false);
  }

  public static fromSpecString(specString: SpecString): Keywords | null {
    const hasAny = specString.readNBits(1) === 1;
    if (!hasAny) {
      return new Keywords();
    }
    const hasKeywords = getKeywordData()
      .map(() => specString.readNBits(1) === 1);
    return new Keywords(hasKeywords);
  }

  public static fromCard(minion: typeof Unit): Keywords {
    const keywords = minion.getModifiers()
      .filter((modifier: typeof Modifier) => modifier.getWasAppliedByEditor())
      .map((modifier: typeof Modifier) => modifier.getType());
    const hasKeywords = getKeywordData()
      .map(data => keywords.includes(data.type));
    return new Keywords(hasKeywords);
  }

  public static updateCoder(
    coder: ArithmeticCoder,
    keywords: Keywords | undefined,
  ): Keywords {
    const hasKeywords = getKeywordData().map(
      (_, index) => getWeightedBooleanCoding(1/1024)
        .updateCoder(coder, keywords?.hasKeywords?.[index]),
    )
    return keywords ?? new Keywords(hasKeywords);
  }

  public toString(): string {
    const hasAny = this.hasKeywords.includes(true);
    let str = SpecString.boolToBit(hasAny);
    if (!hasAny) {
      return str;
    }
    this.hasKeywords.forEach(
      hasKeyword => str += SpecString.boolToBit(hasKeyword),
    );
    return str;
  }

  public getKeywords() {
    return getKeywordData().map(data => data.class)
      .filter((_, index) => this.hasKeywords[index]);
  }
}
