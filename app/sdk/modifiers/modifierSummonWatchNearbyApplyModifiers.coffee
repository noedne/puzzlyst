ModifierSummonWatchApplyModifiers = require './modifierSummonWatchApplyModifiers'

class ModifierSummonWatchNearbyApplyModifiers extends ModifierSummonWatchApplyModifiers

  type:"ModifierSummonWatchNearbyApplyModifiers"
  @type:"ModifierSummonWatchNearbyApplyModifiers"

  @description: "Friendly minions summoned nearby this minion %X"

  getIsValidBuffPosition: (summonedUnitPosition) ->
    entityPosition = @getCard().getPosition()
    if (Math.abs(summonedUnitPosition.x - entityPosition.x) <= 1) and (Math.abs(summonedUnitPosition.y - entityPosition.y) <= 1)
      return true
    else
      return false

module.exports = ModifierSummonWatchNearbyApplyModifiers
