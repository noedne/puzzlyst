# do not add this file to a package
# it is specifically parsed by the package generation script

CONFIG = require('app/common/config')
RSX = require('app/data/resources')

Cards = require 'app/sdk/cards/cardsLookupComplete'
CardType = require 'app/sdk/cards/cardType'
Factions = require 'app/sdk/cards/factionsLookup'
Races = require 'app/sdk/cards/racesLookup'
Rarity = require 'app/sdk/cards/rarityLookup'

Unit = require 'app/sdk/entities/unit'
Artifact = require 'app/sdk/artifacts/artifact'

SpellFilterType = require 'app/sdk/spells/spellFilterType'
SpellDamage = require 'app/sdk/spells/spellDamage'
SpellApplyModifiers = require 'app/sdk/spells/spellApplyModifiers'
SpellTwinStrike = require 'app/sdk/spells/spellTwinStrike'
SpellTwinStrike2 = require 'app/sdk/spells/spellTwinStrike2'
SpellRemoveAndReplaceEntity = require 'app/sdk/spells/spellRemoveAndReplaceEntity'
SpellRemoveArtifacts = require 'app/sdk/spells/spellRemoveArtifacts'
SpellApplyPlayerModifiers = require 'app/sdk/spells/spellApplyPlayerModifiers'
SpellHeavensEclipse = require 'app/sdk/spells/spellHeavensEclipse'
SpellInnerFocus = require 'app/sdk/spells/spellInnerFocus'
SpellMistWalking = require 'app/sdk/spells/spellMistWalking'
SpellKillingEdge = require 'app/sdk/spells/spellKillingEdge'
SpellJuxtaposition = require 'app/sdk/spells/spellJuxtaposition'

Modifier = require 'app/sdk/modifiers/modifier'
ModifierRanged = require 'app/sdk/modifiers/modifierRanged'
ModifierImmuneToAttacks = require 'app/sdk/modifiers/modifierImmuneToAttacks'
ModifierFirstBlood = require 'app/sdk/modifiers/modifierFirstBlood'
ModifierFlying = require 'app/sdk/modifiers/modifierFlying'
ModifierSpellWatchApplyModifiers = require 'app/sdk/modifiers/modifierSpellWatchApplyModifiers'
ModifierSpellWatchDamageGeneral = require 'app/sdk/modifiers/modifierSpellWatchDamageGeneral'
ModifierStartTurnWatchDamageGenerals = require 'app/sdk/modifiers/modifierStartTurnWatchDamageGenerals'
ModifierBackstab = require 'app/sdk/modifiers/modifierBackstab'
ModifierMyAttackWatchBuffSelf = require 'app/sdk/modifiers/modifierMyAttackWatchBuffSelf'
ModifierDealDamageWatchKillTarget = require 'app/sdk/modifiers/modifierDealDamageWatchKillTarget'
ModifierSpellWatchBloodLeech = require 'app/sdk/modifiers/modifierSpellWatchBloodLeech'
ModifierOpeningGambitApplyPlayerModifiers = require 'app/sdk/modifiers/modifierOpeningGambitApplyPlayerModifiers'
ModifierStartTurnWatchBounceToActionBar = require 'app/sdk/modifiers/modifierStartTurnWatchBounceToActionBar'
ModifierSpellDamageWatchPutCardInHand = require 'app/sdk/modifiers/modifierSpellDamageWatchPutCardInHand'
ModifierTakeDamageWatchPutCardInHand = require 'app/sdk/modifiers/modifierTakeDamageWatchPutCardInHand'
ModifierToken = require 'app/sdk/modifiers/modifierToken'
ModifierMyAttackWatchApplyModifiers = require 'app/sdk/modifiers/modifierMyAttackWatchApplyModifiers'
ModifierSpellWatchAnywhereApplyModifiers = require 'app/sdk/modifiers/modifierSpellWatchAnywhereApplyModifiers'
ModifierManaCostChange = require 'app/sdk/modifiers/modifierManaCostChange'
ModifierOpeningGambitBuffSelfByHandCount = require 'app/sdk/modifiers/modifierOpeningGambitBuffSelfByHandCount'

PlayerModifierManaModifier = require 'app/sdk/playerModifiers/playerModifierManaModifier'
PlayerModifierManaModifierSingleUse = require 'app/sdk/playerModifiers/playerModifierManaModifierSingleUse'
PlayerModifierSpellDamageModifier = require 'app/sdk/playerModifiers/playerModifierSpellDamageModifier'
PlayerModifierCardDrawModifier = require 'app/sdk/playerModifiers/playerModifierCardDrawModifier'
PlayerModifierAncestralPact = require 'app/sdk/playerModifiers/playerModifierAncestralPact'

i18next = require 'i18next'
if i18next.t() is undefined
  i18next.t = (text) ->
    return text

