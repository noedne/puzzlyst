# do not add this file to a package
# it is specifically parsed by the package generation script

CONFIG = require('app/common/config')
RSX = require('app/data/resources')

Cards = require 'app/sdk/cards/cardsLookupComplete'
Factions = require 'app/sdk/cards/factionsLookup'
Races = require 'app/sdk/cards/racesLookup'
Rarity = require 'app/sdk/cards/rarityLookup'

Unit = require 'app/sdk/entities/unit'
Artifact = require 'app/sdk/artifacts/artifact'

SpellFilterType = require 'app/sdk/spells/spellFilterType'
SpellApplyModifiers = require 'app/sdk/spells/spellApplyModifiers'
SpellEnslave = require 'app/sdk/spells/spellEnslave'
SpellStarsFury = require 'app/sdk/spells/spellStarsFury'
SpellRashasCurse = require 'app/sdk/spells/spellRashasCurse'
SpellRashasCurseFollowup = require 'app/sdk/spells/spellRashasCurseFollowup'
SpellAurorasTears = require 'app/sdk/spells/spellAurorasTears'
SpellTimeMaelstrom = require 'app/sdk/spells/spellTimeMaelstrom'
SpellBoneSwarm = require 'app/sdk/spells/spellBoneSwarm'
SpellFountainOfYouth = require 'app/sdk/spells/spellFountainOfYouth'
SpellApplyModifiersToGeneral = require 'app/sdk/spells/spellApplyModifiersToGeneral'
SpellEntropicDecay = require 'app/sdk/spells/spellEntropicDecay'
SpellHealYourGeneral = require 'app/sdk/spells/spellHealYourGeneral'
SpellKillTarget = require 'app/sdk/spells/spellKillTarget'

Modifier = require 'app/sdk/modifiers/modifier'
ModifierSilence = require 'app/sdk/modifiers/modifierSilence'
ModifierPortal = require 'app/sdk/modifiers/modifierPortal'
ModifierFirstBlood = require 'app/sdk/modifiers/modifierFirstBlood'
ModifierProvoke = require 'app/sdk/modifiers/modifierProvoke'
ModifierFrenzy = require 'app/sdk/modifiers/modifierFrenzy'
ModifierOpeningGambit = require 'app/sdk/modifiers/modifierOpeningGambit'
ModifierFlying = require 'app/sdk/modifiers/modifierFlying'
ModifierDyingWishEquipArtifact = require 'app/sdk/modifiers/modifierDyingWishEquipArtifact'
ModifierBlastAttack = require 'app/sdk/modifiers/modifierBlastAttack'
ModifierBlastAttackStrong = require 'app/sdk/modifiers/modifierBlastAttackStrong'
ModifierDyingWishDamageEnemyGeneralHealGeneral = require 'app/sdk/modifiers/modifierDyingWishDamageEnemyGeneralHealGeneral'
ModifierDealDamageWatchModifyTarget = require 'app/sdk/modifiers/modifierDealDamageWatchModifyTarget'
ModifierStartTurnWatchSummonDervish = require 'app/sdk/modifiers/modifierStartTurnWatchSummonDervish'
ModifierEphemeral = require 'app/sdk/modifiers/modifierEphemeral'
ModifierSummonWatchBuffSelf = require 'app/sdk/modifiers/modifierSummonWatchBuffSelf'
ModifierToken = require 'app/sdk/modifiers/modifierToken'
ModifierGeneralDealsDoubleDamage = require 'app/sdk/modifiers/modifierGeneralDealsDoubleDamage'
ModifierDispels = require 'app/sdk/modifiers/modifierDispels'
ModifierAbsorbDamage = require 'app/sdk/modifiers/modifierAbsorbDamage'
ModifierOnRemoveShuffleCopyIntoDeck = require 'app/sdk/modifiers/modifierOnRemoveShuffleCopyIntoDeck'
ModifierOpeningGambitRefreshArtifacts = require 'app/sdk/modifiers/modifierOpeningGambitRefreshArtifacts'

i18next = require 'i18next'
if i18next.t() is undefined
  i18next.t = (text) ->
    return text

