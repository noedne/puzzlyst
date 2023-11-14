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
  Patch__0_2_6,
  Patch__0_2_7,
  Latest,
}

const patches = [
  {
    version: Version.Latest,
    changes: {
      [Cards.Artifact.MaskOfShadows]: 3,
      [Cards.Neutral.ArchonSpellbinder]: 3,
      [Cards.Spell.EntropicDecay]: 2,
      [Cards.Spell.CosmicFlesh]: 3,
      [Cards.Faction4.NightsorrowAssassin]: 2,
      [Cards.Spell.DarkTransformation]: 2,
      [Cards.Spell.Numb]: 3,
      [Cards.Faction6.SnowElemental]: 2,
      [Cards.Spell.PlasmaStorm]: 2,
    },
  },
  {
    version: Version.Patch__0_2_7,
    changes: {
      [Cards.Spell.DivineBond]: 1,
      [Cards.Artifact.MaskOfTranscendance]: 0,
      [Cards.Faction2.HamonBlademaster]: 1,
      [Cards.Faction2.OnyxBear]: 1,
      [Cards.Spell.CosmicFlesh]: 2,
      [Cards.Faction3.SandHowler]: 1,
      [Cards.Faction4.AbyssalJuggernaut]: 1,
      [Cards.Spell.PlasmaStorm]: 1,
      [Cards.Faction5.SilitharElder]: 1,
      [Cards.Spell.Numb]: 2,
      [Cards.Spell.SpiritoftheWild]: 1,
      [Cards.Neutral.PiercingMantis]: 1,
      [Cards.Neutral.WarTalon]: 1,
    },
  },
  {
    version: Version.Patch__0_2_6,
    changes: {
      [Cards.Artifact.MaskOfShadows]: 2,
      [Cards.Artifact.MaskOfTranscendance]: 1,
      [Cards.Faction3.NightfallMechanyst]: 1,
      [Cards.Spell.CosmicFlesh]: 1,
      [Cards.Spell.Blindscorch]: 1,
      [Cards.Spell.AurorasTears]: 1,
      [Cards.Artifact.SpectralBlade]: 1,
      [Cards.Faction4.NightsorrowAssassin]: 1,
      [Cards.Spell.DarkTransformation]: 1,
      [Cards.Artifact.TwinFang]: 1,
      [Cards.Faction5.Phalanxar]: 1,
      [Cards.Spell.Numb]: 1,
      [Cards.Faction6.SnowElemental]: 1,
      [Cards.Faction6.WolfRaven]: 1,
      [Cards.Faction6.AncientGrove]: 1,
      [Cards.Neutral.ProphetWhitePalm]: 1,
      [Cards.Neutral.KomodoCharger]: 1,
      [Cards.Neutral.SilhoutteTracer]: 1,
      [Cards.Neutral.GhostLynx]: 1,
      [Cards.Neutral.ArchonSpellbinder]: 2,
      [Cards.Neutral.Rook]: 1,
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
