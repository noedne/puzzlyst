ModifierTakeDamageWatch = require './modifierTakeDamageWatch'

class ModifierTakeDamageWatchApplyModifiers extends ModifierTakeDamageWatch

  type:"ModifierTakeDamageWatchApplyModifiers"
  @type:"ModifierTakeDamageWatchApplyModifiers"

  fxResource: ["FX.Modifiers.ModifierGenericBuff"]

  @createContextObject: (modifiersContextObjects, description, options) ->
    contextObject = super(options)
    contextObject.modifiersContextObjects = modifiersContextObjects
    contextObject.description = description
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
