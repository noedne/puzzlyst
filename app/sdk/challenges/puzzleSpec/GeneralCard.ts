import Modifier from "./Modifier";
import { extractPosition, type Position } from "./Position";
import type SpecString from "./SpecString";

enum Faction {
  Faction1 = '000',
  Faction2 = '001',
  Faction3 = '010',
  Faction4 = '011',
  Faction5 = '100',
  Faction6 = '101',
}

enum Id {
  General = '00',
  AltGeneral = '01',
  ThirdGeneral = '10',
  GrandmasterZir = '11',
}

export default class GeneralCard {
  static damageMinBitLength = 5;
  version;
  faction;
  id;
  position;
  damage;
  modifiers;

  constructor(
    version: number,
    faction: Faction,
    id: Id,
    position: Position,
    damage: number,
    modifiers: Modifier[],
  ) {
    this.version = version;
    this.faction = faction;
    this.id = id;
    this.position = position;
    this.damage = damage;
    this.modifiers = modifiers;
  }

  static fromSpecString(specString: SpecString): GeneralCard | null {
    const version = specString.countZeroes();
    if (version === null) {
      return null;
    }
    const faction = specString.matchRegex(/^(0[01]|10)[01]/) as Faction | null;
    if (faction === null) {
      return null;
    }
    const id = specString.matchRegex(/^[01][01]/) as Id | null;
    if (id === null) {
      return null;
    }
    const position = extractPosition(specString);
    if (position === null) {
      return null;
    }
    const damage = specString.countZeroesAndReadNPlusBits(this.damageMinBitLength);
    if (damage === null) {
      return null;
    }
    const modifiers = specString.extractList(Modifier.fromSpecString);
    if (modifiers === null) {
      return null;
    }
    return new GeneralCard(version, faction, id, position, damage, modifiers);
  }
}
