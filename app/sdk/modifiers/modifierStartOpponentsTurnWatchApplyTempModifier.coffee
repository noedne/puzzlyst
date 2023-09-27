ModifierStartTurnWatch = require './modifierStartTurnWatch'

class ModifierStartOpponentsTurnWatchApplyTempModifier extends ModifierStartTurnWatch

  type: "ModifierStartOpponentsTurnWatchApplyTempModifier"
  @type: "ModifierStartOpponentsTurnWatchApplyTempModifier"

  activatesOnOwnersTurn: false
  activatesOnOpponentsTurn: true

  modifierContextObject: null

  @createContextObject: (modifierContextObject, options) ->
    contextObject = super(options)
    modifierContextObject.durationEndTurn = 1
    contextObject.modifierContextObject = modifierContextObject
    return contextObject
  
  onTurnWatch: () ->
    super()
    @getGameSession().applyModifierContextObject(@modifierContextObject, @getCard(), @)

module.exports = ModifierStartOpponentsTurnWatchApplyTempModifier