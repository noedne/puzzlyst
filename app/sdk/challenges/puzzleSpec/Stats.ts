import type { CardStats } from "../../gameSessionEditor";
import type ArithmeticCoder from "./arithmeticCoding/ArithmeticCoder";
import { getMultiUniformRangeNumberWithHoleCoding, getUniformNumberCoding, getWeightedBooleanCoding } from "./arithmeticCoding/utils";
import type BaseCard from "./BaseCard";
import SpecString from "./SpecString";

const CONFIG = require('app/common/config');
const Unit = require('app/sdk/entities/unit');

export default class Stats {
  private static readonly damageMinBitLength = 0;
  private static readonly statMinBitLength = 0;

  private constructor(
    public damage: number,
    public attackBaseDelta: number,
    public attackBuff: number,
    public healthBaseDelta: number,
    public healthBuff: number,
  ) {}

  public static fromSpecString(specString: SpecString): Stats | null {
    const hasChanges = specString.readNBits(1) === 1;
    if (!hasChanges) {
      return new Stats(0, 0, 0, 0, 0);
    }
    const damage = specString.countZeroesAndReadNPlusBits(
      this.damageMinBitLength,
    );
    if (damage === null) {
      return null;
    }
    const hasStatChanges = specString.readNBits(1) === 1;
    if (!hasStatChanges) {
      return new Stats(damage, 0, 0, 0, 0);
    }
    const attackBaseDelta = this.readStat(specString);
    if (attackBaseDelta === null) {
      return null;
    }
    const attackBuff = this.readStat(specString);
    if (attackBuff === null) {
      return null;
    }
    const healthBaseDelta = this.readStat(specString);
    if (healthBaseDelta === null) {
      return null;
    }
    const healthBuff = this.readStat(specString);
    if (healthBuff === null) {
      return null;
    }
    return new Stats(
      damage,
      attackBaseDelta,
      attackBuff,
      healthBaseDelta,
      healthBuff,
    );
  }

  public static fromCard(unit: typeof Unit): Stats {
    const {
      damage,
      attackBase,
      attackBuff,
      healthBase,
      healthBuff,
    } = unit.getGameSession().getCardStats(unit);
    const attackBaseDelta = attackBase - unit.atk;
    const healthBaseDelta = healthBase - unit.maxHP;
    return new Stats(
      damage,
      attackBaseDelta,
      attackBuff,
      healthBaseDelta,
      healthBuff,
    );
  }

  public getCardStats(unit: typeof Unit): Partial<CardStats> {
    const stats: Partial<CardStats> = {};
    if (this.damage !== 0) {
      stats.damage = this.damage;
    }
    if (this.attackBaseDelta !== 0) {
      stats.attackBase = unit.atk + this.attackBaseDelta;
    }
    if (this.attackBuff !== 0) {
      stats.attackBuff = this.attackBuff;
    }
    if (this.healthBaseDelta !== 0) {
      stats.healthBase = unit.maxHP + this.healthBaseDelta;
    }
    if (this.healthBuff !== 0) {
      stats.healthBuff = this.healthBuff;
    }
    return stats;
  }

  public static updateCoder(
    coder: ArithmeticCoder,
    baseCard: BaseCard,
    {
      isHealthyProb,
      hasNoBuffsProb,
      hasBaseStatsProb,
    }: {
      isHealthyProb?: number,
      hasNoBuffsProb: number,
      hasBaseStatsProb: number,
    },
    stats: Stats | undefined,
  ): Stats {
    const defaultAttackBase = baseCard.card.atk;
    const attackBase = this.codeNonnegativeStat(
      coder,
      {
        defaultVal: defaultAttackBase,
        min: 0,
        isDefaultProb: hasBaseStatsProb,
      },
      getSum(stats?.attackBaseDelta, defaultAttackBase),
    );
    const defaultHealthBase = baseCard.card.maxHP;
    const healthBase = this.codeNonnegativeStat(
      coder,
      {
        defaultVal: defaultHealthBase,
        min: 1,
        isDefaultProb: hasBaseStatsProb,
      },
      getSum(stats?.healthBaseDelta, defaultHealthBase),
    );
    const attackBuff = this.codeStat(
      coder,
      { isDefaultProb: hasNoBuffsProb },
      stats?.attackBuff,
    );
    const healthBuff = this.codeStat(
      coder,
      { min: 1 - healthBase, isDefaultProb: hasNoBuffsProb },
      stats?.healthBuff,
    );
    const maxHP = healthBase + healthBuff;
    const damage = this.codeDamage(coder, maxHP, isHealthyProb, stats?.damage);
    return stats ?? new Stats(
      damage,
      attackBase - defaultAttackBase,
      attackBuff,
      healthBase - defaultHealthBase,
      healthBuff,
    );
  }

