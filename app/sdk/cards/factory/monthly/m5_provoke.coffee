# do not add this file to a package
# it is specifically parsed by the package generation script

RSX = require('app/data/resources')

Cards = require 'app/sdk/cards/cardsLookupComplete'
Factions = require 'app/sdk/cards/factionsLookup'
Rarity = require 'app/sdk/cards/rarityLookup'

Unit = require 'app/sdk/entities/unit'

ModifierProvoke =       require 'app/sdk/modifiers/modifierProvoke'
ModifierFrenzy =     require 'app/sdk/modifiers/modifierFrenzy'
ModifierEndTurnWatchDamageNearbyEnemy = require 'app/sdk/modifiers/modifierEndTurnWatchDamageNearbyEnemy'
ModifierOpeningGambitApplyModifiers = require 'app/sdk/modifiers/modifierOpeningGambitApplyModifiers'
ModifierOpeningGambitRefreshManaTiles = require 'app/sdk/modifiers/modifierOpeningGambitRefreshManaTiles'
ModifierWarTalon = require 'app/sdk/modifiers/modifierWarTalon'

i18next = require 'i18next'
if i18next.t() is undefined
  i18next.t = (text) ->
    return text

class CardFactory_Monthly_M5_Provoke

  ###*
   * Returns a card that matches the identifier.
   * @param {Number|String} identifier
   * @param {GameSession} gameSession
   * @param {Number} version
   * @returns {Card}
   ###
  @cardForIdentifier: (identifier,gameSession,version) ->
    card = null

    if (identifier == Cards.Neutral.Bonereaper)
      card = new Unit(gameSession)
      card.factionId = Factions.Neutral
      card.name = i18next.t("cards.neutral_bonereaper_name")
      card.setDescription(i18next.t("cards.neutral_bonereaper_desc"))
      card.setFXResource(["FX.Cards.Neutral.Bonereaper"])
      card.setBoundingBoxWidth(75)
      card.setBoundingBoxHeight(110)
      card.setBaseSoundResource(
        apply : RSX.sfx_spell_shadownova.audio
        walk : RSX.sfx_neutral_sai_attack_impact.audio
        attack : RSX.sfx_f4_blacksolus_attack_swing.audio
        receiveDamage : RSX.sfx_f4_blacksolus_hit.audio
        attackDamage : RSX.sfx_f4_blacksolus_attack_impact.audio
        death : RSX.sfx_neutral_yun_death.audio
      )
      card.setBaseAnimResource(
        breathing : RSX.neutralBonereaperBreathing.name
        idle : RSX.neutralBonereaperIdle.name
        walk : RSX.neutralBonereaperRun.name
        attack : RSX.neutralBonereaperAttack.name
        attackReleaseDelay: 0.0
        attackDelay: 1.2
        damage : RSX.neutralBonereaperHit.name
        death : RSX.neutralBonereaperDeath.name
      )
      card.setInherentModifiersContextObjects([
        ModifierProvoke.createContextObject(),
        ModifierEndTurnWatchDamageNearbyEnemy.createContextObject(2,false),
      ])
      card.atk = 2
      card.maxHP = 10
      card.manaCost = 6
      card.rarityId = Rarity.Epic

    if (identifier == Cards.Neutral.HollowGrovekeeper)
      card = new Unit(gameSession)
      card.factionId = Factions.Neutral
      card.name = i18next.t("cards.neutral_hollow_grovekeeper_name")
      card.setDescription(i18next.t("cards.neutral_hollow_grovekeeper_desc"))
      card.setFXResource(["FX.Cards.Neutral.HollowGrovekeeper"])
      card.setBoundingBoxWidth(90)
      card.setBoundingBoxHeight(90)
      card.setBaseSoundResource(
        apply : RSX.sfx_summonlegendary.audio
        walk : RSX.sfx_neutral_arakiheadhunter_hit.audio
        attack : RSX.sfx_neutral_arakiheadhunter_attack_swing.audio
        receiveDamage : RSX.sfx_neutral_arakiheadhunter_hit.audio
        attackDamage : RSX.sfx_neutral_arakiheadhunter_impact.audio
        death : RSX.sfx_neutral_arakiheadhunter_death.audio
      )
      card.setBaseAnimResource(
        breathing : RSX.neutralHollowGrovekeeperBreathing.name
        idle : RSX.neutralHollowGrovekeeperIdle.name
        walk : RSX.neutralHollowGrovekeeperRun.name
        attack : RSX.neutralHollowGrovekeeperAttack.name
        attackReleaseDelay: 0.0
        attackDelay: 1.2
        damage : RSX.neutralHollowGrovekeeperHit.name
        death : RSX.neutralHollowGrovekeeperDeath.name
      )
      card.atk = 5
      card.maxHP = 4
      card.manaCost = 4
      card.rarityId = Rarity.Epic
      card.setInherentModifiersContextObjects([
        ModifierFrenzy.createContextObject(),
        ModifierOpeningGambitApplyModifiers.createContextObjectForNearbyAllies(
          [ModifierProvoke.createContextObject()],
          false,
        ),
      ])

    if (identifier == Cards.Neutral.Tethermancer)
      card = new Unit(gameSession)
      card.factionId = Factions.Neutral
      card.name = i18next.t("cards.neutral_tethermancer_name")
      card.setDescription(i18next.t("cards.neutral_tethermancer_desc"))
      card.setFXResource(["FX.Cards.Neutral.Tethermancer"])
      card.setBoundingBoxWidth(70)
      card.setBoundingBoxHeight(90)
      card.setBaseSoundResource(
        apply : RSX.sfx_spell_diretidefrenzy.audio
        walk : RSX.sfx_neutral_ubo_attack_swing.audio
        attack : RSX.sfx_neutral_spiritscribe_attack_swing.audio
        receiveDamage : RSX.sfx_neutral_spiritscribe_hit.audio
        attackDamage : RSX.sfx_neutral_spiritscribe_impact.audio
        death : RSX.sfx_neutral_spiritscribe_death.audio
      )
      card.setBaseAnimResource(
        breathing : RSX.neutralTethermancerBreathing.name
        idle : RSX.neutralTethermancerIdle.name
        walk : RSX.neutralTethermancerRun.name
        attack : RSX.neutralTethermancerAttack.name
        attackReleaseDelay: 0.0
        attackDelay: 1.2
        damage : RSX.neutralTethermancerHit.name
        death : RSX.neutralTethermancerDeath.name
      )
      card.atk = 2
      card.maxHP = 6
      card.manaCost = 4
      card.rarityId = Rarity.Rare
      card.setInherentModifiersContextObjects([
        ModifierOpeningGambitRefreshManaTiles.createContextObject()
      ])

    if (identifier == Cards.Neutral.WarTalon)
      card = new Unit(gameSession)
      card.factionId = Factions.Neutral
      card.name = i18next.t("cards.neutral_war_talon_name")
      card.setDescription(i18next.t("cards.neutral_war_talon_desc"))
      card.setFXResource(["FX.Cards.Neutral.WarTalon"])
      card.setBoundingBoxWidth(80)
      card.setBoundingBoxHeight(95)
      card.setBaseSoundResource(
        apply : RSX.sfx_spell_ghostlightning.audio
        walk : RSX.sfx_neutral_sai_attack_impact.audio
        attack : RSX.sfx_neutral_redsynja_attack_swing.audio
        receiveDamage : RSX.sfx_neutral_redsynja_hit.audio
        attackDamage : RSX.sfx_neutral_redsynja_attack_impact.audio
        death : RSX.sfx_neutral_cannonmechaz0r_death.audio
      )
      card.setBaseAnimResource(
        breathing : RSX.neutralWarTalonBreathing.name
        idle : RSX.neutralWarTalonIdle.name
        walk : RSX.neutralWarTalonRun.name
        attack : RSX.neutralWarTalonAttack.name
        attackReleaseDelay: 0.0
        attackDelay: 1.2
        damage : RSX.neutralWarTalonHit.name
        death : RSX.neutralWarTalonDeath.name
      )
      card.atk = 8
      card.maxHP = 6
      card.manaCost = 6
      card.setInherentModifiersContextObjects(
        [ModifierWarTalon.createContextObject()]
      )
      card.rarityId = Rarity.Epic

    return card

module.exports = CardFactory_Monthly_M5_Provoke
