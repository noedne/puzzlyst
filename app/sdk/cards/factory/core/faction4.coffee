# do not add this file to a package
# it is specifically parsed by the package generation script

CONFIG = require('app/common/config')
RSX = require('app/data/resources')

Cards = require 'app/sdk/cards/cardsLookupComplete'
Factions = require 'app/sdk/cards/factionsLookup'
Rarity = require 'app/sdk/cards/rarityLookup'

Unit = require 'app/sdk/entities/unit'
Artifact = require 'app/sdk/artifacts/artifact'

SpellFilterType = require 'app/sdk/spells/spellFilterType'
SpellDamage = require 'app/sdk/spells/spellDamage'
SpellApplyModifiers = require 'app/sdk/spells/spellApplyModifiers'
SpellKillTarget = require 'app/sdk/spells/spellKillTarget'
SpellNetherSummoning = require 'app/sdk/spells/spellNetherSummoning'
SpellChokingShadows = require 'app/sdk/spells/spellChokingShadows'
SpellDarkSacrifice = require 'app/sdk/spells/spellDarkSacrifice'
SpellKillTargetSpawnEntity = require 'app/sdk/spells/spellKillTargetSpawnEntity'
SpellSpawnEntity = require 'app/sdk/spells/spellSpawnEntity'
SpellBreathOfTheUnborn = require 'app/sdk/spells/spellBreathOfTheUnborn'
SpellRiteOfTheUndervault = require 'app/sdk/spells/spellRiteOfTheUndervault'
SpellDarkSeed = require 'app/sdk/spells/spellDarkSeed'
SpellLifeSurge = require 'app/sdk/spells/spellLifeSurge'
SpellVoidSteal = require 'app/sdk/spells/spellVoidSteal'
SpellApplyPlayerModifiers = require 'app/sdk/spells/spellApplyPlayerModifiers'

Modifier =           require 'app/sdk/modifiers/modifier'
ModifierStackingShadows = require 'app/sdk/modifiers/modifierStackingShadows'
ModifierFirstBlood =     require 'app/sdk/modifiers/modifierFirstBlood'
ModifierOpeningGambit =     require 'app/sdk/modifiers/modifierOpeningGambit'
ModifierDeathWatchBuffSelf = require 'app/sdk/modifiers/modifierDeathWatchBuffSelf'
ModifierDeathWatchDamageEnemyGeneralHealMyGeneral = require 'app/sdk/modifiers/modifierDeathWatchDamageEnemyGeneralHealMyGeneral'
ModifierFlying = require 'app/sdk/modifiers/modifierFlying'
ModifierOpeningGambitSpawnEntity = require 'app/sdk/modifiers/modifierOpeningGambitSpawnEntity'
ModifierDeathWatchSpawnEntity = require 'app/sdk/modifiers/modifierDeathWatchSpawnEntity'
ModifierDyingWishSpawnEntityAnywhere = require 'app/sdk/modifiers/modifierDyingWishSpawnEntityAnywhere'
ModifierDamageGeneralOnAttack = require 'app/sdk/modifiers/modifierDamageGeneralOnAttack'
ModifierTranscendance = require 'app/sdk/modifiers/modifierTranscendance'
ModifierSummonWatchByEntityBuffSelf = require 'app/sdk/modifiers/modifierSummonWatchByEntityBuffSelf'
ModifierDealDamageWatchSpawnEntity = require 'app/sdk/modifiers/modifierDealDamageWatchSpawnEntity'
ModifierWraithlingFury = require 'app/sdk/modifiers/modifierWraithlingFury'
ModifierDyingWishDamageNearbyAllies = require 'app/sdk/modifiers/modifierDyingWishDamageNearbyAllies'
ModifierKillWatchHealSelf = require 'app/sdk/modifiers/modifierKillWatchHealSelf'
ModifierToken = require 'app/sdk/modifiers/modifierToken'
ModifierDyingWishSpawnTile = require 'app/sdk/modifiers/modifierDyingWishSpawnTile'
ModifierDealDamageWatchSpawnEntityOnTarget = require 'app/sdk/modifiers/modifierDealDamageWatchSpawnEntityOnTarget'
ModifierOpeningGambitSacrificeNearbyBuffSelfSpawnEntity = require 'app/sdk/modifiers/modifierOpeningGambitSacrificeNearbyBuffSelfSpawnEntity'
ModifierOpeningGambitApplyModifiersToGeneral = require 'app/sdk/modifiers/modifierOpeningGambitApplyModifiersToGeneral'
ModifierDynamicCountModifySelfByShadowTilesOnBoard = require 'app/sdk/modifiers/modifierDynamicCountModifySelfByShadowTilesOnBoard'
ModifierDyingWishTeleportEnemyGeneral = require 'app/sdk/modifiers/modifierDyingWishTeleportEnemyGeneral'
ModifierOpeningGambitPutCardInHand = require 'app/sdk/modifiers/modifierOpeningGambitPutCardInHand'
ModifierDyingWish = require 'app/sdk/modifiers/modifierDyingWish'
PlayerModifierOnDeathWatchBonusMana = require 'app/sdk/playerModifiers/playerModifierOnDeathWatchBonusMana'

i18next = require 'i18next'
if i18next.t() is undefined
  i18next.t = (text) ->
    return text

