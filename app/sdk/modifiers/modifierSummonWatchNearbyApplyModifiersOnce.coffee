ModifierSummonWatchNearbyApplyModifiers = require './modifierSummonWatchApplyModifiers'
UtilsGameSession = require 'app/common/utils/utils_game_session'
Stringifiers = require 'app/sdk/helpers/stringifiers'

class ModifierSummonWatchNearbyApplyModifiersOnce extends ModifierSummonWatchNearbyApplyModifiers

  type:"ModifierSummonWatchNearbyApplyModifiersOnce"
  @type:"ModifierSummonWatchNearbyApplyModifiersOnce"

  @description: "The first friendly minion summoned nearby this minion %X"

  canApplyModifier: true # can apply modifier once

  fxResource: ["FX.Modifiers.ModifierSummonWatch", "FX.Modifiers.ModifierGenericBuff"]

  @createContextObject: (modifiersContextObjects, buffDescription, options) ->
    contextObject = super(options)
    contextObject.modifiersContextObjects = modifiersContextObjects
    contextObject.buffDescription = buffDescription
    return contextObject

  @getDescription: (modifierContextObject) ->
    if modifierContextObject
      return @description.replace /%X/, modifierContextObject.buffDescription
    else
      return @description

  getIsValidBuffPosition: (summonedUnitPosition) ->
    if @canApplyModifier
      entityPosition = @getCard().getPosition()
      if (Math.abs(summonedUnitPosition.x - entityPosition.x) <= 1) and (Math.abs(summonedUnitPosition.y - entityPosition.y) <= 1)
        @canApplyModifier = false
        return true
      else
        return false
    return false


module.exports = ModifierSummonWatchNearbyApplyModifiersOnce