  public toString(): string {
    let str = '';
    const hasStatChanges =
      this.attackBaseDelta !== 0
      || this.attackBuff !== 0
      || this.healthBaseDelta !== 0
      || this.healthBuff !== 0;
    const hasChanges = this.damage !== 0 || hasStatChanges;
    str += SpecString.boolToBit(hasChanges);
    if (!hasChanges) {
      return str;
    }
    const damage = SpecString.padNumWithZeroesForCountingPastNMinBits(
      this.damage,
      Stats.damageMinBitLength,
    );
    str += `${damage}${SpecString.boolToBit(hasStatChanges)}`;
    if (!hasStatChanges) {
      return str;
    }
    return `\
${str}\
${Stats.writeStat(this.attackBaseDelta)}\
${Stats.writeStat(this.attackBuff)}\
${Stats.writeStat(this.healthBaseDelta)}\
${Stats.writeStat(this.healthBuff)}\
`;
  }

  private static readStat(specString: SpecString): number | null {
    const val = specString.countZeroesAndReadNPlusBits(this.statMinBitLength);
    if (val === null) {
      return null;
    }
    if (val === 0) {
      return 0;
    }
    if (val % 2 === 1) {
      return (val + 1) / 2;
    }
    return -val / 2;
  }

  private static writeStat(stat: number): string {
    return SpecString.padNumWithZeroesForCountingPastNMinBits(
      stat === 0 ? 0 : stat > 0 ? 2 * stat - 1 : -2 * stat,
      this.statMinBitLength,
    );
  }

  private static codeDamage(
    coder: ArithmeticCoder,
    maxHP: number,
    isHealthyProb: number | undefined,
    damage: number | undefined,
  ): number {
    const maxDamage = maxHP - 1;
    if (maxDamage === 0) {
      return 0;
    }
    if (isHealthyProb === undefined) {
      return getUniformNumberCoding(maxDamage + 1).updateCoder(coder, damage);
    }
    const isHealthyData = damage === undefined ? undefined : damage === 0;
    const isHealthy = getWeightedBooleanCoding(isHealthyProb)
      .updateCoder(coder, isHealthyData);
    if (isHealthy) {
      return 0;
    }
    return getUniformNumberCoding(maxDamage, 1).updateCoder(coder, damage);
  }

  private static codeStat(
    coder: ArithmeticCoder,
    {
      defaultVal = 0,
      min = -CONFIG.INFINITY,
      max = CONFIG.INFINITY,
      isDefaultProb,
    }: {
      defaultVal?: number,
      min?: number,
      max?: number,
      isDefaultProb: number,
    },
    stat: number | undefined,
  ): number {
    if (min < 0) {
      const isNegative = getWeightedBooleanCoding(1/256)
        .updateCoder(coder, getIsNegative(stat));
      if (isNegative) {
        return getUniformNumberCoding(-min, min).updateCoder(coder, stat);
      }
      min = 0;
    }
    return this.codeNonnegativeStat(
      coder,
      { defaultVal, min, max, isDefaultProb },
      stat,
    );
  }

  private static codeNonnegativeStat(
    coder: ArithmeticCoder,
    {
      defaultVal,
      min,
      max = CONFIG.INFINITY,
      isDefaultProb,
    }: {
      defaultVal: number,
      min: number,
      max?: number,
      isDefaultProb: number,
    },
    stat: number | undefined,
  ): number {
    const isDefault = getWeightedBooleanCoding(isDefaultProb)
      .updateCoder(coder, getEquals(stat, defaultVal));
    if (isDefault) {
      return defaultVal;
    }
    return getMultiUniformRangeNumberWithHoleCoding({
      hole: defaultVal,
      min,
      max,
      threshold: 13,
      prob: 1023/1024,
    }).updateCoder(coder, stat);
  }
}

function getSum(data: number | undefined, n: number): number | undefined {
  return data === undefined ? undefined : data + n;
}

function getEquals(data: number | undefined, n: number): boolean | undefined {
  return data === undefined ? undefined : data === n;
}

function getIsNegative(data: number | undefined): boolean | undefined {
  return data === undefined ? undefined : data < 0;
}
