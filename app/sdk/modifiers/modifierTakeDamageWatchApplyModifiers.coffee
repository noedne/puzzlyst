ModifierTakeDamageWatch = require './modifierTakeDamageWatch'

class ModifierTakeDamageWatchApplyModifiers extends ModifierTakeDamageWatch

  type:"ModifierTakeDamageWatchApplyModifiers"
  @type:"ModifierTakeDamageWatchApplyModifiers"

  fxResource: ["FX.Modifiers.ModifierGenericBuff"]

  @createContextObject: (modifiersContextObjects, options) ->
    contextObject = super(options)
    contextObject.modifiersContextObjects = modifiersContextObjects
    return contextObject

  onDamageTaken: (action) ->
    super(action)
    for modifierContextObject in @modifiersContextObjects
      @getGameSession().applyModifierContextObject(
        modifierContextObject,
        @getCard(),
      )
    return

module.exports = ModifierTakeDamageWatchApplyModifiers