class CardFactory_CoreSet_Faction4

  ###*
   * Returns a card that matches the identifier.
   * @param {Number|String} identifier
   * @param {GameSession} gameSession
   * @param {Number} version
   * @returns {Card}
   ###
  @cardForIdentifier: (identifier,gameSession,version) ->
    card = null

    if (identifier == Cards.Faction4.General)
      card = new Unit(gameSession)
      card.setIsGeneral(true)
      card.factionId = Factions.Faction4
      card.name = i18next.t("cards.faction_4_unit_lilithe_name")
      card.setDescription('')
      card.manaCost = 0
      card.setBoundingBoxWidth(90)
      card.setBoundingBoxHeight(90)
      card.setPortraitResource(RSX.general_portrait_image_f4)
      card.setPortraitHexResource(RSX.general_portrait_image_hex_f4)
      card.setSpeechResource(RSX.speech_portrait_abyssian)
      card.setConceptResource(RSX.general_f4)
      card.setAnnouncerFirstResource(RSX.sfx_announcer_abyssian_1st)
      card.setAnnouncerSecondResource(RSX.sfx_announcer_abyssian_2nd)
      card.setFXResource(["FX.Cards.Faction4.General"])
      card.setBaseSoundResource(
        apply : RSX.sfx_spell_fractalreplication.audio
        walk : RSX.sfx_singe2.audio
        attack : RSX.sfx_f4_general_attack_swing.audio
        receiveDamage : RSX.sfx_f4_general_hit.audio
        attackDamage : RSX.sfx_f4_general_attack_impact.audio
        death : RSX.sfx_f1elyxstormblade_death.audio
      )
      card.setBaseAnimResource(
        breathing : RSX.f4GeneralBreathing.name
        idle : RSX.f4GeneralIdle.name
        walk : RSX.f4GeneralRun.name
        attack : RSX.f4GeneralAttack.name
        attackReleaseDelay: 0.0
        attackDelay: 0.5
        damage : RSX.f4GeneralDamage.name
        death : RSX.f4GeneralDeath.name
        castStart : RSX.f4GeneralCastStart.name
        castEnd : RSX.f4GeneralCastEnd.name
        castLoop : RSX.f4GeneralCastLoop.name
        cast : RSX.f4GeneralCast.name
      )
      card.atk = 2
      card.maxHP = 25

    if (identifier == Cards.Faction4.AltGeneral)
      card = new Unit(gameSession)
      card.setIsGeneral(true)
      card.factionId = Factions.Faction4
      card.name = i18next.t("cards.faction_4_unit_cassyva_name")
      card.setDescription('')
      card.manaCost = 0
      card.setBoundingBoxWidth(75)
      card.setBoundingBoxHeight(75)
      card.setPortraitResource(RSX.general_portrait_image_f4alt)
      card.setPortraitHexResource(RSX.general_portrait_image_hex_f4Alt1)
      card.setSpeechResource(RSX.speech_portrait_abyssianalt)
      card.setConceptResource(RSX.general_f4alt)
      card.setAnnouncerFirstResource(RSX.sfx_announcer_abyssian_1st)
      card.setAnnouncerSecondResource(RSX.sfx_announcer_abyssian_2nd)
      card.setFXResource(["FX.Cards.Faction4.CassyvaSoulreaper"])
      card.setBaseSoundResource(
        apply : RSX.sfx_spell_fractalreplication.audio
        walk : RSX.sfx_neutral_ladylocke_attack_impact.audio
        attack : RSX.sfx_neutral_prophetofthewhite_attack_swing.audio
        receiveDamage : RSX.sfx_f4_blacksolus_hit.audio
        attackDamage : RSX.sfx_f4_blacksolus_attack_impact.audio
        death : RSX.sfx_f1elyxstormblade_death.audio
      )
      card.setBaseAnimResource(
        breathing : RSX.f4AltGeneralBreathing.name
        idle : RSX.f4AltGeneralIdle.name
        walk : RSX.f4AltGeneralRun.name
        attack : RSX.f4AltGeneralAttack.name
        attackReleaseDelay: 0.0
        attackDelay: 1.5
        damage : RSX.f4AltGeneralHit.name
        death : RSX.f4AltGeneralDeath.name
        castStart : RSX.f4AltGeneralCastStart.name
        castEnd : RSX.f4AltGeneralCastEnd.name
        castLoop : RSX.f4AltGeneralCastLoop.name
        cast : RSX.f4AltGeneralCast.name
      )
      card.atk = 2
      card.maxHP = 25

    if (identifier == Cards.Faction4.ThirdGeneral)
      card = new Unit(gameSession)
      card.setIsGeneral(true)
      card.factionId = Factions.Faction4
      card.name = i18next.t("cards.faction_4_unit_maehv_name")
      card.setDescription('')
      card.manaCost = 0
      card.setBoundingBoxWidth(75)
      card.setBoundingBoxHeight(75)
      card.setPortraitResource(RSX.general_portrait_image_f4alt)
      card.setPortraitHexResource(RSX.general_portrait_image_hex_f4Third)
      card.setSpeechResource(RSX.speech_portrait_abyssianthird)
      card.setConceptResource(RSX.general_f4third)
      card.setAnnouncerFirstResource(RSX.sfx_announcer_abyssian_1st)
      card.setAnnouncerSecondResource(RSX.sfx_announcer_abyssian_2nd)
      card.setFXResource(["FX.Cards.Faction4.CassyvaSoulreaper"])
      card.setBaseSoundResource(
        apply : RSX.sfx_spell_fractalreplication.audio
        walk : RSX.sfx_singe2.audio
        attack : RSX.sfx_neutral_voidhunter_attack_swing.audio
        receiveDamage : RSX.sfx_f4_general_hit.audio
        attackDamage : RSX.sfx_f4_general_attack_impact.audio
        death : RSX.sfx_f1elyxstormblade_death.audio
      )
      card.setBaseAnimResource(
        breathing : RSX.f4ThirdGeneralBreathing.name
        idle : RSX.f4ThirdGeneralIdle.name
        walk : RSX.f4ThirdGeneralRun.name
        attack : RSX.f4ThirdGeneralAttack.name
        attackReleaseDelay: 0.0
        attackDelay: 1.5
        damage : RSX.f4ThirdGeneralHit.name
        death : RSX.f4ThirdGeneralDeath.name
        castStart : RSX.f4ThirdGeneralCastStart.name
        castEnd : RSX.f4ThirdGeneralCastEnd.name
        castLoop : RSX.f4ThirdGeneralCastLoop.name
        cast : RSX.f4ThirdGeneralCast.name
      )
      card.atk = 2
      card.maxHP = 25

    if (identifier == Cards.Faction4.AbyssalCrawler)
      card = new Unit(gameSession)
      card.factionId = Factions.Faction4
      card.name = i18next.t("cards.faction_4_unit_abyssal_crawler_name")
      card.setDescription(i18next.t("cards.faction_4_unit_abyssal_crawler_desc"))
      card.setFXResource(["FX.Cards.Faction4.AbyssalCrawler"])
      card.setBaseSoundResource(
        apply : RSX.sfx_f4_blacksolus_attack_swing.audio
        walk : RSX.sfx_singe2.audio
        attack : RSX.sfx_f4_crawler_attack_swing.audio
        receiveDamage : RSX.sfx_f4_crawler_attack_impact.audio
        attackDamage : RSX.sfx_f4_crawler_hit.audio
        death : RSX.sfx_f4_crawler_death.audio
      )
      card.setBaseAnimResource(
        breathing : RSX.f4CrawlerBreathing.name
        idle : RSX.f4CrawlerIdle.name
        walk : RSX.f4CrawlerRun.name
        attack : RSX.f4CrawlerAttack.name
        attackReleaseDelay: 0.0
        attackDelay: 0.4
        damage : RSX.f4CrawlerDamage.name
        death : RSX.f4CrawlerDeath.name
      )
      card.maxHP = 1
      card.atk = 2
      card.manaCost = 1
      card.rarityId = Rarity.Common
      card.setInherentModifiersContextObjects([
        ModifierDyingWishSpawnTile.createContextObject(
          {id: Cards.Tile.Shadow},
          "Shadow Creep",
        ),
      ])
      card.addKeywordClassToInclude(ModifierStackingShadows)

    if (identifier == Cards.Faction4.AbyssalJuggernaut)
      minionOnly = false
      if version is 0
        description = i18next.t("cards.faction_4_unit_abyssal_juggernaut_desc_0")
        atk = 3
        maxHP = 5
        minionOnly = true
      else
        description = i18next.t("cards.faction_4_unit_abyssal_juggernaut_desc_1")
        atk = 4
        maxHP = 4
      card = new Unit(gameSession)
      card.factionId = Factions.Faction4
      card.name = i18next.t("cards.faction_4_unit_abyssal_juggernaut_name")
      card.setDescription(description)
      card.setFXResource(["FX.Cards.Faction4.AbyssalJuggernaut"])
      card.setBoundingBoxWidth(110)
      card.setBoundingBoxHeight(95)
      card.setBaseSoundResource(
        apply : RSX.sfx_spell_fractalreplication.audio
        walk : RSX.sfx_neutral_arakiheadhunter_hit.audio
        attack : RSX.sfx_f4_juggernaut_attack_swing.audio
        receiveDamage : RSX.sfx_f4_juggernaut_hit.audio
        attackDamage : RSX.sfx_f4_juggernaut_attack_impact.audio
        death : RSX.sfx_f4_juggernaut_death.audio
      )
      card.setBaseAnimResource(
        breathing : RSX.f4JuggernautBreathing.name
        idle : RSX.f4JuggernautIdle.name
        walk : RSX.f4JuggernautRun.name
        attack : RSX.f4JuggernautAttack.name
        attackReleaseDelay: 0.0
        attackDelay: 0.7
        damage : RSX.f4JuggernautDamage.name
        death : RSX.f4JuggernautDeath.name
      )
      card.atk = atk
      card.maxHP = maxHP
      card.manaCost = 4
      card.rarityId = Rarity.Rare
      card.setInherentModifiersContextObjects([
        ModifierDealDamageWatchSpawnEntityOnTarget.createContextObject(
          { id: Cards.Tile.Shadow },
          undefined,
          { enemyOnly: true, minionOnly },
        ),
      ])
      card.addKeywordClassToInclude(ModifierStackingShadows)

    if (identifier == Cards.Faction4.BloodmoonPriestess)
      card = new Unit(gameSession)
      card.factionId = Factions.Faction4
      card.name = i18next.t("cards.faction_4_unit_bloodmoon_priestess_name")
      card.setDescription(i18next.t("cards.faction_4_unit_bloodmoon_priestess_desc"))
      card.setFXResource(["FX.Cards.Faction4.BloodmoonPriestess"])
      card.setBaseSoundResource(
        apply : RSX.sfx_f4_blacksolus_attack_swing.audio
        walk : RSX.sfx_singe2.audio
        attack : RSX.sfx_f3_aymarahealer_attack_swing.audio
        receiveDamage : RSX.sfx_f3_aymarahealer_hit.audio
        attackDamage : RSX.sfx_f3_aymarahealer_impact.audio
        death : RSX.sfx_f3_aymarahealer_death.audio
      )
      card.setBaseAnimResource(
        breathing : RSX.f4BloodmoonBreathing.name
        idle : RSX.f4BloodmoonIdle.name
        walk : RSX.f4BloodmoonRun.name
        attack : RSX.f4BloodmoonAttack.name
        attackReleaseDelay: 0.0
        attackDelay: 0.5
        damage : RSX.f4BloodmoonDamage.name
        death : RSX.f4BloodmoonDeath.name
      )
      card.atk = 3
      card.maxHP = 3
      card.manaCost = 4
      card.rarityId = Rarity.Epic
      card.setInherentModifiersContextObjects([
        ModifierDeathWatchSpawnEntity.createContextObject({id: Cards.Faction4.Wraithling}, "Wraithling")
      ])

    if (identifier == Cards.Faction4.ShadowWatcher)
      card = new Unit(gameSession)
      card.factionId = Factions.Faction4
      card.name = i18next.t("cards.faction_4_unit_shadow_watcher_name")
      card.setDescription(i18next.t("cards.faction_4_unit_shadow_watcher_desc"))
      card.setFXResource(["FX.Cards.Faction4.ShadowWatcher"])
      card.setBoundingBoxWidth(55)
      card.setBoundingBoxHeight(80)
      card.setBaseSoundResource(
        apply : RSX.sfx_f4_blacksolus_attack_swing.audio
        walk : RSX.sfx_singe2.audio
        attack : RSX.sfx_f4_engulfingshadow_attack_swing.audio
        receiveDamage : RSX.sfx_f4_engulfingshadow_attack_impact.audio
        attackDamage : RSX.sfx_f4_engulfingshadow_hit.audio
        death : RSX.sfx_f4_engulfingshadow_death.audio
      )
      card.setBaseAnimResource(
        breathing : RSX.f4EngulfingShadowBreathing.name
        idle : RSX.f4EngulfingShadowIdle.name
        walk : RSX.f4EngulfingShadowRun.name
        attack : RSX.f4EngulfingShadowAttack.name
        attackReleaseDelay: 0.0
        attackDelay: 0.5
        damage : RSX.f4EngulfingShadowDamage.name
        death : RSX.f4EngulfingShadowDeath.name
      )
      card.atk = 3
      card.maxHP = 2
      card.manaCost = 3
      card.rarityId = Rarity.Common
      deathWatchBuffSelf = ModifierDeathWatchBuffSelf.createContextObject(1,1)
      card.setInherentModifiersContextObjects([
        deathWatchBuffSelf
      ])

    if (identifier == Cards.Faction4.DeepfireDevourer)
      card = new Unit(gameSession)
      card.factionId = Factions.Faction4
      card.name = i18next.t("cards.faction_4_unit_deepfire_devourer_name")
      card.setDescription(i18next.t("cards.faction_4_unit_deepfire_devourer_desc"))
      card.setFXResource(["FX.Cards.Faction4.DeepfireDevourer"])
      card.setBoundingBoxWidth(75)
      card.setBoundingBoxHeight(75)
      card.setBaseSoundResource(
        apply : RSX.sfx_f4_blacksolus_attack_swing.audio
        walk : RSX.sfx_f3_aymarahealer_impact.audio
        attack : RSX.sfx_f4_daemondeep_attack_swing.audio
        receiveDamage : RSX.sfx_f4_daemondeep_hit.audio
        attackDamage : RSX.sfx_f4_daemondeep_attack_impact.audio
        death : RSX.sfx_f4_daemondeep_death.audio
      )
      card.setBaseAnimResource(
        breathing : RSX.f4DaemonDeepBreathing.name
        idle : RSX.f4DaemonDeepIdle.name
        walk : RSX.f4DaemonDeepRun.name
        attack : RSX.f4DaemonDeepAttack.name
        attackReleaseDelay: 0.0
        attackDelay: 0.4
        damage : RSX.f4DaemonDeepDamage.name
        death : RSX.f4DaemonDeepDeath.name
      )
      card.atk = 3
      card.maxHP = 3
      card.manaCost = 4
      card.rarityId = Rarity.Epic
      card.setInherentModifiersContextObjects([
        ModifierOpeningGambitSacrificeNearbyBuffSelfSpawnEntity.createContextObject(2,2,{
          id: Cards.Faction4.Wraithling,
        }),
      ])

    if (identifier == Cards.Faction4.DarkSiren)
      card = new Unit(gameSession)
      card.factionId = Factions.Faction4
      card.name = i18next.t("cards.faction_4_unit_blood_siren_name")
      card.setDescription(i18next.t("cards.faction_4_unit_blood_siren_desc"))
      card.setFXResource(["FX.Cards.Faction4.DarkSiren"])
      card.setBaseSoundResource(
        apply : RSX.sfx_f4_blacksolus_attack_swing.audio
        walk : RSX.sfx_unit_run_magical_4.audio
        attack : RSX.sfx_f4_siren_attack_swing.audio
        receiveDamage : RSX.sfx_f4_siren_hit.audio
        attackDamage : RSX.sfx_f4_siren_attack_impact.audio
        death : RSX.sfx_f4_siren_death.audio
      )
      card.setBaseAnimResource(
        breathing : RSX.f4SirenBreathing.name
        idle : RSX.f4SirenIdle.name
        walk : RSX.f4SirenRun.name
        attack : RSX.f4SirenAttack.name
        attackReleaseDelay: 0.0
        attackDelay: 0.5
        damage : RSX.f4SirenDamage.name
        death : RSX.f4SirenDeath.name
      )
      card.atk = 3
      card.maxHP = 2
      card.manaCost = 2
      card.rarityId = Rarity.Common
      card.addKeywordClassToInclude(ModifierOpeningGambit)
      statContextObject = Modifier.createContextObjectWithAttributeBuffs(0,0)
      statContextObject.attributeBuffs.atk = 0
      statContextObject.attributeBuffsAbsolute = ['atk']
      statContextObject.durationEndTurn = 1
      statContextObject.appliedName = i18next.t("modifiers.faction_4_followup_blood_siren_1")
      statContextObject.appliedDescription = i18next.t("modifiers.faction_4_followup_blood_siren_2")
      card.setInherentModifiersContextObjects([
        ModifierOpeningGambitApplyModifiersToGeneral.createContextObject(
          [statContextObject],
          false,
          true,
          "This unit's Attack is set to 0 this turn.",
        )],
      )

    if (identifier == Cards.Faction4.VorpalReaver)
      card = new Unit(gameSession)
      card.factionId = Factions.Faction4
      card.name = i18next.t("cards.faction_4_unit_vorpal_reaver_name")
      card.setDescription(i18next.t("cards.faction_4_unit_vorpal_reaver_desc"))
      card.setFXResource(["FX.Cards.Faction4.VorpalReaver"])
      card.setBoundingBoxWidth(70)
      card.setBoundingBoxHeight(85)
      card.setBaseSoundResource(
        apply : RSX.sfx_summonlegendary.audio
        walk : RSX.sfx_singe2.audio
        attack : RSX.sfx_f4_daemongate_attack_swing.audio
        receiveDamage : RSX.sfx_f4_daemongate_hit.audio
        attackDamage : RSX.sfx_f4_daemongate_attack_impact.audio
        death : RSX.sfx_f4_daemongate_death.audio
      )
      card.setBaseAnimResource(
        breathing : RSX.f4DaemonGateBreathing.name
        idle : RSX.f4DaemonGateIdle.name
        walk : RSX.f4DaemonGateRun.name
        attack : RSX.f4DaemonGateAttack.name
        attackReleaseDelay: 0.0
        attackDelay: 0.5
        damage : RSX.f4DaemonGateDamage.name
        death : RSX.f4DaemonGateDeath.name
      )
      card.atk = 6
      card.maxHP = 6
      card.manaCost = 6
      card.rarityId = Rarity.Legendary
      card.setInherentModifiersContextObjects([ModifierTranscendance.createContextObject(), ModifierDyingWishSpawnEntityAnywhere.createContextObject({id: Cards.Faction4.Wraithling}, 6)])

    if (identifier == Cards.Faction4.Wraithling)
      card = new Unit(gameSession)
      card.factionId = Factions.Faction4
      card.setIsHiddenInCollection(true)
      card.name = i18next.t("cards.faction_4_unit_wraithling_name")
      card.setFXResource(["FX.Cards.Faction4.Wraithling"])
      card.setBoundingBoxWidth(45)
      card.setBoundingBoxHeight(45)
      card.setBaseSoundResource(
        apply : RSX.sfx_f4_blacksolus_death.audio
        walk : RSX.sfx_singe2.audio
        attack : RSX.sfx_f4_crawler_attack_swing.audio
        receiveDamage : RSX.sfx_f4_crawler_attack_impact.audio
        attackDamage : RSX.sfx_f4_crawler_hit.audio
        death : RSX.sfx_f4_crawler_death.audio
      )
      card.setBaseAnimResource(
        breathing : RSX.neutralShadow01Breathing.name
        idle : RSX.neutralShadow01Idle.name
        walk : RSX.neutralShadow01Run.name
        attack : RSX.neutralShadow01Attack.name
        attackReleaseDelay: 0.0
        attackDelay: 0.4
        damage : RSX.neutralShadow01Damage.name
        death : RSX.neutralShadow01Death.name
      )
      card.atk = 1
      card.maxHP = 1
      card.manaCost = 0
      card.rarityId = Rarity.TokenUnit
      card.addKeywordClassToInclude(ModifierToken)

    if (identifier == Cards.Faction4.DarkspineElemental)
      card = new Unit(gameSession)
      card.factionId = Factions.Faction4
      card.name = i18next.t("cards.faction_4_unit_darkspine_elemental_name")
      card.setDescription(i18next.t("cards.faction_4_unit_darkspine_elemental_desc"))
      card.setFXResource(["FX.Cards.Faction4.DarkspineElemental"])
      card.setBoundingBoxWidth(75)
      card.setBoundingBoxHeight(60)
      card.setBaseSoundResource(
        apply : RSX.sfx_f4_blacksolus_attack_swing.audio
        walk : RSX.sfx_singe2.audio
        attack : RSX.sfx_neutral_repulsionbeast_attack_swing.audio
        receiveDamage : RSX.sfx_neutral_repulsionbeast_hit.audio
        attackDamage : RSX.sfx_neutral_repulsionbeast_attack_impact.audio
        death : RSX.sfx_neutral_repulsionbeast_death.audio
      )
      card.setBaseAnimResource(
        breathing : RSX.f4DarkspineBreathing.name
        idle : RSX.f4DarkspineIdle.name
        walk : RSX.f4DarkspineRun.name
        attack : RSX.f4DarkspineAttack.name
        attackReleaseDelay: 0.0
        attackDelay: 0.6
        damage : RSX.f4DarkspineDamage.name
        death : RSX.f4DarkspineDeath.name
      )
      card.atk = 1
      card.maxHP = 1
      card.manaCost = 2
      card.rarityId = Rarity.Common
      card.setInherentModifiersContextObjects([
        ModifierDynamicCountModifySelfByShadowTilesOnBoard.createContextObject(
          2,
          2,
          '+2/+2',
          i18next.t("modifiers.faction_4_darkspine_elemental"),
        ),
      ])
      card.addKeywordClassToInclude(ModifierStackingShadows)

    if (identifier == Cards.Faction4.GloomChaser)
      card = new Unit(gameSession)
      card.factionId = Factions.Faction4
      card.name = i18next.t("cards.faction_4_unit_gloomchaser_name")
      card.setDescription(i18next.t("cards.faction_4_unit_gloomchaser_desc"))
      card.setFXResource(["FX.Cards.Faction4.GloomChaser"])
      card.setBaseSoundResource(
        apply : RSX.sfx_f4_blacksolus_attack_swing.audio
        walk : RSX.sfx_singe2.audio
        attack : RSX.sfx_neutral_darkharbinger_attack_swing.audio
        receiveDamage : RSX.sfx_neutral_darkharbinger_hit.audio
        attackDamage : RSX.sfx_neutral_darkharbinger_attack_impact.audio
        death : RSX.sfx_neutral_darkharbinger_death.audio
      )
      card.setBaseAnimResource(
        breathing : RSX.f4GloomchaserBreathing.name
        idle : RSX.f4GloomchaserIdle.name
        walk : RSX.f4GloomchaserRun.name
        attack : RSX.f4GloomchaserAttack.name
        attackReleaseDelay: 0.0
        attackDelay: 0.6
        damage : RSX.f4GloomchaserDamage.name
        death : RSX.f4GloomchaserDeath.name
      )
      card.atk = 3
      card.maxHP = 1
      card.manaCost = 2
      card.rarityId = Rarity.Common
      card.setInherentModifiersContextObjects([
        ModifierOpeningGambitSpawnEntity.createContextObject(
          {id: Cards.Faction4.Wraithling},
          "1/1 Wraithling",
          1,
          CONFIG.PATTERN_DIRECTLY_BEHIND,
        ),
      ])

    if (identifier == Cards.Faction4.ReaperNineMoons)
      card = new Unit(gameSession)
      card.factionId = Factions.Faction4
      card.name = i18next.t("cards.faction_4_unit_reaper_of_the_nine_moons_name")
      card.setDescription(i18next.t("cards.faction_4_unit_reaper_of_the_nine_moons_desc"))
      card.setBoundingBoxWidth(65)
      card.setBoundingBoxHeight(85)
      card.setFXResource(["FX.Cards.Faction4.ReaperNineMoons"])
      card.setBaseSoundResource(
        apply : RSX.sfx_summonlegendary.audio
        walk : RSX.sfx_unit_run_magical_4.audio
        attack : RSX.sfx_neutral_reaperninemoons_attack_swing.audio
        receiveDamage : RSX.sfx_neutral_reaperninemoons_hit.audio
        attackDamage : RSX.sfx_neutral_reaperninemoons_attack_impact.audio
        death : RSX.sfx_neutral_reaperninemoons_death.audio
      )
      card.setBaseAnimResource(
        breathing : RSX.f4ReaperNineMoonsBreathing.name
        idle : RSX.f4ReaperNineMoonsIdle.name
        walk : RSX.f4ReaperNineMoonsRun.name
        attack : RSX.f4ReaperNineMoonsAttack.name
        attackReleaseDelay: 0.0
        attackDelay: 1.2
        damage : RSX.f4ReaperNineMoonsDamage.name
        death : RSX.f4ReaperNineMoonsDeath.name
      )
      card.atk = 7
      card.maxHP = 3
      card.manaCost = 5
      card.rarityId = Rarity.Epic
      card.setInherentModifiersContextObjects([
        ModifierFlying.createContextObject(),
        ModifierDyingWishTeleportEnemyGeneral.createContextObject(),
      ])

    if (identifier == Cards.Faction4.SharianShadowdancer)
      card = new Unit(gameSession)
      card.factionId = Factions.Faction4
      card.name = i18next.t("cards.faction_4_unit_shadowdancer_name")
      card.setDescription(i18next.t("cards.faction_4_unit_shadowdancer_desc"))
      card.setBoundingBoxWidth(35)
      card.setBoundingBoxHeight(75)
      card.setFXResource(["FX.Cards.Faction4.SharianShadowdancer"])
      card.setBaseSoundResource(
        apply : RSX.sfx_f4_blacksolus_attack_swing.audio
        walk : RSX.sfx_unit_run_magical_4.audio
        attack : RSX.sfx_f1windbladecommander_attack_swing.audio
        receiveDamage : RSX.sfx_f1windbladecommander_hit.audio
        attackDamage : RSX.sfx_f1windbladecommanderattack_impact.audio
        death : RSX.sfx_f1elyxstormblade_death.audio
      )
      card.setBaseAnimResource(
        breathing : RSX.f4ShadowdancerBreathing.name
        idle : RSX.f4ShadowdancerIdle.name
        walk : RSX.f4ShadowdancerRun.name
        attack : RSX.f4ShadowdancerAttack.name
        attackReleaseDelay: 0.0
        attackDelay: 0.5
        damage : RSX.f4ShadowdancerDamage.name
        death : RSX.f4ShadowdancerDeath.name
      )
      card.atk = 5
      card.maxHP = 4
      card.manaCost = 5
      card.rarityId = Rarity.Rare
      card.setInherentModifiersContextObjects([
        ModifierDeathWatchDamageEnemyGeneralHealMyGeneral.createContextObject(1,1)
      ])

    if (identifier == Cards.Faction4.NightsorrowAssassin)
      if version is 0
        description = i18next.t("cards.faction_4_unit_nightsorrow_assassin_desc_0")
        atk = 3
        maxHP = 1
        followupId = Cards.Spell.FollowupKillTargetByAttack
        followupOptions = {
          maxAttack: 3
        }
      else
        description = i18next.t("cards.faction_4_unit_nightsorrow_assassin_desc_1")
        followupId = Cards.Spell.FollowupKillDamagedTarget
        if version is 1
          atk = 3
          maxHP = 3
        else
          atk = 4
          maxHP = 2
      card = new Unit(gameSession)
      card.factionId = Factions.Faction4
      card.name = i18next.t("cards.faction_4_unit_nightsorrow_assassin_name")
      card.setDescription(description)
      card.setFXResource(["FX.Cards.Faction4.NightsorrowAssassin"])
      card.setBaseSoundResource(
        apply : RSX.sfx_f4_blacksolus_attack_swing.audio
        walk : RSX.sfx_unit_run_magical_3.audio
        attack : RSX.sfx_f2melee_attack_swing.audio
        receiveDamage : RSX.sfx_neutral_gambitgirl_hit.audio
        attackDamage : RSX.sfx_f2melee_attack_impact.audio
        death : RSX.sfx_f1elyxstormblade_death.audio
      )
      card.setBaseAnimResource(
        breathing : RSX.f4NightsorrowBreathing.name
        idle : RSX.f4NightsorrowIdle.name
        walk : RSX.f4NightsorrowRun.name
        attack : RSX.f4NightsorrowAttack.name
        attackReleaseDelay: 0.0
        attackDelay: 0.5
        damage : RSX.f4NightsorrowDamage.name
        death : RSX.f4NightsorrowDeath.name
      )
      card.atk = atk
      card.maxHP = maxHP
      card.manaCost = 3
      card.rarityId = Rarity.Rare
      card.addKeywordClassToInclude(ModifierOpeningGambit)
      followup = {
        id: followupId
        spellFilterType: SpellFilterType.NeutralDirect
        _private: {
          followupSourcePattern: CONFIG.PATTERN_3x3
        }
      }
      if followupOptions?
        Object.assign(followup, followupOptions)
      card.setFollowups([followup])

    if (identifier == Cards.Faction4.SpectralRevenant)
      card = new Unit(gameSession)
      card.factionId = Factions.Faction4
      card.name = i18next.t("cards.faction_4_unit_spectral_revenant_name")
      card.setDescription(i18next.t("cards.faction_4_unit_spectral_revenant_desc"))
      card.setFXResource(["FX.Cards.Faction4.SpectralRevenant"])
      card.setBoundingBoxWidth(85)
      card.setBoundingBoxHeight(90)
      card.setBaseSoundResource(
        apply : RSX.sfx_summonlegendary.audio
        walk : RSX.sfx_singe2.audio
        attack : RSX.sfx_f1ironcliffeguardian_attack_swing.audio
        receiveDamage : RSX.sfx_f1ironcliffeguardian_hit.audio
        attackDamage : RSX.sfx_f1ironcliffeguardian_attack_impact.audio
        death : RSX.sfx_f1ironcliffeguardian_death.audio
      )
      card.setBaseAnimResource(
        breathing : RSX.f4SpectralRevenantBreathing.name
        idle : RSX.f4SpectralRevenantIdle.name
        walk : RSX.f4SpectralRevenantRun.name
        attack : RSX.f4SpectralRevenantAttack.name
        attackReleaseDelay: 0.0
        attackDelay: 0.8
        damage : RSX.f4SpectralRevenantDamage.name
        death : RSX.f4SpectralRevenantDeath.name
      )
      card.atk = 6
      card.maxHP = 6
      card.manaCost = 7
      card.rarityId = Rarity.Legendary
      card.setInherentModifiersContextObjects([  ModifierFirstBlood.createContextObject(), ModifierDamageGeneralOnAttack.createContextObject(4)  ])

    if (identifier == Cards.Faction4.BlackSolus)
      card = new Unit(gameSession)
      card.factionId = Factions.Faction4
      card.name = i18next.t("cards.faction_4_unit_black_solus_name")
      card.setDescription(i18next.t("cards.faction_4_unit_black_solus_desc"))
      card.setBoundingBoxWidth(70)
      card.setBoundingBoxHeight(90)
      card.setFXResource(["FX.Cards.Faction4.BlackSolus"])
      card.setBaseSoundResource(
        apply : RSX.sfx_ui_booster_packexplode.audio
        walk : RSX.sfx_singe2.audio
        attack : RSX.sfx_f4_blacksolus_attack_swing.audio
        receiveDamage : RSX.sfx_f4_blacksolus_hit.audio
        attackDamage : RSX.sfx_f4_blacksolus_attack_impact.audio
        death : RSX.sfx_f4_blacksolus_death.audio
      )
      card.setBaseAnimResource(
        breathing : RSX.f4BlackSolusBreathing.name
        idle : RSX.f4BlackSolusIdle.name
        walk : RSX.f4BlackSolusRun.name
        attack : RSX.f4BlackSolusAttack.name
        attackReleaseDelay: 0.0
        attackDelay: 0.8
        damage : RSX.f4BlackSolusDamage.name
        death : RSX.f4BlackSolusDeath.name
      )
      card.atk = 4
      card.maxHP = 3
      card.manaCost = 4
      card.rarityId = Rarity.Rare
      customContextObject = ModifierSummonWatchByEntityBuffSelf.createContextObject(2,0,Cards.Faction4.Wraithling,"Wraithling")
      card.setInherentModifiersContextObjects([
        ModifierOpeningGambitPutCardInHand.createContextObject(
          { id: Cards.Faction4.Wraithling },
          { count: 2 },
        ),
      ])

    if (identifier == Cards.Spell.AbyssianStrength)
      card = new SpellApplyModifiers(gameSession)
      card.factionId = Factions.Faction4
      card.id = Cards.Spell.AbyssianStrength
      card.name = i18next.t("cards.faction_4_spell_wraithling_fury_name")
      card.setDescription(i18next.t("cards.faction_4_spell_wraithling_fury_description"))
      card.spellFilterType = SpellFilterType.NeutralDirect
      card.manaCost = 3
      card.rarityId = Rarity.Epic
      card.setTargetModifiersContextObjects([
        ModifierWraithlingFury.createContextObject(),
        ModifierFlying.createContextObject(),
      ])
      card.filterCardIds = [Cards.Faction4.Wraithling]
      card.addKeywordClassToInclude(ModifierFlying)
      card.setFXResource(["FX.Cards.Spell.AbyssianStrength"])
      card.setBaseSoundResource(
        apply : RSX.sfx_spell_entropicdecay.audio
      )
      card.setBaseAnimResource(
        idle : RSX.iconWraithlingFuryIdle.name
        active : RSX.iconWraithlingFuryActive.name
      )

    if (identifier == Cards.Spell.DaemonicLure)
      card = new SpellDamage(gameSession)
      card.factionId = Factions.Faction4
      card.id = Cards.Spell.DaemonicLure
      card.name = i18next.t("cards.faction_4_spell_daemonic_lure_name")
      card.setDescription(i18next.t("cards.faction_4_spell_daemonic_lure_description"))
      card.manaCost = 2
      card.spellFilterType = SpellFilterType.EnemyDirect
      card.rarityId = Rarity.Common
      card.damageAmount = 1
      card.setFollowups([{
        id: Cards.Spell.FollowupTeleport
      }])
      card.setFXResource(["FX.Cards.Spell.DaemonicLure"])
      card.setBaseAnimResource(
        idle : RSX.iconDaemonicLureIdle.name
        active : RSX.iconDaemonicLureActive.name
      )
      card.setBaseSoundResource(
        apply : RSX.sfx_spell_daemoniclure.audio
      )

    if (identifier == Cards.Spell.NetherSummoning)
      card = new SpellNetherSummoning(gameSession)
      card.factionId = Factions.Faction4
      card.id = Cards.Spell.NetherSummoning
      card.name = i18next.t("cards.faction_4_spell_nether_summoning_name")
      card.setDescription(i18next.t("cards.faction_4_spell_nether_summoning_description"))
      card.manaCost = 5
      card.rarityId = Rarity.Legendary
      card.setFXResource(["FX.Cards.Spell.NetherSummoning"])
      card.setBaseAnimResource(
        idle : RSX.iconNetherSummoningIdle.name
        active : RSX.iconNetherSummoningActive.name
      )
      card.setBaseSoundResource(
        apply : RSX.sfx_spell_nethersummoning.audio
      )

    if (identifier == Cards.Spell.ShadowNova)
      card = new SpellChokingShadows(gameSession)
      card.factionId = Factions.Faction4
      card.id = Cards.Spell.ShadowNova
      card.name = i18next.t("cards.faction_4_spell_shadow_nova_name")
      card.setDescription(i18next.t("cards.faction_4_spell_shadow_nova_description"))
      card.addKeywordClassToInclude(ModifierStackingShadows)
      card.manaCost = 7
      card.rarityId = Rarity.Rare
      card.setFXResource(["FX.Cards.Spell.ShadowNova"])
      card.setAffectPattern(CONFIG.PATTERN_2X2)
      card.cardDataOrIndexToSpawn = {id: Cards.Tile.Shadow}
      card.setBaseSoundResource(
        apply : RSX.sfx_spell_shadownova.audio
      )
      card.setBaseAnimResource(
        idle : RSX.iconShadowNovaIdle.name
        active : RSX.iconShadowNovaActive.name
      )

    if (identifier == Cards.Spell.VoidPulse)
      card = new SpellLifeSurge(gameSession)
      card.factionId = Factions.Faction4
      card.id = Cards.Spell.VoidPulse
      card.name = i18next.t("cards.faction_4_spell_void_pulse_name")
      card.setDescription(i18next.t("cards.faction_4_spell_void_pulse_description"))
      card.manaCost = 1
      card.damageAmount = 1
      card.healAmount = 2
      card.canTargetGeneral = true
      card.rarityId = Rarity.Common
      card.setFXResource(["FX.Cards.Spell.VoidPulse"])
      card.setBaseSoundResource(
        apply : RSX.sfx_spell_voidpulse02.audio
      )
      card.setBaseAnimResource(
        idle : RSX.iconVoidPulseIdle.name
        active : RSX.iconVoidPulseActive.name
      )

    if (identifier == Cards.Spell.DeathfireCrescendo)
      card = new SpellApplyModifiers(gameSession)
      card.factionId = Factions.Faction4
      card.id = Cards.Spell.DeathfireCrescendo
      card.name = i18next.t("cards.faction_4_spell_deathfire_crescendo_name")
      card.setDescription(i18next.t("cards.faction_4_spell_deathfire_crescendo_description"))
      card.addKeywordClassToInclude(ModifierDeathWatchBuffSelf)
      card.manaCost = 3
      card.setTargetModifiersContextObjects([ModifierDeathWatchBuffSelf.createContextObject(2,2)])
      card.spellFilterType = SpellFilterType.NeutralDirect
      card.rarityId = Rarity.Legendary
      card.setFXResource(["FX.Cards.Spell.DeathfireCrescendo"])
      card.setBaseSoundResource(
        apply : RSX.sfx_spell_deathfirecrescendo.audio
      )
      card.setBaseAnimResource(
        idle : RSX.iconDeathfireCrescendoIdle.name
        active : RSX.iconDeathfireCrescendoActive.name
      )

    if (identifier == Cards.Spell.BreathOfTheUnborn)
      card = new SpellBreathOfTheUnborn(gameSession)
      card.factionId = Factions.Faction4
      card.id = Cards.Spell.BreathOfTheUnborn
      card.name = i18next.t("cards.faction_4_spell_breath_of_the_unborn_name")
      card.setDescription(i18next.t("cards.faction_4_spell_breath_of_the_unborn_description"))
      card.manaCost = 4
      card.rarityId = Rarity.Rare
      card.radius = CONFIG.WHOLE_BOARD_RADIUS
      card.setFXResource(["FX.Cards.Spell.BreathOfTheUnborn"])
      card.setBaseSoundResource(
        apply : RSX.sfx_spell_manavortex.audio
      )
      card.setBaseAnimResource(
        idle : RSX.iconBreathUnbornIdle.name
        active : RSX.iconBreathUnbornActive.name
      )

    if (identifier == Cards.Spell.RiteOfTheUndervault)
      card = new SpellRiteOfTheUndervault(gameSession)
      card.factionId = Factions.Faction4
      card.id = Cards.Spell.RiteOfTheUndervault
      card.name = i18next.t("cards.faction_4_spell_rite_of_the_undervault_name")
      card.setDescription(i18next.t("cards.faction_4_spell_rite_of_the_undervault_description"))
      card.manaCost = 3
      card.rarityId = Rarity.Epic
      card.setFXResource(["FX.Cards.Spell.RiteOfTheUndervault"])
      card.setBaseSoundResource(
        apply : RSX.sfx_spell_manavortex.audio
      )
      card.setBaseAnimResource(
        idle : RSX.iconRiteUndervaultIdle.name
        active : RSX.iconRiteUndervaultActive.name
      )

    if (identifier == Cards.Spell.DarkSacrifice)
      card = new SpellDarkSacrifice(gameSession)
      card.factionId = Factions.Faction4
      card.id = Cards.Spell.DarkSacrifice
      card.name = i18next.t("cards.faction_4_spell_darkfire_sacrifice_name")
      card.setDescription(i18next.t("cards.faction_4_spell_darkfire_sacrifice_description"))
      card.rarityId = Rarity.Rare
      card.manaCost = 0
      card.costChange = -2
      card.setFXResource(["FX.Cards.Spell.DarkSacrifice"])
      card.setBaseSoundResource(
        apply : RSX.sfx_spell_darkfiresacrifice.audio
      )
      card.setBaseAnimResource(
        idle : RSX.iconDarkfireSacrificeIdle.name
        active : RSX.iconDarkfireSacrificeActive.name
      )

    if (identifier == Cards.Spell.RitualBanishing)
      card = new SpellKillTarget(gameSession)
      card.factionId = Factions.Faction4
      card.id = Cards.Spell.RitualBanishing
      card.name = i18next.t("cards.faction_4_spell_ritual_banishing_name")
      card.setDescription(i18next.t("cards.faction_4_spell_ritual_banishing_description"))
      card.manaCost = 3
      card.rarityId = Rarity.Rare
      card.spellFilterType = SpellFilterType.AllyDirect
      card.setFollowups([
        {
          id: Cards.Spell.KillTarget
          spellFilterType: SpellFilterType.EnemyDirect
        }
      ])
      card.setFXResource(["FX.Cards.Spell.RitualBanishing"])
      card.setBaseAnimResource(
        idle : RSX.iconRitualBanishingIdle.name
        active : RSX.iconRitualBanishingActive.name
      )
      card.setBaseSoundResource(
        apply : RSX.sfx_f2tank_death.audio
      )

    if (identifier == Cards.Spell.DarkTransformation)
      description = i18next.t("cards.faction_4_spell_dark_transformation_description_0")
      spawnForOwner = false
      if version is 0
        manaCost = 5
      else
        manaCost = 4
        if version is 1
          description = i18next.t("cards.faction_4_spell_dark_transformation_description_1")
          spawnForOwner = true
      card = new SpellKillTargetSpawnEntity(gameSession)
      card.factionId = Factions.Faction4
      card.id = Cards.Spell.DarkTransformation
      card.name = i18next.t("cards.faction_4_spell_dark_transformation_name")
      card.setDescription(description)
      card.manaCost = manaCost
      card.rarityId = Rarity.Common
      card.cardDataOrIndexToSpawn = {id: Cards.Faction4.Wraithling}
      card.spellFilterType = SpellFilterType.NeutralDirect
      card.spawnForOwner = spawnForOwner
      card.setFXResource(["FX.Cards.Spell.DarkTransformation"])
      card.setBaseAnimResource(
        idle: RSX.iconDarkTransformationIdle.name
        active: RSX.iconDarkTransformationActive.name
      )
      card.setBaseSoundResource(
        apply : RSX.sfx_spell_darktransformation.audio
      )

    if (identifier == Cards.Spell.DarkSeed)
      card = new SpellDarkSeed(gameSession)
      card.factionId = Factions.Faction4
      card.id = Cards.Spell.DarkSeed
      card.name = i18next.t("cards.faction_4_spell_dark_seed_name")
      card.setDescription(i18next.t("cards.faction_4_spell_dark_seed_description"))
      card.manaCost = 4
      card.rarityId = Rarity.Common
      card.spellFilterType = SpellFilterType.NeutralIndirect
      card.setFXResource(["FX.Cards.Spell.DarkSeed"])
      card.setBaseSoundResource(
        apply : RSX.sfx_spell_darkseed.audio
      )
      card.setBaseAnimResource(
        idle : RSX.iconDarkSeedIdle.name
        active : RSX.iconDarkSeedActive.name
      )

    if (identifier == Cards.Spell.CurseOfAgony)
      card = new SpellApplyModifiers(gameSession)
      card.factionId = Factions.Faction4
      card.id = Cards.Spell.CurseOfAgony
      card.name = i18next.t("cards.faction_4_spell_grasp_of_agony_name")
      card.setDescription(i18next.t("cards.faction_4_spell_grasp_of_agony_description"))
      card.manaCost = 1
      card.rarityId = Rarity.Rare
      card.spellFilterType = SpellFilterType.NeutralDirect
      dyingWishContextObject = ModifierDyingWishDamageNearbyAllies.createContextObject(3)
      card.setTargetModifiersContextObjects([dyingWishContextObject])
      card.addKeywordClassToInclude(ModifierDyingWish)
      card.setFXResource(["FX.Cards.Spell.CurseOfAgony"])
      card.setBaseAnimResource(
        idle : RSX.iconCurseOfAgonyIdle.name
        active : RSX.iconCurseOfAgonyActive.name
      )
      card.setBaseSoundResource(
        apply : RSX.sfx_spell_graspofagony.audio
      )

    if (identifier == Cards.Spell.ShadowReflection)
      card = new SpellApplyModifiers(gameSession)
      card.factionId = Factions.Faction4
      card.id = Cards.Spell.ShadowReflection
      card.name = i18next.t("cards.faction_4_spell_shadow_reflection_name")
      card.setDescription(i18next.t("cards.faction_4_spell_shadow_reflection_description"))
      card.manaCost = 3
      card.rarityId = Rarity.Common
      card.spellFilterType = SpellFilterType.NeutralDirect
      attackBuff = Modifier.createContextObjectWithAttributeBuffs(5,0)
      attackBuff.appliedName = i18next.t("modifiers.faction_4_spell_shadow_reflection_1")
      card.setTargetModifiersContextObjects([attackBuff])
      card.setFXResource(["FX.Cards.Spell.ShadowReflection"])
      card.setBaseSoundResource(
        apply : RSX.sfx_spell_shadowreflection.audio
      )
      card.setBaseAnimResource(
        idle : RSX.iconShadowReflectionIdle.name
        active : RSX.iconShadowReflectionActive.name
      )


    if (identifier == Cards.Spell.SoulshatterPact)
      card = new SpellVoidSteal(gameSession)
      card.factionId = Factions.Faction4
      card.id = Cards.Spell.SoulshatterPact
      card.name = i18next.t("cards.faction_4_spell_soulshatter_pact_name")
      card.setDescription(i18next.t("cards.faction_4_spell_soulshatter_pact_description"))
      card.manaCost = 2
      card.rarityId = Rarity.Common
      card.spellFilterType = SpellFilterType.EnemyDirect
      customContextObject = Modifier.createContextObjectWithAttributeBuffs(-2,0)
      card.setTargetModifiersContextObjects([customContextObject])
      card.allyBuffContextObject = Modifier.createContextObjectWithAttributeBuffs(2, 0, {
        appliedName: i18next.t("modifiers.faction_4_spell_soulshatter_pact_1"),
      })
      card.setFXResource(["FX.Cards.Spell.SoulshatterPact"])
      card.setBaseSoundResource(
        apply : RSX.sfx_spell_soulshatterpact.audio
      )
      card.setBaseAnimResource(
        idle : RSX.iconSoulShatterPactIdle.name
        active : RSX.iconSoulShatterPactActive.name
      )

    if (identifier == Cards.Spell.WraithlingSwarm)
      card = new SpellSpawnEntity(gameSession)
      card.factionId = Factions.Faction4
      card.id = Cards.Spell.WraithlingSwarm
      card.name = i18next.t("cards.faction_4_spell_wraithling_swarm_name")
      card.setDescription(i18next.t("cards.faction_4_spell_wraithling_swarm_description"))
      card.manaCost = 3
      card.rarityId = Rarity.Common
      card.cardDataOrIndexToSpawn = {id: Cards.Faction4.Wraithling}
      card.spellFilterType = SpellFilterType.SpawnSource
      card.setFollowups([{
        id: Cards.Spell.CloneSourceEntity2X
      }])
      card.setFXResource(["FX.Cards.Spell.WraithlingSwarm"])
      card.setBaseSoundResource(
        apply : RSX.sfx_neutral_makantorwarbeast_attack_impact.audio
      )
      card.setBaseAnimResource(
        idle : RSX.iconWraithlingSwarmIdle.name
        active : RSX.iconWraithlingSwarmActive.name
      )

    if (identifier == Cards.Spell.ConsumingRebirth)
      card = new SpellApplyPlayerModifiers(gameSession)
      card.factionId = Factions.Faction4
      card.id = Cards.Spell.ConsumingRebirth
      card.name = i18next.t("cards.faction_4_spell_consuming_rebirth_name")
      card.setDescription(i18next.t("cards.faction_4_spell_consuming_rebirth_description"))
      card.manaCost = 1
      card.rarityId = Rarity.Epic
      card.applyToOwnGeneral = true
      card.spellFilterType = SpellFilterType.None
      card.setTargetModifiersContextObjects([
        PlayerModifierOnDeathWatchBonusMana.createContextObject({
          durationEndTurn: 1,
        }),
      ])
      card.setFXResource(["FX.Cards.Spell.ConsumingRebirth"])
      card.setBaseSoundResource(
        apply : RSX.sfx_spell_flashreincarnation.audio
      )
      card.setBaseAnimResource(
        idle : RSX.iconConsumingRebirthIdle.name
        active : RSX.iconConsumingRebirthActive.name
      )

    if (identifier == Cards.Artifact.SoulGrimwar)
      card = new Artifact(gameSession)
      card.factionId = Factions.Faction4
      card.id = Cards.Artifact.SoulGrimwar
      card.name = i18next.t("cards.faction_4_artifact_soul_grimwar_name")
      card.setDescription(i18next.t("cards.faction_4_artifact_soul_grimwar_description"))
      card.addKeywordClassToInclude(ModifierDeathWatchBuffSelf)
      card.manaCost = 3
      card.rarityId = Rarity.Epic
      card.setTargetModifiersContextObjects([
        ModifierDeathWatchBuffSelf.createContextObject(2,0,{
          name: i18next.t("cards.faction_4_artifact_soul_grimwar_name")
        })
      ])
      card.setFXResource(["FX.Cards.Artifact.SoulGrimwar"])
      card.setBaseAnimResource(
        idle: RSX.iconSoulGrimwarIdle.name
        active: RSX.iconSoulGrimwarActive.name
      )
      card.setBaseSoundResource(
        apply : RSX.sfx_victory_crest.audio
      )

    if (identifier == Cards.Artifact.HornOfTheForsaken)
      card = new Artifact(gameSession)
      card.factionId = Factions.Faction4
      card.id = Cards.Artifact.HornOfTheForsaken
      card.name = i18next.t("cards.faction_4_artifact_horn_of_the_forsaken_name")
      card.setDescription(i18next.t("cards.faction_4_artifact_horn_of_the_forsaken_description"))
      card.manaCost = 1
      card.rarityId = Rarity.Common
      card.setTargetModifiersContextObjects([
        ModifierDealDamageWatchSpawnEntity.createContextObject({id: Cards.Faction4.Wraithling}, "1/1 Wraithling",1, CONFIG.PATTERN_3x3, true,{
          type: "ModifierDealDamageWatchSpawnEntity"
          name: i18next.t("cards.faction_4_artifact_horn_of_the_forsaken_name")
          description: i18next.t("cards.faction_4_artifact_horn_of_the_forsaken_description")
        })
      ])
      card.setFXResource(["FX.Cards.Artifact.HornOfTheForsaken"])
      card.setBaseAnimResource(
        idle: RSX.iconHornForsakenIdle.name
        active: RSX.iconHornForsakenActive.name
      )
      card.setBaseSoundResource(
        apply : RSX.sfx_victory_crest.audio
      )

    if (identifier == Cards.Artifact.SpectralBlade)
      if version is 0
        healAmount = 2
        description = i18next.t("cards.faction_4_artifact_spectral_blade_description_0")
      else
        healAmount = 1
        description = i18next.t("cards.faction_4_artifact_spectral_blade_description_1")
      card = new Artifact(gameSession)
      card.factionId = Factions.Faction4
      card.id = Cards.Artifact.SpectralBlade
      card.name = i18next.t("cards.faction_4_artifact_spectral_blade_name")
      card.setDescription(description)
      card.manaCost = 2
      card.rarityId = Rarity.Rare
      card.setTargetModifiersContextObjects([
        ModifierKillWatchHealSelf.createContextObject(healAmount, false, true,
        {
          name: i18next.t("cards.faction_4_artifact_spectral_blade_name")
          description: i18next.t("modifiers.faction_4_artifact_spectral_blade_1")
        }),
        Modifier.createContextObjectWithAttributeBuffs(2,0,{
          name: i18next.t("cards.faction_4_artifact_spectral_blade_name")
          description: i18next.t("modifiers.plus_attack_key",{amount:2})
        })
      ])
      card.setFXResource(["FX.Cards.Artifact.SpectralBlade"])
      card.setBaseAnimResource(
        idle: RSX.iconSpectralBladeIdle.name
        active: RSX.iconSpectralBladeActive.name
      )
      card.setBaseSoundResource(
        apply : RSX.sfx_victory_crest.audio
      )

    return card

module.exports = CardFactory_CoreSet_Faction4
