import type { CardStats } from "../../gameSessionEditor";
import type ArithmeticCoder from "./arithmeticCoding/ArithmeticCoder";
import { getUniformNumberCoding, getWeightedBooleanCoding } from "./arithmeticCoding/utils";
import type BaseCard from "./BaseCard";
import SpecString from "./SpecString";

const Unit = require('app/sdk/entities/unit');

export default class Stats {
  private static readonly damageMinBitLength = 0;

  private constructor(
    public damage: number,
    public attackBaseDelta: number,
    public attackBuff: number,
    public healthBaseDelta: number,
    public healthBuff: number,
  ) {}

  public static fromSpecString(specString: SpecString): Stats | null {
    const damage = specString.countZeroesAndReadNPlusBits(
      this.damageMinBitLength,
    );
    if (damage === null) {
      return null;
    }
    const attackBaseDelta = 0;
    if (attackBaseDelta === null) {
      return null;
    }
    const attackBuff = 0;
    if (attackBuff === null) {
      return null;
    }
    const healthBaseDelta = 0;
    if (healthBaseDelta === null) {
      return null;
    }
    const healthBuff = 0;
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

  public static fromCard(unit: typeof Unit): Stats | null {
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
    const damage = SpecString.padNumWithZeroesForCountingPastNMinBits(
      this.damage,
      Stats.damageMinBitLength,
    );
    return `${damage}`;
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