class CardFactory_CoreSet_Faction2

  ###*
   * Returns a card that matches the identifier.
   * @param {Number|String} identifier
   * @param {GameSession} gameSession
   * @param {Number} version
   * @returns {Card}
   ###
  @cardForIdentifier: (identifier,gameSession,version) ->
    card = null

    if (identifier == Cards.Faction2.General)
      card = new Unit(gameSession)
      card.setIsGeneral(true)
      card.factionId = Factions.Faction2
      card.name = i18next.t("cards.faction_2_unit_kaelos_name")
      card.manaCost = 0
      card.setBoundingBoxWidth(100)
      card.setBoundingBoxHeight(120)
      card.setPortraitResource(RSX.general_portrait_image_f2)
      card.setPortraitHexResource(RSX.general_portrait_image_hex_f2)
      card.setSpeechResource(RSX.speech_portrait_songhai)
      card.setConceptResource(RSX.general_f2)
      card.setAnnouncerFirstResource(RSX.sfx_announcer_songhai_1st)
      card.setAnnouncerSecondResource(RSX.sfx_announcer_songhai_2nd)
      card.setFXResource(["FX.Cards.Faction2.General"])
      card.setBaseSoundResource(
        apply : RSX.sfx_unit_deploy_1.audio
        walk : RSX.sfx_singe2.audio
        attack : RSX.sfx_f2general_attack_swing.audio
        receiveDamage : RSX.sfx_f2general_hit.audio
        attackDamage : RSX.sfx_f2general_attack_impact.audio
        death : RSX.sfx_f2general_death.audio
      )
      card.setBaseAnimResource(
        breathing : RSX.f2GeneralBreathing.name
        idle : RSX.f2GeneralIdle.name
        walk : RSX.f2GeneralRun.name
        attack : RSX.f2GeneralAttack.name
        attackReleaseDelay: 0.2
        attackDelay: 0.5
        damage : RSX.f2GeneralDamage.name
        death : RSX.f2GeneralDeath.name
        castStart : RSX.f2GeneralCastStart.name
        castEnd : RSX.f2GeneralCastEnd.name
        castLoop : RSX.f2GeneralCastLoop.name
        cast : RSX.f2GeneralCast.name
      )
      card.atk = 2
      card.maxHP = 25
      card.setDescription('')

    if (identifier == Cards.Faction2.AltGeneral)
      card = new Unit(gameSession)
      card.setIsGeneral(true)
      card.factionId = Factions.Faction2
      card.name = i18next.t("cards.faction_2_unit_reva_name")
      card.manaCost = 0
      card.setBoundingBoxWidth(85)
      card.setBoundingBoxHeight(90)
      card.setPortraitResource(RSX.general_portrait_image_f2alt)
      card.setPortraitHexResource(RSX.general_portrait_image_hex_f2Alt1)
      card.setSpeechResource(RSX.speech_portrait_songhaialt)
      card.setConceptResource(RSX.general_f2alt)
      card.setAnnouncerFirstResource(RSX.sfx_announcer_songhai_1st)
      card.setAnnouncerSecondResource(RSX.sfx_announcer_songhai_2nd)
      card.setFXResource(["FX.Cards.Faction2.RevaEventide"])
      card.setBaseSoundResource(
        apply : RSX.sfx_unit_deploy_1.audio
        walk : RSX.sfx_neutral_ladylocke_attack_impact.audio
        attack : RSX.sfx_f2general_attack_swing.audio
        receiveDamage : RSX.sfx_f2general_hit.audio
        attackDamage : RSX.sfx_f2general_attack_impact.audio
        death : RSX.sfx_f2general_death.audio
      )
      card.setBaseAnimResource(
        breathing : RSX.f2AltGeneralBreathing.name
        idle : RSX.f2AltGeneralIdle.name
        walk : RSX.f2AltGeneralRun.name
        attack : RSX.f2AltGeneralAttack.name
        attackReleaseDelay: 0.2
        attackDelay: 1.0
        damage : RSX.f2AltGeneralHit.name
        death : RSX.f2AltGeneralDeath.name
        castStart : RSX.f2AltGeneralCastStart.name
        castEnd : RSX.f2AltGeneralCastEnd.name
        castLoop : RSX.f2AltGeneralCastLoop.name
        cast : RSX.f2AltGeneralCast.name
      )
      card.atk = 2
      card.maxHP = 25
      card.setDescription('')

    if (identifier == Cards.Faction2.ThirdGeneral)
      card = new Unit(gameSession)
      card.setIsGeneral(true)
      card.factionId = Factions.Faction2
      card.name = i18next.t("cards.faction_2_unit_shidai_name")
      card.setDescription('')
      card.manaCost = 0
      card.setBoundingBoxWidth(100)
      card.setBoundingBoxHeight(120)
      card.setPortraitResource(RSX.general_portrait_image_f2)
      card.setPortraitHexResource(RSX.general_portrait_image_hex_f2Third)
      card.setSpeechResource(RSX.speech_portrait_songhaithird)
      card.setConceptResource(RSX.general_f2third)
      card.setAnnouncerFirstResource(RSX.sfx_announcer_songhai_1st)
      card.setAnnouncerSecondResource(RSX.sfx_announcer_songhai_2nd)
      card.setFXResource(["FX.Cards.Faction2.RevaEventide"])
      card.setBaseSoundResource(
        apply : RSX.sfx_unit_deploy_1.audio
        walk : RSX.sfx_neutral_ladylocke_attack_impact.audio
        attack : RSX.sfx_neutral_whitewidow_attack_swing.audio
        receiveDamage : RSX.sfx_f2general_hit.audio
        attackDamage : RSX.sfx_f2general_attack_impact.audio
        death : RSX.sfx_f2general_death.audio
      )
      card.setBaseAnimResource(
        breathing : RSX.f2ThirdGeneralBreathing.name
        idle : RSX.f2ThirdGeneralIdle.name
        walk : RSX.f2ThirdGeneralRun.name
        attack : RSX.f2ThirdGeneralAttack.name
        attackReleaseDelay: 0.2
        attackDelay: 1.0
        damage : RSX.f2ThirdGeneralHit.name
        death : RSX.f2ThirdGeneralDeath.name
        castStart : RSX.f2ThirdGeneralCastStart.name
        castEnd : RSX.f2ThirdGeneralCastEnd.name
        castLoop : RSX.f2ThirdGeneralCastLoop.name
        cast : RSX.f2ThirdGeneralCast.name
      )
      card.atk = 2
      card.maxHP = 25

    if (identifier == Cards.Faction2.Heartseeker)
      card = new Unit(gameSession)
      card.factionId = Factions.Faction2
      card.name = i18next.t("cards.faction_2_unit_heartseeker_name")
      card.setDescription(i18next.t("cards.faction_2_unit_heartseeker_desc"))
      card.setBoundingBoxWidth(50)
      card.setBoundingBoxHeight(50)
      card.setFXResource(["FX.Cards.Faction2.Heartseeker"])
      card.setBaseSoundResource(
        apply : RSX.sfx_spell_deathstrikeseal.audio
        walk : RSX.sfx_singe2.audio
        attack : RSX.sfx_f1windbladecommander_attack_swing.audio
        receiveDamage : RSX.sfx_f1windbladecommander_hit.audio
        attackDamage : RSX.sfx_f1windbladecommanderattack_impact.audio
        death : RSX.sfx_neutral_gambitgirl_death.audio
      )
      card.setBaseAnimResource(
        breathing : RSX.f2CasterBreathing.name
        idle : RSX.f2CasterIdle.name
        walk : RSX.f2CasterRun.name
        attack : RSX.f2CasterAttack.name
        attackReleaseDelay: 0.0
        attackDelay: 0.25
        damage : RSX.f2CasterDamage.name
        death : RSX.f2CasterDeath.name
      )
      card.atk = 1
      card.maxHP = 1
      card.manaCost = 1
      card.rarityId = Rarity.Common
      card.setInherentModifiersContextObjects([ ModifierRanged.createContextObject()  ])

    if (identifier == Cards.Faction2.Widowmaker)
      card = new Unit(gameSession)
      card.factionId = Factions.Faction2
      card.name = i18next.t("cards.faction_2_unit_widowmaker_name")
      card.setDescription(i18next.t("cards.faction_2_unit_widowmaker_desc"))
      card.setFXResource(["FX.Cards.Faction2.Widowmaker"])
      card.setBaseSoundResource(
        apply : RSX.sfx_spell_deathstrikeseal.audio
        walk : RSX.sfx_singe2.audio
        attack : RSX.sfx_f1_grandmasterzir_attack_impact.audio
        receiveDamage : RSX.sfx_neutral_luxignis_hit.audio
        attackDamage : RSX.sfx_f1silverguardsquire_attack_impact.audio
        death : RSX.sfx_f1_grandmasterzir_death.audio
      )
      card.setBaseAnimResource(
        breathing : RSX.f2RangedBreathing.name
        idle : RSX.f2RangedIdle.name
        walk : RSX.f2RangedRun.name
        attack : RSX.f2RangedAttack.name
        attackReleaseDelay: 0.2
        attackDelay: 0.3
        damage : RSX.f2RangedDamage.name
        death : RSX.f2RangedDeath.name
      )
      card.atk = 3
      card.maxHP = 1
      card.manaCost = 3
      card.rarityId = Rarity.Common
      card.setInherentModifiersContextObjects([
        ModifierRanged.createContextObject(),
        ModifierMyAttackWatchApplyModifiers.createContextObject(
          [PlayerModifierCardDrawModifier.createContextObject(1, 1)],
          { applyToGeneral: true },
        ),
      ])

    if (identifier == Cards.Faction2.KaidoAssassin)
      if version is 0
        backstab = 1
        description = i18next.t("cards.faction_2_unit_kaido_assassin_desc_0")
      else
        backstab = 2
        description = i18next.t("cards.faction_2_unit_kaido_assassin_desc_1")
      card = new Unit(gameSession)
      card.factionId = Factions.Faction2
      card.name = i18next.t("cards.faction_2_unit_kaido_assassin_name")
      card.setFXResource(["FX.Cards.Faction2.KaidoAssassin"])
      card.setBaseSoundResource(
        apply : RSX.sfx_spell_deathstrikeseal.audio
        walk : RSX.sfx_unit_run_magical_3.audio
        attack : RSX.sfx_f2_kaidoassassin_attack_swing.audio
        receiveDamage : RSX.sfx_f2_kaidoassassin_hit.audio
        attackDamage : RSX.sfx_f2_kaidoassassin_attack_impact.audio
        death : RSX.sfx_f2_kaidoassassin_death.audio
      )
      card.setBaseAnimResource(
        breathing : RSX.f2MeleeBreathing.name
        idle : RSX.f2MeleeIdle.name
        walk : RSX.f2MeleeRun.name
        attack : RSX.f2MeleeAttack.name
        attackReleaseDelay: 0.0
        attackDelay: 0.5
        damage : RSX.f2MeleeDamage.name
        death : RSX.f2MeleeDeath.name
      )
      card.atk = 2
      card.maxHP = 3
      card.manaCost = 2
      card.rarityId = Rarity.Common
      card.setInherentModifiersContextObjects([
        ModifierBackstab.createContextObject(backstab)
      ])
      card.setDescription(description)
      card.addKeywordClassToInclude(ModifierBackstab)

    if (identifier == Cards.Faction2.ScarletViper)
      card = new Unit(gameSession)
      card.factionId = Factions.Faction2
      card.name = i18next.t("cards.faction_2_unit_scarlet_viper_name")
      card.setBoundingBoxWidth(45)
      card.setBoundingBoxHeight(85)
      card.setFXResource(["FX.Cards.Faction2.ScarletViper"])
      card.setBaseSoundResource(
        apply : RSX.sfx_spell_deathstrikeseal.audio
        walk : RSX.sfx_unit_run_magical_3.audio
        attack : RSX.sfx_neutral_stormmetalgolem_attack_swing.audio
        receiveDamage : RSX.sfx_f6_icedryad_hit.audio
        attackDamage : RSX.sfx_neutral_stormmetalgolem_attack_impact.audio
        death : RSX.sfx_f6_icedryad_death.audio
      )
      card.setBaseAnimResource(
        breathing : RSX.f2SupportBreathing.name
        idle : RSX.f2SupportIdle.name
        walk : RSX.f2SupportRun.name
        attack : RSX.f2SupportAttack.name
        attackReleaseDelay: 0.0
        attackDelay: 0.25
        damage : RSX.f2SupportDamage.name
        death : RSX.f2SupportDeath.name
      )
      card.atk = 3
      card.maxHP = 5
      card.manaCost = 5
      card.rarityId = Rarity.Common
      card.setInherentModifiersContextObjects([ModifierFlying.createContextObject(), ModifierBackstab.createContextObject(3)])
      card.setDescription(i18next.t("cards.faction_2_unit_scarlet_viper_desc"))
      card.addKeywordClassToInclude(ModifierBackstab)
      card.addKeywordClassToInclude(ModifierFlying)

    if (identifier == Cards.Faction2.GoreHorn)
      card = new Unit(gameSession)
      card.factionId = Factions.Faction2
      card.name = i18next.t("cards.faction_2_unit_gorehorn_name")
      card.setBoundingBoxWidth(90)
      card.setBoundingBoxHeight(90)
      card.setFXResource(["FX.Cards.Faction2.GoreHorn"])
      card.setBaseSoundResource(
        apply : RSX.sfx_spell_deathstrikeseal.audio
        walk : RSX.sfx_singe2.audio
        attack : RSX.sfx_f2tank_attack_swing.audio
        receiveDamage : RSX.sfx_f2tank_hit.audio
        attackDamage : RSX.sfx_f2tank_attack_impact.audio
        death : RSX.sfx_f2tank_death.audio
      )
      card.setBaseAnimResource(
        breathing : RSX.f2TankBreathing.name
        idle : RSX.f2TankIdle.name
        walk : RSX.f2TankRun.name
        attack : RSX.f2TankAttack.name
        attackReleaseDelay: 0.0
        attackDelay: 0.3
        damage : RSX.f2TankDamage.name
        death : RSX.f2TankDeath.name
      )
      card.atk = 3
      card.maxHP = 3
      card.manaCost = 3
      card.rarityId = Rarity.Rare

      attackWatchAttackBuff = 1
      attackWatchHealthBuff = 1
      attackWatchBuffSelf = ModifierMyAttackWatchBuffSelf.createContextObject(attackWatchAttackBuff,attackWatchHealthBuff)
      card.setInherentModifiersContextObjects([
        attackWatchBuffSelf
        ModifierBackstab.createContextObject(2)
      ])
      card.setDescription(i18next.t("cards.faction_2_unit_gorehorn_desc"))
      card.addKeywordClassToInclude(ModifierBackstab)

    if (identifier == Cards.Faction2.OnyxBear)
      if version is 0
        maxHP = 2
      else
        maxHP = 1
      card = new Unit(gameSession)
      card.factionId = Factions.Faction2
      card.setIsHiddenInCollection(true)
      card.name = i18next.t("cards.faction_2_unit_panddo_name")
      card.setBoundingBoxWidth(50)
      card.setBoundingBoxHeight(45)
      card.setFXResource(["FX.Cards.Faction2.OnyxBear"])
      card.setBaseSoundResource(
        apply : RSX.sfx_spell_deathstrikeseal.audio
        walk : RSX.sfx_neutral_luxignis_hit.audio
        attack : RSX.sfx_f2_jadeogre_attack_swing.audio
        receiveDamage : RSX.sfx_neutral_spelljammer_hit.audio
        attackDamage : RSX.sfx_neutral_spelljammer_attack_impact.audio
        death : RSX.sfx_neutral_spelljammer_death.audio
      )
      card.setBaseAnimResource(
        breathing : RSX.f2PanddoBreathing.name
        idle : RSX.f2PanddoIdle.name
        walk : RSX.f2PanddoRun.name
        attack : RSX.f2PanddoAttack.name
        attackReleaseDelay: 0.0
        attackDelay: 0.4
        damage : RSX.f2PanddoDamage.name
        death : RSX.f2PanddoDeath.name
      )
      card.atk = 0
      card.maxHP = maxHP
      card.manaCost = 0
      card.rarityId = Rarity.TokenUnit
      card.setInherentModifiersContextObjects([
        ModifierImmuneToAttacks.createContextObject()
      ])
      card.setDescription(i18next.t("cards.faction_2_unit_panddo_desc"))
      card.addKeywordClassToInclude(ModifierToken)
      

    if (identifier == Cards.Faction2.TuskBoar)
      if version is 0
        description = i18next.t("cards.faction_2_unit_tuskboar_desc_0")
        generalDamage = 0
      else
        description = i18next.t("cards.faction_2_unit_tuskboar_desc_1")
        generalDamage = 1
      card = new Unit(gameSession)
      card.factionId = Factions.Faction2
      card.name = i18next.t("cards.faction_2_unit_tuskboar_name")
      card.setBoundingBoxWidth(100)
      card.setBoundingBoxHeight(80)
      card.setFXResource(["FX.Cards.Faction2.TuskBoar"])
      card.setBaseSoundResource(
        apply : RSX.sfx_summonlegendary.audio
        walk : RSX.sfx_neutral_arakiheadhunter_hit.audio
        attack : RSX.sfx_f6_seismicelemental_attack_impact.audio
        receiveDamage : RSX.sfx_neutral_golembloodshard_hit.audio
        attackDamage : RSX.sfx_f2lanternfox_death.audio
        death : RSX.sfx_f2lanternfox_death.audio
      )
      card.setBaseAnimResource(
        breathing : RSX.f2SpecialBreathing.name
        idle : RSX.f2SpecialIdle.name
        walk : RSX.f2SpecialRun.name
        attack : RSX.f2SpecialAttack.name
        attackReleaseDelay: 0.0
        attackDelay: 0.3
        damage : RSX.f2SpecialDamage.name
        death : RSX.f2SpecialDeath.name
      )
      card.atk = 3
      card.maxHP = 3
      card.manaCost = 2
      card.rarityId = Rarity.Legendary
      card.setInherentModifiersContextObjects([
        ModifierFirstBlood.createContextObject(),
        (if generalDamage is 0 then [] else [
          ModifierStartTurnWatchDamageGenerals.createContextObject(generalDamage),
        ])...,
        ModifierStartTurnWatchBounceToActionBar.createContextObject(),
      ])
      card.setDescription(description)

    if (identifier == Cards.Faction2.LanternFox)
      card = new Unit(gameSession)
      card.factionId = Factions.Faction2
      card.name = i18next.t("cards.faction_2_unit_lantern_fox_name")
      card.setBoundingBoxWidth(80)
      card.setBoundingBoxHeight(55)
      card.setFXResource(["FX.Cards.Faction2.LanternFox"])
      card.setBaseSoundResource(
        apply : RSX.sfx_ui_booster_packexplode.audio
        walk : RSX.sfx_singe2.audio
        attack : RSX.sfx_f2lanternfox_attack_swing.audio
        receiveDamage : RSX.sfx_f2lanternfox_hit.audio
        attackDamage : RSX.sfx_f2lanternfox_attack_impact.audio
        death : RSX.sfx_f2lanternfox_death.audio
      )
      card.setBaseAnimResource(
        breathing : RSX.f2LanternFoxBreathing.name
        idle : RSX.f2LanternFoxIdle.name
        walk : RSX.f2LanternFoxRun.name
        attack : RSX.f2LanternFoxAttack.name
        attackReleaseDelay: 0.0
        attackDelay: 0.4
        damage : RSX.f2LanternFoxDamage.name
        death : RSX.f2LanternFoxDeath.name
      )
      card.atk = 2
      card.maxHP = 4
      card.manaCost = 3
      card.rarityId = Rarity.Epic
      card.setInherentModifiersContextObjects([ModifierTakeDamageWatchPutCardInHand.createContextObject({id: Cards.Spell.PhoenixFire})])
      card.setDescription(i18next.t("cards.faction_2_unit_lantern_fox_desc"))

    if (identifier == Cards.Faction2.JadeOgre)
      if version is 0
        maxHP = 4
        manaCost = 4
      else
        maxHP = 3
        manaCost = 3
      card = new Unit(gameSession)
      card.factionId = Factions.Faction2
      card.name = i18next.t("cards.faction_2_unit_jade_monk_name")
      card.setFXResource(["FX.Cards.Faction2.JadeOgre"])
      card.setBoundingBoxWidth(65)
      card.setBoundingBoxHeight(90)
      card.setBaseSoundResource(
        apply : RSX.sfx_spell_deathstrikeseal.audio
        walk : RSX.sfx_unit_physical_4.audio
        attack : RSX.sfx_f2_jadeogre_attack_swing.audio
        receiveDamage : RSX.sfx_f2_jadeogre_hit.audio
        attackDamage : RSX.sfx_f2_jadeogre_attack_impact.audio
        death : RSX.sfx_f2_jadeogre_death.audio
      )
      card.setBaseAnimResource(
        breathing : RSX.f2JadeOgreBreathing.name
        idle : RSX.f2JadeOgreIdle.name
        walk : RSX.f2JadeOgreRun.name
        attack : RSX.f2JadeOgreAttack.name
        attackReleaseDelay: 0.0
        attackDelay: 0.8
        damage : RSX.f2JadeOgreDamage.name
        death : RSX.f2JadeOgreDeath.name
      )
      card.atk = 4
      card.maxHP = maxHP
      card.manaCost = manaCost
      card.rarityId = Rarity.Rare
      card.setInherentModifiersContextObjects([
        ModifierSpellWatchAnywhereApplyModifiers.createContextObject([
          ModifierManaCostChange.createContextObject(-1, {
            durationEndTurn: 1,
            appliedName: i18next.t("modifiers.faction_2_jade_monk_buff_name"),
            appliedDescription: i18next.t("modifiers.faction_2_jade_monk_buff_description"),
          }),
        ]),
      ])
      card.setDescription(i18next.t("cards.faction_2_unit_jade_monk_desc"))

    if (identifier == Cards.Faction2.ChakriAvatar)
      if version is 0
        atk = 1
      else
        atk = 0
      card = new Unit(gameSession)
      card.factionId = Factions.Faction2
      card.raceId = Races.Arcanyst
      card.name = i18next.t("cards.faction_2_unit_chakri_avatar_name")
      card.setFXResource(["FX.Cards.Faction2.ChakriAvatar"])
      card.setBaseSoundResource(
        apply : RSX.sfx_spell_deathstrikeseal.audio
        walk : RSX.sfx_singe2.audio
        attack : RSX.sfx_f2_chakriavatar_attack_swing.audio
        receiveDamage : RSX.sfx_f2_chakriavatar_hit.audio
        attackDamage : RSX.sfx_f2_chakriavatar_attack_impact.audio
        death : RSX.sfx_f2_chakriavatar_death.audio
      )
      card.setBaseAnimResource(
        breathing : RSX.f2ChakriAvatarBreathing.name
        idle : RSX.f2ChakriAvatarIdle.name
        walk : RSX.f2ChakriAvatarRun.name
        attack : RSX.f2ChakriAvatarAttack.name
        attackReleaseDelay: 0.0
        attackDelay: 1.1
        damage : RSX.f2ChakriAvatarDamage.name
        death : RSX.f2ChakriAvatarDeath.name
      )
      card.atk = atk
      card.maxHP = 2
      card.manaCost = 2
      card.rarityId = Rarity.Common
      statsBuff = Modifier.createContextObjectWithAttributeBuffs(1,1)
      statsBuff.appliedName = i18next.t("modifiers.faction_2_chakri_avatar_buff_name")
      card.setInherentModifiersContextObjects([ModifierSpellWatchApplyModifiers.createContextObject([statsBuff])])
      card.setDescription(i18next.t("cards.faction_2_unit_chakri_avatar_desc"))

    if (identifier == Cards.Faction2.MageOfFourWinds)
      card = new Unit(gameSession)
      card.factionId = Factions.Faction2
      card.raceId = Races.Arcanyst
      card.name = i18next.t("cards.faction_2_unit_four_winds_magi_name")
      card.setFXResource(["FX.Cards.Faction2.MageOfFourWinds"])
      card.setBaseSoundResource(
        apply : RSX.sfx_spell_deathstrikeseal.audio
        walk : RSX.sfx_singe2.audio
        attack : RSX.sfx_f2mage4winds_attack_swing.audio
        receiveDamage : RSX.sfx_f2mage4winds_hit.audio
        attackDamage : RSX.sfx_f2mage4winds_attack_impact.audio
        death : RSX.sfx_f2mage4winds_death.audio
      )
      card.setBaseAnimResource(
        breathing : RSX.f2Mage4WindsBreathing.name
        idle : RSX.f2Mage4WindsIdle.name
        walk : RSX.f2Mage4WindsRun.name
        attack : RSX.f2Mage4WindsAttack.name
        attackReleaseDelay: 0.0
        attackDelay: 0.4
        damage : RSX.f2Mage4WindsDamage.name
        death : RSX.f2Mage4WindsDeath.name
      )
      card.atk = 4
      card.maxHP = 4
      card.manaCost = 4
      card.setInherentModifiersContextObjects([
        ModifierSpellWatchBloodLeech.createContextObject(1,1)
      ])
      card.rarityId = Rarity.Rare
      card.setDescription(i18next.t("cards.faction_2_unit_four_winds_magi_desc"))

    if (identifier == Cards.Faction2.CelestialPhantom)
      if version is 0
        description = i18next.t("cards.faction_2_unit_celestial_phantom_desc_0")
        atk = 1
        maxHP = 5
        manaCost = 3
        modifierContextObject =
          ModifierDealDamageWatchKillTarget.createContextObject()
      else
        description = i18next.t("cards.faction_2_unit_celestial_phantom_desc_1")
        atk = 0
        maxHP = 3
        manaCost = 2
        modifierContextObject =
          ModifierOpeningGambitBuffSelfByHandCount.createContextObject(
            1,
            0,
            i18next.t("modifiers.faction_2_celestial_phantom_buff_name"),
            { useOpponentHand: false },
          )
      card = new Unit(gameSession)
      card.factionId = Factions.Faction2
      card.name = i18next.t("cards.faction_2_unit_celestial_phantom_name")
      card.setBoundingBoxWidth(60)
      card.setBoundingBoxHeight(90)
      card.setFXResource(["FX.Cards.Faction2.CelestialPhantom"])
      card.setBaseSoundResource(
        apply : RSX.sfx_spell_deathstrikeseal.audio
        walk : RSX.sfx_singe2.audio
        attack : RSX.sfx_f2_celestialphantom_attack_swing.audio
        receiveDamage :  RSX.sfx_f2_celestialphantom_hit.audio
        attackDamage : RSX.sfx_f2_celestialphantom_attack_impact.audio
        death : RSX.sfx_f2_celestialphantom_death.audio
      )
      card.setBaseAnimResource(
        breathing : RSX.f2DeathPhantomBreathing.name
        idle : RSX.f2DeathPhantomIdle.name
        walk : RSX.f2DeathPhantomRun.name
        attack : RSX.f2DeathPhantomAttack.name
        attackReleaseDelay: 0.0
        attackDelay: 0.6
        damage : RSX.f2DeathPhantomDamage.name
        death : RSX.f2DeathPhantomDeath.name
      )
      card.atk = atk
      card.maxHP = maxHP
      card.manaCost = manaCost
      card.setInherentModifiersContextObjects([modifierContextObject])
      card.rarityId = Rarity.Epic
      card.setDescription(description)

    if (identifier == Cards.Faction2.StormKage)
      card = new Unit(gameSession)
      card.factionId = Factions.Faction2
      card.name = i18next.t("cards.faction_2_unit_storm_kage_name")
      card.setFXResource(["FX.Cards.Faction2.StormKage"])
      card.setBoundingBoxWidth(60)
      card.setBoundingBoxHeight(105)
      card.setBaseSoundResource(
        apply : RSX.sfx_summonlegendary.audio
        walk : RSX.sfx_singe2.audio
        attack : RSX.sfx_f2stormkage_attack_swing.audio
        receiveDamage :  RSX.sfx_f2stormkage_hit.audio
        attackDamage : RSX.sfx_f2stormkage_attack_impact.audio
        death : RSX.sfx_f2stormkage_death.audio
      )
      card.setBaseAnimResource(
        breathing : RSX.f2StormKageBreathing.name
        idle : RSX.f2StormKageIdle.name
        walk : RSX.f2StormKageRun.name
        attack : RSX.f2StormKageAttack.name
        attackReleaseDelay: 0.0
        attackDelay: 0.9
        damage : RSX.f2StormKageDamage.name
        death : RSX.f2StormKageDeath.name
      )
      card.atk = 6
      card.maxHP = 10
      card.manaCost = 7
      card.setInherentModifiersContextObjects([ModifierSpellDamageWatchPutCardInHand.createContextObject({id: Cards.Spell.KageLightning})])
      card.rarityId = Rarity.Legendary
      card.setDescription(i18next.t("cards.faction_2_unit_storm_kage_desc"))

    if (identifier == Cards.Faction2.HamonBlademaster)
      if version is 0
        description = i18next.t("cards.faction_2_unit_hamon_bladeseeker_desc_0")
        generalDamage = 2
      else
        description = i18next.t("cards.faction_2_unit_hamon_bladeseeker_desc_1")
        generalDamage = 1
      card = new Unit(gameSession)
      card.factionId = Factions.Faction2
      card.name = i18next.t("cards.faction_2_unit_hamon_bladeseeker_name")
      card.setFXResource(["FX.Cards.Faction2.HamonBlademaster"])
      card.setBaseSoundResource(
        apply : RSX.sfx_ui_booster_packexplode.audio
        walk : RSX.sfx_unit_run_magical_4.audio
        attack : RSX.sfx_f2mage4winds_attack_swing.audio
        receiveDamage : RSX.sfx_f2mage4winds_hit.audio
        attackDamage : RSX.sfx_f2mage4winds_attack_impact.audio
        death : RSX.sfx_f2mage4winds_death.audio
      )
      card.setBaseAnimResource(
        breathing : RSX.f2HammonBladeseekerBreathing.name
        idle : RSX.f2HammonBladeseekerIdle.name
        walk : RSX.f2HammonBladeseekerRun.name
        attack : RSX.f2HammonBladeseekerAttack.name
        attackReleaseDelay: 0.0
        attackDelay: 0.35
        damage : RSX.f2HammonBladeseekerDamage.name
        death : RSX.f2HammonBladeseekerDeath.name
      )
      card.maxHP = 8
      card.atk = 8
      card.manaCost = 5
      card.setInherentModifiersContextObjects([
        ModifierStartTurnWatchDamageGenerals.createContextObject(generalDamage)
      ])
      card.rarityId = Rarity.Epic
      card.setDescription(description)

    if (identifier == Cards.Faction2.KeshraiFanblade)
      card = new Unit(gameSession)
      card.factionId = Factions.Faction2
      card.name = i18next.t("cards.faction_2_unit_keshrai_fanblade_name")
      card.setFXResource(["FX.Cards.Faction2.KeshraiFanblade"])
      card.setBaseSoundResource(
        apply : RSX.sfx_unit_deploy_2.audio
        walk : RSX.sfx_singe2.audio
        attack : RSX.sfx_f1elyxstormblade_attack_swing.audio
        receiveDamage : RSX.sfx_f1elyxstormblade_hit.audio
        attackDamage : RSX.sfx_f1elyxstormblade_attack_impact.audio
        death : RSX.sfx_f1elyxstormblade_death.audio
      )
      card.setBaseAnimResource(
        breathing : RSX.f2KeshraiFanbladeBreathing.name
        idle : RSX.f2KeshraiFanbladeIdle.name
        walk : RSX.f2KeshraiFanbladeRun.name
        attack : RSX.f2KeshraiFanbladeAttack.name
        attackReleaseDelay: 0.0
        attackDelay: 0.5
        damage : RSX.f2KeshraiFanbladeDamage.name
        death : RSX.f2KeshraiFanbladeDeath.name
      )
      card.atk = 5
      card.maxHP = 4
      card.manaCost = 4
      customContextObject = PlayerModifierManaModifier.createCostChangeContextObject(2, CardType.Spell)
      customContextObject.durationEndTurn = 2 #lasts until end of opponent's next turn
      customContextObject.auraIncludeSignatureCards = true
      card.setInherentModifiersContextObjects([
        ModifierOpeningGambitApplyPlayerModifiers.createContextObjectToTargetEnemyPlayer([customContextObject], false)
      ])
      card.rarityId = Rarity.Rare
      card.setDescription(i18next.t("cards.faction_2_unit_keshrai_fanblade_desc"))

    if (identifier == Cards.Spell.SaberspineSeal)
      card = new SpellApplyModifiers(gameSession)
      card.factionId = Factions.Faction2
      card.id = Cards.Spell.SaberspineSeal
      card.name = i18next.t("cards.faction_2_spell_saberspine_seal_name")
      card.setDescription(i18next.t("cards.faction_2_spell_saberspine_seal_description"))
      card.manaCost = 1
      card.rarityId = Rarity.Common
      card.canTargetGeneral = true
      customContextObject = Modifier.createContextObjectWithAttributeBuffs(3,0)
      customContextObject.durationEndTurn = 1
      customContextObject.appliedName = i18next.t("modifiers.faction_2_spell_saberspine_seal_1")
      card.setTargetModifiersContextObjects([customContextObject])
      card.setFXResource(["FX.Cards.Spell.SaberspineSeal"])
      card.setBaseSoundResource(
        apply : RSX.sfx_f2tank_death.audio
      )
      card.setBaseAnimResource(
        idle : RSX.iconSaberspineSealIdle.name
        active : RSX.iconSaberspineSealActive.name
      )

    if (identifier == Cards.Spell.MistDragonSeal)
      card = new SpellApplyModifiers(gameSession)
      card.factionId = Factions.Faction2
      card.id = Cards.Spell.MistDragonSeal
      card.name = i18next.t("cards.faction_2_spell_mist_dragon_seal_name")
      card.setDescription(i18next.t("cards.faction_2_spell_mist_dragon_seal_description"))
      card.manaCost = 2
      card.rarityId = Rarity.Rare
      card.spellFilterType = SpellFilterType.AllyDirect
      mistDragonStatBuff = Modifier.createContextObjectWithAttributeBuffs(1,1)
      mistDragonStatBuff.appliedName = i18next.t("modifiers.faction_2_spell_mist_dragon_seal_1")
      card.setTargetModifiersContextObjects([mistDragonStatBuff])
      card.setFollowups([{
        id: Cards.Spell.FollowupTeleport
      }])
      card.setFXResource(["FX.Cards.Spell.MistDragonSeal"])
      card.setBaseSoundResource(
        apply : RSX.sfx_spell_mistdragonseal_alt.audio
      )
      card.setBaseAnimResource(
        idle : RSX.iconMistdragonSealIdle.name
        active : RSX.iconMistdragonSealActive.name
      )

    if (identifier == Cards.Spell.PhoenixFire)
      card = new SpellDamage(gameSession)
      card.factionId = Factions.Faction2
      card.id = Cards.Spell.PhoenixFire
      card.name = i18next.t("cards.faction_2_spell_phoenix_fire_name")
      card.setDescription(i18next.t("cards.faction_2_spell_phoenix_fire_description"))
      card.manaCost = 2
      card.damageAmount = 3
      card.rarityId = Rarity.Common
      card.spellFilterType = SpellFilterType.NeutralDirect
      card.canTargetGeneral = true
      card.setFXResource(["FX.Cards.Spell.PhoenixFire"])
      card.setBaseSoundResource(
        apply : RSX.sfx_spell_phoenixfire.audio
      )
      card.setBaseAnimResource(
        idle : RSX.iconPhoenixFire2Idle.name
        active : RSX.iconPhoenixFire2Active.name
      )

    if (identifier == Cards.Spell.KageLightning)
      card = new SpellDamage(gameSession)
      card.factionId = Factions.Faction2
      card.setIsHiddenInCollection(true)
      card.id = Cards.Spell.KageLightning
      card.name = i18next.t("cards.faction_2_spell_kage_lightning_name")
      card.setDescription(i18next.t("cards.faction_2_spell_kage_lightning_description"))
      card.manaCost = 1
      card.damageAmount = 6
      card.spellFilterType = SpellFilterType.NeutralDirect
      card.setFXResource(["FX.Cards.Spell.KageLightning"])
      card.setBaseAnimResource(
        idle : RSX.iconKageLightningIdle.name
        active : RSX.iconKageLightningActive.name
      )
      card.setBaseSoundResource(
        apply : RSX.sfx_spell_ghostlightning.audio
      )

    if (identifier == Cards.Spell.TwinStrike)
      if version is 0
        spell = SpellTwinStrike
        description = i18next.t("cards.faction_2_spell_twin_strike_description_0")
        spellFilterType = SpellFilterType.EnemyIndirect
        radius = CONFIG.WHOLE_BOARD_RADIUS
        followups = []
      else
        spell = SpellTwinStrike2
        description = i18next.t("cards.faction_2_spell_twin_strike_description_1")
        spellFilterType = SpellFilterType.EnemyDirect
        radius = 0
        followups = [{ id: Cards.Spell.FollowupTwinStrike }]
      card = new spell(gameSession)
      card.factionId = Factions.Faction2
      card.id = Cards.Spell.TwinStrike
      card.name = i18next.t("cards.faction_2_spell_twin_strike_name")
      card.setDescription(description)
      card.manaCost = 3
      card.rarityId = Rarity.Common
      card.damageAmount = 2
      card.spellFilterType = spellFilterType
      card.radius = radius
      card.setFollowups(followups)
      card.setFXResource(["FX.Cards.Spell.TwinStrike"])
      card.setBaseSoundResource(
        apply : RSX.sfx_spell_twinstrike.audio
      )
      card.setBaseAnimResource(
        idle : RSX.iconTwinStrikeIdle.name
        active : RSX.iconTwinStrikeActive.name
      )

    if (identifier == Cards.Spell.FollowupTwinStrike)
      card = new SpellTwinStrike2(gameSession)
      card.factionId = Factions.Faction2
      card.id = Cards.Spell.TwinStrike
      card.setIsHiddenInCollection(true)
      card.name = i18next.t("cards.faction_2_spell_twin_strike_name")
      card.setDescription(i18next.t("cards.faction_2_spell_twin_strike_description_1"))
      card.manaCost = 0
      card.damageAmount = 2
      card.spellFilterType = SpellFilterType.EnemyDirect

    if (identifier == Cards.Spell.EightGates)
      card = new SpellApplyPlayerModifiers(gameSession)
      card.factionId = Factions.Faction2
      card.id = Cards.Spell.EightGates
      card.name = i18next.t("cards.faction_2_spell_eight_gates_name")
      card.setDescription(i18next.t("cards.faction_2_spell_eight_gates_description"))
      card.manaCost = 2
      card.rarityId = Rarity.Legendary
      card.applyToOwnGeneral = true
      customContextObject = PlayerModifierSpellDamageModifier.createContextObject()
      customContextObject.durationEndTurn = 1
      customContextObject.spellDamageChange = 2
      card.setTargetModifiersContextObjects([customContextObject])
      card.spellFilterType = SpellFilterType.None
      card.setFXResource(["FX.Cards.Spell.EightGates"])
      card.setBaseSoundResource(
        apply : RSX.sfx_neutral_chaoselemental_attack_swing.audio
      )
      card.setBaseAnimResource(
        idle : RSX.iconEightGatesIdle.name
        active : RSX.iconEightGatesActive.name
      )

    if (identifier == Cards.Spell.SpiralTechnique)
      card = new SpellDamage(gameSession)
      card.factionId = Factions.Faction2
      card.id = Cards.Spell.SpiralTechnique
      card.name = i18next.t("cards.faction_2_spell_spiral_technique_name")
      card.setDescription(i18next.t("cards.faction_2_spell_spiral_technique_description"))
      card.manaCost = 7
      card.rarityId = Rarity.Legendary
      card.damageAmount = 8
      card.spellFilterType = SpellFilterType.NeutralDirect
      card.canTargetGeneral = true
      card.setFXResource(["FX.Cards.Spell.SpiralTechnique"])
      card.setBaseSoundResource(
        apply : RSX.sfx_spell_spiraltechnique.audio
      )
      card.setBaseAnimResource(
        idle : RSX.iconSpiralTechniqueIdle.name
        active : RSX.iconSpiralTechniqueActive.name
      )

    if (identifier == Cards.Spell.ManaVortex)
      card = new SpellApplyPlayerModifiers(gameSession)
      card.factionId = Factions.Faction2
      card.id = Cards.Spell.ManaVortex
      card.name = i18next.t("cards.faction_2_spell_mana_vortex_name")
      card.setDescription(i18next.t("cards.faction_2_spell_mana_vortex_description"))
      card.manaCost = 0
      card.rarityId = Rarity.Common
      card.applyToOwnGeneral = true
      customContextObject = PlayerModifierManaModifierSingleUse.createCostChangeContextObject(-1, CardType.Spell)
      customContextObject.durationEndTurn = 1
      card.setTargetModifiersContextObjects([
        customContextObject,
        PlayerModifierCardDrawModifier.createContextObject(1, 1),
      ])
      card.spellFilterType = SpellFilterType.None
      card.setFXResource(["FX.Cards.Spell.ManaVortex"])
      card.setBaseSoundResource(
        apply : RSX.sfx_spell_manavortex.audio
      )
      card.setBaseAnimResource(
        idle : RSX.iconManaVortexIdle.name
        active : RSX.iconManaVortexActive.name
      )

    if (identifier == Cards.Spell.InnerFocus)
      card = new SpellInnerFocus(gameSession)
      card.factionId = Factions.Faction2
      card.id = Cards.Spell.InnerFocus
      card.name = i18next.t("cards.faction_2_spell_inner_focus_name")
      card.setDescription(i18next.t("cards.faction_2_spell_inner_focus_description"))
      card.manaCost = 0
      card.maxAttack = 3
      card.rarityId = Rarity.Rare
      card.setFXResource(["FX.Cards.Spell.InnerFocus"])
      card.setBaseSoundResource(
        apply : RSX.sfx_spell_innerfocus.audio
      )
      card.setBaseAnimResource(
        idle : RSX.iconInnerFocusIdle.name
        active : RSX.iconInnerFocusActive.name
      )

    if (identifier == Cards.Spell.OnyxBearSeal)
      card = new SpellRemoveAndReplaceEntity(gameSession)
      card.factionId = Factions.Faction2
      card.id = Cards.Spell.OnyxBearSeal
      card.name = i18next.t("cards.faction_2_spell_onyx_bear_seal_name")
      card.setDescription(i18next.t("cards.faction_2_spell_onyx_bear_seal_description"))
      card.manaCost = 3
      card.rarityId = Rarity.Epic
      card.spellFilterType = SpellFilterType.NeutralDirect
      card.cardDataOrIndexToSpawn = {id: Cards.Faction2.OnyxBear}
      card.setFXResource(["FX.Cards.Spell.OnyxBearSeal"])
      card.setBaseSoundResource(
        apply : RSX.sfx_spell_onyxbearseal.audio
      )
      card.setBaseAnimResource(
        idle : RSX.iconOnyxbearSealIdle.name
        active : RSX.iconOnyxbearSealActive.name
      )

    if (identifier == Cards.Spell.GhostLightning)
      card = new SpellDamage(gameSession)
      card.factionId = Factions.Faction2
      card.id = Cards.Spell.GhostLightning
      card.name = i18next.t("cards.faction_2_spell_ghost_lightning_name")
      card.setDescription(i18next.t("cards.faction_2_spell_ghost_lightning_description"))
      card.spellFilterType = SpellFilterType.EnemyIndirect
      card.manaCost = 1
      card.rarityId = Rarity.Common
      card.damageAmount = 1
      card.radius = CONFIG.WHOLE_BOARD_RADIUS
      card.maxJumps = CONFIG.INFINITY
      card.setFXResource(["FX.Cards.Spell.GhostLightning"])
      card.setBaseSoundResource(
        apply : RSX.sfx_spell_ghostlightning.audio
      )
      card.setBaseAnimResource(
        idle : RSX.iconGhostLightningIdle.name
        active : RSX.iconGhostLightningActive.name
      )

    if (identifier == Cards.Spell.DeathstrikeSeal)
      card = new SpellApplyModifiers(gameSession)
      card.factionId = Factions.Faction2
      card.id = Cards.Spell.DeathstrikeSeal
      card.name = i18next.t("cards.faction_2_spell_deathstrike_seal_name")
      card.setDescription(i18next.t("cards.faction_2_spell_deathstrike_seal_description"))
      card.spellFilterType = SpellFilterType.AllyDirect
      card.manaCost = 2
      card.rarityId = Rarity.Rare
      killDamagedContextObject = ModifierDealDamageWatchKillTarget.createContextObject()
      killDamagedContextObject.appliedName = i18next.t("modifiers.faction_2_spell_deathstrike_seal_1")
      killDamagedContextObject.appliedDescription = i18next.t("modifiers.faction_2_spell_deathstrike_seal_2")
      card.setTargetModifiersContextObjects([
        killDamagedContextObject
      ])
      card.setFXResource(["FX.Cards.Spell.DeathstrikeSeal"])
      card.setBaseSoundResource(
        apply : RSX.sfx_spell_deathstrikeseal.audio
      )
      card.setBaseAnimResource(
        idle : RSX.iconDeathstrikeSealIdle.name
        active : RSX.iconDeathstrikeSealActive.name
      )

    if (identifier == Cards.Spell.AncestralDivination)
      if version is 0
        description = i18next.t("cards.faction_2_spell_ancestral_divination_description_0")
        drawCardsPostPlay = 0
      else
        description = i18next.t("cards.faction_2_spell_ancestral_divination_description_1")
        drawCardsPostPlay = 1
      card = new SpellApplyPlayerModifiers(gameSession)
      card.factionId = Factions.Faction2
      card.id = Cards.Spell.AncestralDivination
      card.name = i18next.t("cards.faction_2_spell_ancestral_divination_name")
      card.setDescription(description)
      card.spellFilterType = SpellFilterType.None
      card.manaCost = 1
      card.drawCardsPostPlay = drawCardsPostPlay
      card.rarityId = Rarity.Epic
      card.applyToOwnGeneral = true
      card.setTargetModifiersContextObjects([
        PlayerModifierAncestralPact.createContextObject(1),
      ])
      card.setFXResource(["FX.Cards.Spell.AncestralDivination"])
      card.setBaseAnimResource(
        idle : RSX.iconAncestralPactIdle.name
        active : RSX.iconAncestralPactActive.name
      )
      card.setBaseSoundResource(
        apply : RSX.sfx_neutral_crossbones_attack_swing.audio
      )

    if (identifier == Cards.Spell.Juxtaposition)
      card = new SpellJuxtaposition(gameSession)
      card.factionId = Factions.Faction2
      card.id = Cards.Spell.Juxtaposition
      card.name = i18next.t("cards.faction_2_spell_juxtaposition_name")
      card.setDescription(i18next.t("cards.faction_2_spell_juxtaposition_description"))
      card.spellFilterType = SpellFilterType.NeutralDirect
      card.manaCost = 0
      card.rarityId = Rarity.Epic
      card.setFollowups([{
        id: Cards.Spell.FollowupSwapPositions
      }])
      card.setFXResource(["FX.Cards.Spell.Juxtaposition"])
      card.setBaseSoundResource(
        apply : RSX.sfx_neutral_crossbones_attack_swing.audio
      )
      card.setBaseAnimResource(
        idle : RSX.iconJuxtapositionIdle.name
        active : RSX.iconJuxtapositionActive.name
      )

    if (identifier == Cards.Spell.ArtifactDefiler)
      card = new SpellRemoveArtifacts(gameSession)
      card.factionId = Factions.Faction2
      card.id = Cards.Spell.ArtifactDefiler
      card.name = i18next.t("cards.faction_2_spell_artifact_defiler_name")
      card.setDescription(i18next.t("cards.faction_2_spell_artifact_defiler_description"))
      card.manaCost = 1
      card.rarityId = Rarity.Common
      card.setFXResource(["FX.Cards.Spell.ArtifactDefiler"])
      card.setBaseSoundResource(
        apply : RSX.sfx_f6_voiceofthewind_attack_impact.audio
      )
      card.setBaseAnimResource(
        idle : RSX.iconArtifactDefilerIdle.name
        active : RSX.iconArtifactDefilerActive.name
      )

    if (identifier == Cards.Spell.HeavensEclipse)
      card = new SpellHeavensEclipse(gameSession)
      card.factionId = Factions.Faction2
      card.id = Cards.Spell.HeavensEclipse
      card.name = i18next.t("cards.faction_2_spell_heavens_eclipse_name")
      card.setDescription(i18next.t("cards.faction_2_spell_heavens_eclipse_description"))
      card.manaCost = 4
      card.numSpells = 3
      card.rarityId = Rarity.Rare
      card.setFXResource(["FX.Cards.Spell.HeavensEclipse"])
      card.setBaseSoundResource(
        apply : RSX.sfx_spell_immolation_a.audio
      )
      card.setBaseAnimResource(
        idle : RSX.iconHeavensEclipseIdle.name
        active : RSX.iconHeavensEclipseActive.name
      )

    if (identifier == Cards.Spell.MistWalking)
      card = new SpellMistWalking(gameSession)
      card.factionId = Factions.Faction2
      card.id = Cards.Spell.MistWalking
      card.name = i18next.t("cards.faction_2_spell_mist_walking_name")
      card.setDescription(i18next.t("cards.faction_2_spell_mist_walking_description"))
      card.manaCost = 1
      card.rarityId = Rarity.Common
      card.setFXResource(["FX.Cards.Spell.MistWalking"])
      card.setBaseSoundResource(
        apply : RSX.sfx_neutral_crossbones_attack_swing.audio
      )
      card.setBaseAnimResource(
        idle : RSX.iconMistWalkingIdle.name
        active : RSX.iconMistWalkingActive.name
      )

    if (identifier == Cards.Spell.KillingEdge)
      card = new SpellKillingEdge(gameSession)
      card.factionId = Factions.Faction2
      card.id = Cards.Spell.KillingEdge
      card.name = i18next.t("cards.faction_2_spell_killing_edge_name")
      card.setDescription(i18next.t("cards.faction_2_spell_killing_edge_description"))
      card.addKeywordClassToInclude(ModifierBackstab)
      card.manaCost = 3
      card.rarityId = Rarity.Rare
      card.setFXResource(["FX.Cards.Spell.KillingEdge"])
      card.spellFilterType = SpellFilterType.AllyDirect
      attackBuff = Modifier.createContextObjectWithAttributeBuffs(4,2)
      attackBuff.appliedName = i18next.t("modifiers.faction_2_spell_killing_edge_1")
      card.setTargetModifiersContextObjects([attackBuff])
      card.setBaseSoundResource(
        apply : RSX.sfx_spell_twinstrike.audio
      )
      card.setBaseAnimResource(
        idle : RSX.iconKillingEdgeIdle.name
        active : RSX.iconKillingEdgeActive.name
      )

    if (identifier == Cards.Artifact.MaskOfShadows)
      if version is 0
        manaCost = 2
        description = i18next.t("cards.faction_2_artifact_mask_of_shadows_description_0")
        atk = 0
        backstab = 5
      else if version is 1
        manaCost = 1
        description = i18next.t("cards.faction_2_artifact_mask_of_shadows_description_1")
        atk = 0
        backstab = 3
      else if version is 2
        manaCost = 1
        description = i18next.t("cards.faction_2_artifact_mask_of_shadows_description_2")
        atk = 1
        backstab = 2
      else
        manaCost = 1
        description = i18next.t("cards.faction_2_artifact_mask_of_shadows_description_3")
        atk = 1
        backstab = 3
      card = new Artifact(gameSession)
      card.factionId = Factions.Faction2
      card.id = Cards.Artifact.MaskOfShadows
      card.name = i18next.t("cards.faction_2_artifact_mask_of_shadows_name")
      card.setDescription(description)
      card.addKeywordClassToInclude(ModifierBackstab)
      card.manaCost = manaCost
      card.rarityId = Rarity.Epic
      card.setTargetModifiersContextObjects([
        (if atk is 0 then [] else [
          Modifier.createContextObjectWithAttributeBuffs(atk,undefined),
        ])...,
        ModifierBackstab.createContextObject(backstab,undefined,{
          name: i18next.t("cards.faction_2_artifact_mask_of_shadows_name")
        })
      ])
      card.setFXResource(["FX.Cards.Artifact.MaskOfShadows"])
      card.setBaseAnimResource(
        idle: RSX.iconMaskofShadowsIdle.name
        active: RSX.iconMaskofShadowsActive.name
      )
      card.setBaseSoundResource(
        apply : RSX.sfx_victory_crest.audio
      )

    if (identifier == Cards.Artifact.MaskOfTranscendance)
      if version is 0
        manaCost = 3
      else
        manaCost = 4
      card = new Artifact(gameSession)
      card.factionId = Factions.Faction2
      card.id = Cards.Artifact.MaskOfTranscendance
      card.name = i18next.t("cards.faction_2_artifact_cyclone_mask_name")
      card.setDescription(i18next.t("cards.faction_2_artifact_cyclone_mask_description"))
      card.addKeywordClassToInclude(ModifierRanged)
      card.manaCost = manaCost
      card.rarityId = Rarity.Rare
      card.setTargetModifiersContextObjects([
        ModifierRanged.createContextObject({
          name: i18next.t("cards.faction_2_artifact_cyclone_mask_name")
        })
      ])
      card.setFXResource(["FX.Cards.Artifact.MaskOfTranscendance"])
      card.setBaseAnimResource(
        idle: RSX.iconCycloneMaskIdle.name
        active: RSX.iconCycloneMaskActive.name
      )
      card.setBaseSoundResource(
        apply : RSX.sfx_victory_crest.audio
      )

    if (identifier == Cards.Artifact.MaskOfBloodLeech)
      if version is 0
        manaCost = 1
      else
        manaCost = 2
      card = new Artifact(gameSession)
      card.factionId = Factions.Faction2
      card.id = Cards.Artifact.MaskOfBloodLeech
      card.name = i18next.t("cards.faction_2_artifact_bloodrage_mask_name")
      card.setDescription(i18next.t("cards.faction_2_artifact_bloodrage_mask_description"))
      card.manaCost = manaCost
      card.rarityId = Rarity.Common
      card.setTargetModifiersContextObjects([
        ModifierSpellWatchDamageGeneral.createContextObject(1,{
          name: i18next.t("cards.faction_2_artifact_bloodrage_mask_name")
        })
      ])
      card.setFXResource(["FX.Cards.Artifact.MaskOfBloodLeech"])
      card.setBaseAnimResource(
        idle: RSX.iconBloodLeechMaskIdle.name
        active: RSX.iconBloodLeechMaskActive.name
      )
      card.setBaseSoundResource(
        apply : RSX.sfx_victory_crest.audio
      )

    return card

module.exports = CardFactory_CoreSet_Faction2
