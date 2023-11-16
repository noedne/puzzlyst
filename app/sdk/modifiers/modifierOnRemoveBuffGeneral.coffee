Modifier = require('./modifier')

class ModifierOnRemoveBuffGeneral extends Modifier

  type: 'ModifierOnRemoveBuffGeneral'
  @type: 'ModifierOnRemoveBuffGeneral'
  
  @createContextObject: (modifiersContextObjects, options) ->
    contextObject = super(options)
    contextObject.modifiersContextObjects = modifiersContextObjects
    return contextObject
  
  onRemoveFromCard: () ->
    # cannot apply as managed modifier because this modifier is getting removed
    for modifierContextObject in @modifiersContextObjects
      if modifierContextObject.durationIsUntilEndBeforeNextTurn or
          modifierContextObject.durationIsUntilStartOfNextTurn
        modifierContextObject.durationIsUntilNextTurnOfPlayerId = @getOwnerId()
      @getGameSession().applyModifierContextObject(
        modifierContextObject,
        @getGameSession().getGeneralForPlayerId(@getOwnerId()),
      )
    super()

module.exports = ModifierOnRemoveBuffGeneral