class CardFactory_CoreSet_Faction3

  ###*
   * Returns a card that matches the identifier.
   * @param {Number|String} identifier
   * @param {GameSession} gameSession
   * @param {Number} version
   * @returns {Card}
   ###
  @cardForIdentifier: (identifier,gameSession,version) ->
    card = null

    if (identifier == Cards.Faction3.General)
      card = new Unit(gameSession)
      card.setIsGeneral(true)
      card.factionId = Factions.Faction3
      card.name = i18next.t("cards.faction_3_unit_zirix_name")
      card.setDescription('')
      card.manaCost = 0
      card.setBoundingBoxWidth(100)
      card.setBoundingBoxHeight(120)
      card.setPortraitResource(RSX.general_portrait_image_f3)
      card.setPortraitHexResource(RSX.general_portrait_image_hex_f3)
      card.setSpeechResource(RSX.speech_portrait_vetruvian)
      card.setConceptResource(RSX.general_f3)
      card.setAnnouncerFirstResource(RSX.sfx_announcer_vetruvian_1st)
      card.setAnnouncerSecondResource(RSX.sfx_announcer_vetruvian_2nd)
      card.setFXResource(["FX.Cards.Faction3.General"])
      card.setBaseSoundResource(
        apply : RSX.sfx_spell_ghostlightning.audio
        walk : RSX.sfx_singe2.audio
        attack : RSX.sfx_f3_general_attack_swing.audio
        receiveDamage : RSX.sfx_f3_general_hit.audio
        attackDamage : RSX.sfx_f3_general_attack_impact.audio
        death : RSX.sfx_neutral_swornavenger_death.audio
      )
      card.setBaseAnimResource(
        breathing : RSX.f3GeneralBreathing.name
        idle : RSX.f3GeneralIdle.name
        walk : RSX.f3GeneralRun.name
        attack : RSX.f3GeneralAttack.name
        attackReleaseDelay: 0.0
        attackDelay: 0.2
        damage : RSX.f3GeneralDamage.name
        death : RSX.f3GeneralDeath.name
        castStart : RSX.f3GeneralCastStart.name
        castEnd : RSX.f3GeneralCastEnd.name
        castLoop : RSX.f3GeneralCastLoop.name
        cast : RSX.f3GeneralCast.name
      )
      card.atk = 2
      card.maxHP = 25

    if (identifier == Cards.Faction3.AltGeneral)
      card = new Unit(gameSession)
      card.setIsGeneral(true)
      card.factionId = Factions.Faction3
      card.name = i18next.t("cards.faction_3_unit_sajj_name")
      card.setDescription('')
      card.manaCost = 0
      card.setBoundingBoxWidth(90)
      card.setBoundingBoxHeight(120)
      card.setPortraitResource(RSX.general_portrait_image_f3alt)
      card.setPortraitHexResource(RSX.general_portrait_image_hex_f3Alt1)
      card.setSpeechResource(RSX.speech_portrait_vetruvianalt)
      card.setConceptResource(RSX.general_f3alt)
      card.setAnnouncerFirstResource(RSX.sfx_announcer_vetruvian_1st)
      card.setAnnouncerSecondResource(RSX.sfx_announcer_vetruvian_2nd)
      card.setFXResource(["FX.Cards.Faction3.ScionessSajj"])
      card.setBaseSoundResource(
        apply : RSX.sfx_spell_ghostlightning.audio
        walk : RSX.sfx_neutral_ladylocke_attack_impact.audio
        attack : RSX.sfx_neutral_stormatha_attack_swing.audio
        receiveDamage :  RSX.sfx_f2general_hit.audio
        attackDamage : RSX.sfx_neutral_stormatha_attack_impact.audio
        death : RSX.sfx_f2mage4winds_death.audio
      )
      card.setBaseAnimResource(
        breathing : RSX.f3AltGeneralBreathing.name
        idle : RSX.f3AltGeneralIdle.name
        walk : RSX.f3AltGeneralRun.name
        attack : RSX.f3AltGeneralAttack.name
        attackReleaseDelay: 0.0
        attackDelay: 1.0
        damage : RSX.f3AltGeneralHit.name
        death : RSX.f3AltGeneralDeath.name
        castStart : RSX.f3AltGeneralCastStart.name
        castEnd : RSX.f3AltGeneralCastEnd.name
        castLoop : RSX.f3AltGeneralCastLoop.name
        cast : RSX.f3AltGeneralCast.name
      )
      card.atk = 2
      card.maxHP = 25

    if (identifier == Cards.Faction3.ThirdGeneral)
      card = new Unit(gameSession)
      card.setIsGeneral(true)
      card.factionId = Factions.Faction3
      card.name = i18next.t("cards.faction_3_unit_ciphyron_name")
      card.setDescription('')
      card.manaCost = 0
      card.setBoundingBoxWidth(90)
      card.setBoundingBoxHeight(120)
      card.setPortraitResource(RSX.general_portrait_image_f3alt)
      card.setPortraitHexResource(RSX.general_portrait_image_hex_f3Third)
      card.setSpeechResource(RSX.speech_portrait_vetruvianthird)
      card.setConceptResource(RSX.general_f3third)
      card.setAnnouncerFirstResource(RSX.sfx_announcer_vetruvian_1st)
      card.setAnnouncerSecondResource(RSX.sfx_announcer_vetruvian_2nd)
      card.setFXResource(["FX.Cards.Faction3.General"])
      card.setBaseSoundResource(
        apply : RSX.sfx_spell_ghostlightning.audio
        walk : RSX.sfx_singe2.audio
        attack : RSX.sfx_f3_anubis_attack_swing.audio
        receiveDamage : RSX.sfx_f3_general_hit.audio
        attackDamage : RSX.sfx_f3_general_attack_impact.audio
        death : RSX.sfx_neutral_swornavenger_death.audio
      )
      card.setBaseAnimResource(
        breathing : RSX.f3ThirdGeneralBreathing.name
        idle : RSX.f3ThirdGeneralIdle.name
        walk : RSX.f3ThirdGeneralRun.name
        attack : RSX.f3ThirdGeneralAttack.name
        attackReleaseDelay: 0.0
        attackDelay: 1.0
        damage : RSX.f3ThirdGeneralHit.name
        death : RSX.f3ThirdGeneralDeath.name
        castStart : RSX.f3ThirdGeneralCastStart.name
        castEnd : RSX.f3ThirdGeneralCastEnd.name
        castLoop : RSX.f3ThirdGeneralCastLoop.name
        cast : RSX.f3ThirdGeneralCast.name
      )
      card.atk = 2
      card.maxHP = 25

    if (identifier == Cards.Faction3.WindShrike)
      card = new Unit(gameSession)
      card.factionId = Factions.Faction3
      card.name = i18next.t("cards.faction_3_unit_wind_shrike_name")
      card.setDescription(i18next.t("cards.faction_3_unit_wind_shrike_desc"))
      card.setFXResource(["FX.Cards.Faction3.WindShrike"])
      card.setBoundingBoxWidth(50)
      card.setBoundingBoxHeight(80)
      card.setBaseSoundResource(
        apply : RSX.sfx_spell_ghostlightning.audio
        walk : RSX.sfx_singe2.audio
        attack : RSX.sfx_neutral_monsterdreamoracle_attack_swing.audio
        receiveDamage : RSX.sfx_neutral_monsterdreamoracle_hit.audio
        attackDamage : RSX.sfx_neutral_monsterdreamoracle_attack_impact.audio
        death : RSX.sfx_neutral_monsterdreamoracle_death.audio
      )
      card.setBaseAnimResource(
        breathing : RSX.f3WindshrikeBreathing.name
        idle : RSX.f3WindshrikeIdle.name
        walk : RSX.f3WindshrikeRun.name
        attack : RSX.f3WindshrikeAttack.name
        attackReleaseDelay: 0.0
        attackDelay: 0.4
        damage : RSX.f3WindshrikeDamage.name
        death : RSX.f3WindshrikeDeath.name
      )
      card.atk = 4
      card.maxHP = 3
      card.manaCost = 4
      card.rarityId = Rarity.Rare
      card.setInherentModifiersContextObjects([
        ModifierFlying.createContextObject(),
        ModifierDyingWishEquipArtifact.createContextObject({
          id: Cards.Artifact.StaffOfYKir,
        }),
      ])

    if (identifier == Cards.Faction3.StarfireScarab)
      card = new Unit(gameSession)
      card.factionId = Factions.Faction3
      card.name = i18next.t("cards.faction_3_unit_starfire_scarab_name")
      card.setDescription(i18next.t("cards.faction_3_unit_starfire_scarab_desc"))
      card.setFXResource(["FX.Cards.Faction3.StarfireScarab"])
      card.setBoundingBoxWidth(90)
      card.setBoundingBoxHeight(75)
      card.setBaseSoundResource(
        apply : RSX.sfx_spell_ghostlightning.audio
        walk : RSX.sfx_unit_physical_4.audio
        attack : RSX.sfx_spell_blaststarfire.audio
        receiveDamage : RSX.sfx_neutral_hailstonehowler_hit.audio
        attackDamage : RSX.sfx_neutral_hailstonehowler_attack_impact.audio
        death : RSX.sfx_neutral_hailstonehowler_death.audio
      )
      card.setBaseAnimResource(
        breathing : RSX.f3StafireScarabBreathing.name
        idle : RSX.f3StafireScarabIdle.name
        walk : RSX.f3StafireScarabRun.name
        attack : RSX.f3StafireScarabAttack.name
        attackReleaseDelay: 0.0
        attackDelay: 0.9
        damage : RSX.f3StafireScarabDamage.name
        death : RSX.f3StafireScarabDeath.name
      )
      card.atk = 4
      card.maxHP = 7
      card.manaCost = 5
      card.rarityId = Rarity.Common
      card.setInherentModifiersContextObjects([ModifierBlastAttackStrong.createContextObject()])

    if (identifier == Cards.Faction3.Pyromancer)
      card = new Unit(gameSession)
      card.factionId = Factions.Faction3
      card.name = i18next.t("cards.faction_3_unit_pyromancer_name")
      card.setDescription(i18next.t("cards.faction_3_unit_pyromancer_desc"))
      card.setFXResource(["FX.Cards.Faction3.Pyromancer"])
      card.setBoundingBoxWidth(60)
      card.setBoundingBoxHeight(60)
      card.setBaseSoundResource(
        apply : RSX.sfx_spell_blindscorch.audio
        walk : RSX.sfx_neutral_sai_attack_impact.audio
        attack : RSX.sfx_spell_blaststarfire.audio
        receiveDamage : RSX.sfx_f4_engulfingshadow_attack_impact.audio
        attackDamage : RSX.sfx_spell_immolation_a.audio
        death : RSX.sfx_f1elyxstormblade_death.audio
      )
      card.setBaseAnimResource(
        breathing : RSX.f3PyromancerBreathing.name
        idle : RSX.f3PyromancerIdle.name
        walk : RSX.f3PyromancerRun.name
        attack : RSX.f3PyromancerAttack.name
        attackReleaseDelay: 0.0
        attackDelay: 0.4
        damage : RSX.f3PyromancerDamage.name
        death : RSX.f3PyromancerDeath.name
      )
      card.atk = 2
      card.maxHP = 1
      card.manaCost = 2
      card.rarityId = Rarity.Common
      card.setInherentModifiersContextObjects([ModifierBlastAttack.createContextObject()])

    if (identifier == Cards.Faction3.SandHowler)
      if version is 0
        atk = 3
      else
        atk = 4
      card = new Unit(gameSession)
      card.factionId = Factions.Faction3
      card.name = i18next.t("cards.faction_3_unit_sand_howler_name")
      card.setDescription(i18next.t("cards.faction_3_unit_sand_howler_desc"))
      card.raceId = Races.Dervish
      card.setFXResource(["FX.Cards.Faction3.SandHowler"])
      card.setBoundingBoxWidth(65)
      card.setBoundingBoxHeight(85)
      card.setBaseSoundResource(
        apply : RSX.sfx_spell_ghostlightning.audio
        walk : RSX.sfx_singe2.audio
        attack : RSX.sfx_f2_celestialphantom_attack_swing.audio
        receiveDamage :  RSX.sfx_f2_celestialphantom_hit.audio
        attackDamage : RSX.sfx_f2_celestialphantom_attack_impact.audio
        death : RSX.sfx_f2_celestialphantom_death.audio
      )
      card.setBaseAnimResource(
        breathing : RSX.f3SandhowlerBreathing.name
        idle : RSX.f3SandhowlerIdle.name
        walk : RSX.f3SandhowlerRun.name
        attack : RSX.f3SandhowlerAttack.name
        attackReleaseDelay: 0.0
        attackDelay: 0.6
        damage : RSX.f3SandhowlerDamage.name
        death : RSX.f3SandhowlerDeath.name
      )
      card.atk = atk
      card.maxHP = 4
      card.manaCost = 4
      card.rarityId = Rarity.Epic
      card.setInherentModifiersContextObjects([
        Modifier.createContextObjectWithAuraForNearbyEnemiesAndGeneral(
          [Modifier.createContextObjectWithAttributeBuffs(-1, 0)],
          null,
          null,
          null,
          i18next.t("modifiers.faction_3_sand_howler"),
        ),
      ])

    if (identifier == Cards.Faction3.OrbWeaver)
      card = new Unit(gameSession)
      card.factionId = Factions.Faction3
      card.name = i18next.t("cards.faction_3_unit_orb_weaver_name")
      card.setDescription(i18next.t("cards.faction_3_unit_orb_weaver_desc"))
      card.raceId = Races.Dervish
      card.setFXResource(["FX.Cards.Faction3.OrbWeaver"])
      card.setBoundingBoxWidth(40)
      card.setBoundingBoxHeight(80)
      card.setBaseSoundResource(
        apply : RSX.sfx_spell_ghostlightning.audio
        walk : RSX.sfx_unit_run_magical_4.audio
        attack : RSX.sfx_f3_orbweaver_attack_swing.audio
        receiveDamage : RSX.sfx_f3_orbweaver_hit.audio
        attackDamage : RSX.sfx_f3_orbweaver_impact.audio
        death : RSX.sfx_f3_orbweaver_death.audio
      )
      card.setBaseAnimResource(
        breathing : RSX.f3DuneCasterBreathing.name
        idle : RSX.f3DuneCasterIdle.name
        walk : RSX.f3DuneCasterRun.name
        attack : RSX.f3DuneCasterAttack.name
        attackReleaseDelay: 0.0
        attackDelay: 0.5
        damage : RSX.f3DuneCasterDamage.name
        death : RSX.f3DuneCasterDeath.name
      )
      card.atk = 1
      card.maxHP = 2
      card.manaCost = 2
      card.rarityId = Rarity.Common
      card.addKeywordClassToInclude(ModifierOpeningGambit)
      card.setFollowups([{
        id: Cards.Spell.CloneSourceEntity
      }])

    if (identifier == Cards.Faction3.NightfallMechanyst)
      if version is 0
        name = i18next.t("cards.faction_3_unit_imperial_mechanyst_name_0")
        description = i18next.t("cards.faction_3_unit_imperial_mechanyst_desc_0")
        atk = 1
        maxHP = 4
        inherentModifierContextObject =
          ModifierOpeningGambitRefreshArtifacts.createContextObject()
      else
        name = i18next.t("cards.faction_3_unit_imperial_mechanyst_name_1")
        description = i18next.t("cards.faction_3_unit_imperial_mechanyst_desc_1")
        atk = 2
        maxHP = 3
        keywordClass = ModifierOpeningGambit
        followup = {
          id: Cards.Spell.ApplyModifiers,
          spellFilterType: SpellFilterType.NeutralDirect,
          targetModifiersContextObjects: [
            Modifier.createContextObjectWithAttributeBuffs(-2, 0, {
              appliedName: i18next.t("modifiers.faction_3_imperial_mechanyst"),
              durationIsUntilEndBeforeNextTurn: true,
            }),
          ],
          _private: {
            followupSourcePattern: CONFIG.PATTERN_3x3,
          },
        }
      card = new Unit(gameSession)
      card.factionId = Factions.Faction3
      card.name = name
      card.setDescription(description)
      card.setFXResource(["FX.Cards.Faction3.NightfallMechanyst"])
      card.setBaseSoundResource(
        apply : RSX.sfx_spell_ghostlightning.audio
        walk : RSX.sfx_unit_run_magical_3.audio
        attack : RSX.sfx_f2mage4winds_attack_swing.audio
        receiveDamage : RSX.sfx_f2mage4winds_hit.audio
        attackDamage : RSX.sfx_f2mage4winds_attack_impact.audio
        death : RSX.sfx_f2mage4winds_death.audio
      )
      card.setBaseAnimResource(
        breathing : RSX.f3NighfallMechanistBreathing.name
        idle : RSX.f3NighfallMechanistIdle.name
        walk : RSX.f3NighfallMechanistRun.name
        attack : RSX.f3NighfallMechanistAttack.name
        attackReleaseDelay: 0.0
        attackDelay: 0.3
        damage : RSX.f3NighfallMechanistDamage.name
        death : RSX.f3NighfallMechanistDeath.name
      )
      card.atk = atk
      card.maxHP = maxHP
      card.manaCost = 2
      card.rarityId = Rarity.Rare
      if inherentModifierContextObject?
        card.setInherentModifiersContextObjects([inherentModifierContextObject])
      if keywordClass?
        card.addKeywordClassToInclude(keywordClass)
      if followup?
        card.setFollowups([followup])

    if (identifier == Cards.Faction3.BrazierRedSand)
      card = new Unit(gameSession)
      card.factionId = Factions.Faction3
      card.name = i18next.t("cards.faction_3_unit_ethereal_obelysk_name")
      card.setDescription(i18next.t("cards.faction_3_unit_ethereal_obelysk_desc"))
      card.raceId = Races.Structure
      card.setFXResource(["FX.Cards.Faction3.BrazierRedSand"])
      card.setBaseSoundResource(
        apply : RSX.sfx_spell_divinebond.audio
        walk : RSX.sfx_singe2.audio
        attack : RSX.sfx_neutral_monsterdreamoracle_attack_swing.audio
        receiveDamage : RSX.sfx_neutral_monsterdreamoracle_hit.audio
        attackDamage : RSX.sfx_f1_general_attack_impact.audio
        death : RSX.sfx_neutral_golembloodshard_death.audio
      )
      card.setBaseAnimResource(
        breathing : RSX.f3ObeliskRedSandBreathing.name
        idle : RSX.f3ObeliskRedSandIdle.name
        walk : RSX.f3ObeliskRedSandIdle.name
        attack : RSX.f3ObeliskRedSandAttack.name
        attackReleaseDelay: 0.0
        attackDelay: 0.3
        damage : RSX.f3ObeliskRedSandDamage.name
        death : RSX.f3ObeliskRedSandDeath.name
      )
      card.atk = 0
      card.maxHP = 6
      card.manaCost = 2
      card.rarityId = Rarity.Common
      card.setInherentModifiersContextObjects([
        ModifierStartTurnWatchSummonDervish.createContextObject(),
        ModifierPortal.createContextObject()
      ])

    if (identifier == Cards.Faction3.BrazierGoldenFlame)
      card = new Unit(gameSession)
      card.factionId = Factions.Faction3
      card.name = i18next.t("cards.faction_3_unit_fireblaze_obelysk_name")
      card.setDescription(i18next.t("cards.faction_3_unit_fireblaze_obelysk_desc"))
      card.raceId = Races.Structure
      card.setFXResource(["FX.Cards.Faction3.BrazierGoldenFlame"])
      card.setBaseSoundResource(
        apply : RSX.sfx_spell_divinebond.audio
        walk : RSX.sfx_singe2.audio
        attack : RSX.sfx_neutral_monsterdreamoracle_attack_swing.audio
        receiveDamage : RSX.sfx_neutral_monsterdreamoracle_hit.audio
        attackDamage : RSX.sfx_f1_general_attack_impact.audio
        death : RSX.sfx_neutral_golembloodshard_death.audio
      )
      card.setBaseAnimResource(
        breathing : RSX.f3ObeliskGoldenFlameBreathing.name
        idle : RSX.f3ObeliskGoldenFlameIdle.name
        walk : RSX.f3ObeliskGoldenFlameIdle.name
        attack : RSX.f3ObeliskGoldenFlameAttack.name
        attackReleaseDelay: 0.0
        attackDelay: 0.3
        damage : RSX.f3ObeliskGoldenFlameDamage.name
        death : RSX.f3ObeliskGoldenFlameDeath.name
      )
      card.maxHP = 6
      card.atk = 0
      card.manaCost = 3
      card.rarityId = Rarity.Rare
      #custom context object for aura
      buffContextObject = Modifier.createContextObjectWithAttributeBuffs(1,0)
      buffContextObject.appliedName = i18next.t("modifiers.faction_3_fireblaze_obelysk_buff_name")
      card.setInherentModifiersContextObjects([
        ModifierStartTurnWatchSummonDervish.createContextObject(),
        ModifierPortal.createContextObject(),
        Modifier.createContextObjectWithAuraForAllAllies([buffContextObject], [Races.Dervish], null, null, "Your Dervishes have +1 Attack")
      ])

    if (identifier == Cards.Faction3.Dervish)
      card = new Unit(gameSession)
      card.factionId = Factions.Faction3
      card.setIsHiddenInCollection(true)
      card.name = i18next.t("cards.faction_3_unit_dervish_name")
      card.setDescription(i18next.t("cards.faction_3_unit_dervish_desc"))
      card.raceId = Races.Dervish
      card.setFXResource(["FX.Cards.Faction3.Dervish"])
      card.setBaseSoundResource(
        apply : RSX.sfx_spell_ghostlightning.audio
        walk : RSX.sfx_singe2.audio
        attack : RSX.sfx_neutral_komodocharger_attack_swing.audio
        receiveDamage : RSX.sfx_neutral_komodocharger_hit.audio
        attackDamage : RSX.sfx_neutral_komodocharger_attack_impact.audio
        death : RSX.sfx_neutral_komodocharger_death.audio
      )
      card.setBaseAnimResource(
        breathing : RSX.f3DervishBreathing.name
        idle : RSX.f3DervishIdle.name
        walk : RSX.f3DervishRun.name
        attack : RSX.f3DervishAttack.name
        attackReleaseDelay: 0.0
        attackDelay: 0.4
        damage : RSX.f3DervishDamage.name
        death : RSX.f3DervishDeath.name
      )
      card.maxHP = 2
      card.atk = 2
      card.manaCost = 1
      card.rarityId = Rarity.TokenUnit
      card.setInherentModifiersContextObjects([
        ModifierEphemeral.createContextObject(),
        ModifierFirstBlood.createContextObject()
      ])
      card.addKeywordClassToInclude(ModifierToken)

    if (identifier == Cards.Faction3.BrazierDuskWind)
      card = new Unit(gameSession)
      card.factionId = Factions.Faction3
      card.name = i18next.t("cards.faction_3_unit_windstorm_obelysk_name")
      card.setDescription(i18next.t("cards.faction_3_unit_windstorm_obelysk_desc"))
      card.raceId = Races.Structure
      card.setFXResource(["FX.Cards.Faction3.BrazierDuskWind"])
      card.setBaseSoundResource(
        apply : RSX.sfx_spell_divinebond.audio
        walk : RSX.sfx_singe2.audio
        attack : RSX.sfx_neutral_monsterdreamoracle_attack_swing.audio
        receiveDamage : RSX.sfx_neutral_monsterdreamoracle_hit.audio
        attackDamage : RSX.sfx_f1_general_attack_impact.audio
        death : RSX.sfx_neutral_golembloodshard_death.audio
      )
      card.setBaseAnimResource(
        breathing : RSX.f3ObeliskDuskWindBreathing.name
        idle : RSX.f3ObeliskDuskWindIdle.name
        walk : RSX.f3ObeliskDuskWindIdle.name
        attack : RSX.f3ObeliskDuskWindAttack.name
        attackReleaseDelay: 0.0
        attackDelay: 0.3
        damage : RSX.f3ObeliskDuskWindDamage.name
        death : RSX.f3ObeliskDuskWindDeath.name
      )
      card.maxHP = 6
      card.atk = 0
      card.manaCost = 3
      card.rarityId = Rarity.Epic
      buffContextObject = Modifier.createContextObjectOnBoard({
        attributeBuffs: { speed: 1 },
        appliedName: i18next.t("modifiers.faction_3_windstorm_obelysk_buff_name"),
        description: i18next.t("modifiers.faction_3_windstorm_obelysk_buff_description"),
      })
      card.setInherentModifiersContextObjects([
        ModifierStartTurnWatchSummonDervish.createContextObject(),
        ModifierPortal.createContextObject(),
        Modifier.createContextObjectWithAuraForAllAllies([buffContextObject], [Races.Dervish], null, null, "Your Dervishes can move an additional space.")
      ])

    if (identifier == Cards.Faction3.Dunecaster)
      card = new Unit(gameSession)
      card.factionId = Factions.Faction3
      card.name = i18next.t("cards.faction_3_unit_dunecaster_name")
      card.setDescription(i18next.t("cards.faction_3_unit_dunecaster_desc"))
      card.raceId = Races.Dervish
      card.setFXResource(["FX.Cards.Faction3.Dunecaster"])
      card.setBaseSoundResource(
        apply : RSX.sfx_spell_ghostlightning.audio
        walk : RSX.sfx_singe2.audio
        attack : RSX.sfx_f3_dunecaster_attack_swing.audio
        receiveDamage : RSX.sfx_f3_dunecaster_hit.audio
        attackDamage : RSX.sfx_f3_dunecaster_impact.audio
        death : RSX.sfx_f3_dunecaster_death.audio
      )
      card.setBaseAnimResource(
        breathing : RSX.f3OrbweaverBreathing.name
        idle : RSX.f3OrbweaverIdle.name
        walk : RSX.f3OrbweaverRun.name
        attack : RSX.f3OrbweaverAttack.name
        attackReleaseDelay: 0.0
        attackDelay: 0.3
        damage : RSX.f3OrbweaverDamage.name
        death : RSX.f3OrbweaverDeath.name
      )
      card.atk = 2
      card.maxHP = 1
      card.manaCost = 2
      card.rarityId = Rarity.Common
      statBuff = Modifier.createContextObjectWithAttributeBuffs(2,2)
      statBuff.appliedName = i18next.t("modifiers.faction_3_followup_dunecaster_1")
      card.setFollowups([
        {
          id: Cards.Spell.DunecasterFollowup
          targetModifiersContextObjects:  [
            statBuff
          ]
          filterRaceIds: [Races.Dervish]
          spellFilterType: SpellFilterType.NeutralDirect
        }
      ])
      card.addKeywordClassToInclude(ModifierOpeningGambit)

    if (identifier == Cards.Faction3.MirrorMaster)
      card = new Unit(gameSession)
      card.factionId = Factions.Faction3
      card.name = i18next.t("cards.faction_3_unit_mirage_master_name")
      card.setDescription(i18next.t("cards.faction_3_unit_mirage_master_desc"))
      card.setFXResource(["FX.Cards.Faction3.MirrorMaster"])
      card.setBoundingBoxWidth(75)
      card.setBoundingBoxHeight(50)
      card.setBaseSoundResource(
        apply : RSX.sfx_ui_booster_packexplode.audio
        walk : RSX.sfx_singe2.audio
        attack : RSX.sfx_neutral_beastphasehound_attack_swing.audio
        receiveDamage : RSX.sfx_neutral_beastphasehound_hit.audio
        attackDamage : RSX.sfx_neutral_beastphasehound_attack_impact.audio
        death : RSX.sfx_neutral_beastphasehound_death.audio
      )
      card.setBaseAnimResource(
        breathing : RSX.f3MirrorMasterBreathing.name
        idle : RSX.f3MirrorMasterIdle.name
        walk : RSX.f3MirrorMasterRun.name
        attack : RSX.f3MirrorMasterAttack.name
        attackReleaseDelay: 0.0
        attackDelay: 0.4
        damage : RSX.f3MirrorMasterDamage.name
        death : RSX.f3MirrorMasterDeath.name
      )
      card.atk = 1
      card.maxHP = 1
      card.manaCost = 4
      card.rarityId = Rarity.Rare
      card.setFollowups([
        {
          id: Cards.Spell.CloneTargetEntity
          spellFilterType: SpellFilterType.NeutralDirect
        }
      ])
      card.addKeywordClassToInclude(ModifierOpeningGambit)

    if (identifier == Cards.Faction3.AymaraHealer)
      card = new Unit(gameSession)
      card.factionId = Factions.Faction3
      card.name = i18next.t("cards.faction_3_unit_aymara_healer_name")
      card.setDescription(i18next.t("cards.faction_3_unit_aymara_healer_desc"))
      card.setBoundingBoxWidth(35)
      card.setBoundingBoxHeight(90)
      card.setFXResource(["FX.Cards.Faction3.AymaraHealer"])
      card.setBaseSoundResource(
        apply : RSX.sfx_summonlegendary.audio
        walk : RSX.sfx_singe2.audio
        attack : RSX.sfx_f3_aymarahealer_attack_swing.audio
        receiveDamage : RSX.sfx_f3_aymarahealer_hit.audio
        attackDamage : RSX.sfx_f3_aymarahealer_impact.audio
        death : RSX.sfx_f3_aymarahealer_death.audio
      )
      card.setBaseAnimResource(
        breathing : RSX.f3AymaraHealerBreathing.name
        idle : RSX.f3AymaraHealerIdle.name
        walk : RSX.f3AymaraHealerRun.name
        attack : RSX.f3AymaraHealerAttack.name
        attackReleaseDelay: 0.0
        attackDelay: 0.7
        damage : RSX.f3AymaraHealerDamage.name
        death : RSX.f3AymaraHealerDeath.name
      )
      card.atk = 5
      card.maxHP = 5
      card.manaCost = 6
      card.rarityId = Rarity.Legendary
      card.setInherentModifiersContextObjects([ModifierProvoke.createContextObject(), ModifierDyingWishDamageEnemyGeneralHealGeneral.createContextObject(5)])

    if (identifier == Cards.Faction3.PortalGuardian)
      if version is 0
        atk = 0
      else
        atk = 1
      card = new Unit(gameSession)
      card.factionId = Factions.Faction3
      card.name = i18next.t("cards.faction_3_unit_portal_guardian_name")
      card.setDescription(i18next.t("cards.faction_3_unit_portal_guardian_desc"))
      card.setFXResource(["FX.Cards.Faction3.PortalGuardian"])
      card.setBoundingBoxWidth(65)
      card.setBoundingBoxHeight(95)
      card.setBaseSoundResource(
        apply : RSX.sfx_ui_booster_packexplode.audio
        walk : RSX.sfx_singe2.audio
        attack : RSX.sfx_f1_oserix_attack_swing.audio
        receiveDamage : RSX.sfx_f1_oserix_hit.audio
        attackDamage : RSX.sfx_f1_oserix_attack_impact.audio
        death : RSX.sfx_f1_oserix_death.audio
      )
      card.setBaseAnimResource(
        breathing : RSX.f3PortalGuardianBreathing.name
        idle : RSX.f3PortalGuardianIdle.name
        walk : RSX.f3PortalGuardianRun.name
        attack : RSX.f3PortalGuardianAttack.name
        attackReleaseDelay: 0.0
        attackDelay: 0.4
        damage : RSX.f3PortalGuardianDamage.name
        death : RSX.f3PortalGuardianDeath.name
      )
      card.atk = atk
      card.maxHP = 7
      card.manaCost = 3
      card.rarityId = Rarity.Epic
      summonWatchBuffSelf = ModifierSummonWatchBuffSelf.createContextObject(1,0,"Guardian\'s Duty")
      card.setInherentModifiersContextObjects([
        summonWatchBuffSelf,
        ModifierFrenzy.createContextObject()
      ])

    if (identifier == Cards.Faction3.Oserix)
      card = new Unit(gameSession)
      card.factionId = Factions.Faction3
      card.name = i18next.t("cards.faction_3_unit_oserix_name")
      card.setDescription(i18next.t("cards.faction_3_unit_oserix_desc"))
      card.setFXResource(["FX.Cards.Faction3.Oserix"])
      card.setBoundingBoxWidth(60)
      card.setBoundingBoxHeight(105)
      card.setBaseSoundResource(
        apply : RSX.sfx_summonlegendary.audio
        walk : RSX.sfx_singe2.audio
        attack : RSX.sfx_f3_anubis_attack_swing.audio
        receiveDamage : RSX.sfx_f3_anubis_hit.audio
        attackDamage : RSX.sfx_f3_anubis_attack_impact.audio
        death : RSX.sfx_f3_anubis_death.audio
      )
      card.setBaseAnimResource(
        breathing : RSX.f3OserixBreathing.name
        idle : RSX.f3OserixIdle.name
        walk : RSX.f3OserixRun.name
        attack : RSX.f3OserixAttack.name
        attackReleaseDelay: 0.0
        attackDelay: 0.8
        damage : RSX.f3OserixDamage.name
        death : RSX.f3OserixDeath.name
      )
      card.atk = 8
      card.maxHP = 6
      card.manaCost = 7
      card.rarityId = Rarity.Legendary
      card.setInherentModifiersContextObjects([
        ModifierBlastAttackStrong.createContextObject(),
        ModifierGeneralDealsDoubleDamage.createContextObject(),
      ])

    if (identifier == Cards.Spell.Enslave)
      card = new SpellEnslave(gameSession)
      card.factionId = Factions.Faction3
      card.id = Cards.Spell.Enslave
      card.name = i18next.t("cards.faction_3_spell_dominate_will_name")
      card.setDescription(i18next.t("cards.faction_3_spell_dominate_will_description"))
      card.manaCost = 7
      card.rarityId = Rarity.Rare
      card.filterNearGeneral = true
      card.setFXResource(["FX.Cards.Spell.Enslave"])
      card.setBaseSoundResource(
        apply : RSX.sfx_spell_voidpulse.audio
      )
      card.setBaseAnimResource(
        idle : RSX.iconEnslaveIdle.name
        active : RSX.iconEnslaveActive.name
      )

    if (identifier == Cards.Spell.SiphonEnergy)
      if version is 0
        description = i18next.t("cards.faction_3_spell_siphon_energy_description_0")
        spellFilterType = SpellFilterType.EnemyDirect
      else
        description = i18next.t("cards.faction_3_spell_siphon_energy_description_1")
        spellFilterType = SpellFilterType.NeutralDirect
      card = new SpellApplyModifiers(gameSession)
      card.factionId = Factions.Faction3
      card.id = Cards.Spell.SiphonEnergy
      card.name = i18next.t("cards.faction_3_spell_siphon_energy_name")
      card.setDescription(description)
      card.manaCost = 0
      card.rarityId = Rarity.Common
      card.spellFilterType = spellFilterType
      card.setTargetModifiersContextObjects([ModifierSilence.createContextObject()])
      card.addKeywordClassToInclude(ModifierDispels)
      card.setFXResource(["FX.Cards.Spell.SiphonEnergy"])
      card.setBaseSoundResource(
        apply : RSX.sfx_spell_tranquility.audio
      )
      card.setBaseAnimResource(
        idle : RSX.iconSiphonEnergyIdle.name
        active : RSX.iconSiphonEnergyActive.name
      )

    if (identifier == Cards.Spell.CosmicFlesh)
      card = new SpellApplyModifiers(gameSession)
      card.factionId = Factions.Faction3
      card.id = Cards.Spell.CosmicFlesh
      if version is 0
        card.name = i18next.t("cards.faction_3_spell_cosmic_flesh_name_0")
        card.setDescription(i18next.t("cards.faction_3_spell_cosmic_flesh_description_0"))
        card.manaCost = 2
        card.rarityId = Rarity.Common
        card.spellFilterType = SpellFilterType.NeutralDirect
        card.setTargetModifiersContextObjects([
          ModifierProvoke.createContextObject(),
          Modifier.createContextObjectWithAttributeBuffs(1, 3, {
            appliedName: i18next.t("modifiers.faction_3_spell_cosmic_flesh_1")
          }),
        ])
        card.addKeywordClassToInclude(ModifierProvoke)
      else
        if version is 1
          description = i18next.t("cards.faction_3_spell_cosmic_flesh_description_1")
          manaCost = 4
          buffAmount = 3
        else if version is 2
          description = i18next.t("cards.faction_3_spell_cosmic_flesh_description_2")
          manaCost = 3
          buffAmount = 2
        else
          description = i18next.t("cards.faction_3_spell_cosmic_flesh_description_1")
          manaCost = 3
          buffAmount = 3
        card.name = i18next.t("cards.faction_3_spell_cosmic_flesh_name_1")
        card.setDescription(description)
        card.manaCost = manaCost
        card.rarityId = Rarity.Epic
        card.spellFilterType = SpellFilterType.AllyDirect
        card.setTargetModifiersContextObjects([
          Modifier.createContextObjectWithAttributeBuffs(buffAmount, 0)
        ])
        card.setFollowups([{
          id: Cards.Spell.ApplyModifiers,
          spellFilterType: SpellFilterType.AllyDirect,
          targetModifiersContextObjects: [
            Modifier.createContextObjectWithAttributeBuffs(0, buffAmount)
          ],
          _private: {
            followups: [{
              id: Cards.Spell.ApplyModifiers,
              spellFilterType: SpellFilterType.AllyDirect,
              targetModifiersContextObjects: [
                ModifierBlastAttack.createContextObject({ durationEndTurn: 1 })
              ],
            }],
          },
        }])
        card.addKeywordClassToInclude(ModifierBlastAttack)
      card.setFXResource(["FX.Cards.Spell.CosmicFlesh"])
      card.setBaseSoundResource(
        apply : RSX.sfx_spell_cosmicflesh.audio
      )
      card.setBaseAnimResource(
        idle : RSX.iconCosmicFleshIdle.name
        active : RSX.iconCosmicFleshActive.name
      )

    if (identifier == Cards.Spell.Blindscorch)
      if version is 0
        rarityId = Rarity.Rare
      else
        rarityId = Rarity.Common
      card = new SpellApplyModifiers(gameSession)
      card.factionId = Factions.Faction3
      card.id = Cards.Spell.Blindscorch
      card.name = i18next.t("cards.faction_3_spell_blindscorch_name")
      card.setDescription(i18next.t("cards.faction_3_spell_blindscorch_description"))
      card.manaCost = 1
      card.rarityId = rarityId
      customContextObject = Modifier.createContextObjectWithAttributeBuffs(0,0)
      customContextObject.attributeBuffs.atk = 0
      customContextObject.attributeBuffsAbsolute = ["atk"]
      customContextObject.durationIsUntilStartOfNextTurn = true
      customContextObject.appliedName = i18next.t("modifiers.faction_3_spell_blindscorch_1")
      customContextObject.appliedDescription = i18next.t("modifiers.faction_3_spell_blindscorch_2")
      card.setTargetModifiersContextObjects([customContextObject])
      card.setFXResource(["FX.Cards.Spell.Blindscorch"])
      card.setBaseSoundResource(
        apply : RSX.sfx_spell_blindscorch.audio
      )
      card.setBaseAnimResource(
        idle : RSX.iconBlindScorchIdle.name
        active : RSX.iconBlindScorchActive.name
      )

    if (identifier == Cards.Spell.AstralPhasing)
      card = new SpellApplyModifiers(gameSession)
      card.factionId = Factions.Faction3
      card.id = Cards.Spell.AstralPhasing
      card.name = i18next.t("cards.faction_3_spell_astral_phasing_name")
      card.setDescription(i18next.t("cards.faction_3_spell_astral_phasing_description"))
      card.addKeywordClassToInclude(ModifierFlying)
      card.manaCost = 3
      card.rarityId = Rarity.Common
      card.spellFilterType = SpellFilterType.NeutralDirect
      statBuff = Modifier.createContextObjectWithAttributeBuffs(0,6)
      statBuff.appliedName = i18next.t("modifiers.faction_3_spell_astral_phasing_1")
      card.setTargetModifiersContextObjects([
        ModifierFlying.createContextObject(),
        statBuff
      ])
      card.setFXResource(["FX.Cards.Spell.AstralPhasing"])
      card.setBaseSoundResource(
        apply : RSX.sfx_unit_run_magical_4.audio
      )
      card.setBaseAnimResource(
        idle : RSX.iconAstralPhasingIdle.name
        active : RSX.iconAstralPhasingActive.name
      )

    if (identifier == Cards.Spell.AurorasTears)
      if version is 0
        rarityId = Rarity.Epic
      else
        rarityId = Rarity.Rare
      card = new SpellAurorasTears(gameSession)
      card.factionId = Factions.Faction3
      card.id = Cards.Spell.AurorasTears
      card.name = i18next.t("cards.faction_3_spell_auroras_tears_name")
      card.setDescription(i18next.t("cards.faction_3_spell_auroras_tears_description"))
      card.manaCost = 1
      card.rarityId = rarityId
      card.spellFilterType = SpellFilterType.NeutralIndirect
      card.setFXResource(["FX.Cards.Spell.AurorasTears"])
      card.setBaseSoundResource(
        apply : RSX.sfx_neutral_spelljammer_attack_swing.audio
      )
      card.setBaseAnimResource(
        idle : RSX.iconAurorasTearIdle.name
        active : RSX.iconAurorasTearActive.name
      )

    if (identifier == Cards.Spell.EntropicDecay)
      spell = SpellKillTarget
      manaCost = 4
      spellFilterType = SpellFilterType.NeutralDirect
      filterNearGeneral = false
      filterNearAlly = false
      if version is 0
        description = i18next.t("cards.faction_3_spell_entropic_decay_description_0")
        filterNearGeneral = true
      else if version is 1
        description = i18next.t("cards.faction_3_spell_entropic_decay_description_1")
        filterNearAlly = true
      else
        spell = SpellEntropicDecay
        manaCost = 3
        description = i18next.t("cards.faction_3_spell_entropic_decay_description_2")
        spellFilterType = SpellFilterType.NeutralIndirect
      card = new spell(gameSession)
      card.factionId = Factions.Faction3
      card.id = Cards.Spell.EntropicDecay
      card.name = i18next.t("cards.faction_3_spell_entropic_decay_name")
      card.setDescription(description)
      card.manaCost = manaCost
      card.rarityId = Rarity.Common
      card.spellFilterType = spellFilterType
      card.filterNearGeneral = filterNearGeneral
      card.filterNearAlly = filterNearAlly
      card.setFXResource(["FX.Cards.Spell.EntropicDecay"])
      card.setBaseSoundResource(
        apply : RSX.sfx_spell_entropicdecay.audio
      )
      card.setBaseAnimResource(
        idle : RSX.iconEntropicDecayIdle.name
        active : RSX.iconEntropicDecayActive.name
      )

    if (identifier == Cards.Spell.Maelstrom)
      card = new SpellTimeMaelstrom(gameSession)
      card.factionId = Factions.Faction3
      card.id = Cards.Spell.Maelstrom
      card.name = i18next.t("cards.faction_3_spell_time_maelstrom_name")
      card.setDescription(i18next.t("cards.faction_3_spell_time_maelstrom_description"))
      card.manaCost = 9
      card.rarityId = Rarity.Legendary
      card.setFXResource(["FX.Spell.FireTornado","FX.Cards.Spell.Maelstrom"])
      card.setBaseSoundResource(
        apply : RSX.sfx_spell_manavortex.audio
      )
      card.setBaseAnimResource(
        idle : RSX.iconMaelstromIdle.name
        active : RSX.iconMaelstromActive.name
      )

    if (identifier == Cards.Spell.DrainMorale)
      card = new SpellApplyModifiers(gameSession)
      card.factionId = Factions.Faction3
      card.id = Cards.Spell.DrainMorale
      card.name = i18next.t("cards.faction_3_spell_sand_trap_name")
      card.setDescription(i18next.t("cards.faction_3_spell_sand_trap_description"))
      card.manaCost = 2
      card.rarityId = Rarity.Common
      card.spellFilterType = SpellFilterType.NeutralDirect
      card.drawCardsPostPlay = 1
      speedBuffContextObject = Modifier.createContextObjectOnBoard()
      speedBuffContextObject.attributeBuffs = {"speed": 0}
      speedBuffContextObject.attributeBuffsAbsolute = ["speed"]
      speedBuffContextObject.attributeBuffsFixed = ["speed"]
      speedBuffContextObject.appliedName = i18next.t("modifiers.faction_3_spell_sand_trap_1")
      card.setTargetModifiersContextObjects([speedBuffContextObject])
      card.setFXResource(["FX.Cards.Spell.SandTrap"])
      card.setBaseAnimResource(
        idle: RSX.iconSandTrapIdle.name
        active: RSX.iconSandTrapActive.name
      )
      card.setBaseSoundResource(
        apply : RSX.sfx_spell_drainmorale.audio
      )

    if (identifier == Cards.Spell.ScionsFirstWish)
      card = new SpellApplyModifiers(gameSession)
      card.factionId = Factions.Faction3
      card.id = Cards.Spell.ScionsFirstWish
      card.name = i18next.t("cards.faction_3_spell_scions_first_wish_name")
      card.setDescription(i18next.t("cards.faction_3_spell_scions_first_wish_description"))
      card.manaCost = 1
      card.drawCardsPostPlay = 1
      card.rarityId = Rarity.Common
      card.setFXResource(["FX.Spell.FireTornado","FX.Cards.Spell.ScionsFirstWish"])
      card.spellFilterType = SpellFilterType.NeutralDirect
      attackBuff = Modifier.createContextObjectWithAttributeBuffs(1,1)
      attackBuff.appliedName = i18next.t("modifiers.faction_3_spell_scions_first_wish_1")
      card.setTargetModifiersContextObjects([attackBuff])
      card.setBaseSoundResource(
        apply : RSX.sfx_spell_scionsfirstwish.audio
      )
      card.setBaseAnimResource(
        idle : RSX.iconScionsFirstWishIdle.name
        active : RSX.iconScionsFirstWishActive.name
      )

    if (identifier == Cards.Spell.ScionsSecondWish)
      card = new SpellHealYourGeneral(gameSession)
      card.factionId = Factions.Faction3
      card.id = Cards.Spell.ScionsSecondWish
      card.name = i18next.t("cards.faction_3_spell_scions_second_wish_name")
      card.setDescription(i18next.t("cards.faction_3_spell_scions_second_wish_description"))
      card.manaCost = 2
      card.healModifier = 2
      card.rarityId = Rarity.Rare
      card.setFXResource(["FX.Spell.FireTornado","FX.Cards.Spell.ScionsSecondWish"])
      card.spellFilterType = SpellFilterType.AllyIndirect
      card.drawCardsPostPlay = 2
      card.setBaseSoundResource(
        apply : RSX.sfx_spell_scionsfirstwish.audio
      )
      card.setBaseAnimResource(
        idle : RSX.iconScionsSecondWishIdle.name
        active : RSX.iconFScionsSecondWishActive.name
      )

    if (identifier == Cards.Spell.ScionsThirdWish)
      card = new SpellApplyModifiersToGeneral(gameSession)
      card.factionId = Factions.Faction3
      card.id = Cards.Spell.ScionsThirdWish
      card.name = i18next.t("cards.faction_3_spell_scions_third_wish_name")
      card.setDescription(i18next.t("cards.faction_3_spell_scions_third_wish_description"))
      card.manaCost = 3
      card.rarityId = Rarity.Epic
      card.setFXResource(["FX.Spell.FireTornado","FX.Cards.Spell.ScionsThirdWish"])
      card.spellFilterType = SpellFilterType.None
      card.applyToOwnGeneral = true
      card.setTargetModifiersContextObjects([
        Modifier.createContextObjectWithAttributeBuffs(3, 0, {
          durationEndTurn: 1,
        }),
        Modifier.createContextObjectOnBoard({
          attributeBuffs: { speed: 3 },
          attributeBuffsAbsolute: ["speed"],
          durationEndTurn: 1,
        }),
        ModifierAbsorbDamage.createContextObject(3, {
          durationEndTurn: 1,
        }),
      ])
      card.setBaseSoundResource(
        apply : RSX.sfx_spell_scionsfirstwish.audio
      )
      card.setBaseAnimResource(
        idle : RSX.iconScionsThirdWishIdle.name
        active : RSX.iconScionsThirdWishActive.name
      )

    if (identifier == Cards.Spell.RashasCurse)
      card = new SpellRashasCurse(gameSession)
      card.factionId = Factions.Faction3
      card.id = Cards.Spell.RashasCurse
      card.name = i18next.t("cards.faction_3_spell_rashas_curse_name")
      card.setDescription(i18next.t("cards.faction_3_spell_rashas_curse_description"))
      card.addKeywordClassToInclude(ModifierFirstBlood)
      card.manaCost = 2
      card.rarityId = Rarity.Rare
      card.setFXResource(["FX.Cards.Spell.RashasCurse"])
      card.setFollowups([
        {
          id: Cards.Spell.RashasCurseFollowup
          cardDataOrIndexToSpawn: {id: Cards.Faction3.Dervish}
          _private: {
            followupSourcePattern: CONFIG.PATTERN_3x3
          }
        }
      ])
      card.setBaseSoundResource(
        apply : RSX.sfx_spell_entropicdecay.audio
      )
      card.setBaseAnimResource(
        idle : RSX.iconRashasCurseIdle.name
        active : RSX.iconRashasCurseActive.name
      )

    if (identifier == Cards.Spell.RashasCurseFollowup)
      card = new SpellRashasCurseFollowup(gameSession)
      card.factionId = Factions.Faction3
      card.setIsHiddenInCollection(true)
      card.id = Cards.Spell.RashasCurseFollowup
      card.name = i18next.t("cards.faction_3_spell_rashas_curse_name")
      card.setDescription(i18next.t("cards.faction_3_spell_rashas_curse_description"))
      card.addKeywordClassToInclude(ModifierFirstBlood)
      card.manaCost = 0
      card.rarityId = Rarity.Rare
      card.setBaseSoundResource(
        apply : RSX.sfx_spell_entropicdecay.audio
      )
      card.setBaseAnimResource(
        idle : RSX.iconRashasCurseIdle.name
        active : RSX.iconRashasCurseActive.name
      )

    if (identifier == Cards.Spell.StarsFury)
      card = new SpellStarsFury(gameSession)
      card.factionId = Factions.Faction3
      card.id = Cards.Spell.StarsFury
      card.name = i18next.t("cards.faction_3_spell_stars_fury_name")
      card.setDescription(i18next.t("cards.faction_3_spell_stars_fury_description"))
      card.addKeywordClassToInclude(ModifierFirstBlood)
      card.manaCost = 5
      card.rarityId = Rarity.Legendary
      card.setFXResource(["FX.Cards.Spell.StarsFury"])
      card.setBaseSoundResource(
        apply : RSX.sfx_spell_starsfury.audio
      )
      card.setBaseAnimResource(
        idle : RSX.iconStarsFuryIdle.name
        active : RSX.iconStarsFuryActive.name
      )

    if (identifier == Cards.Spell.BoneSwarm)
      card = new SpellBoneSwarm(gameSession)
      card.factionId = Factions.Faction3
      card.id = Cards.Spell.BoneSwarm
      card.name = i18next.t("cards.faction_3_spell_bone_swarm_name")
      card.setDescription(i18next.t("cards.faction_3_spell_bone_swarm_description"))
      card.manaCost = 2
      card.damageAmount = 2
      card.rarityId = Rarity.Common
      card.setFXResource(["FX.Cards.Spell.BoneSwarm"])
      card.setBaseAnimResource(
        idle : RSX.iconBoneSwarmIdle.name
        active : RSX.iconBoneSwarmActive.name
      )
      card.setBaseSoundResource(
        apply : RSX.sfx_spell_boneswarm.audio
      )

    if (identifier == Cards.Spell.FountainOfYouth)
      card = new SpellFountainOfYouth(gameSession)
      card.factionId = Factions.Faction3
      card.id = Cards.Spell.FountainOfYouth
      card.name = i18next.t("cards.faction_3_spell_fountain_of_youth_name")
      card.setDescription(i18next.t("cards.faction_3_spell_fountain_of_youth_description"))
      card.manaCost = 0
      card.rarityId = Rarity.Epic
      card.setFXResource(["FX.Cards.Spell.FountainOfYouth"])
      card.setBaseSoundResource(
        apply : RSX.sfx_spell_fountainofyouth.audio
      )
      card.setBaseAnimResource(
        idle : RSX.iconFountainYouthIdle.name
        active : RSX.iconFountainYouthActive.name
      )

    if (identifier == Cards.Spell.InnerOasis)
      card = new SpellApplyModifiers(gameSession)
      card.factionId = Factions.Faction3
      card.id = Cards.Spell.InnerOasis
      card.name = i18next.t("cards.faction_3_spell_inner_oasis_name")
      card.setDescription(i18next.t("cards.faction_3_spell_inner_oasis_description"))
      card.spellFilterType = SpellFilterType.AllyIndirect
      card.manaCost = 3
      card.drawCardsPostPlay = 1
      card.rarityId = Rarity.Rare
      buffContextObject = Modifier.createContextObjectWithAttributeBuffs(0,3)
      buffContextObject.appliedName = i18next.t("modifiers.faction_3_spell_inner_oasis_1")
      card.setTargetModifiersContextObjects([
        buffContextObject
      ])
      card.radius = CONFIG.WHOLE_BOARD_RADIUS
      card.setFXResource(["FX.Cards.Spell.InnerOasis"])
      card.setBaseSoundResource(
        apply : RSX.sfx_spell_tranquility.audio
      )
      card.setBaseAnimResource(
        idle : RSX.iconInnerOasisIdle.name
        active : RSX.iconInnerOasisActive.name
      )

    if (identifier == Cards.Artifact.StaffOfYKir)
      card = new Artifact(gameSession)
      card.factionId = Factions.Faction3
      card.id = Cards.Artifact.StaffOfYKir
      card.name = i18next.t("cards.faction_3_artifact_staff_of_ykir_name")
      card.setDescription(i18next.t("cards.faction_3_artifact_staff_of_ykir_description"))
      card.manaCost = 2
      card.rarityId = Rarity.Common
      card.setTargetModifiersContextObjects([
        Modifier.createContextObjectWithAttributeBuffs(2,0,{
          name: i18next.t("cards.faction_3_artifact_staff_of_ykir_name")
          description: i18next.t("modifiers.plus_attack_key",{amount:2})
        }),
        ModifierOnRemoveShuffleCopyIntoDeck.createContextObject(),
      ])
      card.setFXResource(["FX.Cards.Artifact.StaffOfYKir"])
      card.setBaseAnimResource(
        idle: RSX.iconStaffYkirIdle.name
        active: RSX.iconStaffYkirActive.name
      )
      card.setBaseSoundResource(
        apply : RSX.sfx_victory_crest.audio
      )

    if (identifier == Cards.Artifact.AnkhFireNova)
      card = new Artifact(gameSession)
      card.factionId = Factions.Faction3
      card.id = Cards.Artifact.AnkhFireNova
      card.name = i18next.t("cards.faction_3_artifact_wildfire_ankh_name")
      card.setDescription(i18next.t("cards.faction_3_artifact_wildfire_ankh_description"))
      card.addKeywordClassToInclude(ModifierBlastAttack)
      card.manaCost = 3
      card.rarityId = Rarity.Rare
      card.setTargetModifiersContextObjects([
        ModifierBlastAttack.createContextObject({
          type: "ModifierBlastAttack"
          name: i18next.t("cards.faction_3_artifact_wildfire_ankh_name")
        })
      ])
      card.setFXResource(["FX.Cards.Artifact.AnkhFireNova"])
      card.setBaseAnimResource(
        idle: RSX.iconWildfireAnkhIdle.name
        active: RSX.iconWildfireAnkhActive.name
      )
      card.setBaseSoundResource(
        apply : RSX.sfx_victory_crest.audio
      )

    if (identifier == Cards.Artifact.PoisonHexblade)
      if version is 0
        description = i18next.t("cards.faction_3_artifact_hexblade_description_0")
        minionOnly = true
      else
        description = i18next.t("cards.faction_3_artifact_hexblade_description_1")
        customContextObjectOptions = { durationIsUntilEndBeforeNextTurn: true }
        minionOnly = false
      card = new Artifact(gameSession)
      card.factionId = Factions.Faction3
      card.id = Cards.Artifact.PoisonHexblade
      card.name = i18next.t("cards.faction_3_artifact_hexblade_name")
      card.setDescription(description)
      card.manaCost = 4
      card.rarityId = Rarity.Epic
      customContextObject = Modifier.createContextObjectWithAttributeBuffs(1,0)
      customContextObject.attributeBuffsAbsolute = ["atk"]
      customContextObject.appliedName = i18next.t("modifiers.faction_3_artifact_hexblade_2")
      customContextObject.appliedDescription = i18next.t("modifiers.faction_3_artifact_hexblade_3")
      if customContextObjectOptions?
        Object.assign(customContextObject, customContextObjectOptions)
      card.setTargetModifiersContextObjects([
        Modifier.createContextObjectWithAttributeBuffs(3,0,{
          name: i18next.t("cards.faction_3_artifact_hexblade_name")
          description: i18next.t("modifiers.plus_attack_key",{amount:3})
        }),
        ModifierDealDamageWatchModifyTarget.createContextObject([customContextObject], i18next.t("modifiers.faction_3_artifact_hexblade_4"),{
          name: i18next.t("cards.faction_3_artifact_hexblade_name")
          description: i18next.t("modifiers.faction_3_artifact_hexblade_1")
          minionOnly
        })
      ])
      card.setFXResource(["FX.Cards.Artifact.PoisonHexblade"])
      card.setBaseAnimResource(
        idle: RSX.iconHexBladeIdle.name
        active: RSX.iconHexBladeActive.name
      )
      card.setBaseSoundResource(
        apply : RSX.sfx_victory_crest.audio
      )

    return card

module.exports = CardFactory_CoreSet_Faction3
