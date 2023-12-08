const Cards = require('app/sdk/cards/cardsLookup');

import { artifacts, minions, spells, tiles } from "./cards/baseCardSet";

export function getCardVersion(identifier: number): number {
  for (const patch of patches) {
    const cardVersion = patch.changes[identifier];
    if (patch.version <= currentVersion && cardVersion != null) {
      return cardVersion;
    }
  }
  return 0;
}

export function getCardIds(): number[] {
  return artifacts.concat(minions, spells, tiles);
}

export function getArtifactIds(): number[] {
  return artifacts;
}

export function getMinionIds(): number[] {
  return minions;
}

export function getSpellIds(): number[] {
  return spells;
}

export function getTileIds(): number[] {
  return tiles;
}

export function getIsHurtingDamageTrueDamage(): boolean {
  return currentVersion < Version.Patch__0_2_7;
}

const currentVersion = Version.Latest;

const enum Version {
  Launch,
  Patch__0_2_3,
  Patch__0_2_5,
  Patch__0_2_6,
  Patch__0_2_7,
  Patch__0_2_8,
  Patch__0_2_9,
  Patch__0_2_12,
  Patch__0_2_14,
  Patch__0_2_15,
  Patch__0_2_16,
  Patch__0_2_18,
  Latest,
}

const patches = [
  {
    version: Version.Latest,
    changes: {
    },
  },
  {
    version: Version.Patch__0_2_18,
    changes: {
      [Cards.Faction6.SeismicElemental]: 1,
      [Cards.Neutral.CoiledCrawler]: 1,
      [Cards.Neutral.ZuraelTheLifegiver]: 1,
    },
  },
  {
    version: Version.Patch__0_2_16,
    changes: {
      [Cards.Spell.ConsumingRebirth]: 1,
      [Cards.Faction4.BlackSolus]: 2,
      [Cards.Spell.NetherSummoning]: 1,
      [Cards.Spell.AspectOfTheDrake]: 1,
      [Cards.Faction6.AzureDrake]: 1,
    },
  },
  {
    version: Version.Patch__0_2_15,
    changes: {
      [Cards.Spell.CosmicFlesh]: 3,
      [Cards.Spell.Amplification]: 1,
      [Cards.Faction5.SpiritHarvester]: 1,
      [Cards.Faction6.SnowElemental]: 3,
      [Cards.Neutral.ArchonSpellbinder]: 3,
    },
  },
  {
    version: Version.Patch__0_2_14,
    changes: {
      [Cards.Spell.AncestralDivination]: 0,
    },
  },
  {
    version: Version.Patch__0_2_12,
    changes: {
      [Cards.Faction1.Sunriser]: 1,
      [Cards.Spell.AncestralDivination]: 1,
      [Cards.Faction2.ChakriAvatar]: 1,
      [Cards.Spell.MarkOfSolitude]: 1,
      [Cards.Faction6.SnowElemental]: 2,
      [Cards.Neutral.GolemVanquisher]: 1,
      [Cards.Neutral.BlackSandBurrower]: 1,
      [Cards.Neutral.PrimusShieldmaster]: 1,
      [Cards.Neutral.AshMephyt]: 1,
    },
  },
  {
    version: Version.Patch__0_2_9,
    changes: {
      [Cards.Faction2.CelestialPhantom]: 1,
      [Cards.Faction3.PortalGuardian]: 1,
      [Cards.Artifact.PoisonHexblade]: 1,
      [Cards.Faction4.GloomChaser]: 1,
      [Cards.Faction4.BlackSolus]: 1,
      [Cards.Spell.EarthSphere]: 1,
      [Cards.Spell.BlazingSpines]: 1,
      [Cards.Faction6.BlazingSpines]: 1,
      [Cards.Spell.Numb]: 3,
      [Cards.Neutral.WhiteWidow]: 1,
    },
  },
  {
    version: Version.Patch__0_2_8,
    changes: {
      [Cards.Spell.SundropElixir]: 1,
      [Cards.Artifact.MaskOfShadows]: 3,
      [Cards.Spell.SiphonEnergy]: 1,
      [Cards.Spell.EntropicDecay]: 2,
      [Cards.Spell.VoidPulse]: 1,
      [Cards.Spell.SoulshatterPact]: 1,
      [Cards.Faction4.NightsorrowAssassin]: 2,
      [Cards.Spell.DarkTransformation]: 2,
      [Cards.Spell.PlasmaStorm]: 2,
      [Cards.Faction6.PrismaticGiant]: 1,
      [Cards.Faction6.IceDrake]: 1,
      [Cards.Faction6.ArcticRhyno]: 1,
      [Cards.Neutral.Jaxi]: 1,
      [Cards.Neutral.ThornNeedler]: 1,
      [Cards.Neutral.TwilightMage]: 1,
      [Cards.Neutral.JaxTruesight]: 1,
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
