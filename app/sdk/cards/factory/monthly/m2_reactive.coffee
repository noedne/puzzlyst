# do not add this file to a package
# it is specifically parsed by the package generation script

_ = require 'underscore'
moment = require 'moment'

Logger = require 'app/common/logger'

CONFIG = require('app/common/config')
RSX = require('app/data/resources')

Card = require 'app/sdk/cards/card'
Cards = require 'app/sdk/cards/cardsLookupComplete'
CardType = require 'app/sdk/cards/cardType'
Factions = require 'app/sdk/cards/factionsLookup'
FactionFactory = require 'app/sdk/cards/factionFactory'
Races = require 'app/sdk/cards/racesLookup'
Rarity = require 'app/sdk/cards/rarityLookup'

Unit = require 'app/sdk/entities/unit'

ModifierFirstBlood =     require 'app/sdk/modifiers/modifierFirstBlood'
ModifierSpellWatchSpawnEntity = require 'app/sdk/modifiers/modifierSpellWatchSpawnEntity'
ModifierSpiritScribe = require 'app/sdk/modifiers/modifierSpiritScribe'
ModifierTakeDamageWatchSpawnRandomToken = require 'app/sdk/modifiers/modifierTakeDamageWatchSpawnRandomToken'
ModifierToken = require 'app/sdk/modifiers/modifierToken'
ModifierTranscendance = require 'app/sdk/modifiers/modifierTranscendance'
ModifierFlying = require 'app/sdk/modifiers/modifierFlying'
ModifierFrenzy = require 'app/sdk/modifiers/modifierFrenzy'
ModifierProvoke = require 'app/sdk/modifiers/modifierProvoke'
ModifierRanged = require 'app/sdk/modifiers/modifierRanged'
ModifierDyingWishSpawnEntity = require 'app/sdk/modifiers/modifierDyingWishSpawnEntity'

i18next = require 'i18next'
if i18next.t() is undefined
  i18next.t = (text) ->
    return text

