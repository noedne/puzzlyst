const Cards = require('app/sdk/cards/cardsLookupComplete');
const Factions = require('app/sdk/cards/factionsLookup');
const Unit = require('app/sdk/entities/unit');
import type ArithmeticCoder from "./arithmeticCoding/ArithmeticCoder";
import { getUniformArrayCoding, getWeightedArrayCoding } from "./arithmeticCoding/utils";
import BaseCard from "./BaseCard";
import List from "./List";
import Modifier from "./Modifier";
import {
  fromCard as getPositionFromCard,
  fromSpecString as extractPositionFromSpecString,
  type Position,
  toString as positionToString,
} from "./Position";
import PositionableType from "./PositionableType";
import type PositionCoder from "./PositionCoder";
import type SpecString from "./SpecString";
import Stats from "./Stats";

export default class GeneralCard {
  constructor(
    public cardId: number,
    public position: Position,
    public stats: Stats,
    public modifiers: List<Modifier>,
    private faction: Faction,
    private general: General,
  ) {}

  static fromSpecString(specString: SpecString): GeneralCard | null {
    const faction = specString.matchRegex(/^(0[01]|10)[01]/) as Faction | null;
    if (faction === null) {
      return null;
    }
    const general = specString.matchRegex(/^[01][01]/) as General | null;
    if (general === null) {
      return null;
    }
    const position = extractPositionFromSpecString(specString);
    if (position === null) {
      return null;
    }
    const stats = Stats.fromSpecString(specString);
    if (stats === null) {
      return null;
    }
    const modifiers = List.fromSpecString(Modifier, specString);
    if (modifiers === null) {
      return null;
    }
    return new GeneralCard(
      GeneralCard.getCardId(faction, general),
      position,
      stats,
      modifiers,
      faction,
      general,
    );
  }

  static fromUnit(unit: typeof Unit): GeneralCard {
    const stats = Stats.fromCard(unit);
    const faction = GeneralCard.getFaction(unit);
    const general = GeneralCard.getGeneral(unit, faction);
    return new GeneralCard(
      unit.getId(),
      getPositionFromCard(unit),
      stats,
      Modifier.fromCard(unit),
      faction ?? Faction.Faction1,
      general,
    );
  }

  static updateCoder(
    coder: ArithmeticCoder,
    generalCard: GeneralCard | undefined,
    positionCoder: PositionCoder,
  ): GeneralCard {
    const general = getGeneralCoding().updateCoder(coder, generalCard?.general);
    const faction = general === General.GrandmasterZir
      ? Faction.Faction1
      : getFactionCoding().updateCoder(coder, generalCard?.faction);
    const cardId = GeneralCard.getCardId(faction, general);
    const position = positionCoder.updateCoder(
      coder,
      generalCard?.position,
      PositionableType.Unit,
    );
    const baseCard = BaseCard.fromCardId(cardId);
    const probs = { hasNoBuffsProb: 1023/1024, hasBaseStatsProb: 8191/8192 };
    const stats = Stats.updateCoder(coder, baseCard, probs, generalCard?.stats);
    const modifiers = Modifier.updateListCoder(
      coder,
      generalCard?.modifiers,
      true,
    );
    return generalCard ?? new GeneralCard(
      cardId,
      position,
      stats,
      modifiers,
      faction,
      general,
    );
  }

  toString(): string {
    const position = positionToString(this.position);
    const modifiers = this.modifiers.toString();
    return `${this.faction}${this.general}${position}${this.stats}${modifiers}`;
  }

  private static getCardId(faction: Faction, general: General): number {
    const groupName = GeneralCard.getGroupName(faction, general);
    const generalName = GeneralCard.getGeneralName(general);
    return Cards[groupName][generalName];
  }

  private static getGroupName(
    faction: Faction,
    general: General | null = null,
  ): string {
    if (general === General.GrandmasterZir) {
      return 'Faction1';
    }
    switch (faction) {
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

  private static getGeneralName(general: General): string {
    switch (general) {
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

  private static getFaction(unit: typeof Unit): Faction | null {
    switch (unit.getFactionId()) {
      case Factions.Faction1:
        return Faction.Faction1;
      case Factions.Faction2:
        return Faction.Faction2;
      case Factions.Faction3:
        return Faction.Faction3;
      case Factions.Faction4:
        return Faction.Faction4;
      case Factions.Faction5:
        return Faction.Faction5;
      case Factions.Faction6:
        return Faction.Faction6;
      default:
        return null;
    }
  }

  private static getGeneral(
    unit: typeof Unit,
    faction: Faction | null,
  ): General {
    if (faction === null) {
      return General.GrandmasterZir;
    }
    const group = Cards[GeneralCard.getGroupName(faction)];
    switch (unit.getId()) {
      case group.General:
        return General.General;
      case group.AltGeneral:
        return General.AltGeneral;
      case group.ThirdGeneral:
        return General.ThirdGeneral;
      default:
        return General.GrandmasterZir;
    }
  }
}

function getFactionCoding() {
  return getUniformArrayCoding([
    Faction.Faction1,
    Faction.Faction2,
    Faction.Faction3,
    Faction.Faction4,
    Faction.Faction5,
    Faction.Faction6,
  ]);
}

function getGeneralCoding() {
  return getWeightedArrayCoding(
    [
      General.General,
      General.AltGeneral,
      General.ThirdGeneral,
      General.GrandmasterZir,
    ],
    [21/64, 21/64, 21/64],
  );
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
