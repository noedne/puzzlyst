ModifierDealDamageWatch = require './modifierDealDamageWatch'

class ModifierDealDamageWatchModifyTarget extends ModifierDealDamageWatch

  type:"ModifierDealDamageWatchModifyTarget"
  @type:"ModifierDealDamageWatchModifyTarget"

  @description:"Whenever this minion damages an enemy minion, %X"

  enemyOnly: true
  minionOnly: true

  fxResource: ["FX.Modifiers.ModifierDealDamageWatch", "FX.Modifiers.ModifierGenericBuff"]

  @createContextObject: (modifiersContextObjects, description="", options) ->
    contextObject = super(options)
    contextObject.modifiersContextObjects = modifiersContextObjects
    contextObject.description = description
    return contextObject

  @getDescription: (modifierContextObject) ->
    if modifierContextObject?
      return @description.replace /%X/, modifierContextObject.description
    else
      return @description

  onDealDamage: (action) ->
    @applyManagedModifiersFromModifiersContextObjects(
      @modifiersContextObjects,
      action.getTarget(),
    )

module.exports = ModifierDealDamageWatchModifyTarget
