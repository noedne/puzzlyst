const Cards = require('app/sdk/cards/cardsLookupComplete');

export const enum Group {
  Faction1 = '0000',
  Faction2 = '0001',
  Faction3 = '0010',
  Faction4 = '0011',
  Faction5 = '0100',
  Faction6 = '0101',
  Neutral = '10',
  Spell = '11',
  Artifact = '0110',
  Tile = '0111',
}

export function getIdMinBitLength(group: Group): number {
  switch (group) {
    case Group.Tile:
      return 0;
    case Group.Faction1:
    case Group.Faction2:
    case Group.Faction3:
    case Group.Faction4:
    case Group.Faction5:
    case Group.Artifact:
      return 3;
    case Group.Faction6:
      return 4;
    case Group.Neutral:
    case Group.Spell:
      return 6;
  }
}

export function getIdOffset(group: Group): number {
  switch (group) {
    case Group.Faction1:
      return Cards.Faction1.SilverguardSquire;
    case Group.Faction2:
      return Cards.Faction2.HeartSeeker;
    case Group.Faction3:
      return Cards.Faction3.WindShrike;
    case Group.Faction4:
      return Cards.Faction4.AbyssalCrawler;
    case Group.Faction5:
      return Cards.Faction5.EarthWalker;
    case Group.Faction6:
      return Cards.Faction6.FenrirWarmaster;
    case Group.Neutral:
      return Cards.Neutral.SpottedDragonlark;
    case Group.Spell:
      return Cards.Spell.SundropElixir;
    case Group.Artifact:
      return Cards.Artifact.IndomitableWill;
    case Group.Tile:
      return Cards.Tile.BonusMana;
  }
}
