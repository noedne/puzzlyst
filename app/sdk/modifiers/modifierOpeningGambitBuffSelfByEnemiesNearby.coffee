ModifierOpeningGambit = require './modifierOpeningGambit'
Stringifiers = require 'app/sdk/helpers/stringifiers'
Modifier = require './modifier'
CardType = require 'app/sdk/cards/cardType'

class ModifierOpeningGambitBuffSelfByEnemiesNearby extends ModifierOpeningGambit

  type: "ModifierOpeningGambitBuffSelfByEnemiesNearby"
  @type: "ModifierOpeningGambitBuffSelfByEnemiesNearby"

  @description: "Gains %X for each enemy nearby"

  fxResource: ["FX.Modifiers.ModifierOpeningGambit", "FX.Modifiers.ModifierGenericBuff"]

  @createContextObject: (attackBuff = 0, maxHPBuff = 0, appliedName, options) ->
    contextObject = super(options)
    buffContextObject = Modifier.createContextObjectWithAttributeBuffs(attackBuff,maxHPBuff)
    buffContextObject.appliedName = appliedName
    contextObject.modifiersContextObjects = [buffContextObject]
    return contextObject

  @getDescription: (modifierContextObject) ->
    if modifierContextObject
      subContextObject = modifierContextObject.modifiersContextObjects[0]
      return @description.replace /%X/, Stringifiers.stringifyAttackHealthBuff(subContextObject.attributeBuffs.atk,subContextObject.attributeBuffs.maxHP)
    else
      return @description

  onOpeningGambit: () ->
    super()
    nearbyEnemies = @getGameSession().getBoard().getEnemyEntitiesAroundEntity(
      @getCard(),
      CardType.Unit,
      1, # radius
      true, # allowUntargetable
    )
    for [0...nearbyEnemies.length]
      @getGameSession().applyModifierContextObject(
        @modifiersContextObjects[0],
        @getCard(),
      )
    return

module.exports = ModifierOpeningGambitBuffSelfByEnemiesNearby
