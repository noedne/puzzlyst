const Cards = require('app/sdk/cards/cardsLookup');

export function getCardVersion(identifier: number): number {
  for (const patch of patches) {
    const cardVersion = patch.changes[identifier];
    if (patch.version <= currentVersion && cardVersion != null) {
      return cardVersion;
    }
  }
  return 0;
}

const currentVersion = Version.Latest;

const enum Version {
  Launch,
  Patch__0_2_3,
  Patch__0_2_5,
  Latest,
}

const patches = [
  {
    version: Version.Latest,
    changes: {
      [Cards.Artifact.MaskOfShadows]: 2,
      [Cards.Neutral.ArchonSpellbinder]: 2,
      [Cards.Spell.EntropicDecay]: 2,
    },
  },
  {
    version: Version.Patch__0_2_5,
    changes: {
      [Cards.Faction1.SunstoneTemplar]: 1,
      [Cards.Faction2.KaidoAssassin]: 1,
      [Cards.Faction2.JadeOgre]: 1,
      [Cards.Spell.EntropicDecay]: 1,
      [Cards.Spell.GreaterFortitude]: 1,
      [Cards.Faction5.PrimordialGazer]: 1,
      [Cards.Faction5.Vindicator]: 2,
      [Cards.Faction5.Elucidator]: 1,
      [Cards.Neutral.FireSpitter]: 1,
      [Cards.Neutral.WindStopper]: 1,
    },
  },
  {
    version: Version.Patch__0_2_3,
    changes: {
      [Cards.Artifact.MaskOfBloodLeech]: 1,
      [Cards.Faction2.TuskBoar]: 1,
      [Cards.Artifact.MaskOfShadows]: 1,
      [Cards.Spell.TwinStrike]: 1,
      [Cards.Faction5.Vindicator]: 1,
      [Cards.Faction6.FenrirWarmaster]: 1,
      [Cards.Faction6.GhostWolf]: 1,
      [Cards.Neutral.LadyLocke]: 1,
      [Cards.Neutral.SunElemental]: 1,
      [Cards.Neutral.ArchonSpellbinder]: 1,
    },
  },
];