class CardFactory_Monthly_M2_Reactive

  ###*
   * Returns a card that matches the identifier.
   * @param {Number|String} identifier
   * @param {GameSession} gameSession
   * @returns {Card}
   ###
  @cardForIdentifier: (identifier,gameSession) ->
    card = null

    if (identifier == Cards.Neutral.Grailmaster)
      card = new Unit(gameSession)
      card.factionId = Factions.Neutral
      card.name = i18next.t("cards.neutral_grailmaster_name")
      card.setDescription(i18next.t("cards.neutral_grailmaster_desc"))
      card.setFXResource(["FX.Cards.Neutral.Grailmaster"])
      card.setBoundingBoxWidth(100)
      card.setBoundingBoxHeight(105)
      card.setBaseSoundResource(
        apply : RSX.sfx_spell_diretidefrenzy.audio
        walk : RSX.sfx_neutral_sai_attack_impact.audio
        attack : RSX.sfx_neutral_spiritscribe_attack_swing.audio
        receiveDamage : RSX.sfx_neutral_spiritscribe_hit.audio
        attackDamage : RSX.sfx_neutral_spiritscribe_impact.audio
        death : RSX.sfx_neutral_spiritscribe_death.audio
      )
      card.setBaseAnimResource(
        breathing : RSX.neutralSpiritscribeBreathing.name
        idle : RSX.neutralSpiritscribeIdle.name
        walk : RSX.neutralSpiritscribeRun.name
        attack : RSX.neutralSpiritscribeAttack.name
        attackReleaseDelay: 0.0
        attackDelay: 0.9
        damage : RSX.neutralSpiritscribeHit.name
        death : RSX.neutralSpiritscribeDeath.name
      )
      card.atk = 7
      card.maxHP = 7
      card.manaCost = 7
      card.rarityId = Rarity.Epic
      card.setInherentModifiersContextObjects([
        ModifierSpiritScribe.createContextObject()
      ])
      card.addKeywordClassToInclude(ModifierTranscendance)
      card.addKeywordClassToInclude(ModifierFlying)
      card.addKeywordClassToInclude(ModifierFrenzy)
      card.addKeywordClassToInclude(ModifierProvoke)
      card.addKeywordClassToInclude(ModifierRanged)

    if (identifier == Cards.Neutral.Firestarter)
      card = new Unit(gameSession)
      card.factionId = Factions.Neutral
      card.raceId = Races.Arcanyst
      card.name = i18next.t("cards.neutral_firestarter_name")
      card.setDescription(i18next.t("cards.neutral_firestarter_desc"))
      card.setFXResource(["FX.Cards.Neutral.Firestarter"])
      card.setBoundingBoxWidth(85)
      card.setBoundingBoxHeight(110)
      card.setBaseSoundResource(
        apply : RSX.sfx_spell_blindscorch.audio
        walk : RSX.sfx_neutral_firestarter_impact.audio
        attack :  RSX.sfx_neutral_firestarter_attack_swing.audio
        receiveDamage : RSX.sfx_neutral_firestarter_hit.audio
        attackDamage : RSX.sfx_neutral_firestarter_impact.audio
        death : RSX.sfx_neutral_firestarter_death.audio
      )
      card.setBaseAnimResource(
        breathing : RSX.neutralFirestarterBreathing.name
        idle : RSX.neutralFirestarterIdle.name
        walk : RSX.neutralFirestarterRun.name
        attack : RSX.neutralFirestarterAttack.name
        attackReleaseDelay: 0.0
        attackDelay: 1.1
        damage : RSX.neutralFirestarterHit.name
        death : RSX.neutralFirestarterDeath.name
      )
      card.atk = 3
      card.maxHP = 6
      card.manaCost = 5
      card.rarityId = Rarity.Epic
      card.addKeywordClassToInclude(ModifierFirstBlood)
      card.setInherentModifiersContextObjects([ModifierSpellWatchSpawnEntity.createContextObject({id: Cards.Neutral.Spellspark}, "1/1 Spellspark with Rush")])

    if (identifier == Cards.Neutral.Spellspark)
      card = new Unit(gameSession)
      card.factionId = Factions.Neutral
      card.setIsHiddenInCollection(true)
      card.name = i18next.t("cards.neutral_spellspark_name")
      card.setDescription(i18next.t("cards.neutral_spellspark_desc"))
      card.setFXResource(["FX.Cards.Neutral.Spellspark"])
      card.setBaseSoundResource(
        apply : RSX.sfx_unit_deploy_1.audio
        walk : RSX.sfx_singe2.audio
        attack : RSX.sfx_neutral_firespitter_attack_swing.audio
        receiveDamage : RSX.sfx_neutral_firespitter_hit.audio
        attackDamage : RSX.sfx_neutral_firespitter_attack_impact.audio
        death : RSX.sfx_neutral_firespitter_death.audio
      )
      card.setBaseAnimResource(
        breathing : RSX.neutralSpellsparkBreathing.name
        idle : RSX.neutralSpellsparkIdle.name
        walk : RSX.neutralSpellsparkRun.name
        attack : RSX.neutralSpellsparkAttack.name
        attackReleaseDelay: 0.0
        attackDelay: 0.6
        damage : RSX.neutralSpellsparkHit.name
        death : RSX.neutralSpellsparkDeath.name
      )
      card.atk = 1
      card.maxHP = 1
      card.manaCost = 1
      card.rarityId = Rarity.TokenUnit
      card.setInherentModifiersContextObjects([ModifierFirstBlood.createContextObject()])
      card.addKeywordClassToInclude(ModifierToken)

    if (identifier == Cards.Neutral.Khymera)
      card = new Unit(gameSession)
      card.factionId = Factions.Neutral
      card.name = i18next.t("cards.neutral_khymera_name")
      card.setDescription(i18next.t("cards.neutral_khymera_desc"))
      card.setFXResource(["FX.Cards.Neutral.Khymera"])
      card.setBoundingBoxWidth(145)
      card.setBoundingBoxHeight(95)
      card.setBaseSoundResource(
        apply : RSX.sfx_summonlegendary.audio
        walk : RSX.sfx_neutral_rook_hit.audio
        attack : RSX.sfx_neutral_khymera_attack_swing.audio
        receiveDamage : RSX.sfx_neutral_khymera_hit.audio
        attackDamage : RSX.sfx_neutral_khymera_impact.audio
        death : RSX.sfx_neutral_khymera_death.audio
      )
      card.setBaseAnimResource(
        breathing : RSX.neutralKhymeraBreathing.name
        idle : RSX.neutralKhymeraIdle.name
        walk : RSX.neutralKhymeraRun.name
        attack : RSX.neutralKhymeraAttack.name
        attackReleaseDelay: 0.0
        attackDelay: 0.7
        damage : RSX.neutralKhymeraHit.name
        death : RSX.neutralKhymeraDeath.name
      )
      card.atk = 5
      card.maxHP = 12
      card.manaCost = 8
      card.rarityId = Rarity.Legendary
      card.setInherentModifiersContextObjects([
        ModifierTakeDamageWatchSpawnRandomToken.createContextObject()
      ])

    if (identifier == Cards.Neutral.Jaxi)
      card = new Unit(gameSession)
      card.factionId = Factions.Neutral
      card.name = i18next.t("cards.neutral_jaxi_name")
      card.setDescription(i18next.t("cards.neutral_jaxi_desc"))
      card.setFXResource(["FX.Cards.Neutral.Jaxi"])
      card.setBaseSoundResource(
        apply : RSX.sfx_neutral_sai_hit.audio
        walk : RSX.sfx_neutral_ubo_attack_swing.audio
        attack : RSX.sfx_neutral_jaxi_attack_swing.audio
        receiveDamage : RSX.sfx_neutral_jaxi_hit.audio
        attackDamage : RSX.sfx_neutral_jaxi_impact.audio
        death : RSX.sfx_neutral_jaxi_death.audio
      )
      card.setBaseAnimResource(
        breathing : RSX.neutralJaxiBreathing.name
        idle : RSX.neutralJaxiIdle.name
        walk : RSX.neutralJaxiRun.name
        attack : RSX.neutralJaxiAttack.name
        attackReleaseDelay: 0.2
        attackDelay: 1.2
        damage : RSX.neutralJaxiHit.name
        death : RSX.neutralJaxiDeath.name
      )
      card.atk = 2
      card.maxHP = 2
      card.manaCost = 2
      card.rarityId = Rarity.Rare
      card.setInherentModifiersContextObjects([
        ModifierDyingWishSpawnEntity.createContextObject(
          {id: Cards.Neutral.MiniJax},
          "a 1/1 Ranged Mini-Jax",
        )
      ])

    return card

module.exports = CardFactory_Monthly_M2_Reactive
