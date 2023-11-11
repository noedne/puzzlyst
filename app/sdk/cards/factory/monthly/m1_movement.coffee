# do not add this file to a package
# it is specifically parsed by the package generation script

CONFIG = require('app/common/config')
RSX = require('app/data/resources')

Cards = require 'app/sdk/cards/cardsLookupComplete'
Factions = require 'app/sdk/cards/factionsLookup'
Rarity = require 'app/sdk/cards/rarityLookup'

Unit = require 'app/sdk/entities/unit'

Modifier =           require 'app/sdk/modifiers/modifier'
ModifierFlying = require 'app/sdk/modifiers/modifierFlying'
ModifierMyMoveWatchApplyModifiers = require 'app/sdk/modifiers/modifierMyMoveWatchApplyModifiers'
ModifierEndTurnWatchSpawnEntity = require 'app/sdk/modifiers/modifierEndTurnWatchSpawnEntity'
ModifierOpeningGambitGainHighestAttack = require 'app/sdk/modifiers/modifierOpeningGambitGainHighestAttack'
ModifierOpeningGambitApplyPlayerModifiers = require 'app/sdk/modifiers/modifierOpeningGambitApplyPlayerModifiers'

PlayerModifierCardDrawModifier = require 'app/sdk/playerModifiers/playerModifierCardDrawModifier'

i18next = require 'i18next'
if i18next.t() is undefined
  i18next.t = (text) ->
    return text

