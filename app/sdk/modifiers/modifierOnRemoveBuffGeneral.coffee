Modifier = require('./modifier')

class ModifierOnRemoveBuffGeneral extends Modifier

  type: 'ModifierOnRemoveBuffGeneral'
  @type: 'ModifierOnRemoveBuffGeneral'
  
  @createContextObject: (modifiersContextObjects, options) ->
    contextObject = super(options)
    contextObject.modifiersContextObjects = modifiersContextObjects
    return contextObject
  
  onRemoveFromCard: () ->
    for modifierContextObject in @modifiersContextObjects
      @getGameSession().applyModifierContextObject(
        modifierContextObject,
        @getGameSession().getGeneralForPlayerId(@getOwnerId()),
      )
    super()

module.exports = ModifierOnRemoveBuffGeneral