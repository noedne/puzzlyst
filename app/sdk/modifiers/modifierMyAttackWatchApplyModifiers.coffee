ModifierMyAttackWatch = require './modifierMyAttackWatch'

class ModifierMyAttackWatchApplyModifiers extends ModifierMyAttackWatch

  type:"ModifierMyAttackWatchApplyModifiers"
  @type:"ModifierMyAttackWatchApplyModifiers"

  modifiersContextObjects: null
  applyToGeneral: false

  fxResource: ["FX.Modifiers.ModifierGenericBuff"]

  @createContextObject: (modifiersContextObjects, options) ->
    contextObject = super(options)
    contextObject.modifiersContextObjects = modifiersContextObjects
    return contextObject

  onMyAttackWatch: (action) ->

    if @modifiersContextObjects?
      for modifier in @modifiersContextObjects
        if modifier?
          card = if @applyToGeneral
          then @getGameSession().getGeneralForPlayerId(@getCard().getOwnerId())
          else @getCard()
          @getGameSession().applyModifierContextObject(modifier, card)
    return

module.exports = ModifierMyAttackWatchApplyModifiers