class CardFactory_Monthly_M1_Movement

  ###*
   * Returns a card that matches the identifier.
   * @param {Number|String} identifier
   * @param {GameSession} gameSession
   * @returns {Card}
   ###
  @cardForIdentifier: (identifier,gameSession) ->
    card = null

    if (identifier == Cards.Neutral.BlackLocust)
      card = new Unit(gameSession)
      card.factionId = Factions.Neutral
      card.name = i18next.t("cards.neutral_black_locust_name")
      card.setDescription(i18next.t("cards.neutral_black_locust_desc"))
      card.setFXResource(["FX.Cards.Neutral.BlackLocust"])
      card.setBaseSoundResource(
        apply : RSX.sfx_summonlegendary.audio
        walk : RSX.sfx_neutral_zurael_death.audio
        attack : RSX.sfx_neutral_stormatha_attack_swing.audio
        receiveDamage :  RSX.sfx_neutral_stormatha_hit.audio
        attackDamage : RSX.sfx_neutral_stormatha_attack_impact.audio
        death : RSX.sfx_neutral_stormatha_death.audio
      )
      card.setBaseAnimResource(
        breathing : RSX.neutralBlackLocustBreathing.name
        idle : RSX.neutralBlackLocustIdle.name
        walk : RSX.neutralBlackLocustRun.name
        attack : RSX.neutralBlackLocustAttack.name
        attackReleaseDelay: 0.0
        attackDelay: 1.2
        damage : RSX.neutralBlackLocustHit.name
        death : RSX.neutralBlackLocustDeath.name
      )
      card.atk = 2
      card.maxHP = 1
      card.manaCost = 4
      card.rarityId = Rarity.Legendary
      card.setInherentModifiersContextObjects([
        ModifierFlying.createContextObject(),
        ModifierEndTurnWatchSpawnEntity.createContextObject(
          { id: Cards.Neutral.BlackLocust },
          "Black Locust",
          1,
          CONFIG.PATTERN_3x3,
          true,
        ),
      ])

    if (identifier == Cards.Neutral.WindRunner)
      card = new Unit(gameSession)
      card.setIsLegacy(true)
      card.factionId = Factions.Neutral
      card.name = i18next.t("cards.neutral_wind_runner_name")
      card.setDescription(i18next.t("cards.neutral_wind_runner_desc"))
      card.setFXResource(["FX.Cards.Neutral.WindRunner"])
      card.setBaseSoundResource(
        apply : RSX.sfx_spell_nethersummoning.audio
        walk : RSX.sfx_neutral_ubo_attack_swing.audio
        attack : RSX.sfx_neutral_ubo_attack_swing.audio
        receiveDamage : RSX.sfx_neutral_gro_hit.audio
        attackDamage : RSX.sfx_neutral_ubo_attack_impact.audio
        death : RSX.sfx_neutral_amu_death.audio
      )
      card.setBaseAnimResource(
        breathing : RSX.neutralWindRunnerBreathing.name
        idle : RSX.neutralWindRunnerIdle.name
        walk : RSX.neutralWindRunnerRun.name
        attack : RSX.neutralWindRunnerAttack.name
        attackReleaseDelay: 0.0
        attackDelay: 0.7
        damage : RSX.neutralWindRunnerHit.name
        death : RSX.neutralWindRunnerDeath.name
      )
      card.atk = 3
      card.maxHP = 3
      card.manaCost = 3
      card.rarityId = Rarity.Epic
      statContextObject = Modifier.createContextObjectWithAttributeBuffs(1,1)
      statContextObject.appliedName = i18next.t("modifiers.neutral_wind_runner_modifier")
      card.setInherentModifiersContextObjects([
        ModifierMyMoveWatchApplyModifiers.createContextObject([statContextObject], false, true, false, 1, false, "After this minion moves, give all friendly minions around it +1/+1")
      ])

    if (identifier == Cards.Neutral.Mogwai)
      card = new Unit(gameSession)
      card.setIsLegacy(true)
      card.factionId = Factions.Neutral
      card.name = i18next.t("cards.neutral_mogwai_name")
      card.setDescription(i18next.t("cards.neutral_mogwai_desc"))
      card.setFXResource(["FX.Cards.Neutral.Mogwai"])
      card.setBaseSoundResource(
        apply : RSX.sfx_spell_diretidefrenzy.audio
        walk : RSX.sfx_neutral_sai_attack_impact.audio
        attack : RSX.sfx_neutral_sai_attack_swing.audio
        receiveDamage : RSX.sfx_neutral_gro_hit.audio
        attackDamage : RSX.sfx_neutral_sai_attack_impact.audio
        death : RSX.sfx_neutral_yun_death.audio
      )
      card.setBaseAnimResource(
        breathing : RSX.neutralMogwaiBreathing.name
        idle : RSX.neutralMogwaiIdle.name
        walk : RSX.neutralMogwaiRun.name
        attack : RSX.neutralMogwaiAttack.name
        attackReleaseDelay: 0.0
        attackDelay: 0.9
        damage : RSX.neutralMogwaiHit.name
        death : RSX.neutralMogwaiDeath.name
      )
      card.atk = 0
      card.maxHP = 5
      card.manaCost = 3
      card.rarityId = Rarity.Epic
      card.setInherentModifiersContextObjects([
        ModifierOpeningGambitGainHighestAttack.createContextObject(
          i18next.t("modifiers.neutral_mogwai_modifier")
        )
      ])

    if (identifier == Cards.Neutral.GhostLynx)
      card = new Unit(gameSession)
      card.factionId = Factions.Neutral
      card.name = i18next.t("cards.neutral_ghost_lynx_name")
      card.setDescription(i18next.t("cards.neutral_ghost_lynx_desc"))
      card.setFXResource(["FX.Cards.Neutral.GhostLynx"])
      card.setBaseSoundResource(
        apply : RSX.sfx_spell_diretidefrenzy.audio
        walk : RSX.sfx_neutral_grimrock_hit.audio
        attack : RSX.sfx_neutral_xho_attack_swing.audio
        receiveDamage : RSX.sfx_neutral_xho_hit.audio
        attackDamage : RSX.sfx_neutral_xho_attack_impact.audio
        death : RSX.sfx_neutral_xho_death.audio
      )
      card.setBaseAnimResource(
        breathing : RSX.neutralGhostLynxBreathing.name
        idle : RSX.neutralGhostLynxIdle.name
        walk : RSX.neutralGhostLynxRun.name
        attack : RSX.neutralGhostLynxAttack.name
        attackReleaseDelay: 0.0
        attackDelay: 0.9
        damage : RSX.neutralGhostLynxHit.name
        death : RSX.neutralGhostLynxDeath.name
      )
      card.atk = 1
      card.maxHP = 3
      card.manaCost = 2
      card.rarityId = Rarity.Common
      card.setInherentModifiersContextObjects([
        ModifierOpeningGambitApplyPlayerModifiers.createContextObjectToTargetOwnPlayer(
          [PlayerModifierCardDrawModifier.createContextObject(1, 1)]
        )
      ])

    return card

module.exports = CardFactory_Monthly_M1_Movement
