ModifierSummonWatchNearbyApplyModifiers = require './modifierSummonWatchApplyModifiers'

class ModifierSummonWatchNearbyApplyModifiersOnce extends ModifierSummonWatchNearbyApplyModifiers

  type:"ModifierSummonWatchNearbyApplyModifiersOnce"
  @type:"ModifierSummonWatchNearbyApplyModifiersOnce"

  @description: "The first friendly minion summoned nearby this minion %X"

  canApply: true
  canApplyOncePerTurn: false

  getIsValidBuffPosition: (summonedUnitPosition) ->
    unless @canApply
      return false

    isValidBuffPosition = super(summonedUnitPosition)
    if isValidBuffPosition
      @canApply = false
    return isValidBuffPosition

  onStartTurn: (event) ->
    super(event)
    if @canApplyOncePerTurn
      @canApply = true

module.exports = ModifierSummonWatchNearbyApplyModifiersOnce
