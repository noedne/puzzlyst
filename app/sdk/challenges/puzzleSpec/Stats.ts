import type { CardStats } from "../../gameSessionEditor";
import type ArithmeticCoder from "./arithmeticCoding/ArithmeticCoder";
import { getUniformNumberCoding, getWeightedBooleanCoding } from "./arithmeticCoding/utils";
import type BaseCard from "./BaseCard";
import SpecString from "./SpecString";

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
    healthyProb: number | null,
    stats: Stats | undefined,
  ): Stats {
    const damage = this.codeDamage(coder, baseCard, healthyProb, stats?.damage);
    const attackBaseDelta = 0;
    const attackBuff = 0;
    const healthBaseDelta = 0;
    const healthBuff = 0;
    return stats ?? new Stats(
      damage,
      attackBaseDelta,
      attackBuff,
      healthBaseDelta,
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
    baseCard: BaseCard,
    healthyProb: number | null,
    damage: number | undefined,
  ): number {
    const maxDamage = baseCard.card.maxHP - 1;
    if (maxDamage === 0) {
      return 0;
    }
    if (healthyProb === null) {
      return getUniformNumberCoding(maxDamage + 1).updateCoder(coder, damage);
    }
    const isHealthyData = damage === undefined ? undefined : damage === 0;
    const isHealthy = getWeightedBooleanCoding(healthyProb)
      .updateCoder(coder, isHealthyData);
    if (isHealthy) {
      return 0;
    }
    return getUniformNumberCoding(maxDamage, 1).updateCoder(coder, damage);
  }
}
