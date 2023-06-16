import Modifier from "./Modifier";
import { extractPosition, type Position } from "./Position";
import type SpecString from "./SpecString";

const Card = require('app/sdk/cards/cardsLookup');

export default class GeneralCard {
  static damageMinBitLength = 5;

  constructor(
    public version: number,
    public faction: Faction,
    public general: General,
    public position: Position,
    public damage: number,
    public modifiers: Modifier[],
  ) {
    this.version = version;
    this.faction = faction;
    this.general = general;
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
    const general = specString.matchRegex(/^[01][01]/) as General | null;
    if (general === null) {
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
    return new GeneralCard(version, faction, general, position, damage, modifiers);
  }

  getCardId(): number {
    return Card[this.getGroupName()][this.getGeneralName()];
  }

  getGroupName(): string {
    if (this.general === General.GrandmasterZir) {
      return 'Neutral';
    }
    switch (this.faction) {
      case Faction.Faction1:
        return 'Faction1';
      case Faction.Faction2:
        return 'Faction2';
      case Faction.Faction3:
        return 'Faction3';
      case Faction.Faction4:
        return 'Faction4';
      case Faction.Faction5:
        return 'Faction5';
      case Faction.Faction6:
        return 'Faction6';
    }
  }

  getGeneralName(): string {
    switch (this.general) {
      case General.General:
        return 'General';
      case General.AltGeneral:
        return 'AltGeneral';
      case General.ThirdGeneral:
        return 'ThirdGeneral';
      case General.GrandmasterZir:
        return 'GrandmasterZir';
    }
  }
}

const enum Faction {
  Faction1 = '000',
  Faction2 = '001',
  Faction3 = '010',
  Faction4 = '011',
  Faction5 = '100',
  Faction6 = '101',
}

const enum General {
  General = '00',
  AltGeneral = '01',
  ThirdGeneral = '10',
  GrandmasterZir = '11',
}
