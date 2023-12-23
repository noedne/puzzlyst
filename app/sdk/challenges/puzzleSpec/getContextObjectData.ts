const Cards = require('app/sdk/cards/cardsLookupComplete');
const GameSession = require('app/sdk/gameSession');
const ModifierBandingDealDamageWatchDrawCard = require('app/sdk/modifiers/modifierBandingDealDamageWatchDrawCard');
const ModifierCannotAttackGeneral = require('app/sdk/modifiers/modifierCannotAttackGeneral');
const ModifierCannotMove = require('app/sdk/modifiers/modifierCannotMove');
const ModifierCannotStrikeback = require('app/sdk/modifiers/modifierCannotStrikeback');
const ModifierDealDamageWatchKillTarget = require('app/sdk/modifiers/modifierDealDamageWatchKillTarget');
const ModifierDeathWatchBuffSelf = require('app/sdk/modifiers/modifierDeathWatchBuffSelf');
const ModifierDyingWishDamageNearbyAllies = require('app/sdk/modifiers/modifierDyingWishDamageNearbyAllies');
const ModifierDyingWishSpawnEntity = require('app/sdk/modifiers/modifierDyingWishSpawnEntity');
const ModifierGrow = require('app/sdk/modifiers/modifierGrow');
const ModifierImmuneToDamage = require('app/sdk/modifiers/modifierImmuneToDamage');
const ModifierImmuneToSpellDamage = require('app/sdk/modifiers/modifierImmuneToSpellDamage');

export type ContextObject = {
  allowMultiple: boolean,
  contextObject: {
    cardId: number,
    durationIsUntilEndBeforeNextTurn?: boolean,
    durationIsUntilStartOfNextTurn?: boolean,
    indexOfContextObject: number,
    type: string,
  },
};

function getContextObjectData(cardId: number) {
  switch (cardId) {
    case Cards.Spell.LionheartBlessing:
      return [
        {
          allowMultiple: true,
          contextObject: ModifierBandingDealDamageWatchDrawCard
            .createContextObject(),
        },
      ];
    case Cards.Spell.DeathstrikeSeal:
      return [
        {
          allowMultiple: false,
          contextObject: ModifierDealDamageWatchKillTarget
            .createContextObject(),
        },
      ];
    case Cards.Spell.DrainMorale:
      return [
        {
          allowMultiple: false,
          contextObject: ModifierCannotMove.createContextObject(),
        },
      ];
    case Cards.Spell.CurseOfAgony:
      return [
        {
          allowMultiple: true,
          contextObject: ModifierDyingWishDamageNearbyAllies
            .createContextObject(3),
        },
      ];
    case Cards.Spell.DeathfireCrescendo:
      return [
        {
          allowMultiple: true,
          contextObject: ModifierDeathWatchBuffSelf.createContextObject(2,2),
        },
      ];
    case Cards.Spell.DampeningWave:
      return [
        {
          allowMultiple: false,
          contextObject: ModifierCannotStrikeback.createContextObject(),
        },
      ];
    case Cards.Spell.Amplification:
      return [
        {
          allowMultiple: true,
          contextObject: ModifierGrow.createContextObject(2),
        },
      ];
    case Cards.Artifact.Winterblade:
      return [
        {
          allowMultiple: false,
          contextObject: ModifierImmuneToDamage.createContextObject({
            durationIsUntilStartOfNextTurn: true,
          }),
        },
      ];
    case Cards.Spell.MarkOfSolitude:
      return [
        {
          allowMultiple: false,
          contextObject: ModifierCannotAttackGeneral.createContextObject(),
        },
      ];
    case Cards.Faction6.AncientGrove:
      return [
        {
          allowMultiple: false,
          contextObject: ModifierDyingWishSpawnEntity.createContextObject(
            {id: Cards.Faction6.Treant},
            "1/1 Treant with Provoke",
          ),
        },
      ];
    case Cards.Neutral.ProphetWhitePalm:
      return [
        {
          allowMultiple: false,
          contextObject: ModifierImmuneToSpellDamage.createContextObject({
            durationIsUntilEndBeforeNextTurn: true,
          }),
        },
      ];
    default:
      return [];
  }
}

export const contextObjectCardIds: number[] = [
  Cards.Spell.LionheartBlessing,
  Cards.Spell.DeathstrikeSeal,
  Cards.Spell.DrainMorale,
  Cards.Spell.CurseOfAgony,
  Cards.Spell.DeathfireCrescendo,
  Cards.Spell.DampeningWave,
  Cards.Spell.Amplification,
  Cards.Artifact.Winterblade,
  Cards.Spell.MarkOfSolitude,
  Cards.Faction6.AncientGrove,
  Cards.Neutral.ProphetWhitePalm,
];

export function getDescription({ contextObject }: ContextObject): string {
  let description = GameSession.current()
    .getModifierClassForType(contextObject.type)
    .getDescription(contextObject);
  if (
    contextObject.durationIsUntilEndBeforeNextTurn === true
    || contextObject.durationIsUntilStartOfNextTurn === true
  ) {
    description += ' until your next turn';
  }
  return description;
}

export default function getContextObjectDataWithIndex(
  cardId: number,
): ContextObject[] {
  return getContextObjectData(cardId).map(
    (data, indexOfContextObject) =>
    ({
      ...data,
      contextObject: {
        ...data.contextObject,
        cardId,
        indexOfContextObject,
      }
    }));
}
